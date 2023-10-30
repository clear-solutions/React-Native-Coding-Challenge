import COLORS from "./Colors";

interface Priority {
  tier: number,
  title: string,
  color: COLORS,
  icon: string
}

export const Priorities: Priority[] = [
  {
    tier: 0,
    title: "Optional",
    color: COLORS.primaryGreen,
    icon: "downcircle"
  },
  {
    tier: 1,
    title: "Important",
    color: COLORS.primaryOrange,
    icon: "minuscircle"
  },
  {
    tier: 2,
    title: "Urgent",
    color: COLORS.primaryRed,
    icon: "upcircle"
  },
];
