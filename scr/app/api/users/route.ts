import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";


export async function POST(req: Request) {
try {
const { email, password, name } = await req.json();
if (!email || !password) {
return NextResponse.json({ error: "Missing fields" }, { status: 400 });
}
const existing = await prisma.user.findUnique({ where: { email } });
if (existing) return NextResponse.json({ error: "User exists" }, { status: 409 });
const hashed = await bcrypt.hash(password, 10);
const user = await prisma.user.create({ data: { email, password: hashed, name } });
return NextResponse.json({ user }, { status: 201 });
} catch (err) {
return NextResponse.json({ error: "Server error" }, { status: 500 });
}
}
