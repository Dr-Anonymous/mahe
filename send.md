---
layout: withScript
---
<p id="demo">You must be signed-in to access this app</p>
<div id= "form" style="display: none;">
  Phone number: <textarea id="phone"></textarea>
  Message: <textarea type="text" id="say"></textarea>
<br><br>
<button id= "btn" onclick="myFunction(document.getElementById('phone').value,(document.getElementById('say').value).replace(/'/g, ''));">Send</button>
</div>
<div id="my-signin2"></div>
<a href="javascript:;" id="signout" onclick="signOut();" style="display: none;">Sign out</a>

<script>
//code for google sign-in
function onSuccess(googleUser) {
      document.getElementById("form").style.display = "initial";
      document.getElementById("my-signin2").style.display = "none";
      document.getElementById("signout").style.display = "initial";
     //display user details
     var profile = googleUser.getBasicProfile();
     document.getElementById("demo").innerText = "Welcome "+ profile.getName()+ " ("+profile.getEmail()+")";
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
    location.reload();
    });
  }
//send sms
function myFunction(phone,say) {
//change button state
document.getElementById("btn").innerText = "Sending...";
//make call to script
  UrlFetchApp.fetch("http://t.orthosam.com/send.php?phone="+phone+"&say="+say);
}
//send sms end
</script>
