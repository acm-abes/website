// filepath: d:\lmth\AcmSite\acm\public\data\teachers.ts
export interface Teacher {
  image: string;
  name: string;
  role: string;
  linkedin?: string;
  github?: string;
}

export const teachers: Teacher[] = [
  { image: "images/team/default.jpg", name: "Lord Voldemort", role: "CEO", linkedin: "...", github: "..." },
  { image: "images/team/default.jpg", name: "Prof. McGonagall", role: "CTO", linkedin: "...", github: "..." },
  { image: "images/team/default.jpg", name: "Hagrid", role: "CFO", linkedin: "...", github: "..." },
  { image: "images/team/default.jpg", name: "Dobby", role: "COO", linkedin: "...", github: "..." },
  { image: "images/team/default.jpg", name: "Prof.quirrell", role: "CMO", linkedin: "...", github: "..." },
  { image: "images/team/default.jpg", name: "Hermione", role: "CIO", linkedin: "...", github: "..." },
  // Placeholder for future teacher
];