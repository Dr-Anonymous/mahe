const audioInputSelect = document.querySelector('#audioSource');
const audioOutputSelect = document.querySelector('#audioOutput');
const videoSelect = document.querySelector('#videoSource');
const selectors = [audioInputSelect, audioOutputSelect, videoSelect];
audioOutputSelect.disabled = !('sinkId' in HTMLMediaElement.prototype);
var screenCaptureStream;

function gotDevices(deviceInfos) {
  // Handles being called several times to update labels. Preserve values.
  const values = selectors.map(select => select.value);
  selectors.forEach(select => {
    while (select.firstChild) {
      select.removeChild(select.firstChild);
    }
  });
  for (let i = 0; i !== deviceInfos.length; ++i) {
    const deviceInfo = deviceInfos[i];
    const option = document.createElement('option');
    option.value = deviceInfo.deviceId;
    if (deviceInfo.kind === 'audioinput') {
      option.text = deviceInfo.label || `microphone ${audioInputSelect.length + 1}`;
      audioInputSelect.appendChild(option);
    } else if (deviceInfo.kind === 'audiooutput') {
      option.text = deviceInfo.label || `speaker ${audioOutputSelect.length + 1}`;
      audioOutputSelect.appendChild(option);
    } else if (deviceInfo.kind === 'videoinput') {
      option.text = deviceInfo.label || `camera ${videoSelect.length + 1}`;
      videoSelect.appendChild(option);
    } else {
      console.log('Some other kind of source/device: ', deviceInfo);
    }
  }
  selectors.forEach((select, selectorIndex) => {
    if (Array.prototype.slice.call(select.childNodes).some(n => n.value === values[selectorIndex])) {
      select.value = values[selectorIndex];
    }
  });
}

navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(handleError);

// Attach audio output device to video element using device/sink ID.
function attachSinkId(element, sinkId) {
  if (typeof element.sinkId !== 'undefined') {
    element.setSinkId(sinkId)
        .then(() => {
          console.log(`Success, audio output device attached: ${sinkId}`);
        })
        .catch(error => {
          let errorMessage = error;
          if (error.name === 'SecurityError') {
            errorMessage = `You need to use HTTPS for selecting audio output device: ${error}`;
          }
          console.error(errorMessage);
          // Jump back to first output device in the list as it's the default.
          audioOutputSelect.selectedIndex = 0;
        });
  } else {
    console.warn('Browser does not support output device selection.');
  }
}

function changeAudioDestination() {
  const audioDestination = audioOutputSelect.value;
  attachSinkId(localVideo, audioDestination);
}

function gotStream(stream) {
  window.stream = stream; /*this variable used in next function*/
  localVideo.srcObject = stream;
  localVideo.play();
  stream.getTracks().forEach(function (track) {
    if (two) pc2.addTrack(track, stream);
	if (one) pc1.addTrack(track, stream);
	});
  //Refresh button list in case labels have become available
  return navigator.mediaDevices.enumerateDevices();
}


function start() {
  if (window.stream) {
    window.stream.getTracks().forEach(track => {
      track.stop();
    });
  }
  if (one) pc1.restartIce();
  else pc2.restartIce();
  
  const audioSource = document.querySelector('#audioSource').value;
  const videoSource = document.querySelector('#videoSource').value;
  
  const constraints = {
    audio: {deviceId: audioSource ? {exact: audioSource} : undefined},
    video: {deviceId: videoSource ? {exact: videoSource} : undefined}
  };

  if ($('#screenShare').attr('share') == 'yes') {
		navigator.mediaDevices.getDisplayMedia({video: true}).then(clubAudio).catch(handleError);
		delete constraints.video;
		return navigator.mediaDevices.getUserMedia(constraints).then(clubAudio).then(gotStream).then(gotDevices).catch(handleError);
  } else {
	  return navigator.mediaDevices.getUserMedia(constraints).then(gotStream).then(gotDevices).catch(handleError);
  }
}

audioInputSelect.onchange = if (stream) start;
audioOutputSelect.onchange = if (stream) changeAudioDestination;
videoSelect.onchange = if (stream) start;
//start();

function handleError(error) {
  console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
}

function clubAudio(str){
	console.log(str.getAudioTracks());
	if (str.getAudioTracks().length < 1) {
		screenCaptureStream = str;
		
		return;
	}
	
	str.addTrack(screenCaptureStream.getVideoTracks()[0]);
	return str;
}
