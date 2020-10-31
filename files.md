---
layout: default
---

<div id="folders"></div>
<script>
    var id= urlPara("id");
    if (!id)
    id="1MGTIataD9rRTVA7qBUZC8Im4Sq99NCri"; 
    changeDest(id);
    
  function changeDest(id) {
    var url = "https://script.google.com/macros/s/AKfycbxBlqDMbMUTyWQvWuxznbaXlZiMzVGNMHY7Vdl_lg2R17XdittE/exec?callback=loadData&id=" ;

var request = jQuery.ajax({
      crossDomain: true,
      url: url+id,
      method: "GET",
      dataType: "jsonp"
    });

  }
  // print the returned data
  function loadData(e) {
  document.getElementById('folders').innerHTML = e;
  }
  
 //get url parameters
 function urlPara(p){
 var url_string = window.location.href;
var url = new URL(url_string);
return url.searchParams.get(p);
}
</script>
<button onclick="javascript:window.history.back();">Go Back</button>
