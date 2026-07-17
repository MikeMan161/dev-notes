---
lastmod: 2026-07-17 13:19
date: 2026-07-09 22:00
---
- From reading the react docs, the gist of it is that it's javascript functions with markup that you can inject live data and logic into. Each function is a "component", these components are the pieces of the website. We can make a table of contents component, a dial component, etc. So we define these components separately, then we combine these components to form the site.

- A file holds one or more components (functions returning JSX). `export` labels which ones other files can import. You use any component — exported or not — by writing it as a `<Tag />`, and React calls it for you.

