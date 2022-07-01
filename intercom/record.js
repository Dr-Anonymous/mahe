/* https://webrtc.github.io/samples/*/
let mediaRecorder;
let recordedBlobs;

const recordedVideo = $('#remoteVideo');
const recordButton = $('#record');
const playButton = $('#play');
const downloadButton = $('#download');


recordButton.on('click', () => {
  if (recordButton[0].classList.contains('btn-secondary')) {
    startRecording();
  } else {
    stopRecording();
    recordButton.addClass('btn-secondary').removeClass('btn-danger');
    playButton[0].disabled = false;
    downloadButton[0].disabled = false;
    codecPreferences[0].disabled = false;
  }
});

playButton.on('click', () => {
  const mimeType = codecPreferences.options[codecPreferences.selectedIndex].value.split(';', 1)[0];
  const superBuffer = new Blob(recordedBlobs, {type: mimeType});
  recordedVideo.src = null;
  recordedVideo.srcObject = null;
  recordedVideo.src = window.URL.createObjectURL(superBuffer);
  recordedVideo.controls = true;
  recordedVideo.play();
});

downloadButton.on('click', () => {
  const blob = new Blob(recordedBlobs, {type: 'video/webm'});
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = 'test.webm';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 100);
});

function handleDataAvailable(event) {
  console.log('handleDataAvailable', event);
  if (event.data && event.data.size > 0) {
    recordedBlobs.push(event.data);
  }
}

function getSupportedMimeTypes() {
  const possibleTypes = [
    'video/webm;codecs=vp9,opus',
    'video/webm;codecs=vp8,opus',
    'video/webm;codecs=h264,opus',
    'video/mp4;codecs=h264,aac',
  ];
  return possibleTypes.filter(mimeType => {
    return MediaRecorder.isTypeSupported(mimeType);
  });
}

function startRecording() {
  recordedBlobs = [];
  const mimeType = codecPreferences.options[codecPreferences.selectedIndex].value;
  const options = {mimeType};

  try {
    mediaRecorder = new MediaRecorder(remoteStream, options);
  } catch (e) {
    console.error('Exception while creating MediaRecorder:', e);
    alert(`Exception while creating MediaRecorder: ${JSON.stringify(e)}`);
    return;
  }

  console.log('Created MediaRecorder', mediaRecorder, 'with options', options);
  recordButton.addClass('btn-danger').removeClass('btn-secondary');
  playButton[0].disabled = true;
  downloadButton[0].disabled = true;
  codecPreferences.disabled = true;
  mediaRecorder.onstop = (event) => {
    console.log('Recorder stopped: ', event);
    console.log('Recorded Blobs: ', recordedBlobs);
  };
  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.start();
  console.log('MediaRecorder started', mediaRecorder);
}

function stopRecording() {
  mediaRecorder.stop();
}
