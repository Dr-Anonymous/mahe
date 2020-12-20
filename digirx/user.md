---
layout: default
title: digi&#8478;
description: Digital health records
---
{% include_relative form.html %}
<script>
var id = prompt("Please enter your id:","");
if (id != "" || id != null){
 var pass = prompt("Please enter your password:","");
}
if (pass != "" || pass != null){
 var url = "https://script.google.com/macros/s/AKfycbwfHSn8ysX_yhbNIx_FHtqwJhH1pqML_0fZ9QV65gjSbOOw2Wo/exec?callback=loadData&id="+ id +"&pass="+ pass;
// Make an AJAX call to Google Script
jQuery.ajax({
crossDomain: true,
url: url,
method: "GET",
dataType: "jsonp"
});
}
function otherSignedInStuff(googleUser){
var profile = googleUser.getBasicProfile();
//$('#userMail').text(profile.getEmail());
 M.toast({html: 'Hi '+profile.getName()});
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
doc.setFont("times", "normal");
doc.text(e[1],203, 285, null, null, "right");
doc.setFontSize(f0-3);
doc.text(e[3],203, 290, null, null, "right");

$('form').show();
}catch(err){
$("#main_content").html(err);
 }
}
</script>
