/**
 * Generate a consistent color palette for team member cards
 * Based on index to ensure consistency but with variety
 */

export function getTeamMemberColor(index: number): string {
  const colors = [
    // Soft pastels for light backgrounds
    "bg-[#FFF4E6]", // Soft peach
    "bg-[#F0E7FF]", // Soft lavender
    "bg-[#E3F2FD]", // Soft blue
    "bg-[#FFE8F0]", // Soft pink
    "bg-[#E8F5E9]", // Soft green
    "bg-[#FFF3E0]", // Soft orange
    "bg-[#F3E5F5]", // Soft purple
    "bg-[#E0F2F1]", // Soft teal
    "bg-[#FFF9C4]", // Soft yellow
    "bg-[#FCE4EC]", // Soft rose
  ];

  return colors[index % colors.length];
}

export function getTeamMemberColorDark(index: number): string {
  const colors = [
    "dark:bg-[#2D2420]", // Dark peach
    "dark:bg-[#2B2540]", // Dark lavender
    "dark:bg-[#1E2A3A]", // Dark blue
    "dark:bg-[#2D2030]", // Dark pink
    "dark:bg-[#1F2B20]", // Dark green
    "dark:bg-[#2D2520]", // Dark orange
    "dark:bg-[#2A2540]", // Dark purple
    "dark:bg-[#1F2D2C]", // Dark teal
    "dark:bg-[#2D2B1F]", // Dark yellow
    "dark:bg-[#2D2028]", // Dark rose
  ];

  return colors[index % colors.length];
}
