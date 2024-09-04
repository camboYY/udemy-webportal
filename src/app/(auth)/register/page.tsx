import { signup } from "@/app/actions/auth";
import { RegisterForm } from "@/components";
import React from "react";
export default function Register() {
  return <RegisterForm onRegister={signup} />;
}
