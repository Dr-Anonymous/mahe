---
layout: default
title: User info
description: Registration/ modification
---
<div class="row">
<form class="col s12">
  <div class="row">
    <h5>Doctor details</h5>
    <div class="input-field col s6">
      <input id="name" type="text" required="" aria-required="true">
      <label for="name">Name</label>
    </div>
    <div class="input-field col s6">
      <input id="degree" type="text" required="" aria-required="true">
      <label for="degree">Degree</label>
    </div>
    <div class="input-field col s6">
      <input id="regNo" type="text" required="" aria-required="true">
      <label for="regNo">Registration No.</label>
    </div>
    <div class="file-field input-field col s6">
      <div class="btn">
        <span>Upload signature</span>
        <input id="sign" type="file">
      </div>
      <div class="file-path-wrapper">
        <input class="file-path validate" type="text">
      </div>
    </div>
  </div>
  <div class="row">
    <h5>Institutional details</h5>
    <div class="input-field col s6">
      <input id="post" type="text">
      <label for="post">Post/Position</label>
    </div>
    <div class="input-field col s6">
      <input id="institute" type="text">
      <label for="institute">Institute Name</label>
    </div>
  </div>
  <div class="row">
    <h5>Contact through</h5>
    <div class="input-field col s6">
      <input id="phone" type="tel">
      <label for="phone">Phone</label>
    </div>
    <div class="input-field col s6">
      <input id="mail" type="email">
      <label for="mail">Email</label>
    </div>
    <div class="input-field col s6">
      <textarea id="address" class="materialize-textarea"></textarea>
      <label for="address">Address</label>
    </div>
  </div>
  <div class="row">
    <h5>Password</h5>
    <div class="input-field col s6">
      <input id="password" type="password">
      <label for="password">Enter password</label>
    </div>
    <div class="input-field col s6">
      <input id="rptPassword" type="password">
      <label for="rptPassword">Re-enter password</label>
    </div>
  </div>
  <a class="waves-effect waves-light btn" onclick="update();"><i class="material-icons left">save</i>Save</a>
</form>
</div>
<script>
function update(){
if ($('#password').val() != $('#rptPassword').val()){
  M.toast({html: 'Passwords not matching. Re-enter passwords.'});
  return;
  }

$("#main_content").html("Processing....Please wait.")
var data = JSON.stringify({
  password: $('#password').val(),
  name: $('#name').val(),
  institute: $('#institute').val(),
  degree: $('#degree').val(),
  regNo: $('#regNo').val(),
  post: $('#post').val(),
  phone: $('#phone').val(),
  mail: $('#mail').val(),
  address: $('#address').val()
  });
var url = "https://script.google.com/macros/s/AKfycbwfHSn8ysX_yhbNIx_FHtqwJhH1pqML_0fZ9QV65gjSbOOw2Wo/exec?callback=loadData&save=true&data="+data;
$.ajax({
crossDomain: true,
url: url,
method: "GET",
dataType: "jsonp"
});
  
}
function loadData(e) {
try {
$("#main_content").html("Registration successful!. Your login id number is "+ e+ ". You can now <a href='/digirx'>login</a> and start using the app with this id and the password that you\'ve set.");
} catch(err){
$("#main_content").html(err);
  }
}
function otherSignedInStuff(googleUser){
//var profile = googleUser.getBasicProfile();
//$('#userMail').text(profile.getEmail());
//M.toast({html: 'Hi '+profile.getName()});
}
</script>
