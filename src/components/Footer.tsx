import { Box, Container, Stack, Text, Link } from "@xanui/ui";
import { Logo } from "./Logo";
import { XLink } from "./XLink";

export function Footer() {
  return (
    <Box component="footer" borderTop={1} mt={6} py={4}>
      <Container maxWidth="xl">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          gap={2}
          sx={{ flexWrap: "wrap" }}
        >
          <Stack direction="row" alignItems="center" gap={1}>
            <Logo size={18} />
            <Text variant="sm" fontWeight="h6" color="text.secondary">
              Xanui Core
            </Text>
          </Stack>

          <Stack direction="row" gap={3}>
            <XLink
              href="/docs"
              underline="hover"
              color="text.secondary"
              fontSize="sm"
            >
              Documentation
            </XLink>
            <Link
              href="https://github.com/devnax/xanui-core"
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              color="text.secondary"
              fontSize="sm"
            >
              GitHub
            </Link>
            <Link
              href="https://github.com/devnax/xanui-core/issues"
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              color="text.secondary"
              fontSize="sm"
            >
              Issues
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
