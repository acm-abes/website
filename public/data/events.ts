import { Event } from "../../generated/prisma/client";

// small helper to parse a variety of date string formats used in the dataset
const parseDate = (input: string | undefined): Date => {
  if (!input) return new Date();
  // ISO-like input
  if (/\d{4}-\d{2}-\d{2}/.test(input)) return new Date(input);
  // formats like '20 Feb 2023' or '23 March 2022'
  if (/\d{1,2}\s+\w+\s+\d{4}/.test(input)) return new Date(input);
  // d-m-yyyy or d-m-yy -> assume day-month-year
  const dmy = input.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
  if (dmy) {
    const day = dmy[1].padStart(2, "0");
    const month = dmy[2].padStart(2, "0");
    const year = dmy[3];
    return new Date(`${year}-${month}-${day}`);
  }
  // fallback - try Date constructor
  const dt = new Date(input);
  return isNaN(dt.getTime()) ? new Date() : dt;
};

export const events: Event[] = [
  {
    id: "acpc",
    name: "ACPC 2k24",
    banner: "/events/ACPC/banner_1.png",
    poster: "/events/acpc-25.png",
    description:
      "ACPC aims to provide a platform for students to showcase their knowledge and skills in competitive programming. The ABESEC Collegiate Programming Contest (ACPC) is an algorithmic programming contest for college students. ACPC provides students with opportunities to interact, demonstrate, and improve their teamwork, programming, and problem-solving processes.",
    venue: "Aryabhatta Block, ABES ENGINEERING COLLEGE",
    startDate: parseDate("2024-04-27T00:00:00.000Z"),
    endDate: parseDate("2024-04-27T00:00:00.000Z"),
    createdAt: new Date(),
    updatedAt: new Date(),
    slug: "",
  },
  {
    id: "navrohan-2k24-1.0",
    name: "Navrohan 2K24 1.0",
    banner: "",
    poster: "/assets/navrohan.jpg",
    description:
      "ACM ABESEC Student Chapter and ACM ABESEC W Chapter are bringing for you ‘NAVROHAN-2k24’, the Recruitment drive of 2024. So, roll up your sleeves and get ready to experience the most interesting tech recruitment. Open to all the branches of 1st and 2nd year.",
    venue: "",
    startDate: parseDate("5-2-2024"),
    endDate: parseDate("5-2-2024"),
    createdAt: new Date(),
    updatedAt: new Date(),
    slug: "",
  },
  {
    id: "cps",
    name: "Career Pathway Session",
    banner: "",
    poster: "/assets/esp.jpg",
    description:
      "Ms Amrita Singh (Senior HR Recruiter) — Objective: To help students make a winning resume and prepare for hurdles on the path to their dream jobs.",
    venue: "",
    startDate: parseDate("20 Feb 2023"),
    endDate: parseDate("20 Feb 2023"),
    createdAt: new Date(),
    updatedAt: new Date(),
    slug: "",
  },
  {
    id: "navrohan-2k23",
    name: "Navrohan 2023",
    banner: "",
    poster: "/assets/esp.jpg",
    description:
      "Navrohan 2023 — annual recruitment drive with aptitude and CS fundamentals questions. See event materials for schedule details.",
    venue: "",
    startDate: parseDate("20 Feb 2023"),
    endDate: parseDate("20 Feb 2023"),
    createdAt: new Date(),
    updatedAt: new Date(),
    slug: "",
  },
  {
    id: "ems",
    name: "Emerging Technology Stack",
    banner: "",
    poster: "/assets/esp.jpg",
    description:
      "A series of interactive sessions on full-stack development, Big Data & Analytics, data science and related topics for academia and industry participants.",
    venue: "",
    startDate: parseDate("10 Feb 2023"),
    endDate: parseDate("10 Feb 2023"),
    createdAt: new Date(),
    updatedAt: new Date(),
    slug: "",
  },
  {
    id: "5th-acm-w",
    name: "5th ACM-W INDIA National Level Hackathon 2020",
    banner: "",
    poster: "/assets/hackw.jpg",
    description:
      "National Hackathon for female students (teams of 3) on the theme 'Self Reliant India' with rounds on-site.",
    venue: "",
    startDate: parseDate("19 Dec 2022"),
    endDate: parseDate("19 Dec 2022"),
    createdAt: new Date(),
    updatedAt: new Date(),
    slug: "",
  },
  {
    id: "web-weaver",
    name: "Web-Weaver",
    banner: "",
    poster: "/assets/hackw.jpg",
    description:
      "24hr online event where participants designed home pages and the most innovative design was chosen as the winner.",
    venue: "",
    startDate: parseDate("10 Dec 2022"),
    endDate: parseDate("10 Dec 2022"),
    createdAt: new Date(),
    updatedAt: new Date(),
    slug: "",
  },
  {
    id: "smart-abes",
    name: "Smart ABES Hackathon",
    banner: "",
    poster: "/assets/hacks.jpg",
    description:
      "Multi-round hackathon with several teams qualifying to final rounds; attended by ~110 students and faculty.",
    venue: "",
    startDate: parseDate("5 Oct 2022"),
    endDate: parseDate("5 Oct 2022"),
    createdAt: new Date(),
    updatedAt: new Date(),
    slug: "",
  },
  {
    id: "acm-distinguished-speaker",
    name: "ACM India's Distinguished Speaker Program",
    banner: "",
    poster: "/assets/hackw.jpg",
    description:
      "Talk on blockchain, AI and IIoT platform capabilities and challenges.",
    venue: "",
    startDate: parseDate("8 July 2022"),
    endDate: parseDate("8 July 2022"),
    createdAt: new Date(),
    updatedAt: new Date(),
    slug: "",
  },
  {
    id: "marg-darshan-11",
    name: "Marg Darshan Session 11",
    banner: "",
    poster: "/assets/hackw.jpg",
    description:
      "Guidance session for Smart India Hackathon 2022 winners and participants.",
    venue: "",
    startDate: parseDate("23 March 2022"),
    endDate: parseDate("23 March 2022"),
    createdAt: new Date(),
    updatedAt: new Date(),
    slug: "",
  },
  {
    id: "acm-eminent",
    name: "ACM India's Eminent Speaker",
    banner: "",
    poster: "/assets/hackw.jpg",
    description:
      "Security and Trust talk by Mr Kaarthik Sivakumar, Principal Engineer at Cisco Systems.",
    venue: "",
    startDate: parseDate("25 February 2022"),
    endDate: parseDate("25 February 2022"),
    createdAt: new Date(),
    updatedAt: new Date(),
    slug: "",
  },
  {
    id: "opd",
    name: "Open Recruitment Drive",
    banner: "",
    poster: "/assets/hackw.jpg",
    description:
      "Recruitment drive with aptitude test, code hunt and personal interviews across multiple rounds.",
    venue: "",
    startDate: parseDate("21 February 2022"),
    endDate: parseDate("21 February 2022"),
    createdAt: new Date(),
    updatedAt: new Date(),
    slug: "",
  },
  {
    id: "1w-virtual-workshop-web-dev",
    name: "One-week virtual workshop on Full-stack Development",
    banner: "",
    poster: "/assets/hackw.jpg",
    description:
      "Hands-on sessions on Angular, React, Node.js, AWS and Python to strengthen full-stack skills.",
    venue: "",
    startDate: parseDate("21 February 2022"),
    endDate: parseDate("21 February 2022"),
    createdAt: new Date(),
    updatedAt: new Date(),
    slug: "",
  },
  {
    id: "code-your-way",
    name: "CODE YOUR WAY",
    banner: "",
    poster: "/assets/hackw.jpg",
    description:
      "Coding contest open to all levels where participants compete to showcase programming skills.",
    venue: "",
    startDate: parseDate("11 September 2021"),
    endDate: parseDate("11 September 2021"),
    createdAt: new Date(),
    updatedAt: new Date(),
    slug: "",
  },
  {
    id: "placement-workshop",
    name: "Placement Workshop",
    banner: "",
    poster: "/assets/hackw.jpg",
    description:
      "Workshop on placements featuring speakers from Amazon, Accenture, Adobe and Cisco.",
    venue: "",
    startDate: parseDate("13 Dec 2020"),
    endDate: parseDate("13 Dec 2020"),
    createdAt: new Date(),
    updatedAt: new Date(),
    slug: "",
  },
  {
    id: "dev-x",
    name: "DEV X (A Web Development Contest)",
    banner: "",
    poster: "/assets/dev.jpg",
    description:
      "Frontend implementation contest based on a provided prototype; time limit 3 hours.",
    venue: "",
    startDate: parseDate("12 Dec 2020"),
    endDate: parseDate("12 Dec 2020"),
    createdAt: new Date(),
    updatedAt: new Date(),
    slug: "",
  },
  {
    id: "quizsom",
    name: "QUIZSOM",
    banner: "",
    poster: "/assets/dev.jpg",
    description:
      "Puzzle-based quiz event with a mix of pseudocode and debugging challenges.",
    venue: "",
    startDate: parseDate("10 Dec 2020"),
    endDate: parseDate("10 Dec 2020"),
    createdAt: new Date(),
    updatedAt: new Date(),
    slug: "",
  },
  // {

  //   name: "DEV X (A Web Development Contest)",
  //   date: "12 Dec 2020",
  //   logo: "assets/dev.jpg",
  //   description:
  //     "Here you will be provided with a prototype of a website. You have to code the frontend based on that prototype given to you using any language or technology time limit : 3 Hours Γ£¿Entries would be accepted through GitHub So what are you waiting for, Register to flaunt and take ship to enhance your skills!!  All the Best!!",
  // },
  {
    id: "quizsom-2",
    name: "QUIZSOM 2.0",
    banner: "",
    poster: "/assets/dev.jpg",
    description:
      "You will be given 6 questions — 4 on pseudocode and 2 on debugging. Arrange outputs to form strings and solve for the final answer. Prizes include Bluetooth speakers and Paytm vouchers.",
    venue: "",
    startDate: parseDate("5 Dec 2020"),
    endDate: parseDate("5 Dec 2020"),
    createdAt: new Date(),
    updatedAt: new Date(),
    slug: "",
  },
  {
    id: "ace-hackathon",
    name: "How To Ace Hackathon",
    banner: "",
    poster: "/assets/dev.jpg",
    description:
      "Workshop covering tips for choosing project ideas, making effective presentations and delivering your idea to judges—preparation for the ACM-W national hackathon.",
    venue: "",
    startDate: parseDate("5 Oct 2020"),
    endDate: parseDate("5 Oct 2020"),
    createdAt: new Date(),
    updatedAt: new Date(),
    slug: "",
  },
  {
    id: "internal-hackathon",
    name: "Internal Hackathon",
    banner: "",
    poster: "/assets/dev.jpg",
    description:
      "Internal virtual hackathon focused on the theme 'Self Reliant India' — open to all-girls teams of 1–3 members.",
    venue: "",
    startDate: parseDate("5 Oct 2020"),
    endDate: parseDate("5 Oct 2020"),
    createdAt: new Date(),
    updatedAt: new Date(),
    slug: "",
  },
];

// export const events = [
//   {
//     id: "acpc",
//     name: "ACPC 2k24",
//     banners: ["/ACPC/banner_1.png", "/ACPC/banner_2.png", "/ACPC/banner_3.png"],
//     logo: "/images/ACPC/poster.jpg",
//     date: "27 Apr 2024, 11:00 AM",
//     descriptioncription:
//       "ACPC aims to provide a platform for students to showcase their knowledge and skills in competitive programming. The ABESEC Collegiate Programming Contest(ACPC) is an algorithmic programming contest for college students. ACPC providescription students with opportunities to interact, demonstrate, and improve their teamwork, programming, and problem-solving processes.",
//     sponsors: [],
//     prizes: `Win upto 10000 in prizes including participation certificate for all participants & achievement certificate,trophy and goodies for the winners`,
//     venue: "Aryabhatta Block , ABES ENGINEERING COLLEGE",
//   },
//   {
//     id: "navrohan",
//     name: "Navrohan 2K24",
//     date: "5 Feb 2024",
//     logo: "/assets/navrohan.jpg",
//     banners: ["/"],
//     descriptioncription:
//       "ACM ABESEC Student Chapter and ACM ABESEC W Chapter are bringing for you “NAVROHAN-2k24”, the Recruitment drive of 2024. So, roll up your sleeves and get ready to experience the most interesting tech recruitment. 🔹 Open to all the branches of 1st and 2nd year for the first time.",
//   },
//   {
//     id: "esp",
//     name: "Emerging Technology Stack",
//     date: "10 Feb 2023",
//     logo: "/assets/esp.jpg",
//     banners: ["/"],
//     descriptioncription:
//       "The objective of this SEP is to provide a thorough knowledge of today's technologies. Significant interactive sessions with specialists will be held on several topics such as Full stack development, Big Data & Analytics, data science, and many others. The technical program will feature cutting-edge sessions focused on Insights, Research problems, and maybe hands-on activities in the aforementioned research fields. The participants from academia and industry will learn a lot from this program, and it will serve as a manual for learning and doing research activities to educate the participants on how to approach problems both theoretically and operationally. By taking this SEP course, participants will learn how to create intelligent systems that incorporate the focus areas and how it can be used to address industrial applications.",
//   },
//   {
//     id: "5th-acm-w-hackathon",
//     name: "5th ACM-W INDIA \nNational Level Hackathon 2020",
//     date: "19 Dec 2022",
//     logo: "/assets/hackw.jpg",
//     banners: ["/"],
//     descriptioncription:
//       "ACM-W organised a National Hackathon for girls students with a team of 3 members which consisted of 2 rounds on 19th&20th where teams has to make their project on the topic given by the committee on the spot.The theme of the hackathon was SELF RELIANT INDIA – a small step towards Self Reliant India for innovative ideas using IT Solution in domains such as - Health Care,Finance, Agriculture, Education and Social innovation.",
//   },
//   {
//     id: "smart-abes-hackathon",
//     name: "Smart ABES Hackathon",
//     date: "5 Oct 2022",
//     logo: "/assets/hacks.jpg",
//     banners: ["/"],
//     descriptioncription:
//       "The event was a hit, total 98 teams registered. In round 0, total 45 teams qualified out of which 23 teams got selected for round 2 that was build up round. At last 10 teams were selected for final round. The event was attended by approx. 110 students/faculties.",
//   },
//   {
//     id: "dev-x",
//     name: "DEV X (A Web Development Contest)",
//     date: "12 Dec 2020",
//     logo: "/assets/dev.jpg",
//     banners: ["/"],
//     descriptioncription:
//       "Here you will be provided with a prototype of a website. You have to code the frontend based on that prototype given to you using any language or technology time limit : 3 Hours Γ£¿Entries would be accepted through GitHub So what are you waiting for, Register to flaunt and take ship to enhance your skills!!  All the Best!!",
//   },
// ];
