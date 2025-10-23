import { Users, BookOpen, Sparkles, Network, Zap } from "lucide-react";
import { TimelineNode } from "@/types/about";

export const timelineNodes: TimelineNode[] = [
  {
    id: "present",
    title: "About ACM",
    subtitle: "Association of Computing Machinery",
    icon: <Network className="w-6 h-6" />,
    color: "cyan",
    glowColor: "rgba(11, 188, 214, 0.15)",
    content: {
      heading: "ABOUT ACM",
      paragraphs: [
        "ACM — the Association for Computing Machinery — is the world's largest hub for computing minds, with a network of 100,000+ researchers, educators, and practitioners across the globe.",
        "The Association for Computing Machinery (ACM) stands as the world's preeminent and most extensive organization dedicated to computing professionals. It serves as a vibrant global nexus, connecting a vast community of over 100,000 researchers, educators, and practitioners who are actively shaping the future of computing."
      ]
    }
  },
  {
    id: "legacy",
    title: "Our Mission",
    subtitle: "Legacy · Knowledge Archive",
    icon: <BookOpen className="w-6 h-6" />,
    color: "purple",
    glowColor: "rgba(109, 77, 217, 0.15)",
    content: {
      heading: "Our Mission",
      paragraphs: [
        "We're not just about bits and bytes. We're about people and progress. We publish groundbreaking journals and conference proceedings that are the lifeblood of the field. We create educational resources that help you master new skills and stay ahead of the curve. It's all part of our commitment to fostering a vibrant, innovative computing community."
      ]
    }
  },
  {
    id: "awakening",
    title: "Join this conversation",
    subtitle: "Awakening · Community Forge",
    icon: <Sparkles className="w-6 h-6" />,
    color: "blue",
    glowColor: "rgba(59, 130, 246, 0.12)",
    content: {
      heading: "Join the Conversation",
      paragraphs: [
        "ACM is a place to connect. Our Special Interest Groups (SIGs) are where you'll find your tribe! whether you're fascinated by artificial intelligence, captivated by computer graphics, or obsessed with human-computer interaction. These groups are more than just forums; they're collaborative spaces where experts and enthusiasts alike share ideas and shape the future."
      ]
    }
  },
  {
    id: "future",
    title: "Beyond the Code",
    subtitle: "Future · Innovation Catalyst",
    icon: <Zap className="w-6 h-6" />,
    color: "pink",
    glowColor: "rgba(236, 106, 161, 0.15)",
    content: {
      heading: "Beyond the Code",
      paragraphs: [
        "Your professional journey is our priority. We offer a full slate of professional development opportunities, from high-impact conferences and workshops to online courses designed for today's fast-paced world. And when you do something truly remarkable, we'll be the first to recognize it. Our awards, including the prestigious Turing Award: Nobel Prize of Computing celebrate the pioneers who have changed the world."
      ]
    }
  },
  {
    id: "chapter",
    title: "ABES ACM Student Chapter",
    subtitle: "ABES ACM Intelligence System",
    icon: <Users className="w-6 h-6" />,
    color: "emerald",
    glowColor: "rgba(32, 201, 151, 0.15)",
    content: {
      heading: "ABES ACM STUDENT CHAPTER",
      paragraphs: [
        "Welcome to the ABES ACM Student Chapter, think of it as your own Jarvis system for tech growth. Here, students aren't just members; they're innovators, coders, designers, and leaders building the future together.",
        "We create an ecosystem where ideas spark, skills sharpen, and collaboration fuels real impact. From coding competitions and hackathons to expert talks and peer learning, every initiative is designed to turn curiosity into capability.",
        "We believe fostering a secure environment is essential. It allows creativity to flourish and ensures everyone's hard work is acknowledged and celebrated.",
        "If technology is the armor, ABES ACM Student Chapter is the intelligence system that guides you to use it wisely. Join us to explore, build, and lead in the world of computing."
      ]
    }
  }
];
