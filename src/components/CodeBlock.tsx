"use client";

import { useState } from "react";
import { Box, Button, Text } from "@xanui/ui";

const KEYWORDS =
  /\b(import|from|export|default|const|let|var|function|return|new|if|else|for|while|type|interface|extends|implements|as|void|typeof|this|class|public|private|protected|readonly|async|await|of|in|switch|case|break|continue|try|catch|finally|throw|null|undefined|true|false)\b/;

const TOKEN_RE = new RegExp(
  [
    "(//.*$)",
    "('(?:[^'\\\\]|\\\\.)*'|\"(?:[^\"\\\\]|\\\\.)*\"|`(?:[^`\\\\]|\\\\.)*`)",
    `(${KEYWORDS.source})`,
    "(</?[A-Za-z][\\w.]*)",
    "(\\b\\d+(?:\\.\\d+)?\\b)",
  ].join("|"),
  "g",
);

const TOKEN_COLOR = {
  comment: "neutral.400",
  string: "success.primary",
  keyword: "accent.primary",
  tag: "danger.primary",
  number: "warning.primary",
} as const;

function tokenizeLine(line: string, lineKey: number) {
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  TOKEN_RE.lastIndex = 0;

  while ((match = TOKEN_RE.exec(line))) {
    if (match.index > lastIndex) {
      nodes.push(line.slice(lastIndex, match.index));
    }
    const groupEntries: [string, string | undefined][] = [
      ["comment", match[1]],
      ["string", match[2]],
      ["keyword", match[3]],
      ["tag", match[4]],
      ["number", match[5]],
    ];
    for (const [name, value] of groupEntries) {
      if (value !== undefined) {
        nodes.push(
          <Box
            component="span"
            key={`${lineKey}-${key++}`}
            color={TOKEN_COLOR[name as keyof typeof TOKEN_COLOR]}
          >
            {value}
          </Box>,
        );
        break;
      }
    }
    lastIndex = TOKEN_RE.lastIndex;
  }
  if (lastIndex < line.length) nodes.push(line.slice(lastIndex));
  return nodes;
}

export function CodeBlock({ code, lang }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false);
  const lines = code.replace(/\n+$/, "").split("\n");

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable — ignore
    }
  };

  return (
    <Box
      radius="lg"
      overflow="hidden"
      border={1}
      borderColor="divider.primary"
      bgcolor="paper.primary"
      my={2.5}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        px={2}
        py={1}
        borderBottom={1}
        borderColor="divider.primary"
        bgcolor="paper.primary"
      >
        <Text
          fontSize="xs"
          color="neutral.400"
          fontFamily="var(--font-geist-mono)"
          sx={{ textTransform: "uppercase", letterSpacing: "0.06em" }}
        >
          {lang || "text"}
        </Text>
        <Button
          component="button"
          type="button"
          onClick={onCopy}
          fontSize="xs"
          bgcolor="transparent"
          border={1}
          borderColor="neutral.700"
          radius="sm"
          size="xs"
          px={1.25}
          py={0.5}
          cursor="pointer"
          hover={{ color: "neutral.50", borderColor: "neutral.500" }}
        >
          {copied ? "Copied" : "Copy"}
        </Button>
      </Box>
      <Box component="pre" m={0} py={1.75} overflowX="auto">
        <Box
          component="code"
          fontFamily="var(--font-geist-mono)"
          fontSize="sm"
          sx={{ lineHeight: 1.65 }}
          color="text.primary"
        >
          {lines.map((line, i) => {
            const tokens = tokenizeLine(line, i);
            return (
              <Box key={i} px={2.25} whiteSpace="pre" color="text.primary">
                {tokens.length ? tokens : " "}
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
