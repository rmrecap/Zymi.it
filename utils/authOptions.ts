import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/utils/db";
import { nanoid } from "nanoid";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const masterEmail = (process.env.ADMIN_SECURE_EMAIL || "admin@zymi.it").toLowerCase();
        const masterPassword = process.env.ADMIN_SECURE_PASSWORD || "ZymiMaster2026@Secure";

        // 1. High-Security Master Admin Bootstrap Check
        if (
          credentials.email.toLowerCase() === masterEmail &&
          credentials.password === masterPassword
        ) {
          return {
            id: "master-admin-01",
            email: masterEmail,
            role: "admin",
          };
        }

        // 2. Database User Verification
        try {
          const user = await prisma.user.findFirst({
            where: {
              email: credentials.email,
            },
          });
            if (user && user.password) {
              const isPasswordCorrect = await bcrypt.compare(
                credentials.password,
              user.password
              );
              if (isPasswordCorrect) {
                return {
                  id: user.id,
                  email: user.email,
                  role: user.role || "user",
                };
              }
            }
          } catch (err: any) {
            console.warn("[NextAuth] Database query notice during authorize:", err?.message || err);
          }

          return null;
        },
    }),
  ],
  callbacks: {
    async signIn({ user, account }: any) {
      if (account?.provider === "credentials") {
        return true;
      }

      // Handle OAuth providers
      if (account?.provider === "github" || account?.provider === "google") {
        try {
          const existingUser = await prisma.user.findFirst({
            where: {
              email: user.email!,
            },
          });

          if (!existingUser) {
            await prisma.user.create({
              data: {
                id: nanoid(),
                email: user.email!,
                role: "user",
                password: null,
              },
            });
          }
          return true;
        } catch (error) {
          console.error("Error in signIn callback:", error);
          return false;
        }
      }

      return true;
    },
    async jwt({ token, user }: any): Promise<any> {
      if (user) {
        token.role = user.role || "user";
        token.id = user.id;
        token.iat = Math.floor(Date.now() / 1000);
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 15 * 60,
    updateAge: 5 * 60,
  },
  jwt: {
    maxAge: 15 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

export default authOptions;

