<script type="text/javascript" src="sendSMS.js"></script>

---
layout: default
---
<div id= "form">
  Phone number: <textarea id="phone"></textarea>
  Message: <textarea type="text" id="say"></textarea>
<br><br>
<button onclick="myFunction(document.getElementById('phone').value,document.getElementById('say').value)">Send</button>
</div>
<p id="demo"></p>
