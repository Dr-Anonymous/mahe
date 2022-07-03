const codecPreferences = document.getElementById('codecPreferences');
const supportsSetCodecPreferences = window.RTCRtpTransceiver && 'setCodecPreferences' in window.RTCRtpTransceiver.prototype;

if (supportsSetCodecPreferences) {
	const {
		codecs
	} = RTCRtpSender.getCapabilities('video');
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

function setCodec(x){
/* codecs */
		if (supportsSetCodecPreferences) {
			const preferredCodec = codecPreferences.options[codecPreferences.selectedIndex];
			if (preferredCodec.value !== '') {
				const [mimeType, sdpFmtpLine] = preferredCodec.value.split(' ');
				const {	codecs } = RTCRtpSender.getCapabilities('video');
				const selectedCodecIndex = codecs.findIndex(c => c.mimeType === mimeType && c.sdpFmtpLine === sdpFmtpLine);
				const selectedCodec = codecs[selectedCodecIndex];
				codecs.splice(selectedCodecIndex, 1);
				codecs.unshift(selectedCodec);
				console.log(codecs);
				const transceiver = x.getTransceivers().find(t => t.sender && t.sender.track === stream.getVideoTracks()[0]);
				transceiver.setCodecPreferences(codecs);
				console.log('Preferred video codec', selectedCodec);
			}
		}
		codecPreferences.disabled = true;
}
