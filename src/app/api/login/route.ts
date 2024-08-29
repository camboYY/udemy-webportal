import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const response = await request.json();
  const { username, password } = response;
  const newPassword = bcrypt.hash(password, 10);

  console.log({ username, password, newPassword });
  return NextResponse.json({ success: "you have submit successfully." });
}
