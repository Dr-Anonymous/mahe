---
layout: withScript
---
<div id= "form" style="display: none;">
  Phone number: <textarea id="phone"></textarea>
  Message: <textarea type="text" id="say"></textarea>
<br><br>
<button id= "btn" onclick="myFunction(document.getElementById('phone').value,document.getElementById('say').value)">Send</button>
</div>
<p id="demo">You must be signed-in to access this app</p>
<div id="my-signin2" data-width="300" data-height="200" data-longtitle="true"></div>
<a href="#" id="signout" onclick="signOut();" style="display: none;">Sign out</a>

<script>
//code for google sign-in
function onSuccess(googleUser) {
      document.getElementById("form").style.display = "initial";
      document.getElementById("my-signin2").style.display = "none";
      document.getElementById("signout").style.display = "initial";
      var profile = googleUser.getBasicProfile();
      console.log('Logged in as: ' + profile.getName()+ " "+profile.getEmail());
    }
    function onFailure(error) {
      console.log(error);
    }
    function renderButton() {
      gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSuccess,
        'onfailure': onFailure
      });
    }
 //google signout
 function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
    console.log('User signed out.');
    });
  }
//send sms
function myFunction(phone,say) {
var phone= phone;
var say= say;
const headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Authorization', 'key=AAAAuA5SsNc:APA91bHokGLHzZS5BGPd3iVJ1fp7MxF8M2wdE3dEeTHTxY9r0sA1UgcDkRmwAvCojLYDDgSmQsPUNo1CYHHIRYKINqc31lz9ALNzhXK8bRPctK1HlwRaIBwn8uklIjLWouT3D9m6vjn1');
const body = `{
    "to": "/topics/all",
    "data": {
    "phone": "${phone}",
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
    document.getElementById("btn").value = "Sending...";
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
//send sms end
</script>
