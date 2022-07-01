const codecPreferences = document.getElementById('codecPreferences');
const supportsSetCodecPreferences = window.RTCRtpTransceiver && 'setCodecPreferences' in window.RTCRtpTransceiver.prototype;

if (supportsSetCodecPreferences) {
    const {codecs} = RTCRtpSender.getCapabilities('video');
    codecs.forEach(codec => {
      if (['video/red', 'video/ulpfec', 'video/rtx'].includes(codec.mimeType)) {
        return;
      }
      const option = document.createElement('option');
      option.value = (codec.mimeType + ' ' + (codec.sdpFmtpLine || '')).trim();
      option.innerText = option.value;
      codecPreferences.appendChild(option);
    });
    codecPreferences.disabled = false;
  }
	
var cfg = {'iceServers': [{urls: 'stun:stun.l.google.com:19302'}]}; //stun:23.21.150.121

/* THIS IS ALICE, THE CALLER/SENDER */

var pc1 = new RTCPeerConnection(cfg),
	dc1 = null,
	tn1 = null;

// Since the same JS file contains code for both sides of the connection,
// activedc tracks which of the two possible datachannel variables we're using.
var activedc,
	pc1icedone = false;
/*
$('#showLocalOffer').modal('hide')
$('#getRemoteAnswer').modal('hide')
$('#waitForConnection').modal('hide')
$('#createOrJoin').modal('show')
*/

$('#createBtn').click(function () {
  //$('#createOrJoin').modal('hide')
  //$('#showLocalOffer').modal('show')
})

$('#joinBtn').click(function () {
  //$('#createOrJoin').modal('hide')
  //$('#getRemoteOffer').modal('show')
  //$('#offerRecdBtn').click();
});

$('#offerSentBtn').click(function () {
	//$('#showLocalOffer').modal('hide')
	//$('#getRemoteAnswer').modal('show')
	createLocalOffer();
});

var localVideo = document.getElementById('localVideo');

$('#offerRecdBtn').click(function () {
	start().then(function(x){
    localVideo.srcObject = stream;
    localVideo.play();
	stream.getTracks().forEach(function (track) {
    pc2.addTrack(track, stream);
	});
	var offer = remoteOffer //$('#remoteOffer').val()
	var offerDesc = new RTCSessionDescription(JSON.parse(offer))
	//console.log('Received remote offer', offerDesc)
	//writeToChatLog('Received remote offer', 'text-success')
	handleOfferFromPC1(offerDesc);

  //$('#getRemoteOffer').modal('hide')
  //$('#showLocalAnswer').modal('show')
	});
});

$('#answerSentBtn').click(function () {
  //$('#showLocalAnswer').modal('hide')
  //$('#waitForConnection').modal('show')
});

$('#answerRecdBtn').click(function () {
  var answer = remoteAnswer//$('#remoteAnswer').val()
  var answerDesc = new RTCSessionDescription(JSON.parse(answer))
  handleAnswerFromPC2(answerDesc)
  //$('#getRemoteAnswer').modal('hide')
  //$('#waitForConnection').modal('show')
})

function createLocalOffer () {
    start().then(function(x){
	localVideo.srcObject = stream;
    localVideo.play();
	stream.getTracks().forEach(function (track) {
    pc1.addTrack(track, stream);
	});
    //console.log(stream);
    //console.log('adding stream to pc1');
    setupDC1(); /* <======== function in other script */
	
	//codecs
	if (supportsSetCodecPreferences) {
    const preferredCodec = codecPreferences.options[codecPreferences.selectedIndex];
    if (preferredCodec.value !== '') {
      const [mimeType, sdpFmtpLine] = preferredCodec.value.split(' ');
      const {codecs} = RTCRtpSender.getCapabilities('video');
      const selectedCodecIndex = codecs.findIndex(c => c.mimeType === mimeType && c.sdpFmtpLine === sdpFmtpLine);
      const selectedCodec = codecs[selectedCodecIndex];
      codecs.splice(selectedCodecIndex, 1);
      codecs.unshift(selectedCodec);
      console.log(codecs);
      const transceiver = pc1.getTransceivers().find(t => t.sender && t.sender.track === stream.getVideoTracks()[0]);
      transceiver.setCodecPreferences(codecs);
      console.log('Preferred video codec', selectedCodec);
    }
	}
	codecPreferences.disabled = true;
	
	pc1.createOffer().then(function(offer) {
	console.log("created local offer");
	return pc1.setLocalDescription(offer); 
	})
	.then(function() {  })
	.catch(function(reason) {console.warn("Couldn't create offer- "+ reason);});
	});
}

pc1.onicecandidate = function (e) {
  console.log('ICE candidate (pc1)', e)
  if (e.candidate == null) {
    $('#localOffer').html(JSON.stringify(pc1.localDescription));
	set(ref(db, '0/'), JSON.stringify(pc1.localDescription));
	//$('#offerSentBtn').click();
  }
}

// Attach a media stream to an element.
attachMediaStream = function (element, stream) {
  console.log('Attaching media stream');
  element.srcObject = stream;
  
  // promises
  var playPromise = element.play();
  if (playPromise !== undefined) {
    playPromise.then(_ => {  })
    .catch(error => {    });
  }
}

function handleOnaddstream (e) {
  console.log('Got remote streams', e.streams);
  var el = document.getElementById('remoteVideo');
  el.autoplay = true;
  window.remoteStream = e.streams[0];
  attachMediaStream(el, remoteStream);
}

pc1.ontrack = handleOnaddstream

function handleOnconnection () {
  console.log('Datachannel connected')
  writeToChatLog('Datachannel connected', 'text-success')
  //$('#waitForConnection').modal('hide')
  // If we didn't call remove() here, there would be a race on pc2:
  //   - first onconnection() hides the dialog, then someone clicks
  //     on answerSentBtn which shows it, and it stays shown forever.
  //$('#waitForConnection').remove()
  //$('#showLocalAnswer').modal('hide')
  $('#messageTextBox').focus()
}

pc1.onconnection = handleOnconnection

function onsignalingstatechange (state) {
  console.info('signaling state change:', state)
}

function oniceconnectionstatechange (state) {
  console.info('ice connection state change:', state)
}

function onicegatheringstatechange (state) {
  console.info('ice gathering state change:', state)
}

pc1.onsignalingstatechange = onsignalingstatechange
pc1.oniceconnectionstatechange = oniceconnectionstatechange
pc1.onicegatheringstatechange = onicegatheringstatechange

function handleAnswerFromPC2 (answerDesc) {
  //console.log('Received remote answer: ', answerDesc)
  //writeToChatLog('Received remote answer', 'text-success')
  pc1.setRemoteDescription(answerDesc)
}


/* THIS IS BOB, THE ANSWERER/RECEIVER */

var pc2 = new RTCPeerConnection(cfg),
	dc2 = null,
	pc2icedone = false;

pc2.ondatachannel = function (e) {
  var fileReceiver2 = new FileReceiver()
  var datachannel = e.channel || e; // Chrome sends event, FF sends raw channel
  console.log('Received datachannel (pc2)', arguments);
  dc2 = datachannel;
  activedc = dc2;
  dc2.onopen = function (e) {
    console.log('data channel connect')
    //$('#waitForConnection').modal('hide')
    //$('#waitForConnection').remove()
  }
  dc2.onmessage = function (e) {
    console.log('Got message (pc2)', e.data)
    if (e.data.size) {
      fileReceiver2.receive(e.data, {})
    } else {
      var data = JSON.parse(e.data)
      if (data.type === 'file') {
        fileReceiver2.receive(e.data, {})
      } else {
        writeToChatLog(data.message, 'text-info')
        // Scroll chat text area to the bottom on new input.
        $('#chatlog').scrollTop($('#chatlog')[0].scrollHeight)
      }
    }
  }
}

function handleOfferFromPC1 (offerDesc) {
	pc2.setRemoteDescription(offerDesc);
	
	pc2.createAnswer().then(function(answer) {
	writeToChatLog('Created local answer', 'text-success')
    console.log('Created local answer: ', answer)
	return pc2.setLocalDescription(answer);
	})
	.then(function() {// Send the answer to the remote peer through the signaling server.
	})
	.catch(function (error){ 
	console.warn("Couldn't create offer- "+ error);
	});

}

pc2.onicecandidate = function (e) {
  console.log('ICE candidate (pc2)', e)
  if (e.candidate == null) {
    $('#localAnswer').html(JSON.stringify(pc2.localDescription))
	set(ref(db, '1/'), JSON.stringify(pc2.localDescription));
	$("#answerSentBtn").click();
  }
}

pc2.onsignalingstatechange = onsignalingstatechange
pc2.oniceconnectionstatechange = oniceconnectionstatechange
pc2.onicegatheringstatechange = onicegatheringstatechange
pc2.ontrack = handleOnaddstream
pc2.onconnection = handleOnconnection


/* not used code */
reattachMediaStream = function (to, from) {
  console.log('Reattaching media stream')
  to.srcObject = from.srcObject
  
  // promises
  var playPromise = to.play();
  if (playPromise !== undefined) {
    playPromise.then(_ => {  })
    .catch(error => {    });
  }
  
}


function handleCandidateFromPC1 (iceCandidate) {
  pc2.addIceCandidate(iceCandidate)
}

function handleCandidateFromPC2 (iceCandidate) {
  pc1.addIceCandidate(iceCandidate)
}
