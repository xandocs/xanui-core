"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { Box, Container, Stack, Text, Link, Button } from "@xanui/ui";
import { Logo } from "./Logo";

const NAV_LINKS = [{ href: "/docs", label: "Documentation" }];

export function Header() {
  const pathname = usePathname();

  return (
    <Box
      component="header"
      position="sticky"
      top={0}
      zIndex={40}
      bgcolor="paper.primary"
      borderBottom={1}
    >
      <Container maxWidth="xl">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          gap={2}
          py={1.5}
        >
          <Link
            component={NextLink}
            href="/"
            underline="none"
            display="flex"
            alignItems="center"
            gap={1.25}
          >
            <Logo />
            <Text variant="md" fontWeight="h6" color="text.primary">
              Xanui Core
            </Text>
          </Link>

          <Stack direction="row" alignItems="center" gap={3.5} flex={1} mx={3}>
            {NAV_LINKS.map((link) => {
              const active = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  component={NextLink}
                  href={link.href}
                  underline="none"
                  color={active ? "text.primary" : "text.secondary"}
                  fontWeight={active ? "h6" : "md"}
                >
                  {link.label}
                </Link>
              );
            })}
          </Stack>

          <Stack direction="row" alignItems="center" gap={1.25}>
            <Button
              component="a"
              href="https://github.com/devnax/xanui-core"
              target="_blank"
              rel="noopener noreferrer"
              variant="text"
              color="default"
              size="sm"
            >
              GitHub
            </Button>
            <Button
              component={NextLink}
              href="/docs"
              variant="fill"
              color="brand"
              size="sm"
            >
              Get Started
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
