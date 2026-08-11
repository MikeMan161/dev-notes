---
lastmod: 2026-08-04 19:56
date: 2026-07-08 18:58
---
For my frontend, I'll be using React + TypeScript.

Here's the stack for the frontend:
- Vite - build tool and dev server. When the site is ready to deploy, it bundles all my code into optimized static files. The scaffholding and machinery around the app, not part of the actual apps UI code
- [[React]] - A library of tools for building the frontend UI
	- [[Effects]]
	- [[Responding to Events]]
	- [[State - A Component's Memory]]
- TypeScript - The language to write everything in
- React Router - Handles navigation wihtin the frontend, mapping URLs to different views/pages of the app. Basically, this is what determines what the user sees at a given url, so at /dashboard they'll see the dashboard component, at /login they'll see the login screen, etc.
- TanStack Query - what manages communication with the backend. all of the fetching, caching, and syncing of server data. Essentially the layer that lives between the React components and the FastAPI API. the "how does the frontend talk to the backend" question solved!
	- [[TanStack Query Notes]]
- Tailwind CSS - helps style the app
	- [[Tailwind Notes]]
	- [[UI Notes]]
- shaden/ui - prebuilt components built on top of tailwind that i can copy to the repo and use
- Recharts - Graphs and charts, for visualizations

UI References:
[[UI Notes]]
