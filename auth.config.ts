import type { NextAuthConfig, Session } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
// Uncomment Google if you want to use it
// import Google from "next-auth/providers/google";
import { LoginSchema } from "./schemas";
import { fetchCurrentUser, signInWithApi } from "./lib/authService";
import { fetchSession } from "./lib/fetchSession";

// Declare the NextAuth User interface to include the JWT
declare module "next-auth" {
  interface User {
    id: string;
    email?: string | null;
  }
}

interface SessionResponse {
  currentUser: {
    id: string;
    email: string;
    iat: number;
  } | null;
}

const authConfig: NextAuthConfig = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    // Google({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    // }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          try {
            const user = await signInWithApi({ email, password });
            if (user) {
              return {
                id: user.id,
                email: user.email,
                jwt: user.jwt, // Pass the JWT with the user
              };
            }
          } catch (error) {
            console.error("Error during authentication:", error);
            return null;
          }
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session }: { session: Session }) {
      const response = await fetchSession() as SessionResponse;
      
      if (response?.currentUser) {
        session.user = {
          id: response.currentUser.id,
          email: response.currentUser.email,
        };
      }
      return session;
    }
  },
  
};

export default authConfig;