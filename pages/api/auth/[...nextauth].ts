import NextAuth from "next-auth/next";
import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from '../../../prisma/client'
import type { Adapter } from "next-auth/adapters"
const adapter = PrismaAdapter(prisma)
export const authOptions : NextAuthOptions={
    adapter: adapter?adapter as  Adapter : undefined,
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID  as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      }),
    ] ,
}
export default NextAuth(authOptions);

