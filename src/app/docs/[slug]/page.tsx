import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Box, Stack, Text } from "@xanui/ui";
import { XLink } from "@/components/XLink";
import { allDocs, getDocBySlug, getAdjacentDocs } from "@/lib/docs";
import { renderMarkdown } from "@/lib/markdown";

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "docs");

function readDocContent(slug: string): string | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, "utf-8");
}

export function generateStaticParams() {
  return allDocs.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDocBySlug(slug);
  if (!doc) return {};
  return { title: doc.title, description: doc.description };
}

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getDocBySlug(slug);
  const content = readDocContent(slug);

  if (!doc || !content) notFound();

  const { prev, next } = getAdjacentDocs(slug);

  return (
    <Stack sx={{ maxWidth: 760 }}>
      <Box>{renderMarkdown(content)}</Box>

      {(prev || next) && (
        <Stack
          direction="row"
          justifyContent="space-between"
          gap={2}
          mt={6}
          pt={3}
          borderTop={1}
          borderColor="divider.primary"
          sx={{ flexWrap: "wrap" }}
        >
          {prev ? (
            <XLink href={`/docs/${prev.slug}`} underline="none">
              <Text fontSize="xs" color="text.secondary" mb={0.5}>
                ← Previous
              </Text>
              <Text fontWeight="h6" color="brand.primary">
                {prev.title}
              </Text>
            </XLink>
          ) : (
            <span />
          )}
          {next ? (
            <XLink href={`/docs/${next.slug}`} underline="none" sx={{ textAlign: "right", marginLeft: "auto" }}>
              <Text fontSize="xs" color="text.secondary" mb={0.5}>
                Next →
              </Text>
              <Text fontWeight="h6" color="brand.primary">
                {next.title}
              </Text>
            </XLink>
          ) : (
            <span />
          )}
        </Stack>
      )}
    </Stack>
  );
}
