---
layout: null
---
<!DOCTYPE html>
<html>
  <head>
    <base target="_blank">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>File Upload to orthosam.com</title>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    
    <link rel="stylesheet" type="text/css" media="screen" href="https://orthosam.com/assets/css/style.css?v=8a0f980d6dd986cbd3750ccbd33ed0fda668c89f">
    <link rel="stylesheet" type="text/css" href="https://orthosam.com/assets/css/materialize.min.css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

  </head>
  
  <body>

    <!-- HEADER -->
    <div id="header_wrap" class="outer">
        <header class="inner">
          <h1 id="project_title"><div class="row">Upload to orthosam.com</h1>
        </header>
    </div>

        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>        
        <script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>
        <script>

            $(document).ready(function () {

                function afterSubfolderCreated(subfolderId) {
                    console.log(subfolderId);
                    console.log(allFiles);
                    numUploads.total = allFiles.length;
                    $('#progressbar').progressbar({
                        value: false
                    });
                    $(".progress-label").html('Preparing files for upload');
                    for (var i = 0; i < allFiles.length; i++) {
                        console.log(i);
                        sendFileToDrive(allFiles[i], subfolderId);
                    }
                }

                function sendFileToDrive(file, subfolderId) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        var content = reader.result;
                        console.log('Sending ' + file.name);
                        google.script.run.withSuccessHandler(updateProgressbar).uploadFileToDrive(content, file.name, subfolderId);
                    }
                    reader.readAsDataURL(file);
                }

                function updateProgressbar(idUpdate) {
                    console.log('Received: ' + idUpdate);
                    numUploads.done++;
                    var porc = Math.ceil((numUploads.done / numUploads.total) * 100);
                    $("#progressbar").progressbar({value: porc});
                    $(".progress-label").text(numUploads.done + '/' + numUploads.total);
                    if (numUploads.done == numUploads.total) {                        
                        numUploads.done = 0;
                        $(".progress-label").text($(".progress-label").text() + ': FINISHED!');
                        $("#progressbar").after('Files uploaded successfully !');
                    }
                }

                function fileUploaded(status) {
                    document.getElementById('myForm').style.display = 'none';
                    document.getElementById('output').innerHTML = status;
                }
                var numUploads = {};
                numUploads.done = 0;
                numUploads.total = 0;
                var allFiles;
                var frm = $('#myForm');
                frm.submit(function () {
                    allFiles = document.getElementById('myFile').files;
                    if (!frm.checkValidity || frm.checkValidity()) {
                        if (allFiles.length == 0) {
                            alert('Error: Please choose at least 1 file to upload.');
                            return false;
                        } else {
                            frm.hide();
                            var subfolderName = '';// document.getElementById('myName').value;
                           /* $.ajax({
                                url: '',//URL of webhook endpoint for sending a Slack notification
                                data: {
                                     title: subfolderName + ' is uploading screenshots',
                                     message: ''
                                }
                            });*/
                            google.script.run.withSuccessHandler(afterSubfolderCreated).createSubfolder(subfolderName);
                            return false;
                        }
                    } else {
                        alert('Invalid form');
                        return false;
                    }
                });
            });//end docReady
        </script>
        <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/smoothness/jquery-ui.css">
      
      <!-- MAIN CONTENT -->
    <div id="main_content_wrap" class="outer">
      <section id="main_content" class="inner">  
      <div id="forminner">   
        <form class="main" id="myForm"> 
              <!--  <div>
                <input type="text" name="myName" id="myName"> 
                </div>--> 
                  <div class="row">
                          <div class="file-field input-field col s12">
                                  <div class="btn">
                                          <span>Select file</span>
                                          <input type="file" value="drag and drop files here" name="filename" id="myFile" multiple>
                                  </div>
                                  <div class="file-path-wrapper">
                                     <input class="file-path validate" type="text" placeholder="or Drag and drop files here">  
                                  </div>
                          </div>
                 </div>
          
                  
         <div class="row">
          <div class="input-field col s6">
            <button class="waves-effect waves-light btn submit-btn" type="submit">Upload</button>
          </div>   
        </div>
                
                  
       </form>

        <div id="output"></div>
        <div id="progressbar">
            <div class="progress-label"></div>
        </div>
      </div>

   
   </section>
    </div>
    
    <!--hamburger-->
<div class="fixed-action-btn horizontal click-to-toggle">
  <a class="btn-floating btn-large waves-effect waves-default pulse">
    <i class="material-icons">menu</i>
  </a>
  <ul>
   
          <li><a class="btn-floating blue darken-2 waves-effect waves-default" href="http://orthosam.com" alt="Home"><i class="material-icons">home</i></a></li>
   
          <li><a class="btn-floating yellow darken-3 waves-effect waves-default" href="http://orthosam.com/about/" alt="About"><i class="material-icons">person</i></a></li>
   
          <li><a class="btn-floating orange darken-1 waves-effect waves-default" href="https://drive.google.com/drive/folders/1MGTIataD9rRTVA7qBUZC8Im4Sq99NCri" alt="Public files"><i class="material-icons">insert_drive_file</i></a></li>
   
          <li><a class="btn-floating green darken-2 waves-effect waves-default" href="https://script.google.com/macros/s/AKfycbxAOq39hNFpe6Ylgn28SK8R2dgV6XAII_V_Sxga4eb_mVNRu9Y/exec" alt="Upload"><i class="material-icons">cloud_upload</i></a></li>
   
          <li><a class="btn-floating red darken-1 waves-effect waves-default" href="http://orthosam.com/contact/" alt="Contact"><i class="material-icons">contact_phone</i></a></li>
   
  </ul>
</div>
    <!-- FOOTER  -->
    <div id="footer_wrap" class="outer">
      <footer class="inner">
        <p>Developed by <a href="http://samuel.cf">Samuel Ch</a></p>
      </footer>
    </div>
    <script type="text/javascript" src="https://orthosam.com/assets/js/materialize.min.js"></script>
    <script src="https://orthosam.com/assets/js/init.js"></script>
    
    </body>
</html>