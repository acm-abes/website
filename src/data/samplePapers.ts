export const samplePaperInputs = [
  {
    title: "Machine Learning Applications in Modern Healthcare Systems",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800",
    pictures: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600",
      "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=600",
    ],
    doi: "10.1000/ml-healthcare-2024",
    publishedAt: "2024-03-15T10:00:00Z",
    conference: "IEEE International Conference on Healthcare Informatics",
    track: "Machine Learning Track",
    description:
      "This paper explores the implementation of machine learning algorithms in healthcare diagnostics and patient care optimization.",
    authorIds: ["cmftuog0q0000w49olaww1wl4"],
  },
  {
    title: "Blockchain Technology for Secure Data Management in IoT Networks",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800",
    pictures: [
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600",
      "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600",
    ],
    doi: "10.1000/blockchain-iot-2024",
    publishedAt: "2024-06-20T14:30:00Z",
    conference: "ACM Conference on Computer and Communications Security",
    track: "Blockchain and Security",
    description:
      "An analysis of blockchain implementations for securing IoT device communications and data integrity.",
    authorIds: ["cmftuog0q0000w49olaww1wl4"],
  },
  {
    title: "Quantum Computing Algorithms for Optimization Problems",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800",
    pictures: [
      "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=600",
    ],
    doi: "10.1000/quantum-optimization-2024",
    publishedAt: "2024-09-10T08:15:00Z",
    conference: "International Conference on Quantum Computing",
    track: "Quantum Algorithms",
    description:
      "Novel approaches to solving NP-hard optimization problems using quantum computing principles and implementations.",
    authorIds: ["cmftuog0q0000w49olaww1wl4"],
  },
  {
    title: "Deep Learning for Real-time Computer Vision in Autonomous Vehicles",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800",
    pictures: [
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600",
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600",
    ],
    doi: "10.1000/cv-autonomous-2024",
    publishedAt: "2024-11-05T16:45:00Z",
    conference: "IEEE Conference on Computer Vision and Pattern Recognition",
    track: "Computer Vision Applications",
    description:
      "Implementation of real-time object detection and path planning algorithms for autonomous vehicle navigation systems.",
    authorIds: ["cmftuog0q0000w49olaww1wl4"],
  },
  {
    title: "Natural Language Processing for Multilingual Sentiment Analysis",
    image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800",
    pictures: [
      "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=600",
    ],
    doi: "10.1000/nlp-sentiment-2024",
    publishedAt: "2024-12-12T12:00:00Z",
    conference: "Association for Computational Linguistics Annual Meeting",
    track: "Natural Language Processing",
    description:
      "Cross-lingual sentiment analysis techniques using transformer models for social media monitoring across multiple languages.",
    authorIds: ["cmftuog0q0000w49olaww1wl4"],
  },
];

/*
curl -X POST http://localhost:3000/api/paper \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Machine Learning Applications in Modern Healthcare Systems",
    "image": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800",
    "pictures": ["https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600"],
    "doi": "10.1000/ml-healthcare-2024",
    "publishedAt": "2024-03-15T10:00:00Z",
    "conference": "IEEE International Conference on Healthcare Informatics",
    "track": "Machine Learning Track",
    "description": "This paper explores the implementation of machine learning algorithms in healthcare diagnostics.",
    "authorIds": ["your-actual-user-id-here"]
  }'
*/
