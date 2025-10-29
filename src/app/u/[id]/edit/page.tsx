import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getUserProfile } from "@/actions/profile";
import { EditProfileForm } from "@/components/EditProfileForm";
import { Old_Standard_TT } from "next/font/google";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const oldStandardTT = Old_Standard_TT({
  subsets: ["latin"],
  weight: "400",
});

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const EditProfilePage = async ({ params }: PageProps) => {
  const session = await auth();
  const { id } = await params;

  // Must be logged in
  if (!session?.user) {
    redirect("/auth");
  }

  // Fetch the user being edited
  const user = await getUserProfile(id);

  if (!user) {
    redirect("/");
  }

  // Can only edit own profile
  if (user.id !== session.user.id) {
    redirect(`/u/${user.email?.split("@")[0]}`);
  }

  const getInitials = (name?: string | null) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <main className="mb-20 flex flex-col gap-12 px-8 pt-28 md:px-16 lg:px-32">
      <div className="mx-auto w-full max-w-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1
            className={`text-4xl font-bold md:text-5xl ${oldStandardTT.className} mb-4`}
          >
            Edit Profile
          </h1>
          <p className="text-muted-foreground">
            Update your name and profile picture
          </p>
        </div>

        {/* Current Profile Preview */}
        <div className="bg-muted/30 mb-8 flex items-center gap-4 rounded-lg p-6">
          <Avatar className="h-20 w-20 border-4">
            <AvatarImage src={user.image || ""} alt={user.name || "User"} />
            <AvatarFallback className="text-2xl">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-xl font-semibold">{user.name}</h3>
            <p className="text-muted-foreground text-sm">{user.email}</p>
          </div>
        </div>

        {/* Edit Form */}
        <EditProfileForm user={user} />
      </div>
    </main>
  );
};

export default EditProfilePage;
