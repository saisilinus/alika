import type { NextAuthOptions } from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import clientPromise from "./mongodb";
import { findUserByEmail, updateUser } from "./database";
import { refreshGoogleAccessToken } from "./refreshAccessToken";

export const authOptions: NextAuthOptions = {
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
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
                const existingUser = await findUserByEmail(user.email);

                // Optionally: sync profile fields to your user document
                if (existingUser) {
                    const updates: any = {};
                    if (user.name && user.name !== existingUser.name)
                        updates.name = user.name;
                    if (user.image && user.image !== existingUser.image)
                        updates.image = user.image;
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
        async jwt({ token, account, user }) {
            // Initial sign-in
            if (account && user) {
                token.provider = account.provider;

                if (account.provider === "google") {
                    token.accessToken = account.access_token;
                    token.refreshToken = account.refresh_token;
                    token.accessTokenExpires =
                        Date.now() + (account.expires_at as number) * 1000;
                }

                return token;
            }

            // If token is not for Google, return as-is
            if (token.provider !== "google") {
                return token;
            }

            // If token still valid, return it
            if (Date.now() < (token.accessTokenExpires as number)) {
                return token;
            }

            // Access token expired, refresh it
            return await refreshGoogleAccessToken(token);
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken as string | undefined;
            session.provider = token.provider as string;
            session.error = token.error as string | undefined;
            return session;
        },
    },
    events: {
        async createUser({ user }) {
            await updateUser(user.id, {
                role: "user",
                isActive: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        },
    },
    pages: {
        // signIn: "/auth/signin",
        error: "/auth/error",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: true,
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
        accessToken?: string;
        error?: string;
        provider?: string;
    }

    interface User {
        role: "user" | "admin" | "moderator";
        isActive: boolean;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role: "user" | "admin" | "moderator";
        accessToken?: string;
        refreshToken?: string;
        accessTokenExpires?: number;
        error?: string;
        provider?: string;
    }
}
