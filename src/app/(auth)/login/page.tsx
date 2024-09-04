import { login } from "@/app/actions/auth";
import { LoginForm } from "@/components/loginForm";

export default function Login() {
  return <LoginForm login={login} />;
}
