import { AuthLayout } from "@/components/auth/AuthLayout";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthLayout 
      title="Create Account" 
      subtitle="Join us today! Enter your details to get started."
    >
      <RegisterForm />
    </AuthLayout>
  );
}
