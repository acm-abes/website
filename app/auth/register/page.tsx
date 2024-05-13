import { Suspense } from "react";
import { RegisterForm } from "@/components/AuthForms";
import { defaultOGConfig } from "@/lib/constants";

export const metadata = {
  title: "Register",
  description: "Register for an account on ABES ACM",
  openGraph: {
    ...defaultOGConfig,
  },
};

const RegisterPage = () => {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  );
};

export default RegisterPage;
