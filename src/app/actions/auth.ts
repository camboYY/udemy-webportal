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
    body: JSON.stringify({ ...props, role: "teacher" }),
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
  let redirectPath: string | null = null;

  try {
    const auth = await fetch(`http://103.252.119.85:8080/api/auth/login`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: new Headers({ "content-type": "application/json" }),
      mode: "no-cors",
    });

    if (auth.ok) {
      const { token } = await auth.json();
      redirectPath = "/dashboard/overview";
      await createSession({ token });
    }
  } catch (e) {
    redirectPath = "/login";
    console.log(e);
  } finally {
    if (redirectPath) redirect(redirectPath);
  }
}
