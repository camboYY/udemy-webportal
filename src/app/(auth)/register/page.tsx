import { signup } from "@/app/actions";
import { RegisterForm } from "@/components";
import React from "react";
export default function Register() {
  return <RegisterForm onRegister={signup} />;
}
