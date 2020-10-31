---
layout: default
---
<link href="//fonts.googleapis.com/css?family=Open+Sans:300,400,600,700&amp;lang=en" rel="stylesheet">
<link href="https://drive.google.com/static/doclist/client/css/4152783537-folderlandingpage.css" rel="stylesheet">

<div id="folders">Loading.....</div>
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
$('.inner').css('max-width', '100%');
var hiddenDiv = $( '<div></div>' );
hiddenDiv.html(e);
$('#folders').html($('.flip-entry', hiddenDiv));
}

//get url parameters
function urlPara(p){
var url_string = window.location.href;
var url = new URL(url_string);
return url.searchParams.get(p);
}
</script>
