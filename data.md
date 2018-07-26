---
layout: null
---
<body onload="callGoogleScript();">
<script>
function callGoogleScript() {
	  
    var url = "https://script.google.com/macros/s/AKfycbwQt4QiNTg8RjaAVd4KHZ_yClTbzgrvF34FZIIgEmIb8yGSHn8/exec?callback=loadData&id=1vsGEAbtDMvbURAUq-pio2O2oYaX-i76hjOPYNX4KwMk&sheet=Sheet1";
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
<script type="text/javascript" src="/assets/js/jquery-3.2.1.min.js"></script>

</body>
