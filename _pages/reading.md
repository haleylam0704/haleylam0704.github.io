---
layout: archive
title: "Reading"
permalink: /reading/
author_profile: true
sitemap: false
search: false
---

A running list of articles I've been reading, with a few brief thoughts on each.

{% assign papers = site.data.reading | sort: "date" | reverse %}
{% for p in papers %}
<div style="margin-bottom: 1.8em;">
  <p style="margin-bottom: 0.2em;"><strong>{{ p.title }}</strong></p>
  <p style="color: #666; font-size: 0.85em; margin-bottom: 0.4em;">
    {{ p.authors }}{% if p.year %} ({{ p.year }}){% endif %}
    {% if p.doi %} · <a href="https://doi.org/{{ p.doi }}">doi:{{ p.doi }}</a>{% endif %}
    · read {{ p.date | date: "%b %-d, %Y" }}
  </p>
  {% if p.thoughts %}<p style="margin-bottom: 0;">{{ p.thoughts }}</p>{% endif %}
</div>
{% endfor %}
