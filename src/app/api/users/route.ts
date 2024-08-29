import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  const { name, email, password } = await req.json();
  console.log({ req, res, name, email, password });

  return NextResponse.json({ success: "Hello world" });
}
