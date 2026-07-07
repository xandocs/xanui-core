import type { Metadata } from "next";
import { Stack, Text, GridContainer, GridItem } from "@xanui/ui";
import { XCardLink } from "@/components/XCardLink";
import { docCategories } from "@/lib/docs";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Browse every API exported by Xanui Core, grouped by theming, styling, layout, animation, and utilities.",
};

export default function DocsIndexPage() {
  return (
    <Stack gap={6}>
      <Stack gap={1.5}>
        <Text component="h1" variant="h2" fontWeight="h2" color="text.primary">
          Documentation
        </Text>
        <Text
          fontSize="md"
          color="text.secondary"
          sx={{ maxWidth: 640, lineHeight: 1.7 }}
        >
          Xanui Core is a headless, theme-driven React toolkit built around a
          single styling primitive,{" "}
          <Text
            component="span"
            fontFamily="var(--font-geist-mono)"
            fontSize="0.9em"
            color="brand.primary"
          >
            Tag
          </Text>
          . Start with{" "}
          <Text component="span" fontWeight="h6" color="text.primary">
            AppRoot
          </Text>{" "}
          to wire up theming and responsive context, then explore the APIs
          below.
        </Text>
      </Stack>

      {docCategories.map((category) => (
        <Stack key={category.title} gap={2}>
          <Text variant="lg" fontWeight="h5" color="text.primary">
            {category.title}
          </Text>
          <GridContainer>
            {category.items.map((doc) => (
              <GridItem xs={12} sm={6} key={doc.slug}>
                <Stack p={1}>
                  <XCardLink
                    href={`/docs/${doc.slug}`}
                    variant="outline"
                    display="block"
                    p={2.5}
                    hover={{ borderColor: "brand.primary" }}
                    sx={{ height: "100%" }}
                  >
                    <Text fontWeight="h6" color="text.primary" mb={0.75}>
                      {doc.title}
                    </Text>
                    <Text
                      fontSize="sm"
                      color="text.secondary"
                      sx={{ lineHeight: 1.6 }}
                    >
                      {doc.description}
                    </Text>
                  </XCardLink>
                </Stack>
              </GridItem>
            ))}
          </GridContainer>
        </Stack>
      ))}
    </Stack>
  );
}
