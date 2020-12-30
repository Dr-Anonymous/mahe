---
layout: default
title: digi&#8478;
description: e-prescription app
---
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.1.1/jspdf.umd.min.js"></script>

<p>digi&#8478; (pronounced digirex) is an app for generating e-prescriptions. Register for <i>free</i> to start using it today and go digital. Enjoy easy record keeping, transmission, teleconsultation and auditing in your health practice.</p>
<p>
    <a href="./digiRx.pdf" class="waves-effect waves-light btn" download><i class="material-icons left">file_download</i>View sample</a>
    <a href="./demo" class="waves-effect waves-light btn"><i class="material-icons left">view_list</i>Demo</a>
    <a href="./user" class="waves-effect waves-light btn"><i class="material-icons left">border_color</i>Register</a>
    <a href="./app" class="waves-effect waves-light btn"><i class="material-icons left">contacts</i>Login</a>
</p>

<script>
var name = "pass=";
var ca = document.cookie.split(';');
for(var i = 0; i < ca.length; i++) {
  var c = ca[i];
  while (c.charAt(0) == ' ') {
    c = c.substring(1);
  }
  if (c.indexOf(name) == 0) {
    window.location.href = "./app" ;
  }
}    
function otherSignedInStuff(){}
</script>
