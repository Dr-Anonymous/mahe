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
      <input id="id" type="text" style="display: none;" readonly>
      <label for="id">id</label>
    </div>
    <div class="input-field col s6">
      <input id="name" type="text">
      <label for="name">Name</label>
    </div>
    <div class="input-field col s6">
      <input id="degree" type="text">
      <label for="degree">Degree</label>
    </div>
    <div class="input-field col s6">
      <input id="regNo" type="text">
      <label for="regNo">Registration No.</label>
    </div>
    <div class="file-field input-field col s6 hide">
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
var id, pass;
window.onload = (event) => {
//====see if editing or new user
if (urlParam() != "edit")
   return;
//=============existing user stuff
id = getCookie("id");
pass = getCookie("pass");
if (id != "" && id != null && pass != "" && pass != null) {
    getData(id, pass);
    } else {
      //id and password prompt
      id = prompt("Please enter your id:","");
      pass = prompt("Please enter your password:","");
      if (id != "" && id != null && pass != "" && pass != null){
        getData(id, pass);
        }else{
          M.toast({html: 'Enter valid id and password.'});
        }
    }
};
function getCookie(cname) {
var name = cname + "=";
var ca = document.cookie.split(';');
for(var i = 0; i < ca.length; i++) {
  var c = ca[i];
  while (c.charAt(0) == ' ') {
    c = c.substring(1);
  }
  if (c.indexOf(name) == 0) {
    return c.substring(name.length, c.length);
  }
}
return "";
}
function getData(id, pass) {
var url = "https://script.google.com/macros/s/AKfycbwfHSn8ysX_yhbNIx_FHtqwJhH1pqML_0fZ9QV65gjSbOOw2Wo/exec?callback=loadData1&id="+ id +"&pass="+ pass;
$.ajax({
  crossDomain: true,
  url: url,
  method: "GET",
  dataType: "jsonp"
});
function loadData1(e) {
try {
     $('#id').val(id);
     $('#name').val(e[1]);
     $('#institute').val(e[0]);
     $('#degree').val(e[2]);
     $('#regNo').val(e[3]);
     $('#post').val(e[4]);
     $('#phone').val(e[7]);
     $('#mail').val(e[6]);
     $('#address').val(e[5]);     
    }catch(err){
    $("#main_content").html(err + "\nContact admin for support.")
  }
}
                             
//=========new user stuff
function update(){
if ($('#name').val() == ''){
  M.toast({html: 'Name can\'t be empty.'});
  return;
  }

if ($('#password').val() != $('#rptPassword').val()){
  M.toast({html: 'Passwords not matching. Re-enter passwords.'});
  return;
  }
if ($('#password').val() == ''){
  M.toast({html: 'Password can\'t be empty.'});
  return;
  }
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
$("#main_content").html("Processing....Please wait.")
}
function loadData(e) {
try {
$("#main_content").html("<p>Registration successful!.\nYour login id number is:<h4>"+ e+ "</h4>You can now <a href='/digirx'>login</a> and start using the app with this id and the password that you\'ve set.</p>");
} catch(err){
$("#main_content").html(err);
  }
}
function otherSignedInStuff(googleUser){
}
function urlParam(){
var url = new URL(window.location.href);
var param = url.searchParams.toString().slice(0, -1);
return param;
}
</script>
