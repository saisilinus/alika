import type { NextAuthOptions } from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import clientPromise from "./mongodb";
import { findUserByEmail, createUser, updateUser } from "./database";

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user.email) return false;

      try {
        // Check if user exists
        let existingUser = await findUserByEmail(user.email);

        if (!existingUser) {
          // Create new user with default role
          existingUser = await createUser({
            name: user.name || "",
            email: user.email,
            image: user.image || "",
            role: "user",
            isActive: true,
          });
        } else {
          // Update user info if needed
          const updates: any = {};
          if (user.name && user.name !== existingUser.name) {
            updates.name = user.name;
          }
          if (user.image && user.image !== existingUser.image) {
            updates.image = user.image;
          }

          if (Object.keys(updates).length > 0) {
            await updateUser(existingUser._id!.toString(), updates);
          }
        }

        return true;
      } catch (error) {
        console.error("Sign in error:", error);
        return false;
      }
    },
    async session({ session, token }) {
      if (session.user?.email) {
        const user = await findUserByEmail(session.user.email);
        if (user) {
          session.user.id = user._id!.toString();
          session.user.role = user.role;
          session.user.isActive = user.isActive;
        }
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: "user" | "admin" | "moderator";
      isActive: boolean;
    };
  }

  interface User {
    role: "user" | "admin" | "moderator";
    isActive: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: "user" | "admin" | "moderator";
  }
}
