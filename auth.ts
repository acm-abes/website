import NextAuth from "next-auth";
import GitHub from "@auth/core/providers/github";
import { Provider } from "@auth/core/providers";
import Google from "@auth/core/providers/google";

const providers: Provider[] = [
  // GitHub({
  //   profile(data) {
  //     const { email, name, login, avatar_url, type } = data;
  //
  //     return {
  //       email,
  //       name: name || login || "Anonymous",
  //       avatar_url,
  //       type,
  //     };
  //   },
  // }),

  Google({
    authorization: {
      params: {
        prompt: "consent",
        access_type: "offline",
        response_type: "code",
      },
    },
  }),
];

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  // pages: {
  //   signIn: "/auth/login",
  //   newUser: "/auth/register",
  // },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
    async jwt({ token, user, profile }) {
      if (user) {
        token.id = user.id || profile?.id; // Add `profile.id` if `user.id` isn't available.
      }
      return token;
    },
  },
});

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter((provider) => provider.id !== "credentials");

export const runtime = "edge";
