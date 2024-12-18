import { Suspense } from "react";
import { LoginForm } from "@/components/AuthForms";
import { defaultOGConfig } from "@/lib/constants";
import { providerMap, signIn } from "@/auth";

export const metadata = {
  title: "Login",
  description: "Login to your account on ABES ACM",
  openGraph: {
    ...defaultOGConfig,
  },
};

const LoginPage = () => {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
};

export default LoginPage;
