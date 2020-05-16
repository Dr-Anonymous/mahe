---
layout: default
---
<div id= "form">
  Phone number: <textarea id="phone"></textarea>
  Message: <textarea type="text" id="say"></textarea>
<br><br>
<button onclick="myFunction(document.getElementById('phone').value,document.getElementById('say').value)">Send</button>
</div>
<p id="demo"></p>

<script>
function myFunction(phone,say) {
var phone= phone;
var say= say;
const headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Authorization', 'key=AAAAuA5SsNc:APA91bHokGLHzZS5BGPd3iVJ1fp7MxF8M2wdE3dEeTHTxY9r0sA1UgcDkRmwAvCojLYDDgSmQsPUNo1CYHHIRYKINqc31lz9ALNzhXK8bRPctK1HlwRaIBwn8uklIjLWouT3D9m6vjn1');
const body = `{
    "to": "/topics/all",
    "data": {
    "phone": ${'"'+ phone +'"'},
    "say": ${'"'+ say +'"'}
      }
}`;

const init = {
  method: 'POST',
  headers,
  body
};

fetch('https://fcm.googleapis.com/fcm/send', init)
.then((response) => {
  return response.text();
})
.then((text) => {
  // text is the response body
    document.getElementById("form").style.display = "none";
  document.getElementById("demo").innerHTML = "Sent";
    console.log(text);
})
.catch((e) => {
  // error in e.message
  document.getElementById("demo").innerHTML = "Server error. Try again";
    console.log(e.message);
});
}
</script>
