
function sendMessage () {
  if ($('#messageTextBox').val()) {
    var channel = new RTCMultiSession()
    writeToChatLog($('#messageTextBox').val(), 'text-success')
    channel.send({message: $('#messageTextBox').val()})
    $('#messageTextBox').val('')

    // Scroll chat text area to the bottom on new input.
    $('#chatlog').scrollTop($('#chatlog')[0].scrollHeight)
  }

  return false
}

function setupDC1 () {
  try {
    var fileReceiver1 = new FileReceiver()
    dc1 = pc1.createDataChannel('test', {reliable: true})
    activedc = dc1;
    console.log('Created datachannel (pc1)')
    dc1.onopen = function (e) {
      console.log('data channel connect')
      //$('#waitForConnection').modal('hide')
      //$('#waitForConnection').remove()
    }
    dc1.onmessage = function (e) {
      console.log('Got message (pc1)', e.data)
      if (e.data.size) {
        fileReceiver1.receive(e.data, {})
      } else {
        if (e.data.charCodeAt(0) == 2) {
          // The first message we get from Firefox (but not Chrome)
          // is literal ASCII 2 and I don't understand why -- if we
          // leave it in, JSON.parse() will barf.
          return
        }
        console.log(e)
        var data = JSON.parse(e.data)
        if (data.type === 'file') {
          fileReceiver1.receive(e.data, {})
        } else {
          writeToChatLog(data.message, 'text-info')
          // Scroll chat text area to the bottom on new input.
          $('#chatlog').scrollTop($('#chatlog')[0].scrollHeight)
        }
      }
    }
  } catch (e) { console.warn('No data channel (pc1)', e); }
}


function getTimestamp () {
  var totalSec = new Date().getTime() / 1000
  var hours = parseInt(totalSec / 3600) % 24
  var minutes = parseInt(totalSec / 60) % 60
  var seconds = parseInt(totalSec % 60)

  var result = (hours < 10 ? '0' + hours : hours) + ':' +
    (minutes < 10 ? '0' + minutes : minutes) + ':' +
    (seconds < 10 ? '0' + seconds : seconds)

  return result
}

function escapeHTML (unsafe_str) {
  return unsafe_str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/\'/g, '&#39;')
    .replace(/\//g, '&#x2F;')
}

function writeToChatLog (message, message_type) {
  document.getElementById('chatlog').innerHTML += '<p class="' + message_type + '">' + '[' + getTimestamp() + '] ' + escapeHTML(message) + '</p>'
}
