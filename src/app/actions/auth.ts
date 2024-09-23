"use server";

import { redirect } from "next/navigation";
import { createSession, deleteSession } from "../_lib/lib";
import { RegisterFormProp } from "@/types";

export async function logout() {
  deleteSession();
  redirect("/login");
}

export async function signup(props: RegisterFormProp) {
  const auth = await fetch(`http://103.252.119.85:8080/api/auth/signup`, {
    method: "POST",
    body: JSON.stringify({ ...props, role: ["admin"] }),
    headers: new Headers({ "content-type": "application/json" }),
    mode: "no-cors",
  });
  if (auth.ok) {
    redirect("/login");
  }
}

export async function login({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const auth = await fetch(`http://103.252.119.85:8080/api/auth/login`, {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: new Headers({ "content-type": "application/json" }),
    mode: "no-cors",
  });

  if (auth.ok) {
    const { token } = await auth.json();
    await createSession(token);
    redirect("/dashboard/overview");
  }
}
