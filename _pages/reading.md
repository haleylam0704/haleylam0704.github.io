---
layout: archive
title: "Reading"
permalink: /reading/
author_profile: true
sitemap: false
search: false
---

A running list of articles I've been reading, with a few brief thoughts on each. Click a category to filter, or a column header to sort.

<style>
  .reading-filters { margin: 1em 0; display: flex; flex-wrap: wrap; gap: 0.4em; }
  .reading-filters button {
    font: inherit; font-size: 0.75em; padding: 0.3em 0.9em; cursor: pointer;
    border: 1px solid currentColor; border-radius: 999px; background: transparent; color: inherit; opacity: 0.6;
  }
  .reading-filters button.active { opacity: 1; font-weight: bold; }
  .reading-table { font-size: 0.8em; width: 100%; }
  .reading-table th { text-align: left; white-space: nowrap; cursor: pointer; user-select: none; }
  .reading-table th .arrow { opacity: 0.5; font-size: 0.8em; }
  .reading-table td { vertical-align: top; }
  .reading-table tbody tr { cursor: pointer; }
  .reading-table tbody tr:hover td { background: rgba(127,127,127,0.08); }
  .reading-table tbody tr.selected td { background: rgba(127,127,127,0.18); }
  .reading-table td.nowrap { white-space: nowrap; }
  .reading-table td.title { min-width: 14em; }
  .reading-table td.authors { min-width: 8em; }
  .reading-table td.thoughts { min-width: 16em; }
</style>

{% assign papers = site.data.reading | sort: "date" | reverse %}
{% assign months = "Jan,Feb,Mar,Apr,May,June,July,Aug,Sept,Oct,Nov,Dec" | split: "," %}
{% assign categories = "Psych of AI,Behavioral Prediction,Biopsych,Other" | split: "," %}

<div class="reading-filters">
  <button class="active" data-cat="All">All</button>
  {% for c in categories %}<button data-cat="{{ c }}">{{ c }}</button>{% endfor %}
</div>

<table class="reading-table">
  <thead>
    <tr>
      <th data-type="text">Date read <span class="arrow">▼</span></th>
      <th data-type="text">Category <span class="arrow"></span></th>
      <th data-type="text">Title <span class="arrow"></span></th>
      <th data-type="text">Authors <span class="arrow"></span></th>
      <th data-type="num">Year <span class="arrow"></span></th>
      <th data-type="text">DOI <span class="arrow"></span></th>
      <th data-type="text">Thoughts <span class="arrow"></span></th>
    </tr>
  </thead>
  <tbody>
  {% for p in papers %}
    <tr data-cat="{{ p.category }}">
      <td class="nowrap" data-sort="{{ p.date }}">{% assign mi = p.date | date: "%-m" | minus: 1 %}{{ months[mi] }} {{ p.date | date: "%-d, %Y" }}</td>
      <td class="nowrap">{{ p.category }}</td>
      <td class="title">{{ p.title }}</td>
      <td class="authors">{{ p.authors }}</td>
      <td>{{ p.year }}</td>
      <td class="nowrap">{% if p.doi %}<a href="https://doi.org/{{ p.doi }}">{{ p.doi }}</a>{% endif %}</td>
      <td class="thoughts">{{ p.thoughts }}</td>
    </tr>
  {% endfor %}
  </tbody>
</table>

<script>
(function () {
  var table = document.querySelector('.reading-table');
  var tbody = table.tBodies[0];
  var headers = table.querySelectorAll('th');
  var sortCol = 0, sortAsc = false;

  // Category filter
  document.querySelectorAll('.reading-filters button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.reading-filters button').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var cat = btn.dataset.cat;
      Array.from(tbody.rows).forEach(function (row) {
        row.style.display = (cat === 'All' || row.dataset.cat === cat) ? '' : 'none';
      });
    });
  });

  // Sort by clicking a header
  headers.forEach(function (th, i) {
    th.addEventListener('click', function () {
      sortAsc = (sortCol === i) ? !sortAsc : true;
      sortCol = i;
      var num = th.dataset.type === 'num';
      var key = function (row) {
        var cell = row.cells[i];
        var v = cell.dataset.sort || cell.textContent.trim();
        return num ? (parseFloat(v) || 0) : v.toLowerCase();
      };
      Array.from(tbody.rows)
        .sort(function (a, b) { var x = key(a), y = key(b); return (x < y ? -1 : x > y ? 1 : 0) * (sortAsc ? 1 : -1); })
        .forEach(function (row) { tbody.appendChild(row); });
      headers.forEach(function (h) { h.querySelector('.arrow').textContent = ''; });
      th.querySelector('.arrow').textContent = sortAsc ? '▲' : '▼';
    });
  });

  // Click a row to highlight it (links still work normally)
  tbody.addEventListener('click', function (e) {
    if (e.target.closest('a')) return;
    var row = e.target.closest('tr');
    if (row) row.classList.toggle('selected');
  });
})();
</script>
