export interface Team {
  role: string;
  name: string;
  github: string;
  linkedin: string;
  image: string;
}

export interface Event {
  id: string;
  name: string;
  banners: string;
  logo: string;
  date: Date;
  description: string;
  sponsors: string[];
}
