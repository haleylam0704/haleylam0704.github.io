---
layout: archive
title: "Reading"
permalink: /reading/
author_profile: true
sitemap: false
search: false
---

A running list of articles I've been reading, with a few brief thoughts on each.

<style>
  .reading-table { font-size: 0.8em; width: 100%; }
  .reading-table th { text-align: left; white-space: nowrap; }
  .reading-table td { vertical-align: top; }
  .reading-table td.nowrap { white-space: nowrap; }
  .reading-table td.title { min-width: 14em; }
  .reading-table td.authors { min-width: 8em; }
  .reading-table td.thoughts { min-width: 16em; }
</style>

{% assign papers = site.data.reading | sort: "date" | reverse %}
<table class="reading-table">
  <thead>
    <tr>
      <th>Date read</th>
      <th>Title</th>
      <th>Authors</th>
      <th>Year</th>
      <th>DOI</th>
      <th>Thoughts</th>
    </tr>
  </thead>
  <tbody>
  {% for p in papers %}
    <tr>
      <td class="nowrap">{{ p.date }}</td>
      <td class="title">{{ p.title }}</td>
      <td class="authors">{{ p.authors }}</td>
      <td>{{ p.year }}</td>
      <td class="nowrap">{% if p.doi %}<a href="https://doi.org/{{ p.doi }}">{{ p.doi }}</a>{% endif %}</td>
      <td class="thoughts">{{ p.thoughts }}</td>
    </tr>
  {% endfor %}
  </tbody>
</table>
