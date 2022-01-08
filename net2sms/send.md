---
layout: default
title: Net2SMS
description: Send SMS
---
<p id="demo">You must be signed-in to access this app</p>
<p id="id" style="display: none;"></p>
<div id= "form" style="display: none;">
  Phone number: <a href ="../mycontacts" target="_blank">View your contacts here</a><textarea id="phone" placeholder="Multiple contacts can entered separated by a space or , inbetween them"></textarea>
  SMS body: <textarea id="say" placeholder="Hello, how are you?"></textarea>
<br><br>
<button id="btn" class="btn waves-effect waves-light" onclick="myFunction($('#phone').val(), $('#say').val());">Send</button>
</div>
<div data-target="slide-out" class="sidenav-trigger my-signin"><i class="material-icons">account_circle</i>Sign-in</div>

<script>
//code for google sign-in
function otherSignedInStuff(googleUser) {
  $("#form").show();
  var profile = googleUser.getBasicProfile();
  $("#demo").text("Welcome " + profile.getName() + " (" + profile.getEmail() + ")");
  //get firebase token using email id
  var url = "https://script.google.com/macros/s/AKfycbzt9Hbl-fc3wM-xQU_EkqvYKFmSwLX2m9HJdZv75IR6T06OBxw/exec?mail=" + profile.getEmail();
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
      $("#id").text(xmlHttp.responseText);
  }
  xmlHttp.open("GET", url, true); // true for asynchronous 
  xmlHttp.send(null);
  //end firebase token retrieval  
}

//send sms
function myFunction(phone, say) {
  if (!phone) {
    M.toast({ html: "Enter a phone number." });
    return;
  }
  phone = phone.replace(/\n/g, "',");
  var id = $("#id").text();
  if (id === "noToken") {
    $("#demo").html("You haven't installed/registered Net2SMS app. Kindly install the app from <a href='https://drive.google.com/open?id=1BY9HzqFtTCpjGMbcnoll6L_kNEWpmKcf'>here</a> to use this online SMS feature.");
    return;
  }
  //change button state
  M.toast({ html: "Sending..." });
  $("#btn").hide();

  //make call to script
  var url= "https://script.google.com/macros/s/AKfycbwqPdJkz9qz-06B7CCrmi-PnWNxyomYgwMAECNl5OE8xMMJ-hyWCRTE59LyaxL0vPnnqg/exec?&callback=callBack&phone=" + phone + "&say=" + say + "&id=" + id;
  jQuery.ajax({
      crossDomain: true,
      url: url,
      method: "GET",
      dataType: "jsonp"
    });
}
function callBack(data) {
  // Here you get the data
  $("#form").hide();
  if (data == 200){
  M.toast({ html: "Message sent." });
  $("#demo").html("<a href='javascript:location.reload();' id='reload'>Send another message</a>");
  console.log(data);
  }else{
  // If there is any error
  M.toast({ html: "Server error. Try again" });
  console.log(error);
  }
}
//send sms end
</script>
