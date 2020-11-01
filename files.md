---
layout: default
---
<link href="//fonts.googleapis.com/css?family=Open+Sans:300,400,600,700&amp;lang=en" rel="stylesheet">
<link href="https://drive.google.com/static/doclist/client/css/4152783537-folderlandingpage.css" rel="stylesheet">

<div id="folders" class="row">Loading.....</div>
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
var hiddenDiv = $( '<div></div>' );
hiddenDiv.html(e);
$('#folders')
//.html($('.flip-list-header', hiddenDiv))
.html($('.flip-entry', hiddenDiv));
$('.flip-entry').addClass("col s3");
$('.flip-entry-list-icon').addClass('hide');
}

//get url parameters
function urlPara(p){
var url_string = window.location.href;
var url = new URL(url_string);
return url.searchParams.get(p);
}
</script>
