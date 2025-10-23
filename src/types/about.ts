export type TimelineEra = "present" | "legacy" | "awakening" | "future" | "chapter";

export interface TimelineNode {
  id: TimelineEra;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  glowColor: string;
  content: {
    heading: string;
    paragraphs: string[];
  };
}
