import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";


export const authOptions = {
adapter: PrismaAdapter(prisma),
providers: [
CredentialsProvider({
name: "Credentials",
credentials: {
email: { label: "Email", type: "text" },
password: { label: "Password", type: "password" }
},
async authorize(credentials) {
if (!credentials?.email || !credentials.password) return null;
const user = await prisma.user.findUnique({ where: { email: credentials.email } });
if (!user || !user.password) return null;
const isValid = await bcrypt.compare(credentials.password, user.password);
if (!isValid) return null;
return user;
}
})
],
session: { strategy: "jwt" },
secret: process.env.NEXTAUTH_SECRET,
callbacks: {
async session({ session, token }) {
if (session.user) session.user.id = token.sub as string;
return session;
}
}
};


export default NextAuth(authOptions as any);
