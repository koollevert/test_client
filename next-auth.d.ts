// import { UserRole } from "@prisma/client";
// import NextAuth, { type DefaultSession } from "next-auth";

// // Extend the User interface to include additional properties
// declare module "next-auth" {
//   interface User {
//     id: string;
//     email: string | null | undefined;
//     jwt: string;
//   }

//   interface Session {
//     user: {
//       id: string;
//       email: string | null | undefined;
//       jwt: string;
//     } & DefaultSession["user"];
//   }

//   interface JWT {
//     id: string;
//     email: string | null | undefined;
//     jwt: string;
//   }
// }
// Add your type definitions here

export interface ExtendedUser {
    id: string;
    name: string;
    email: string;
    role: string;
    isTwoFactorEnabled: boolean;
  }