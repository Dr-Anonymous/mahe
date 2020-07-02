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
	   $("#form").html("<h2>your url is <a style='color:#b5e853;' href='https://r.orthosam.com/"+ e+"'>r.orthosam.com/"+ e+"</a></h2><p>Shorten another url ? Reloads are free !</p>");
	}catch(err) {
        $("#form head").html(err);
	}
}
</script>

<form>
  URL description (this is to easily identify it):<br>
  <input type="text" id="description" name="description" placeholder="samuel thesis file" style="width: -webkit-fill-available;height: 2em;">
  <br>
  URL or link to the page:<br>
  <input type="text" id="url" name="url" placeholder="https://docs.google.com/forms/d/e/sdf" style="width: -webkit-fill-available;height: 2em;" required>
  <br><br>
	<center><button onclick="submitForm($('#description').val(), $('#url').val()); return false;" style="border-radius: 6px;width: 50%;height: 2em;">Get my url !</button></center>
</form>
<p>View all redirects at <a href="https://docs.google.com/spreadsheets/d/1ZrGx_JUs8avZ3yT5nRf1eDI7pUl1PiP2Xrrlc0IGyuw/">url directory</a></p>
