---
lastmod: 2026-07-19 19:15
date: 2026-07-19 18:28
---
To subscribe to a query in your components or custom hooks, call the useQuery hook with at least:
- A unique key for the query
- a function that returns a promise that:
	- resolves the data or
	- throws an error

example:
import { useQuery } from '@tanstack/react-query'

function App() {
  const info = useQuery({ queryKey: ['todos'], queryFn: fetchTodoList })
}

The unique key is used internally for refetching, caching, and sharing the queries throughout the application.
The query result returned by  useQuery contains all of the information about the query that you'll need for templating and any other usage of the data.