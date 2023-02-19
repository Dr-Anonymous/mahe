---
layout: default
title: Registration form
description: New patients registration
---


<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script>
	function submitForm(name, age, sex, phone) {
	 if (name == '') return;
	$("#form").html("Registering your details. Please wait..");
	var url = "https://script.google.com/macros/s/AKfycbx6DvxdJKNKfLoiKHKZbfoivK8SXk7XxAegpuGUQoIwdgF2inmxugsBS3FlAL9_-HNp/exec";
	if(urlParam == '2') url = "https://script.google.com/macros/s/AKfycbz9H2p6DFWNCTJKMDtxznPkWthSqyshB4vN4yHnoFTIYWPcYgWdJh9jkA5gP8IlrPSl/exec";
	
	url += "?name="+name+"&age="+age+"&sex="+sex+"&phone="+phone;
	
	$.get(url, function( e ) {
	$("#form").html("<p>Click <a href=\"upi://pay?pa=drsamuel@upi&amp;pn=CHERUKURI SAMUEL MANOJ&amp;cu=INR&amp;am=300.00\">this link</a> on a mobile device to complete payment via UPI.</p><p>You can view your prescriptions from now at- <a href='"+ e +"'>"+e+"</a></p>");
	});
	}
	
	function urlParam(){
	var url = new URL(window.location.href);
	var param = url.searchParams.toString().slice(0, -1);
	return param;
	}
</script>
<form id="form">
	<p>New patients: Please enter your basic details below to register yourself and view your prescriptions online.</p>
	<br>
	Name:<br>
	<input type="text" id="name" name="name" style="width: -webkit-fill-available;height: 2em;">
	<br>
	Age:<br>
	<input type="number" id="age" name="age" placeholder="Your age as a number" style="width: -webkit-fill-available;height: 2em;" required>
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
	<center><button onclick="submitForm($('#name').val(), $('#age').val(), $('#sex').val(),$('#phone').val()); return false;" style="border-radius: 6px;width: 50%;height: 2em;">Register</button></center>
</form>
