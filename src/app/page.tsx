import {
  Container,
  Stack,
  GridContainer,
  GridItem,
  Text,
  Button,
  Chip,
} from "@xanui/ui";
import { CodeBlock } from "@/components/CodeBlock";
import { XButtonLink } from "@/components/XButtonLink";
import { XCardLink } from "@/components/XCardLink";
import { docCategories } from "@/lib/docs";

const SHOWCASE = [
  {
    label: "01",
    title: "One primitive, every style",
    desc: "Tag renders any element with shorthand CSS props — px, bgcolor, radius, gap — resolved to atomic classes at render time.",
  },
  {
    label: "02",
    title: "Themes generate real palettes",
    desc: "createTheme expands a single brand color into a full 19-step scale plus semantic tokens for surface, text, and state colors.",
  },
  {
    label: "03",
    title: "Responsive props, no media queries",
    desc: "Any prop can take a per-breakpoint object — { xs: 'column', md: 'row' } — resolved automatically via useBreakpointProps.",
  },
  {
    label: "04",
    title: "SSR-safe by default",
    desc: "Styles collected during server rendering are streamed and hoisted into <head> automatically — no flush step required.",
  },
];

const SAMPLE_CODE = `import { AppRoot, createTheme, Tag } from 'xanui-core'

const theme = createTheme({
  name: 'brand',
  mode: 'light',
  colors: { brand: '#7C3AED', accent: '#f59e0b' },
})

export const App = () => (
  <AppRoot component="body" theme={theme}>
    <Tag
      component="section"
      display="flex"
      direction="column"
      gap={16}
      px={24}
      py={20}
      radius="md"
      shadow="md"
      bgcolor="paper.primary"
    >
      Themed, responsive, SSR-ready.
    </Tag>
  </AppRoot>
)`;

export default function Home() {
  return (
    <>
      <Container maxWidth="xl">
        <Stack pt={9} pb={7} sx={{ maxWidth: 760 }}>
          <Chip
            label="Xanui Core · v1.3"
            color="brand"
            variant="ghost"
            size="sm"
            sx={{ width: "fit-content", mb: 2.5 }}
          />
          <Text
            component="h1"
            variant="h1"
            fontWeight="h1"
            color="text.primary"
            mb={2}
            sx={{ letterSpacing: -1 }}
          >
            A headless React toolkit for{" "}
            <Text
              component="span"
              variant="h1"
              fontWeight="h1"
              color="brand.primary"
            >
              theme-driven UI
            </Text>
          </Text>
          <Text
            variant="lg"
            color="text.secondary"
            mb={3.5}
            sx={{ lineHeight: 1.6, maxWidth: 620 }}
          >
            One styling primitive, a real color-scale theming engine,
            breakpoint-aware layout hooks, and a frame-accurate animation system
            — all SSR-safe, all typed, zero runtime CSS-in-JS lock-in.
          </Text>
          <Stack direction="row" gap={1.5} sx={{ flexWrap: "wrap" }} mb={2.5}>
            <XButtonLink
              href="/docs/app-root"
              color="brand"
              variant="fill"
              size="lg"
            >
              Get Started
            </XButtonLink>
            <Button
              component="a"
              href="https://github.com/devnax/xanui-core"
              target="_blank"
              rel="noopener noreferrer"
              color="default"
              variant="outline"
              size="lg"
            >
              View on GitHub
            </Button>
          </Stack>
          <CodeBlock lang="bash" code="npm install xanui-core" />
        </Stack>
      </Container>

      <Container maxWidth="xl">
        <Stack pb={8}>
          <Text
            fontSize="xs"
            fontWeight="h6"
            color="brand.primary"
            mb={1}
            sx={{ textTransform: "uppercase", letterSpacing: "0.08em" }}
          >
            Why Xanui Core
          </Text>
          <Text
            variant="h3"
            fontWeight="h3"
            color="text.primary"
            mb={5}
            sx={{ maxWidth: 560 }}
          >
            Built around one idea: props are the API, the theme is the source of
            truth
          </Text>

          <GridContainer spacing={2} alignItems="center">
            <GridItem xs={12} md={6}>
              <Stack gap={3.5} p={1}>
                {SHOWCASE.map((item) => (
                  <Stack key={item.label} direction="row" gap={2}>
                    <Text
                      component="span"
                      fontWeight="h5"
                      color="brand.primary"
                      bgcolor="brand.ghost"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      width={36}
                      height={36}
                      radius="sm"
                      flexShrink={0}
                      fontSize="sm"
                    >
                      {item.label}
                    </Text>
                    <Stack gap={0.5}>
                      <Text fontWeight="h6" color="text.primary">
                        {item.title}
                      </Text>
                      <Text
                        fontSize="sm"
                        color="text.secondary"
                        sx={{ lineHeight: 1.6 }}
                      >
                        {item.desc}
                      </Text>
                    </Stack>
                  </Stack>
                ))}
              </Stack>
            </GridItem>
            <GridItem xs={12} md={6}>
              <CodeBlock lang="tsx" code={SAMPLE_CODE} />
            </GridItem>
          </GridContainer>
        </Stack>
      </Container>

      <Container maxWidth="xl">
        <Stack pb={8}>
          <Text
            fontSize="xs"
            fontWeight="h6"
            color="brand.primary"
            mb={1}
            sx={{ textTransform: "uppercase", letterSpacing: "0.08em" }}
          >
            Explore the docs
          </Text>
          <Text
            variant="h3"
            fontWeight="h3"
            color="text.primary"
            mb={5}
            sx={{ maxWidth: 560 }}
          >
            Everything shipped in the package, documented
          </Text>

          <GridContainer>
            {docCategories.map((category) => (
              <GridItem xs={12} sm={6} lg={4} key={category.title}>
                <Stack p={1} sx={{ height: "100%" }}>
                  <XCardLink
                    href={`/docs/${category.items[0].slug}`}
                    variant="outline"
                    p={3}
                    display="block"
                    hover={{ borderColor: "brand.primary" }}
                    sx={{ height: "100%" }}
                  >
                    <Text fontWeight="h6" color="text.primary" mb={1.25}>
                      {category.title}
                    </Text>
                    <Stack gap={0.75}>
                      {category.items.map((doc) => (
                        <Text
                          key={doc.slug}
                          fontSize="sm"
                          color="text.secondary"
                        >
                          {doc.title}
                        </Text>
                      ))}
                    </Stack>
                  </XCardLink>
                </Stack>
              </GridItem>
            ))}
          </GridContainer>
        </Stack>
      </Container>

      <Container maxWidth="xl">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          gap={3}
          sx={{ flexWrap: "wrap" }}
          bgcolor="brand.primary"
          color="brand.contrast"
          radius="lg"
          px={5}
          py={4}
          mb={8}
        >
          <Stack gap={0.75}>
            <Text variant="h4" fontWeight="h4" color="brand.contrast">
              Start building with Xanui Core
            </Text>
            <Text fontSize="md" sx={{ opacity: 0.85 }} color="brand.contrast">
              Read the docs, install the package, and ship a themed UI in
              minutes.
            </Text>
          </Stack>
          <XButtonLink
            href="/docs"
            color="default"
            variant="fill"
            size="lg"
            bgcolor="brand.contrast"
            sx={{ color: "brand.primary" }}
          >
            Browse Documentation
          </XButtonLink>
        </Stack>
      </Container>
    </>
  );
}
