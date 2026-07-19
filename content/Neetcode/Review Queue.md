---
title: Review Queue
date: 2026-07-18 12:00
lastmod: 2026-07-18 21:12
---
Problems that are due for review. Click through and attempt it **blind** — you won't see which pattern it is or your own notes. Afterward, open the note and update `last-solved` to today and `interval` to 3 / 7 / 21 / 60 based on how it went.

```dataview
TABLE WITHOUT ID
  link(url, "Open problem") AS Problem,
  (date(last-solved) + dur(interval + " days")) AS Due
FROM "Neetcode"
WHERE last-solved AND date(last-solved) + dur(interval + " days") <= date(today)
SORT date(last-solved) + dur(interval + " days") ASC
LIMIT 3
```