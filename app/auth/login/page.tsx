import { Suspense } from "react";
import { LoginForm } from "@/components/AuthForms";
import { defaultOGConfig } from "@/lib/constants";
import { providerMap, signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { AuthError } from "next-auth";

export const metadata = {
  title: "Login",
  description: "Login to your account on ABES ACM",
  openGraph: {
    ...defaultOGConfig,
  },
};

interface LoginPageProps {
  searchParams: {
    redirect?: string;
  };
}

const LoginPage = (props: LoginPageProps) => {
  return (
    <div></div>
    // <Suspense>
    //   <LoginForm />
    // </Suspense>
  );
};

export default LoginPage;
