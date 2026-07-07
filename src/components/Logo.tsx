import { Box } from "@xanui/ui";

export function Logo({ size = 22 }: { size?: number }) {
  return (
    <Box
      component="span"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      width={size}
      height={size}
      radius={Math.round(size * 0.28)}
      bgcolor="brand.primary"
      color="brand.contrast"
      flexShrink={0}
    >
      <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M7 6L13 12L7 18"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M13 18H18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Box>
  );
}
