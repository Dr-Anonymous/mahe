---
layout: null
---
<script type="text/javascript" src="/assets/js/jquery-3.2.1.min.js"></script>
<body onload="callGoogleScript();">
function callGoogleScript() {
	  var id= value;
    if (!id)
    id="1k0cFPCH61QX9NgBXVUhXOo6cko454HMi";
	
    var url = "https://script.google.com/macros/s/AKfycbwQt4QiNTg8RjaAVd4KHZ_yClTbzgrvF34FZIIgEmIb8yGSHn8/exec?callback=loadData";
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
        console.log(e);
        }
  </script>
  </body>
