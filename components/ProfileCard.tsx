"use client";

import React from "react";
import { motion } from "motion/react"
import { FaLinkedin, FaGithub, FaGraduationCap, FaUser, FaChalkboardTeacher } from "react-icons/fa";
import clsx from "clsx";

type CardType = "student" | "alumni" | "teacher";

interface ProfileCardProps {
  image: string;
  name: string;
  role: string;
  linkedin?: string;
  github?: string;
  type?: CardType;
}

const typeStyles = {
  student: "bg-white/30 backdrop-blur-md border border-white/20 shadow-lg",
  alumni: "bg-gradient-to-br from-yellow-100/60 to-yellow-300/30 border-yellow-400/40 shadow-yellow-200",
  teacher: "bg-gradient-to-br from-blue-100/60 to-blue-300/30 border-blue-400/40 shadow-blue-200",
};

const iconByType = {
  student: <FaUser className="text-gray-500 text-xl absolute top-3 right-3" />,
  alumni: <FaGraduationCap className="text-yellow-600 text-xl absolute top-3 right-3" />,
  teacher: <FaChalkboardTeacher className="text-white-600 text-xl absolute top-3 right-3" />,
};

const ProfileCard: React.FC<ProfileCardProps> = ({
  image,
  name,
  role,
  linkedin,
  github,
  type = "student",
}) => (

  <div className="perspective w-full max-w-xs mx-auto">
  <motion.div
    whileHover={{ rotateY: 180 }}
    transition={{ duration: 0.2 }}
    className={clsx(
      "relative w-full h-[200px] transform-style-preserve-3d transition-transform duration-700",
      "rounded-2xl cursor-pointer"
    )}
  >
    {/* Front Side */}
    <div className={clsx(
      "absolute w-full h-full backface-hidden p-5 flex flex-col items-center",
      "rounded-2xl shadow-lg",
      typeStyles[type]
    )}
      style={{
        boxShadow: "0 8px 32px 0 rgba(31,38,135,0.17)",
        border: "1px solid rgba(255,255,255,0.18)",
      }}
    >
      {iconByType[type]}
      <img
        src={image}
        alt={name}
        className="w-24 h-24 rounded-full object-cover border-4 border-white/40 shadow-md mb-3"
        loading="lazy"
      />
      <h3 className="font-bold text-lg text-gray-800 drop-shadow">{name}</h3>
      <p className={clsx(
        "text-sm mt-2 mb-2",
        type === "alumni" ? "text-white-700" : type === "teacher" ? "text-blue-700" : "text-yellow-600"
      )}>
        {role}
      </p>
      
    </div>

    {/* Back Side */}
    <div className={clsx(
      "absolute w-full h-full backface-hidden rotate-y-180 p-5 flex flex-col items-center justify-center",
      "rounded-2xl shadow-lg bg-white"
    )}>
      <h3 className="font-bold text-lg text-gray-800 mb-2">Contact</h3>
      <p className="text-sm text-gray-700 mb-2">Connect with me</p>
      <div className="flex gap-4">
        {linkedin && (
          <a href={linkedin} target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-blue-600 hover:text-blue-800 text-2xl transition" />
          </a>
        )}
        {github && (
          <a href={github} target="_blank" rel="noopener noreferrer">
            <FaGithub className="text-gray-700 hover:text-black text-2xl transition" />
          </a>
        )}
      </div>
    </div>
  </motion.div>
</div>

  
  // <motion.div
  //   initial={{ opacity: 1, y: 40 }}
  //   whileInView={{ opacity: 1, y: 1 }}
  //   whileHover={{ scale: 1.14, boxShadow: "6px 8px 32px 10px rgba(31, 38, 135, 0.37)" }}
  //   transition={{ duration: 0.1, type: "spring" }}
  //   viewport={{ once: true }}
  //   className={clsx(
  //     "relative rounded-2xl p-5 flex flex-col items-center min-w-[220px] max-w-xs mx-auto",
  //     "transition-all duration-200 cursor-pointer",
  //     typeStyles[type]
  //   )}
  //   style={{
  //     boxShadow: "0 8px 32px 0 rgba(31,38,135,0.17)",
  //     border: "1px solid rgba(255,255,255,0.18)",
  //   }}
  // >
  //   {iconByType[type]}
  //   <img
  //     src={image}
  //     alt={name}
  //     className="w-24 h-24 rounded-full object-cover border-4 border-white/40 shadow-md mb-3"
  //     loading="lazy"
  //   />
  //   <h3 className="font-bold text-lg text-gray-800 drop-shadow">{name}</h3>
  //   <p className={clsx(
  //     "text-sm mt-1 mb-2",
  //     type === "alumni" ? "text-white-700" : type === "teacher" ? "text-blue-700" : "text-yellow-600"
  //   )}>
  //     {role}
  //   </p>
  //   <div className="flex gap-3 mt-2">
  //     {linkedin && (
  //       <a href={linkedin} target="_blank" rel="noopener noreferrer">
  //         <FaLinkedin className="text-blue-600 hover:text-blue-800 text-xl transition" />
  //       </a>
  //     )}
  //     {github && (
  //       <a href={github} target="_blank" rel="noopener noreferrer">
  //         <FaGithub className="text-gray-700 hover:text-black text-xl transition" />
  //       </a>
  //     )}
  //   </div>
  // </motion.div>
);

export default ProfileCard;
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// import React, { useState } from "react";
// import { motion, useMotionValue, useTransform } from "motion/react";
// import { FaLinkedin, FaGithub, FaGraduationCap, FaUser, FaChalkboardTeacher } from "react-icons/fa";
// import clsx from "clsx";

// type CardType = "student" | "alumni" | "teacher";

// interface ProfileCardProps {
//   image: string;
//   name: string;
//   role: string;
//   linkedin?: string;
//   github?: string;
//   type?: CardType;
// }

// const typeStyles = {
//   student: "bg-white/30 backdrop-blur-md border border-white/20 shadow-lg",
//   alumni: "bg-gradient-to-br from-yellow-100/60 to-yellow-300/30 border-yellow-400/40 shadow-yellow-200",
//   teacher: "bg-gradient-to-br from-blue-100/60 to-blue-300/30 border-blue-400/40 shadow-blue-200",
// };

// const iconByType = {
//   student: <FaUser className="text-gray-500 text-xl absolute top-3 right-3" />,
//   alumni: <FaGraduationCap className="text-yellow-600 text-xl absolute top-3 right-3" />,
//   teacher: <FaChalkboardTeacher className="text-white-600 text-xl absolute top-3 right-3" />,
// };

// const ProfileCard: React.FC<ProfileCardProps> = ({
//   image,
//   name,
//   role,
//   linkedin,
//   github,
//   type = "student",
// }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const x = useMotionValue(0);
//   const y = useMotionValue(0);
//   const rotateX = useTransform(y, [0, 300], [15, -15]);
//   const rotateY = useTransform(x, [0, 300], [-15, 15]);

//   return (
//     <div
//       className="perspective w-full max-w-xs mx-auto"
//       onMouseMove={(e) => {
//         const rect = e.currentTarget.getBoundingClientRect();
//         x.set(e.clientX - rect.left);
//         y.set(e.clientY - rect.top);
//       }}
//     >
//       <motion.div
//         style={{ rotateX, rotateY }}
//         whileHover={{ rotateY: 180 }}
//         transition={{ duration: 0.4 }}
//         className={clsx(
//           "relative w-full h-[300px] transform-style-preserve-3d transition-transform duration-700",
//           "rounded-2xl cursor-pointer"
//         )}
//         onClick={() => setIsModalOpen(true)}
//       >
//         {/* Front Side */}
//         <div
//           className={clsx(
//             "absolute w-full h-full backface-hidden p-5 flex flex-col items-center",
//             "rounded-2xl shadow-lg",
//             typeStyles[type]
//           )}
//           style={{
//             boxShadow: "0 8px 32px 0 rgba(31,38,135,0.17)",
//             border: "1px solid rgba(255,255,255,0.18)",
//           }}
//         >
//           {iconByType[type]}
//           <img
//             src={image}
//             alt={name}
//             className="w-24 h-24 rounded-full object-cover border-4 border-white/40 shadow-md mb-3"
//             loading="lazy"
//           />
//           <h3 className="font-bold text-lg text-gray-800 drop-shadow">{name}</h3>
//           <p
//             className={clsx(
//               "text-sm mt-1 mb-2",
//               type === "alumni"
//                 ? "text-white-700"
//                 : type === "teacher"
//                 ? "text-blue-700"
//                 : "text-yellow-600"
//             )}
//           >
//             {role}
//           </p>
//         </div>

//         {/* Back Side */}
//         <div
//           className={clsx(
//             "absolute w-full h-full backface-hidden rotate-y-180 p-5 flex flex-col items-center justify-center",
//             "rounded-2xl shadow-lg bg-white"
//           )}
//         >
//           <h3 className="font-bold text-lg text-gray-800 mb-2">Contact</h3>
//           <p className="text-sm text-gray-700 mb-2">Connect with me</p>
//           <div className="flex gap-4">
//             {linkedin && (
//               <a href={linkedin} target="_blank" rel="noopener noreferrer">
//                 <FaLinkedin className="text-blue-600 hover:text-blue-800 text-2xl transition" />
//               </a>
//             )}
//             {github && (
//               <a href={github} target="_blank" rel="noopener noreferrer">
//                 <FaGithub className="text-gray-700 hover:text-black text-2xl transition" />
//               </a>
//             )}
//           </div>
//         </div>
//       </motion.div>

//       {/* Modal for more info */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
//           <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-lg relative">
//             <button
//               className="absolute top-2 right-4 text-xl font-bold text-gray-600 hover:text-red-500"
//               onClick={() => setIsModalOpen(false)}
//             >
//               &times;
//             </button>
//             <img src={image} alt={name} className="w-24 h-24 mx-auto rounded-full mb-3" />
//             <h3 className="text-xl font-bold text-center mb-1">{name}</h3>
//             <p className="text-center text-gray-500 mb-3">{role}</p>
//             <p className="text-sm text-gray-700 text-center">
//               Detailed bio, achievements, event roles, or a quote can go here.
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfileCard;






//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// // export { ProfileCard }; // Exporting for use in other components

// "use client";
// import React from "react";
// import { FaLinkedin, FaGithub, FaGraduationCap, FaUser } from "react-icons/fa";
// import clsx from "clsx";

// type CardType = "student" | "alumni" | "teacher";

// interface ProfileCardProps {
//   image: string;
//   name: string;
//   role: string;
//   linkedin?: string;
//   github?: string;
//   type?: CardType;
// }

// const typeStyles = {
//   student: "bg-white/30 backdrop-blur-md border border-white/20 shadow-lg",
//   alumni: "bg-gradient-to-br from-yellow-100/60 to-yellow-300/30 border-yellow-400/40 shadow-yellow-200",
//   teacher: "bg-gradient-to-br from-blue-100/60 to-blue-300/30 border-blue-400/40 shadow-blue-200",
// };

// const iconByType = {
//   student: <FaUser className="text-gray-500 text-xl absolute top-3 right-3" />,
//   alumni: <FaGraduationCap className="text-yellow-600 text-xl absolute top-3 right-3" />,
//   teacher: <FaGraduationCap className="text-blue-600 text-xl absolute top-3 right-3" />,
// };

// const ProfileCard= ({
//   image,
//   name,
//   role,
//   linkedin,
//   github,
//   type = "student",
// }) => (
//   <div
//     className={clsx(
//       "relative rounded-2xl p-5 flex flex-col items-center min-w-[220px] max-w-xs mx-auto",
//       "transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl opacity-0 animate-fade-in",
//       typeStyles[type]
//     )}
//     style={{
//       boxShadow: "0 8px 32px 0 rgba(31,38,135,0.17)",
//       border: "1px solid rgba(255,255,255,0.18)",
//     }}
//   >
//     {iconByType[type]}
//     {/* <img
//       src={image}
//       alt={name}
//       className="w-24 h-24 rounded-full object-cover border-4 border-white/40 shadow-md mb-3"
//       loading="lazy"
//     /> */}
//     {image ? (
//   <img
//     src={image}
//     alt={name}
//     className="w-24 h-24 rounded-full object-cover border-4 border-white/40 shadow-md mb-3"
//     loading="lazy"
//   />
// ) : null}

//     <h3 className="font-bold text-lg text-gray-800 drop-shadow">{name}</h3>
//     <p className={clsx(
//       "text-sm mt-1 mb-2",
//       type === "alumni" ? "text-yellow-700" : type === "teacher" ? "text-blue-700" : "text-gray-600"
//     )}>
//       {role}
//     </p>
//     <div className="flex gap-3 mt-2">
//       {linkedin && (
//         <a href={linkedin} target="_blank" rel="noopener noreferrer">
//           <FaLinkedin className="text-blue-600 hover:text-blue-800 text-xl transition" />
//         </a>
//       )}
//       {github && (
//         <a href={github} target="_blank" rel="noopener noreferrer">
//           <FaGithub className="text-gray-700 hover:text-black text-xl transition" />
//         </a>
//       )}
//     </div>
//   </div>
// );

// export default ProfileCard;

