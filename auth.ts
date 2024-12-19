import NextAuth from "next-auth";
import GitHub from "@auth/core/providers/github";
import { Provider } from "@auth/core/providers";

const providers: Provider[] = [
  // Credentials({
  //   type: "credentials",
  //   name: "",
  //   credentials: {
  //     email: {
  //       label: "Email",
  //       type: "email",
  //       placeholder: "user@example.com",
  //     },
  //     password: { label: "Password", type: "password" },
  //   },
  //
  //   async authorize(credentials, d) {
  //     const { email, password } = credentials;
  //
  //     const user = { email: "John Doe", password: "" };
  //
  //     return user;
  //   },
  // }),
  GitHub({
    profile(data) {
      const { email, name, login, avatar_url, type } = data;

      return {
        email,
        name,
        login,
        avatar_url,
        type,
      };
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
