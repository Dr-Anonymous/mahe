---
layout: default
---

## Hi there

<script>
 myFunct();
function myFunct(){
var url = "https://script.google.com/macros/s/AKfycbxTzetvK_cfyhveGnXhafHlLrIc25smJrpvCdEFNUaCxgkPACeR/exec?callback=loadData";
// Make an AJAX call to Google Script
jQuery.ajax({
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
