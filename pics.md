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
$('#project_tagline').text('Pic gallery');
$('#main_content').css("max-width", "100%");
	
var albumId = urlParam(),
    pageToken = '';
    
if (!albumId){
    albumId = "AH7cjMvUZu6qi79NHsKZxKJMMA6ik4RfOIKBIP-0XyxUOs3fwu05sfaYz1cDx4IK6Oc7dFuW250z";
    myFunction();
    history.replaceState({urlPath:'./?'+ albumId}, "", './?'+ albumId);
    }else{
    changeDest(albumId);
    }
    
function changeDest(id) {
albumId = id;
$('#pics').html('Loading ...');
history.pushState({urlPath:'./?'+ albumId}, "", './?'+ albumId);
myFunction();
}

$(document).ready(function() {
    $(window).on("popstate", function (e) {
    	$('#pics').html('Loading ...');
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
if (pageToken != ''){
$('#load').html('<a href="#" onclick="loadMore(\''+ pageToken +'\'); return false;">Load more ...</a>');
$('#load').show();
} else
$('#load').hide();

$('#spin').hide();

if (albumId == 'albums'){
e = e["albums"];
for (var i=0; i< e.length; i++){
	$('#pics').append("<a href='#' onclick=\"changeDest('"+e[i]["id"]+"'); return false;\"><div class='col s4 card'><img src='"+e[i]["coverPhotoBaseUrl"]+"'><p>"+e[i]["title"]+"</p></div></a>");
	}
}else{
e = e["mediaItems"];
for (var i=0; i< e.length; i++){
	$('#pics').append("<div class='col s4 card'><img src='"+e[i]["baseUrl"]+"'></div>");
	}
}

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
