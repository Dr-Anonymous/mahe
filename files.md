---
layout: default
---
<link href="https://drive.google.com/static/doclist/client/css/4152783537-folderlandingpage.css" rel="stylesheet">
<h5></h5><br><br>
<div id="folders" class="row">Loading.....</div>

<script>
changeDest(urlParam());

function changeDest(id) {
$('#folders').html("Loading...");

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
hiddenDiv.html(e.result1);
$('#main_content').css('max-width','100%');
$('#folders')
//.html($('.flip-list-header', hiddenDiv))
.html($('.flip-entry', hiddenDiv));
$('.flip-entry').addClass("col s6 m3 l2");
$('.flip-entry-list-icon').addClass('hide');
$('h5').html(e.result2);
}

function urlParam(){
var url = new URL(window.location.href);
var param = url.searchParams.toString().slice(0, -1);
if (!param)
param = "1MGTIataD9rRTVA7qBUZC8Im4Sq99NCri";
return param;
}
</script>
