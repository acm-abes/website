import Link from "next/link";
import { Old_Standard_TT } from "next/font/google";
import { Button } from "@/components/ui/button";
import { UserX } from "lucide-react";

const oldStandardTT = Old_Standard_TT({
  subsets: ["latin"],
  weight: "400",
});

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-8">
      <div className="text-center">
        <UserX className="text-muted-foreground mx-auto mb-6 h-24 w-24 opacity-50" />
        <h1
          className={`mb-4 text-5xl font-bold md:text-7xl ${oldStandardTT.className}`}
        >
          User Not Found
        </h1>
        <p className="text-muted-foreground mb-8 text-lg">
          The user profile you're looking for doesn't exist or has been removed.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/team">
            <Button>View Team Members</Button>
          </Link>
          <Link href="/">
            <Button variant="outline">Go Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
