var cfg = {	'iceServers': [{urls: 'stun:stun.l.google.com:19302'}]};
var localVideo = document.getElementById('localVideo'),
	remoteVideo = document.getElementById('remoteVideo'),
	remoteStream = [];

/* THIS IS ALICE, THE CALLER/SENDER */

var pc1 = new RTCPeerConnection(cfg),
	dc1 = null,
	tn1 = null;

// Since the same JS file contains code for both sides of the connection,
// activedc tracks which of the two possible datachannel variables we're using.
var activedc,
	pc1icedone = false;

$('#offerSentBtn').click(function() {
	createLocalOffer();
});

$('#offerRecdBtn').click(function() {
	start().then(function(x) {
		var offer = remoteOffer;
		var offerDesc = new RTCSessionDescription(JSON.parse(offer));
		handleOfferFromPC1(offerDesc); //$('#getRemoteOffer').modal('hide'); //$('#showLocalAnswer').modal('show')
	});
});

$('#answerSentBtn').click(function() {
	//$('#showLocalAnswer').modal('hide');//$('#waitForConnection').modal('show')
});

function createLocalOffer() {
	start().then(function(x) {
		setupDC1(); /* <======== function in other script */
		if (window.setCodec) setCodec(pc1);
		pc1.createOffer().then(function(offer) {
			//console.log("created local offer");
			return pc1.setLocalDescription(offer);
		}).catch(function(reason) {
			console.warn("Couldn't create offer- " + reason);
		});

	});

}

pc1.onicecandidate = function(e) {
	//console.log('ICE candidate (pc1)', e);
	if (e.candidate == null) {
		set(ref(db, '0/'), JSON.stringify(pc1.localDescription));
		//$('#offerSentBtn').click();
	}
}

attachMediaStream = function(element, stream) {
	//console.log('Attaching media stream');
	element.srcObject = stream;

	var playPromise = element.play();
	if (playPromise !== undefined) {
		playPromise.then(_ => {})
			.catch(error => {});
	}
}

function handleOnaddstream(e) {
	console.log('Got remote streams', e.streams);
	remoteVideo.autoplay = true;
	remoteStream.push(e.streams[0]); /* this variable used in record.js*/
	attachMediaStream(remoteVideo, e.streams[0]);
	/*
	if (remoteVideo.requestFullscreen) {
	  remoteVideo.requestFullscreen();
	} else if (remoteVideo.mozRequestFullScreen) {
	  remoteVideo.mozRequestFullScreen();
	} else if (remoteVideo.webkitRequestFullscreen) {
	  remoteVideo.webkitRequestFullscreen();
	} else if (remoteVideo.msRequestFullscreen) { 
	  remoteVideo.msRequestFullscreen();
	}
	*/
}

pc1.ontrack = handleOnaddstream;

function handleOnconnection() {
	//console.log('Datachannel connected')
	//writeToChatLog('Datachannel connected', 'text-success')
}

pc1.onconnection = handleOnconnection;

function onsignalingstatechange(state) {
	console.info('signaling state change:', state);
}

function oniceconnectionstatechange(state) {
	console.info('ice connection state change:', state);
}

function onicegatheringstatechange(state) {
	console.info('ice gathering state change:', state);
}

pc1.onsignalingstatechange = onsignalingstatechange;
pc1.oniceconnectionstatechange = oniceconnectionstatechange;
pc1.onicegatheringstatechange = onicegatheringstatechange;

function handleAnswerFromPC2(answerDesc) {
	pc1.setRemoteDescription(answerDesc);
}


/* THIS IS BOB, THE ANSWERER/RECEIVER */

var pc2 = new RTCPeerConnection(cfg),
	dc2 = null,
	pc2icedone = false;


function handleOfferFromPC1(offerDesc) {
	pc2.setRemoteDescription(offerDesc);
	if (window.setCodec) setCodec(pc2);
	pc2.createAnswer().then(function(answer) {
		return pc2.setLocalDescription(answer);
	}).catch(function(error) {
		console.warn("Couldn't create offer- " + error);
	});
}

pc2.onicecandidate = function(e) {
	//console.log('ICE candidate (pc2)', e);
	if (e.candidate == null) {
		set(ref(db, '1/'), JSON.stringify(pc2.localDescription));
		$("#answerSentBtn").click();
	}
}

pc2.onsignalingstatechange = onsignalingstatechange;
pc2.oniceconnectionstatechange = oniceconnectionstatechange;
pc2.onicegatheringstatechange = onicegatheringstatechange;
pc2.ontrack = handleOnaddstream;
pc2.onconnection = handleOnconnection;


/* not used code */
reattachMediaStream = function(to, from) {
	console.log('Reattaching media stream');
	to.srcObject = from.srcObject;
	var playPromise = to.play();
	if (playPromise !== undefined) {
		playPromise.then(_ => {})
			.catch(error => {});
	}
}


function handleCandidateFromPC1(iceCandidate) {
	pc2.addIceCandidate(iceCandidate);
}

function handleCandidateFromPC2(iceCandidate) {
	pc1.addIceCandidate(iceCandidate);
}
