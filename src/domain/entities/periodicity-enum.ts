export const Periodicity = {
  MONTHLY: "MONTHLY",
  QUARTERLY: "QUARTERLY",
  SEMIANNUALLY: "SEMI_ANNUAL",
  YEARLY: "YEARLY"
} as const;

export type Periodicity = (typeof Periodicity)[keyof typeof Periodicity];
