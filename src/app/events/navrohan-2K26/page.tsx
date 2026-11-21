import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Old_Standard_TT } from "next/font/google";
import { ArrowLeft, CalendarDays, Clock3, MapPin, Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const oldStandardTT = Old_Standard_TT({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "NAVROHAN 2K26 | ABES ACM",
  description:
    "NAVROHAN 2K26, the recruitment drive of the ABES ACM and ABES ACM-W Student Chapters.",
  openGraph: {
    title: "NAVROHAN 2K26 | ABES ACM",
    description: "A community for curious minds. Explore the NAVROHAN 2K26 recruitment drive.",
    images: ["/events/navrohan-2k26.png"],
  },
};

const NavrohanPage = () => {
  return (
    <main className="mx-auto mb-20 flex w-full max-w-6xl flex-col gap-14 px-6 pt-28 md:px-10">
      <Link
        href="/events"
        className="inline-flex w-fit items-center rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />Back to Events
      </Link>

      <section className="grid items-center gap-10 md:grid-cols-2">
        <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-xl border">
          <Image
            src="/events/navrohan-2k26.png"
            alt="NAVROHAN 2K26 ACM recruitment poster"
            width={1122}
            height={1402}
            priority
            className="h-auto w-full object-contain"
          />
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="destructive" className="animate-pulse">Recruitment drive</Badge>
            <Badge variant="outline">2026</Badge>
          </div>
          <h1 className={`text-5xl font-bold md:text-7xl ${oldStandardTT.className}`}>NAVROHAN 2K26</h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            A community for curious minds. NAVROHAN 2K26 is the recruitment drive of the ABES ACM Student Chapter and ABES ACM-W Student Chapter, inviting second-year students to explore their interests and become part of the community.
          </p>
          <div className="flex flex-col gap-4 text-sm">
            <div className="flex items-center gap-3"><CalendarDays className="text-muted-foreground h-5 w-5" /><span>23 October – 23 November 2026</span></div>
            <div className="flex items-center gap-3"><MapPin className="text-muted-foreground h-5 w-5" /><span>ABES Engineering College, Ghaziabad (Online Recruitment – Google Meet)</span></div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-5">
        <h2 className={`text-4xl font-semibold ${oldStandardTT.className}`}>About Navrohan</h2>
        <p className="text-muted-foreground max-w-4xl text-lg leading-relaxed">
          The recruitment process is designed to give students an opportunity to showcase their creativity, interests, and enthusiasm for learning and collaboration. Round 1 involved a one-minute video task, followed by individual interviews in Round 2.
        </p>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className={`text-4xl font-semibold ${oldStandardTT.className}`}>Recruitment Timeline</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-xl border bg-card p-6">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="text-2xl font-semibold">Round 1 – Video Task</h3>
              <Badge variant="secondary">Completed</Badge>
            </div>
            <p className="text-muted-foreground leading-relaxed">Candidates submitted a one-minute video task. The submission deadline was on 1 November 2026.</p>
            <p className="mt-4 text-sm font-medium">Qualifier list announced</p>
          </div>
          <div className="rounded-xl border border-primary/40 bg-primary/5 p-6">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="text-2xl font-semibold">Round 2 – Interviews</h3>
              <Badge variant="destructive">Scheduled</Badge>
            </div>
            <div className="text-muted-foreground flex flex-col gap-3">
              <p className="flex items-center gap-2"><CalendarDays className="h-4 w-4" />20 November 2026</p>
              <p className="flex items-center gap-2"><Clock3 className="h-4 w-4" />7:00 PM – 9:00 PM</p>
              <p className="flex items-center gap-2"><Video className="h-4 w-4" />Online, through domain-wise Google Meet rooms</p>
            </div>
            <p className="mt-4 text-sm leading-relaxed">Interviews will be conducted individually. Each candidate will be allotted 8 minutes. Exact timings and meeting links will be shared by the respective domain Point of Contact.</p>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <div>
          <h2 className={`text-4xl font-semibold ${oldStandardTT.className}`}>Round 1 Qualifiers</h2>
          <p className="text-muted-foreground mt-2">The following qualifier posters were shared for Round 1.</p>
        </div>
        <div className="grid items-start gap-6 md:grid-cols-2">
          <figure className="overflow-hidden rounded-xl border bg-card">
            <Image src="/events/navrohan-round-1-qualifiers-1.png" alt="Navrohan Round 1 qualifiers list, poster one" width={768} height={1024} className="h-auto w-full" />
            <figcaption className="p-3 text-center text-sm text-muted-foreground">Round 1 Qualifiers – List 1</figcaption>
          </figure>
          <figure className="overflow-hidden rounded-xl border bg-card">
            <Image src="/events/navrohan-round-1-qualifiers-2.png" alt="Navrohan Round 1 qualifiers list, poster two" width={960} height={1280} className="h-auto w-full" />
            <figcaption className="p-3 text-center text-sm text-muted-foreground">Round 1 Qualifiers – List 2</figcaption>
          </figure>
        </div>
      </section>

      <section className="rounded-xl border p-6 md:p-8">
        <h2 className={`text-3xl font-semibold ${oldStandardTT.className}`}>What happens next?</h2>
        <p className="text-muted-foreground mt-3 leading-relaxed">Round 2 is the final round of the recruitment process. Final selection results will be added here once they are officially announced.</p>
        <div className="mt-5"><Badge variant="outline">Round 2 results: Awaited</Badge></div>
      </section>
    </main>
  );
};

export default NavrohanPage;
