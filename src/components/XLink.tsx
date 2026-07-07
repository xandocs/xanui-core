"use client";

import NextLink from "next/link";
import { Link } from "@xanui/ui";
import type { LinkProps } from "@xanui/ui/Link";

export function XLink(props: Omit<LinkProps, "component">) {
  return <Link component={NextLink} {...props} />;
}
