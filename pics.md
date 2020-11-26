---
layout: default
---
<div id="pics" class="row"></div>
<h4><div id="load">Loading....</div></h4>

<div id="spin" class="preloader-wrapper active" style="display: none;">
<div class="spinner-layer">
<div class="circle-clipper left">
<div class="circle"></div>
</div><div class="gap-patch">
<div class="circle"></div>
</div><div class="circle-clipper right">
<div class="circle"></div>
</div>
</div>
</div>
  
<script>
document.title = 'Shalima-Manoj | Pics';
$('#project_title').text('Shalima-Manoj');
$('#project_tagline').text('Engagement pics');
$('#main_content').css("max-width", "100%");
	
var albumId = urlParam(), //"AH7cjMsGYSbDnBJRC5um4ySfxu1-ya_-2vAlE7_muJ4sAywsOo9XG70bGW0QANwz_NTJBOQsEHiq",
    pageToken = '';
    
if (!albumId){
    albumId = "AH7cjMvUZu6qi79NHsKZxKJMMA6ik4RfOIKBIP-0XyxUOs3fwu05sfaYz1cDx4IK6Oc7dFuW250z";
    myFunction();
    history.replaceState({urlPath:'./?'+ albumId}, "", './?'+ albumId);
    }else{
    changeDest(albumId);
    }
    
function changeDest(albumId) {
history.pushState({urlPath:'./?'+ albumId}, "", './?'+ albumId);
myFunction();
}

$(document).ready(function() {
    $(window).on("popstate", function (e) {
    	albumId = urlParam();
        myFunction();
    });
});
function myFunction(t){
pageToken = t || ''; 
var url = "https://script.google.com/macros/s/AKfycbxTzetvK_cfyhveGnXhafHlLrIc25smJrpvCdEFNUaCxgkPACeR/exec?callback=loadData&albumId="+albumId+"&pageToken="+pageToken;
jQuery.ajax({
crossDomain: true,
url: url,
method: "GET",
dataType: "jsonp"
});
}

function loadData(e) {
pageToken = e["nextPageToken"] || '';
e = e["mediaItems"];
//console.log(e);

for (var i=0; i< e.length; i++){
	$('#pics').append("<div class='col s4 card'><img src='"+e[i]["baseUrl"]+"'></div>");
	}
if (pageToken != ''){
$('#load').html('<a href="#" onclick="loadMore(\''+ pageToken +'\'); return false;">Load more ...</a>');
$('#load').show();
}
$('#spin').hide();
}
function loadMore(pageToken){
$('#load').hide();
$('#spin').show();
myFunction(pageToken);
}
function urlParam(){
var url = new URL(window.location.href);
var param = url.searchParams.toString().slice(0, -1);
return param;
}

/*
$(document).ready(function() {
	$(this).on("contextmenu", function(e) {
	e.preventDefault();
	});
});*/
</script>
