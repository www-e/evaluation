import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthLayout 
      title="Welcome Back" 
      subtitle="Login with your phone number to continue."
    >
      <LoginForm />
    </AuthLayout>
  );
}
