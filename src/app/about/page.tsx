import { Timeline } from "@/components/ui/timeline"
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import React from "react";
import { title } from "process";
import { id } from "zod/v4/locales";

const AboutPage = () => {

  const timelineData = [
    { id: 1,
      title: "1947",
      content: (
      <div key="content-1947"> 
        <p key="1947-title">Founded</p>
        <p key="1947-desc">The institution was founded in 1947 with a bold vision for the newly independent nation: to cultivate a 
          generation of thinkers, innovators, and leaders who would drive social and technological transformation. 
          Beginning with only a small faculty and limited resources, the founders built an environment centered on 
          curiosity, academic rigor, and inclusivity. Over the years, the institution established its reputation for 
          pioneering research and a strong commitment to nurturing young talent through quality education.</p>
      </div>  
    ) },
    { 
      id: 2,
      title: "1966",
      content: (
      <div key="content-1966">
        <p key="1966-title">Turing Award</p>
        <p key="1966-desc">A historic moment unfolded in 1966 when one of our distinguished faculty members was honored with the 
          prestigious Turing Award. This achievement not only brought global recognition to the institution but also 
          marked a turning point in its academic journey. The award celebrated groundbreaking contributions to 
          foundational computer science, elevating the institution's global standing and inspiring a culture where 
          innovation, research excellence, and fearless experimentation became defining traits of our identity.</p>
      </div>
    ) },
    { 
      id: 3,
      title: "2000",
      content: (
      <div key="content-2000">
        <p key="2000-title">Digital Library</p>
        <p key="2000-desc">With the dawn of a digital era, the year 2000 marked a major milestone through the launch of the Digital 
          Knowledge Library — one of the most transformative initiatives in our history. This ambitious project 
          digitized thousands of rare manuscripts, academic papers, archival materials, and learning resources 
          previously accessible only within physical premises. By embracing modern technology, the initiative 
          democratized knowledge, enabling global researchers, students, and historians to access invaluable content 
          from anywhere in the world. The Digital Library later expanded into an interactive platform offering 
          multimedia resources, e-learning modules, and collaborative virtual tools.</p>
      </div>
    ) },
    { id: 4,
      title: "2024",
      content: (
        <div key="content-2024">
          <p key="2024-title">Diversity Commitment</p>
          <p key="2024-desc">
            In 2024, the institution reaffirmed its dedication to building an inclusive, equitable,
            and progressive learning ecosystem by introducing a comprehensive Diversity, Equity, and
            Inclusion (DEI) Commitment. This initiative introduced new scholarships for underrepresented
            groups, mentorship programs, accessible learning spaces, workshops for cultural sensitivity,
            and policies supporting equal participation in academic and leadership roles. The DEI Commitment
            not only strengthened community values but also ensured that every member — irrespective of
            background, identity, or ability — felt heard, supported, and empowered to excel.
          </p>
        </div>
      ) },
    
  ];

  return (
    <div className="overflow-hidden">
          <BackgroundGradientAnimation
            gradientBackgroundStart="rgb(9, 9, 26)"
            gradientBackgroundEnd="rgb(9, 9, 26)"
          >
            <div className="mt-30">
              <p className="z-10 flex items-center px-28 text-start text-3xl font-bold text-white md:text-4xl lg:text-7xl text-[#a1a1a1]">About ACM</p>
              <p className="z-10 flex items-center px-28 text-start text-3xl text-white md:text-4xl lg:text-6xl text-[#a1a1a1]">Innovation Beyond Boundaries</p>
            </div>
              <div className="flex absolute justify-evenly text-center w-[100%] top-56 lg:top-76 flex-wrap gap-15">
                <div className="w-78">
                  <p className="font-bold">Our Mission</p>
                  <p>Promote research innovation and collaboration in computer science and engineering.</p>
                </div>
                <div className="w-78">
                  <p className="font-bold">Our Goals</p>
                  <p>Enhance education recognition and opportunities for individuals in commuting fields.</p>
                </div>
                <div className="w-78">
                  <p className="font-bold">Our Story</p>
                  <p>Founded in 1947, ACM is the world's largest computing society, with members in over 100 countries.</p>
                </div>
              </div>
          </BackgroundGradientAnimation>
          <Timeline data={timelineData} />
          <div className="h-100"></div>
          
          
          {/*<QuoteSection />*/}
    
          {/*<div className="h-screen bg-[linear-gradient(-40deg,var(--gradient-background-end),var(--gradient-background-start))]"></div>*/}
        </div>
  );
};

export default AboutPage;
