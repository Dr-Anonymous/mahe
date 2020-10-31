---
layout: default
---
<div id="folders" class="flip-grid-view">Loading.....</div>
<div><button onclick="javascript:window.history.back();">Go Back</button></div>
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
$('#hiddenDiv').html(e);
$('.inner').css('max-width', '');
$('#folders').html($('.flip-entries').html()).css('height','max-content');

}

//get url parameters
function urlPara(p){
var url_string = window.location.href;
var url = new URL(url_string);
return url.searchParams.get(p);
}
</script>
<div id="hiddenDiv" class="hide"></div>
