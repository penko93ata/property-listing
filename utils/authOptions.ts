import prisma from "@/lib/db";
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 60, // 30 minutes
  },
  callbacks: {
    // Invoked on successful sign in
    async signIn({ profile }) {
      // 1. Check if user exists
      const userExists = await prisma.users.findUnique({ where: { email: profile?.email } });
      // 2. If not, then add user to the database
      if (!userExists) {
        const username = profile?.name?.slice(0, 20);
        await prisma.users.create({
          data: {
            email: profile?.email ?? "",
            username: username ?? "",
            image: profile?.image ?? "",
          },
        });
      }
      // 4. Return true to allow sign in
      return true;
    },
    async session({ session }) {
      // 1. Get user from database
      const user = await prisma.users.findUnique({ where: { email: session.user?.email ?? "" } });
      // 2. Assign the user id to the session
      if (session?.user?.email) {
        session.user.email = user?.email;
      }
      // 3. Return the session
      return session;
    },
  },
};
