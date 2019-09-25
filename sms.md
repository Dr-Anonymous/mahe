---
layout: withScript
---
<script>
 function myFunction(){
  $("form").submit(function(){
    $.get('https://api.msg91.com/api/sendhttp.php?mobiles='+$('#number').val()+'&authkey=295743AoBgBO0Q5d8a337c&route=4&sender=SAMUEL&message='+encodeURIComponent($('#message').val())+'&country=91');
  });
};
</script>
<form action="">
  Phone number: <input type="number" name="number" id="number"><br>
  Message: <input type="text" name="message" id="message"><br>
  <input type="submit" value="Submit">
</form> 
