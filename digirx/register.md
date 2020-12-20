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
    <div class="input-field col s6">
      <input id="sign" type="file">
      <label for="sign">Upload signature</label>
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
  <a class="waves-effect waves-light btn" onclick="update();"><i class="material-icons left">save</i>Save</a>
</form>
</div>
<script>
function update(){
var data = JSON.stringify({
  name: $('#name').val(),
  institute: $('#institute').val(),
  degree: $('#degree').val(),
  regNo: $('#regNo').val(),
  post: $('#post').val(),
  phone: $('#phone').val(),
  mail: $('#mail').val(),
  address: $('#address').val()  
  });
console.log(data);
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
