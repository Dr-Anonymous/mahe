---
layout: iframe
title: Dr Samuel Manoj
description: Appointment booking
---

<p></p>

<iframe src="https://script.google.com/macros/s/AKfycbxFp-8PpdD4dQguUj_uYDhaYtqWyqtXpiFmlOEM2b2kh2HOh0uL/exec" frameborder="0" allowfullscreen></iframe>

<script>
var docId = urlParam() || "1";

if (docId == "2"){
$('p').html("Book appointment with <a href='https://orthosam.com/shalima/#about'>Dr Shalima Pinnamaneni</a> <small>M.D General Medicine</small>:");
} else {
$('p').html("Book appointment with <a href='https://orthosam.com/samuel/#about'>Dr Samuel Manoj Ch</a> <small>M.S Orthopaedics(Manipal)</small>:");
}
function urlParam(){
var url = new URL(window.location.href);
var param = url.searchParams.toString().slice(0, -1);
return param;
}

function otherSignedInStuff(googleUser){}

</script>
