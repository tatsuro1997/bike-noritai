import NextAuth from "next-auth";
import CredentialsProviders from "next-auth/providers/credentials";
import { connectDatabase } from "@/helpers/db-util";
import { verifyPassword } from "@/helpers/auth-util";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProviders({
      async authorize(credentials) {
        const client = await connectDatabase();

        const usersCollection = client.db().collection("users");

        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          client.close();
          throw new Error("No user found!");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error("Could not log you in!");
        }

        client.close();
        return { email: user.email };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, user, token }) {
      const client = await connectDatabase();
      const usersCollection = client.db().collection("users");
      user = await usersCollection.findOne({
        email: token.email,
      });
      session.user.id = user.uid;
      session.user.name = user.name;
      return session;
    },
  },
});
