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
document.title = 'Pic gallery';
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

$(window).scroll(function() {
var end = $("#load").offset().top
    viewEnd = $(window).scrollTop() + $(window).height(),
    distance = end - viewEnd;
if (distance < 300) {
   $('#load a').click();
   //$(window).scrollTop($(window).scrollTop()-1);
}
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

if (albumId == 'albums'){ // these are albums
e = e["albums"];
for (var i=0; i< e.length; i++){ //individual albums
	$('#pics').append("<div class='col s4'><a href='#' onclick=\"changeDest('"+e[i]["id"]+"'); $('#project_tagline').text('"+e[i]["title"]+"'); return false;\"><img src='"+e[i]["coverPhotoBaseUrl"]+"'><p class='flow-text'>"+e[i]["title"]+"</p></a></div>");
	}
}else{ // these are files
e = e["mediaItems"];
for (var i=0; i< e.length; i++){ //individual file
	var link = e[i]["baseUrl"],
	    dimen = e[i]["mediaMetadata"]
	    mimeType = e[i]["mimeType"];
	    
	if (mimeType.includes("video"))
	$('#pics').append("<div class='col s4'><video class='responsive-video' width='"+ dimen["width"] +"' height='"+ dimen["height"] +"' poster='"+link+"' preload='none' controls onclick='play();'><source src='"+link+"=dv' type='"+mimeType+"'></video><p class='flow-text truncate' style='max-width:"+screen.width *80/100+"px;width:"+ dimen["width"] +"px'>"+ e[i]["filename"] +"</p></div>");
	else
	$('#pics').append("<div class='col s4'><a href='"+link+"=w"+ dimen["width"]+"-h"+ dimen["height"]+"' target='_blank'><img src='"+link+"'></a></div>");
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
