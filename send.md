---
layout: withScript
---
<p id="demo" value= "hi">You must be signed-in to access this app</p>
<div id= "form" style="display: none;">
  Phone number: <textarea id="phone"></textarea>
  Message: <textarea type="text" id="say"></textarea>
<br><br>
<button id= "btn" onclick="myFunction(document.getElementById('phone').value,document.getElementById('say').value);">Send</button>
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
    //get firebase token using email id
    fetch("https://t.orthosam.com/send.php?phone="+phone+"&say="+say).then(function(data){
    console.log(data);
    document.getElementById("demo").value(data);
  });
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
  fetch("https://t.orthosam.com/send.php?phone="+phone+"&say="+say)
  .then(function(data) {
    // Here you get the data
    document.getElementById("form").style.display = "none";
    document.getElementById("demo").innerHTML = "Sent. <a href='javascript:location.reload();' id='reload'>Send another message</a>";
    console.log(data);
    })
  .catch(function(error) {
    // If there is any error
    document.getElementById("demo").innerHTML = "Server error. Try again";
    console.log(error);
  });
}
//send sms end
</script>
