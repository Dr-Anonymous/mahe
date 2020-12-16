---
layout: default
title: digi&#8478;
description: Digital health records
---
{% include_relative form.html %}
<script>
var pass;
function otherSignedInStuff(googleUser){
$('form').show();
var profile = googleUser.getBasicProfile();
//$('#userMail').text(profile.getEmail());
 M.toast({html: 'Hi '+profile.getName()});
pass = "auto";
var url = "https://script.google.com/macros/s/AKfycbwfHSn8ysX_yhbNIx_FHtqwJhH1pqML_0fZ9QV65gjSbOOw2Wo/exec?callback=loadData&id=1&pass="+pass;
// Make an AJAX call to Google Script
jQuery.ajax({
crossDomain: true,
url: url,
method: "GET",
dataType: "jsonp"
});

}

function loadData(e) {
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
}catch(err){
$("#main_content").html("No such doctor in database");
 }
}
</script>
