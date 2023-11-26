---
layout: default
title: Registration form
description: New patients registration
---


<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script>
	var url;
	var param = (new URL(window.location.href)).searchParams.toString().slice(0, -1);
	if(param == '2') url = "https://script.google.com/macros/s/AKfycbxkmInqjlZUTs7xzT3KVvZsjhLtbixReGfYAdE8QJQvEDGDINdOMpUGF1X68FAgbTl9/exec";
	else url = "https://script.google.com/macros/s/AKfycbzV9rjnYr7Np532MsI4KRgzqWNbBDgXHep2ADhilHP9Z44AE7neBz8C2W-YYAn0JSoF/exec";
	
	
	
	function submitForm(name, dob, sex, phone) {
	 if (name == '') return;
	$("#form").html("Registering your details. Please wait..");
	
	url += "?name="+name+"&dob="+dob+"&sex="+sex+"&phone="+phone;
	
	$.get(url, function(e) {
	$("#form").html("<p>Click <a href=\"upi://pay?pa=drshalima@upi&amp;pn=SHALIMA PINNAMANENI&amp;cu=INR&amp;am=300\">this link</a> on a mobile device to complete payment via UPI.</p><p>You can view your prescriptions from now at- <a href='"+ e +"'>"+e+"</a></p>");
	});
	}
	
</script>
<form id="form">
	<p>New patients: Please enter your basic details below to register yourself and view your prescriptions online.</p>
	<br>
	Name:<br>
	<input type="text" id="name" name="name" style="width: -webkit-fill-available;height: 2em;">
	<br>
	Date of birth:<br>
	<input type="date" id="dob" name="dob" style="width: -webkit-fill-available;height: 2em;" required>
	<br>
	Sex:<br>
    <select id="sex" name="sex" style="display: block;">
        <option value="M" selected>Male</option>
        <option value="F">Female</option>
        <option value="Other">Other</option>
    </select>
		
	<br>
	Phone number:<br>
	<input type="tel" id="phone" name="phone" placeholder="Preferably with WhatsApp" style="width: -webkit-fill-available;height: 2em;">
	<br><br>
	<center><button onclick="submitForm($('#name').val(), $('#dob').val(), $('#sex').val(),$('#phone').val()); return false;" style="border-radius: 6px;width: 50%;height: 2em;">Register</button></center>
</form>
