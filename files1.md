---
layout: default
---
<div id="folders"></div>
<script>
    //var id= urlPara("id");
    //if (!id)
    //id="1MGTIataD9rRTVA7qBUZC8Im4Sq99NCri"; 
    
    changeDest(id);
     // Make an AJAX call to Google Script
  function changeDest(id) {
  
    var url = "https://script.google.com/macros/s/AKfycbxBlqDMbMUTyWQvWuxznbaXlZiMzVGNMHY7Vdl_lg2R17XdittE/exec?callback=loadData&id=" ;

var request = jQuery.ajax({
      crossDomain: true,
      url: url,
      method: "GET",
      dataType: "jsonp"
    });

  }
  // print the returned data
  function loadData(e) {
  var div = document.getElementById('folders');
       div.innerHTML = e.result1;
             if (e.result2)
             console.log(e.result2);
  }
  
 //get url parameters
 function urlPara(p){
 var url_string = window.location.href;
var url = new URL(url_string);
return url.searchParams.get(p);
}
</script>
