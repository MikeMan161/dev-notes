import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import { GraphColorGroup, GraphSizeGroup } from "./quartz/components/Graph"

// Graph node colors, mirroring the color groups in content/.obsidian/graph.json.
// Paths are slug prefixes; first match wins, so hubs are listed before the
// folders that contain them.
const graphColorGroups: GraphColorGroup[] = [
  {
    // hubs & indexes — the notes you navigate *from*
    color: "#e0a800",
    paths: [
      "/",
      "My AI Workflow",
      "Neetcode/Neetcode 150",
      "Neetcode/Review Queue",
      "Project Notes/To review list",
    ],
  },
  {
    // arrays & scanning
    color: "#3b82f6",
    paths: [
      "Neetcode/Arrays & Hashing",
      "Neetcode/Two Pointers",
      "Neetcode/Sliding Window",
      "Neetcode/Intervals",
      "Neetcode/Binary Search",
    ],
  },
  {
    // linear structures
    color: "#06b6d4",
    paths: ["Neetcode/Stack", "Neetcode/Linked List", "Neetcode/Heap or Priority Queue"],
  },
  {
    // trees & graphs
    color: "#10b981",
    paths: ["Neetcode/Trees", "Neetcode/Tries", "Neetcode/Graphs", "Neetcode/Advanced Graphs"],
  },
  {
    // recursion, DP & greedy
    color: "#8b5cf6",
    paths: [
      "Neetcode/Backtracking",
      "Neetcode/1-D Dynamic Programming",
      "Neetcode/2-D Dynamic Programming",
      "Neetcode/Greedy",
    ],
  },
  {
    // math & bits
    color: "#ec4899",
    paths: ["Neetcode/Math and Geometry", "Neetcode/Bit Manipulation"],
  },
  {
    // the finance project
    color: "#f97316",
    paths: ["Project Notes"],
  },
  {
    // reference material, deliberately muted
    color: "#64748b",
    paths: ["Coding Tips"],
  },
]

// Node sizing, layered on top of the link-count baseline. Same path matching as
// the color groups above: first match wins, so narrower paths come first.
// The project is the reason anyone is here; the NeetCode set is the biggest
// cluster by file count and would otherwise dominate the graph on volume alone.
const graphSizeGroups: GraphSizeGroup[] = [
  // the landing page and the project's own hub notes
  {
    scale: 2.1,
    paths: ["/", "Project Notes/Finance Project Overview", "Project Notes/To review list"],
  },
  // everything else in the project
  { scale: 1.6, paths: ["Project Notes", "My AI Workflow"] },
  // NeetCode entry points stay findable
  { scale: 0.9, paths: ["Neetcode/Neetcode 150", "Neetcode/Review Queue"] },
  // ...but the 170 individual problems recede
  { scale: 0.5, paths: ["Neetcode"] },
  // reference material, deliberately quiet
  { scale: 0.8, paths: ["Coding Tips"] },
]

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/MikeMan161",
      LinkedIn: "https://www.linkedin.com/in/riveramike/",
      Email: "mailto:michael.a.rivera.dev@gmail.com",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [
    Component.Graph({
      localGraph: { colorGroups: graphColorGroups, sizeGroups: graphSizeGroups },
      globalGraph: { colorGroups: graphColorGroups, sizeGroups: graphSizeGroups },
    }),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [],
}
