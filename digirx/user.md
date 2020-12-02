---
layout: default
---

### digi&#8478;
{% include_relative ./form.html %}

<script>
function otherSignedInStuff(googleUser){
var profile = googleUser.getBasicProfile();
//$('#userMail').text(profile.getEmail());
 M.toast({html: 'Hi '+profile.getName()});
}
</script>
