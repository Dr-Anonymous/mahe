---
layout: default
---
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

<script>
  function submitForm(des, url) {
	  if (url=='')
		  return;
	  else if (url.substring(0, 4)!="http")
		  url= "http://"+ url;
$("#form").html("Fetching your url....");
	var url = "https://script.google.com/macros/s/AKfycbxvQfiUw8ZUu1gG60fwyqV3x1vZ6k7NC-JuwrnO3UTsjUMPAT0/exec?callback=loadData&sheet=Sheet1&des="+des+"&url="+ url ;
// Make an AJAX call to Google Script
var request = jQuery.ajax({
      crossDomain: true,
      url: url,
      method: "GET",
      dataType: "jsonp"
    });
  }
 
 // print the returned data from jsonp
  function loadData(e) {
  try {
	   $("#form").html("<p>Your url is <a href='/"+ e+"'>https://orthosam.com/"+ e+"</a></p><p>Shorten another url ? Reloads are free !</p>");
	}catch(err) {
        $("#form").html(err);
	}
}
</script>
<p>This free URLshortner creates short, easy to remember redirets for your online files/folders.</p>
<form id="form">
  Description (to easily identify it later):<br>
  <input type="text" id="description" name="description" placeholder="Eg: My thesis file" style="width: -webkit-fill-available;height: 2em;">
  <br>
  URL (web address of the page):<br>
  <input type="text" id="url" name="url" placeholder="Eg: https://docs.google.com/forms/d/e/sdf" style="width: -webkit-fill-available;height: 2em;" required>
  <br><br>
	<center><button onclick="submitForm($('#description').val(), $('#url').val()); return false;" style="border-radius: 6px;width: 50%;height: 2em;">Shorten this url !</button></center>
</form>
<p>View all redirects at <a href="./directory">url directory</a></p>
