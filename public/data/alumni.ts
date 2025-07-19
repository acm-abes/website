export interface Alumni {
  image: string;
  name: string;
  role: string;
  linkedin?: string;
  github?: string;
}
export const alumni: Alumni[] = [ 
    {image: "images/team/default.jpg", name: "Dumbledoer", role: "CEO", linkedin: "https://www.linkedin.com/in/raj-kumar-rajput-1b0a4a1b2/", github: "blank"},
    {image: "images/team/default.jpg", name: "Pooja", role: "CTO", linkedin: "https://www.linkedin.com/in/pooja-rajput-0a51a7299/", github: "blank"},
    {image: "images/team/default.jpg", name: "Priyanka", role: "CFO", linkedin: "https://www.linkedin.com/in/priyanka-rajput-0a51a7299/", github: "blank"},
    {image: "images/team/default.jpg", name: "Sachin", role: "COO", linkedin: "https://www.linkedin.com/in/sachin-mishra-0a51a7299/", github: "blank"},
 ];