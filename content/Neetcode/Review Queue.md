---
title: Review Queue
date: 2026-07-18 12:00
lastmod: 2026-09-09 09:12
---
Problems that are due for review. Click through and attempt it **blind** — you won't see which pattern it is or your own notes. Afterward, open the note and update `last-solved` to today and `interval` to 3 / 7 / 21 / 60 based on how it went.

Sorted by **lateness** — days elapsed divided by the interval, i.e. how far past its own schedule each problem is. A 3-day problem 45 days out (15×) outranks a 21-day problem 45 days out (2.1×), and once the backlog is cleared everything due sits near 1.0× and this behaves like an ordinary due-date queue.

%% Once caught up, add `LIMIT 8` as the last line of the query below to cap the daily dose. %%

```dataview
TABLE WITHOUT ID
  elink(url, "Open problem") AS Problem,
  interval AS Interval,
  (date(last-solved) + dur(interval + " days")) AS Due,
  round((date(today) - date(last-solved)).days / interval, 1) AS Lateness
FROM "Neetcode"
WHERE last-solved AND date(last-solved) + dur(interval + " days") <= date(today)
SORT (date(today) - date(last-solved)).days / interval DESC

```