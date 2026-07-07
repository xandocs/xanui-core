import { Box, Text, Link, List, ListItem, Table, TableHead, TableBody, TableRow, TableCell } from "@xanui/ui";
import { CodeBlock } from "@/components/CodeBlock";

type Block =
  | { type: "heading"; level: number; text: string }
  | { type: "code"; lang: string; code: string }
  | { type: "table"; header: string[]; rows: string[][] }
  | { type: "blockquote"; text: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "paragraph"; text: string };

const HEADING_RE = /^(#{1,6})\s+(.*)$/;
const LIST_RE = /^\s*([-*]|\d+\.)\s+(.*)$/;
const TABLE_SEPARATOR_RE = /^\s*\|?[\s:|-]+\|?[\s:|-]*$/;

function splitTableRow(line: string): string[] {
  const placeholder = " ";
  const escaped = line.trim().replace(/\\\|/g, placeholder);
  let cells = escaped.split("|").map((cell) => cell.trim());
  if (cells[0] === "") cells = cells.slice(1);
  if (cells[cells.length - 1] === "") cells = cells.slice(0, -1);
  return cells.map((cell) => cell.split(placeholder).join("|"));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/`/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-+|-+$)/g, "");
}

function parseBlocks(markdown: string): Block[] {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === "") {
      i++;
      continue;
    }

    if (line.trim().startsWith("```")) {
      const lang = line.trim().slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++;
      blocks.push({ type: "code", lang, code: codeLines.join("\n") });
      continue;
    }

    const headingMatch = HEADING_RE.exec(line);
    if (headingMatch) {
      blocks.push({
        type: "heading",
        level: headingMatch[1].length,
        text: headingMatch[2].trim(),
      });
      i++;
      continue;
    }

    if (
      line.trim().startsWith("|") &&
      i + 1 < lines.length &&
      TABLE_SEPARATOR_RE.test(lines[i + 1]) &&
      lines[i + 1].includes("-")
    ) {
      const header = splitTableRow(line);
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        rows.push(splitTableRow(lines[i]));
        i++;
      }
      blocks.push({ type: "table", header, rows });
      continue;
    }

    if (line.trim().startsWith(">")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ""));
        i++;
      }
      blocks.push({ type: "blockquote", text: quoteLines.join(" ") });
      continue;
    }

    if (LIST_RE.test(line)) {
      const ordered = /^\s*\d+\./.test(line);
      const items: string[] = [];
      while (i < lines.length) {
        const m = LIST_RE.exec(lines[i]);
        if (!m) break;
        items.push(m[2]);
        i++;
      }
      blocks.push({ type: "list", ordered, items });
      continue;
    }

    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].trim().startsWith("```") &&
      !HEADING_RE.test(lines[i]) &&
      !lines[i].trim().startsWith("|") &&
      !lines[i].trim().startsWith(">") &&
      !LIST_RE.test(lines[i])
    ) {
      paraLines.push(lines[i].trim());
      i++;
    }
    blocks.push({ type: "paragraph", text: paraLines.join(" ") });
  }

  return blocks;
}

const INLINE_RE = /`([^`]+)`|\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;

function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  INLINE_RE.lastIndex = 0;

  while ((match = INLINE_RE.exec(text))) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    if (match[1] !== undefined) {
      nodes.push(
        <Box
          component="code"
          key={`${keyPrefix}-${key++}`}
          bgcolor="neutral.100"
          color="brand.secondary"
          fontFamily="var(--font-geist-mono)"
          fontSize="0.85em"
          radius={0.5}
          px={0.75}
          sx={{ whiteSpace: "nowrap" }}
        >
          {match[1]}
        </Box>
      );
    } else if (match[2] !== undefined) {
      nodes.push(
        <Box component="strong" key={`${keyPrefix}-${key++}`} fontWeight="h6">
          {match[2]}
        </Box>
      );
    } else if (match[3] !== undefined) {
      const href = match[4];
      const external = /^https?:\/\//.test(href);
      nodes.push(
        <Link
          key={`${keyPrefix}-${key++}`}
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          color="brand.primary"
          underline="hover"
        >
          {match[3]}
        </Link>
      );
    }
    lastIndex = INLINE_RE.lastIndex;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

const HEADING_TAGS = ["h1", "h2", "h3", "h4", "h5", "h6"] as const;
const HEADING_VARIANTS = ["h2", "h4", "h5", "h6", "h6", "h6"] as const;

export function renderMarkdown(markdown: string): React.ReactNode[] {
  const blocks = parseBlocks(markdown);

  return blocks.map((block, index) => {
    const key = `block-${index}`;

    switch (block.type) {
      case "heading": {
        const level = Math.min(Math.max(block.level, 1), 6);
        const id = slugify(block.text);
        return (
          <Text
            id={id}
            key={key}
            component={HEADING_TAGS[level - 1]}
            variant={HEADING_VARIANTS[level - 1]}
            color="text.primary"
            mt={level === 1 ? 0 : 5}
            mb={2}
            sx={{ scrollMarginTop: 96 }}
          >
            {renderInline(block.text, key)}
          </Text>
        );
      }
      case "code":
        return <CodeBlock key={key} code={block.code} lang={block.lang} />;
      case "table":
        return (
          <Box key={key} border={1} borderColor="divider.primary" radius="md" my={2.5} sx={{ overflowX: "auto" }}>
            <Table size="sm" borderType="line">
              <TableHead>
                <TableRow>
                  {block.header.map((cell, ci) => (
                    <TableCell th key={ci} sx={{ whiteSpace: "nowrap" }}>
                      {renderInline(cell, `${key}-h-${ci}`)}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {block.rows.map((row, ri) => (
                  <TableRow key={ri}>
                    {row.map((cell, ci) => (
                      <TableCell key={ci}>{renderInline(cell, `${key}-${ri}-${ci}`)}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        );
      case "blockquote":
        return (
          <Box
            key={key}
            radius="md"
            bgcolor="neutral.100"
            border={1}
            borderColor="divider.primary"
            borderLeftWidth={3}
            borderLeftColor="brand.primary"
            px={2}
            py={1.5}
            my={2.5}
          >
            <Text fontSize="sm" color="text.secondary" sx={{ lineHeight: 1.6 }}>
              {renderInline(block.text, key)}
            </Text>
          </Box>
        );
      case "list": {
        return (
          <List key={key} component={block.ordered ? "ol" : "ul"} size="sm" my={2}>
            {block.items.map((item, ii) => (
              <ListItem key={ii} fontSize="sm" color="text.primary">
                {renderInline(item, `${key}-${ii}`)}
              </ListItem>
            ))}
          </List>
        );
      }
      case "paragraph":
      default:
        return (
          <Text key={key} component="p" fontSize="md" color="text.primary" mb={2} sx={{ lineHeight: 1.7 }}>
            {renderInline(block.text, key)}
          </Text>
        );
    }
  });
}

export function extractHeadings(
  markdown: string
): { id: string; text: string; level: number }[] {
  const blocks = parseBlocks(markdown);
  return blocks
    .filter((b): b is Extract<Block, { type: "heading" }> => b.type === "heading")
    .filter((b) => b.level === 2)
    .map((b) => ({ id: slugify(b.text), text: b.text.replace(/`/g, ""), level: b.level }));
}
