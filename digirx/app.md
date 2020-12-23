---
layout: default
title: digi&#8478;
description: Digital health records
---

{% include_relative form.html %}
<script>
window.onload = (event) => {
  //======cookie start
var id = getCookie("id");
var pass = getCookie("pass");
if (id != "" && id != null && pass != "" && pass != null) {
getData(id, pass); 
} else {
  //id and password prompt
  id = prompt("Please enter your id:","");
  pass = prompt("Please enter your password:","");
  
  if (id != "" && id != null && pass != "" && pass != null){
    setCookie("id", id, 30);
    setCookie("pass", pass, 30);
    getData(id, pass);
    }else{
      M.toast({html: 'Enter valid id and password.'});
    }
}
};

function setCookie(cname, cvalue, exdays) {
var d = new Date();
d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
var expires = "expires="+d.toUTCString();
document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

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
//===cookie end

function getData(id, pass) {
var url = "https://script.google.com/macros/s/AKfycbwfHSn8ysX_yhbNIx_FHtqwJhH1pqML_0fZ9QV65gjSbOOw2Wo/exec?callback=loadData&id="+ id +"&pass="+ pass;
$.ajax({
  crossDomain: true,
  url: url,
  method: "GET",
  dataType: "jsonp"
});

}
function otherSignedInStuff(googleUser){
//var profile = googleUser.getBasicProfile();
//$('#userMail').text(profile.getEmail());
//M.toast({html: 'Hi '+profile.getName()});
}

function loadData(e) {
if (e == "Password Wrong")
  $("#main_content").html("User id/ password mismatch. Contact support if problem persisting.");

try {
  //==================header
  //institiute
  doc.setTextColor(c0);
  doc.setFont("times", "bold");
  doc.setFontSize(f4);
  doc.text(e[0], 203, 15, null, null, "right");
  doc.setFont("times", "normal");
  //consultant
  doc.setFontSize(f3);
  doc.text(e[1],203, 25, null, null, "right");
  //degree
  doc.setFontSize(f0);
  doc.text(e[2], 203, 30, null, null, "right");
  //post
  doc.setFontSize(f2);
  doc.text(e[4], 203, 35, null, null, "right");
  //address
  doc.setFontSize(f0);
  doc.text(e[5]+"\n"+e[6]+", "+ e[7], 203, 42, null, null, "right");
  //===============footer
  var signImg = e[8];
  if (signImg != '')
    doc.addImage(signImg, 170, 259, 35, 17);
  doc.setFont("times", "normal");
  doc.text(e[1],203, 285, null, null, "right");
  doc.setFontSize(f0-3);
  doc.text(e[3].toString(), 203, 290, null, null, "right");
  
  $('#doctorDetails').html('<h5>Welcome back '+e[1]+'.</h5>'+'\n'+e[2]+'-'+e[3]+'\n'+e[4]+'-'+e[0]+'\n'+e[5]+'\n'+e[6]+'-'+e[7]);
  $('form').show();
}catch(err){
  $("#main_content").html(err);
}
}
</script>
