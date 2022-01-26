---
layout: iframe
title: 
description: Appointment booking
---

<p></p>

<iframe id= 'myFrame' src="" frameborder="0" allowfullscreen></iframe>

<script>
var docId = urlParam() || "1";

if (docId == "2"){
$(document).attr("title", "Dr Shalima Pinnamaneni");
$('#project_title').text("Dr Shalima Pinnamaneni")
$('p').html("Book appointment with <a href='https://orthosam.com/shalima/#about'>Dr Shalima Pinnamaneni</a> <small>M.D General Medicine</small>:");
$('#myframe').attr('src', 'https://script.google.com/macros/s/AKfycbyMMJOGZNtesLnpNdk-N7DGV48Ql2qDl9mAEV8sJI1m9qwZANxJpSCrK99B4bEes8_a/exec');
} else {
$(document).attr("title", "Dr Samuel Manoj");
$('p').html("Book appointment with <a href='https://orthosam.com/samuel/#about'>Dr Samuel Manoj Ch</a> <small>M.S Orthopaedics(Manipal)</small>:");
$('#myFrame').attr('src','https://script.google.com/macros/s/AKfycbyEaM8kjMT4xesnHlfbeLGc1m4T-ZlB34pD_E1NaOhku0OGc5Aiomxb_HPsKS19a1Y7jg/exec');
}
function urlParam(){
var url = new URL(window.location.href);
var param = url.searchParams.toString().slice(0, -1);
return param;
}

function otherSignedInStuff(googleUser){}

</script>
