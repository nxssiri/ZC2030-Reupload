import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import Auth0Provider from "next-auth/providers/auth0";
import dotenv from "dotenv";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { addWalletToUserId } from "../../../services/PrismaService";
import { createEncryptedWallet } from "../../../services/Web3jsService";


dotenv.config();

//https://next-auth.js.org/adapters/prisma
const prisma = new PrismaClient();

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  // https://next-auth.js.org/providers/overview
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
      version: "2.0",
    }),
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER,
    }),
    // ...add more providers here
  ],
  secret: process.env.SECRET,
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async session({ session, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.user.id = user.id;
      session.user.role = user.role;
      session.user.walletAddress = user.publicAddress
      return session;
    },
  },
  events: {
    createUser: async ({ user }) => {
      const wallet = createEncryptedWallet();
      await addWalletToUserId(user.id, JSON.stringify(wallet), wallet.address);
    },
  },
  pages: {
    signIn: '/auth/signin',
  }
});
