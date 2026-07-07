"use client";

import NextLink from "next/link";
import { Card } from "@xanui/ui";
import type { CardProps } from "@xanui/ui/Card";

type XCardLinkProps = Omit<CardProps, "component"> & { href: string };

export function XCardLink({ href, ...props }: XCardLinkProps) {
  return (
    <Card
      component={NextLink}
      textDecoration={"none"}
      href={href}
      {...props}
      sx={{
        ...props.sx,
        textDecoration: "none!important",
        "&:hover": {
          textDecoration: "none!important",
        },
      }}
    />
  );
}
