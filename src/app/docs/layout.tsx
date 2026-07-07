import { Container, GridContainer, GridItem } from "@xanui/ui";
import { DocsSidebar } from "@/components/DocsSidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container maxWidth="xl" py={5}>
      <GridContainer alignItems="flex-start">
        <GridItem xs={12} md={3}>
          <DocsSidebar />
        </GridItem>
        <GridItem xs={12} md={9} sx={{ minWidth: 0 }}>
          {children}
        </GridItem>
      </GridContainer>
    </Container>
  );
}
