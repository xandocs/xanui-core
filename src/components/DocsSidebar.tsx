"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { Box, Stack, Text, List, ListItem } from "@xanui/ui";
import { docCategories } from "@/lib/docs";

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <Box component="nav" position="sticky" top={88}>
      <Stack gap={3}>
        {docCategories.map((category) => (
          <Stack key={category.title} gap={0.5}>
            <Text
              fontSize="xs"
              fontWeight="h6"
              color="text.secondary"
              px={1.5}
              mb={0.5}
              sx={{ textTransform: "uppercase", letterSpacing: "0.06em" }}
            >
              {category.title}
            </Text>
            <List size="sm">
              {category.items.map((doc) => {
                const active = pathname === `/docs/${doc.slug}`;
                return (
                  <ListItem
                    key={doc.slug}
                    component={NextLink}
                    href={`/docs/${doc.slug}`}
                    selected={active}
                    fontSize="sm"
                    color={active ? "brand.primary" : "text.primary"}
                    bgcolor={active ? "brand.ghost" : undefined}
                    radius="sm"
                  >
                    {doc.title}
                  </ListItem>
                );
              })}
            </List>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}
