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
$('#project_title').text("Dr Shalima Pinnamaneni");
$('p').html("Book appointment with <a href='https://orthosam.com/shalima/#about'>Dr Shalima Pinnamaneni</a> <small>M.D General Medicine</small> :");
$('#myFrame').attr('src', 'https://script.google.com/macros/s/AKfycbwIyXk_Rtjg5YRh1j-1DjJ-in2rjhcAy0S6exkl6QkGoYdnx6PJTe_P56ot7HLkpXTV/exec');
} else {
$(document).attr("title", "Dr Samuel Manoj");
$('#project_title').text("Dr Samuel Manoj Ch");
$('p').html("Book appointment with <a href='https://orthosam.com/samuel/#about'>Dr Samuel Manoj Ch</a> <small>M.S Orthopaedics(Manipal)</small> :");
$('#myFrame').attr('src','https://script.google.com/macros/s/AKfycbxa77lia7YF2H8JH418aXILKDAgEu8mKDmHWatvDgSU/exec');
}
function urlParam(){
var url = new URL(window.location.href);
var param = url.searchParams.toString().slice(0, -1);
return param;
}

function otherSignedInStuff(googleUser){}

</script>
