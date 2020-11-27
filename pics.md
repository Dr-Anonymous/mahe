---
layout: default
---
<div id="pics" class="row"></div>
<div class="flow-text center" id="load"></div>
<!--spinner start-->
<center><div id="spin" class="preloader-wrapper active">
<div class="spinner-layer">
<div class="circle-clipper left">
<div class="circle"></div>
</div><div class="gap-patch">
<div class="circle"></div>
</div><div class="circle-clipper right">
<div class="circle"></div>
</div>
</div>
</div></center>
<!--spinner end-->
  
<script>
document.title = 'Shalima-Manoj | Pics';
$('#project_title').text('Pic gallery');
$('#project_tagline').text('Shalima-Manoj');
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
$('#spin').show();
$('#pics').html(' ');
history.pushState({urlPath:'./?'+ albumId}, "", './?'+ albumId);
myFunction();
}

$(document).ready(function() {
    $(window).on("popstate", function (e) {
    	$('#load').hide();
	$('#spin').show();
    	$('#pics').html(' ');
    	albumId = urlParam();
        myFunction();
	$('#project_tagline').text('Albums');
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
$('#spin').hide();
if (pageToken != ''){
$('#load').html('<a href="#" onclick="loadMore(\''+ pageToken +'\'); return false;">Load more ...</a>');
$('#load').show();
} else
$('#load').hide();

if (albumId == 'albums'){
e = e["albums"];
for (var i=0; i< e.length; i++){
	$('#pics').append("<div class='col s4'><a href='#' onclick=\"changeDest('"+e[i]["id"]+"'); $('#project_tagline').text('"+e[i]["title"]+"'); return false;\"><img src='"+e[i]["coverPhotoBaseUrl"]+"'><p>"+e[i]["title"]+"</p></a></div>");
	}
}else{
e = e["mediaItems"];
for (var i=0; i< e.length; i++){
	var link = e[i]["baseUrl"],
	    dimen= e[i]["mediaMetadata"];
	$('#pics').append("<div class='col s4 modal-trigger'><a href='"+link+"=w"+ dimen["width"]+"-h"+ dimen["height"]+"' target='_blank'><img src='"+link+"'></a></div>");
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
