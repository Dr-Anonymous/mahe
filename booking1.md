---
layout: default
---

##Book appointment with Dr Samuel Manoj Ch <small>M.S Orthopaedics(Manipal)</small>

<script>       
       function loadSlots(slots) {
       var div = document.getElementById('time');
       document.getElementById('date').style.display = "none";
       document.getElementById('showTimeNext').innerText= "Choose from slots available on "+slots[0]+":";
       var output='';
       var date= slots[0].split("-");
       date = date[1]+"-"+date[0]+"-"+date[2]; //in the format of mm/dd/yyyy
       
       for (var i=1;i<slots.length;i++){
       var time= new Date(slots[i]).toLocaleTimeString([], { hour12: true});
       output= output+ '<option value=\"'+date+', '+time+'\">'+ time+'</option>';
       }
       div.innerHTML = output;
       div.style.display = "inherit";
       document.getElementById('btn2').style.display = "contents";
      }
      
      function toLoadSlots() {
        document.getElementById('btn1').style.display = "none";
        var reqDate= new Date(document.getElementById("date").value);
        var div = document.getElementById('showTimeNext');
        div.innerHTML = "Loading available slots for "+ reqDate.getDate()+"-"+ (reqDate.getMonth()+1) +"-" +reqDate.getFullYear() +". Please wait.....";
        google.script.run.withSuccessHandler(loadSlots).getSlots(reqDate.toISOString());
          }
       
      function onBooked(html){
       var div = document.getElementById('output');
       div.innerHTML = html;
        
      }
      function book(info){
          //hide the elements
          document.getElementById("myForm").style.display = "none";
          //intimate booking going on
          document.getElementById('output').innerHTML= "Your appointment is being booked.....";
          //and book the slot
          google.script.run.withSuccessHandler(onBooked).bookSlot(document.getElementById("name").value,document.getElementById("phone").value,info);
          return false;
          }
    </script>
    
    <div class="input-field col s12">
      <form id="myForm" action="#">
            Your Name:<input type="text" id="name" name="name"><br>
            Phone number:<input type="number" id="phone" name="phone"><br>
            <div id="showTimeNext">Choose desired date:</div>
            <input type="date" id= "date">
            <div id= "btn1"><input class="waves-effect waves-light btn submit-btn" type="button" onclick="toLoadSlots(); return false;" value="Show available slots"></div>
            <select name="time" id="time"></select>
            <div id= "btn2" style="display: none;"><input class="waves-effect waves-light btn submit-btn" type="button" onclick="book(document.getElementById('time').value); return false;" value="Book slot"></div>
     </form>  
        <div id="output"></div><br>
        
         <script>$('#date').attr('min',new Date().toISOString().split('T')[0]);//disable past dates
    </script>
