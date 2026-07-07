export type DocEntry = {
  slug: string;
  title: string;
  description: string;
};

export type DocCategory = {
  title: string;
  items: DocEntry[];
};

export const docCategories: DocCategory[] = [
  {
    title: "Getting Started",
    items: [
      {
        slug: "app-root",
        title: "AppRoot",
        description:
          "The composition root that wires up theming, breakpoints, document context, and CSS caching in one component.",
      },
    ],
  },
  {
    title: "Theming",
    items: [
      {
        slug: "create-theme",
        title: "createTheme & useTheme",
        description:
          "Build a theme object with a generated color palette and read the active theme from context.",
      },
      {
        slug: "theme-provider",
        title: "ThemeProvider",
        description:
          "Binds a theme to a subtree, injecting CSS variables, resets, and scrollbar styling.",
      },
      {
        slug: "use-color-template",
        title: "useColorTemplate",
        description:
          "Resolve a semantic color and visual style into ready-to-use fill/outline/text/ghost style pairs.",
      },
      {
        slug: "use-component",
        title: "useThemeComponent",
        description:
          "Let component authors expose a themeable interface so themes can adjust default props.",
      },
    ],
  },
  {
    title: "Styling",
    items: [
      {
        slug: "tag",
        title: "Tag",
        description:
          "The primitive building block of Xanui Core — native elements with shorthand styling props.",
      },
      {
        slug: "use-tag-props",
        title: "useTagProps",
        description:
          "The hook that powers Tag — split DOM props from CSS props and produce a class name.",
      },
      {
        slug: "css",
        title: "CSS Utilities",
        description:
          "Author responsive, theme-aware styles with shorthand aliases on top of oncss.",
      },
    ],
  },
  {
    title: "Responsive Layout",
    items: [
      {
        slug: "use-breakpoint",
        title: "useBreakpoint",
        description:
          "Read the active responsive breakpoint and compare it against the breakpoint scale.",
      },
      {
        slug: "use-breakpoint-props",
        title: "useBreakpointProps",
        description:
          "Describe props as per-breakpoint maps and resolve them to flat values for the current breakpoint.",
      },
    ],
  },
  {
    title: "Animation",
    items: [
      {
        slug: "use-animation",
        title: "animate, Easing & useInView",
        description:
          "A frame-by-frame numeric animation engine with easing presets and viewport detection.",
      },
      {
        slug: "transition",
        title: "Transition",
        description:
          "Declarative enter/exit animations for a single element, driven by named variants.",
      },
    ],
  },
  {
    title: "Utilities",
    items: [
      {
        slug: "use-portal",
        title: "Portal",
        description:
          "An SSR-safe wrapper around createPortal for modals, toasts, and tooltips.",
      },
      {
        slug: "iframe",
        title: "Iframe",
        description:
          "Render an isolated iframe with a nested AppRoot mounted inside its own document.",
      },
      {
        slug: "render-server-styles",
        title: "SSR & Style Injection",
        description:
          "How Xanui Core injects styles during server rendering, and the CSS cache APIs around it.",
      },
      {
        slug: "use-scrollbar",
        title: "Scrollbar Styling",
        description:
          "Themed scrollbar CSS injected automatically by ThemeProvider and AppRoot.",
      },
      {
        slug: "use-document",
        title: "useDocument",
        description:
          "Read the current document context so styles and portals target the right document, even inside an Iframe.",
      },
      {
        slug: "use-merge-refs",
        title: "useMergeRefs",
        description:
          "Combine multiple refs — callback or object — into a single callback ref.",
      },
    ],
  },
];

export const allDocs: DocEntry[] = docCategories.flatMap((category) => category.items);

export function getDocBySlug(slug: string): DocEntry | undefined {
  return allDocs.find((doc) => doc.slug === slug);
}

export function getAdjacentDocs(slug: string): {
  prev: DocEntry | null;
  next: DocEntry | null;
} {
  const index = allDocs.findIndex((doc) => doc.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? allDocs[index - 1] : null,
    next: index < allDocs.length - 1 ? allDocs[index + 1] : null,
  };
}
