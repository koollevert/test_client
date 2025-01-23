import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
// Uncomment Google if you want to use it
// import Google from "next-auth/providers/google";
import { LoginSchema } from "./schemas";
import { fetchCurrentUser, signInWithApi } from "./lib/authService";

// Declare the NextAuth User interface to include the JWT
declare module "next-auth" {
  interface User {
    id: string;
    email?: string | null;
    jwt: string;
  }
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
    // The JWT callback is invoked when the JWT is created or updated
    async jwt({ token, user }) {
      if (user) {
        // Store the user JWT into the token object when the user logs in
        token.id = user.id;
        token.email = user.email;
        token.jwt = user.jwt; // Store the JWT as part of the token
      }
      return token;
    },
    // The session callback is called when the session is created or updated
    async session({ session, token }: any) {
      const currentUser = await fetchCurrentUser();
      if (currentUser) {
        session.user = {
          id: currentUser.id,
          email: currentUser.email,
          jwt: currentUser.jwt,
        };
      } else if (token?.jwt) {
        // Attach the JWT to the session
        session.jwt = token.jwt;
        session.user = {
          id: token.id,
          email: token.email,
        };
      }
      console.log(session);
      return session;
    },
  },
  session: { strategy: "jwt" }, // Use JWT for session storage
};

export default authConfig;