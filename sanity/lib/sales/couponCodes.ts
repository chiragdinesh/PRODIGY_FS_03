export const COUPON_CODES = {
  BFRIDAY: "BFRIDAY",
  DD10: "DD10",
  NY2024: "NY2024",
} as const;

export type couponCode = keyof typeof COUPON_CODES;
