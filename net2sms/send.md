---
layout: withScript
---
<p id="demo">You must be signed-in to access this app</p>
<p id="id" style="display: none;"></p>
<div id= "form" style="display: none;">
  Phone number: <a href ="./mycontacts" target="_blank">View your contacts here</a><textarea id="phone"></textarea>
  SMS Message: <textarea type="text" id="say"></textarea>
<br><br>
<button id= "btn" onclick="myFunction(document.getElementById('phone').value,document.getElementById('say').value);">Send</button>
</div>
<div id="my-signin2"></div>
<a href="javascript:;" id="signout" onclick="signOut();" style="display: none;">Sign out</a>

<script>
//code for google sign-in
function onSuccess(googleUser) {
    document.getElementById("my-signin2").style.display = "none";
    document.getElementById("form").style.display = "initial";
    document.getElementById("signout").style.display = "initial";
     //display user details
     var profile = googleUser.getBasicProfile();
     document.getElementById("demo").innerText = "Welcome "+ profile.getName()+ " ("+profile.getEmail()+")";
     console.log('Logged in as: ' + profile.getName()+ " "+profile.getEmail());
    //get firebase token using email id
    var url= "https://script.google.com/macros/s/AKfycbzt9Hbl-fc3wM-xQU_EkqvYKFmSwLX2m9HJdZv75IR6T06OBxw/exec?mail="+profile.getEmail();
 var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            document.getElementById("id").innerText= xmlHttp.responseText;
    }
    xmlHttp.open("GET", url, true); // true for asynchronous 
    xmlHttp.send(null);
    //end firebase token retrieval
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
  var id= document.getElementById("id").innerText;
  if (id==="noToken"){
     document.getElementById("demo").innerHTML = "You haven't installed/registered Net2SMS app. Kindly install the app from <a href='https://drive.google.com/open?id=1BY9HzqFtTCpjGMbcnoll6L_kNEWpmKcf'>here</a> to use this online SMS feature.";
    return;
    }
//change button state
 document.getElementById("btn").innerText = "Sending...";
 
//make call to script
  fetch("https://t.orthosam.com/send.php?phone="+phone+"&say="+say+"&id="+id)
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
