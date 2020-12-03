---
layout: default
---

### digi&#8478;
{% include_relative form.html %}
<script>
//==================header
//institiute
doc.setTextColor(c0);
doc.setFont("times", "bold");
doc.setFontSize(f4);
doc.text("Orthosam", 203, 15, null, null, "right");
doc.setFont("times", "normal");
//consultant
doc.setFontSize(f3);
doc.text("Dr Samuel Manoj Cherukuri",203, 25, null, null, "right");
//degree
doc.setFontSize(f0);
doc.text("M.S Ortho.", 203, 30, null, null, "right");
//post
doc.setFontSize(f2);
doc.text("Consultant", 203, 35, null, null, "right");
//address
doc.setFontSize(f0);
doc.text("70-17-18/2B, Kakinada-03\n9866812555, mail@orthosam.com", 203, 42, null, null, "right");
//===============footer
doc.setFont("times", "normal");
doc.text("Dr Samuel Manoj Cherukuri",203, 285, null, null, "right");
doc.setFontSize(f0-3);
doc.text("Reg. No 95695",203, 290, null, null, "right");
function otherSignedInStuff(googleUser){
$('form').show();
var profile = googleUser.getBasicProfile();
//$('#userMail').text(profile.getEmail());
 M.toast({html: 'Hi '+profile.getName()});
}
</script>
<a class="waves-effect waves-light btn" onclick="makePdf();"><i class="material-icons left">bubble_chart</i>Create prescription</a>
