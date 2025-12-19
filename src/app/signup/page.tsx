import { redirect } from "next/navigation";

export default function SignupPage() {
  // Redirect to register page since we're using phone auth
  redirect("/register");
}