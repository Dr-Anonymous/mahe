---
layout: default
title: Orthosam
---
# Home

You've reached the manipal sub-domain site of Orthosam. Head on to the [about](/about) section to know more of the services we offer.

Quick links:

{% include linkCards.html %}

>_Any suggestions/ queries :e-mail:_ [mail@orthosam.com](mailto:mail@orthosam.com).


<script>
 function otherSignedInStuff(googleUser){ }
</script>

 {% if site.show_posts %}
 ## Posts

<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
      {{ post.excerpt }}
    </li>
  {% endfor %}
</ul>
 {% endif %}
