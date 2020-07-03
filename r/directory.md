---
layout: default
---

# URL directory

Loading....
<script>
 var url = "https://script.google.com/macros/s/AKfycbwQt4QiNTg8RjaAVd4KHZ_yClTbzgrvF34FZIIgEmIb8yGSHn8/exec?callback=loadData&id=1ZrGx_JUs8avZ3yT5nRf1eDI7pUl1PiP2Xrrlc0IGyuw&sheet=Sheet1&num=1";
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
  //console.log(e);
  try {
         for (var i = 1; i < e.length; i++) {
     $("#main_content").html("<p>"+ e[i]+"</p><br><p>"+ e[2] +"</p>");
	 }
	}catch(err) {
        //$("#main_content").html("No such redirect present");
	}
  </script>
