"use client";

import NextLink from "next/link";
import { Button } from "@xanui/ui";
import type { ButtonProps } from "@xanui/ui/Button";

type XButtonLinkProps = Omit<ButtonProps, "component"> & { href: string };

export function XButtonLink({ href, ...props }: XButtonLinkProps) {
  return <Button component={NextLink} href={href} {...props} />;
}
