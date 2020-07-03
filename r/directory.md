---
layout: default
---

## Loading URL directory....


<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script>
 var url = "https://script.google.com/macros/s/AKfycbwQt4QiNTg8RjaAVd4KHZ_yClTbzgrvF34FZIIgEmIb8yGSHn8/exec?callback=loadData&id=1ZrGx_JUs8avZ3yT5nRf1eDI7pUl1PiP2Xrrlc0IGyuw&sheet=Sheet1&num=1";
// Make an AJAX call to Google Script
var request = jQuery.ajax({
      crossDomain: true,
      url: url,
      method: "GET",
      dataType: "jsonp"
    });
	
 // print the returned data from jsonp
  function loadData(e) {
  //console.log(e);
  try {
  	$("#main_content").html("<table><tr><th>ShortURL</th><th>Description</th><th>Full URL</th></tr><tr>")
         for (var i = 0; i < e.length; i++) {
		$("#main_content").append("<td>"+ e[i]+"</td>");
	 }
	      $("#main_content").append("</tr></table>");
	}catch(err) {
        //$("#main_content").html("No such redirect present");
	}
}
  </script>
