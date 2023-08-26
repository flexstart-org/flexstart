import NextAuth, { type NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
// import Github from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { isBlacklistedEmail, nanoid } from "@/lib/utils";
import sendMail, { sendMarketingMail } from "emails";
import LoginLink from "emails/LoginLink";
import WelcomeEmail from "emails/WelcomeEmail";

const VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL;

export const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    // Github({
    //   clientId: process.env.GITHUB_CLIENT_ID as string,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    //   profile(profile) {
    //     return {
    //       id: profile.id.toString(),
    //       name: profile.name || profile.login,
    //       gh_username: profile.login,
    //       email: profile.email,
    //       image: profile.avatar_url || profile.gravatar_id,
    //     };
    //   },
    // }),
    EmailProvider({
      sendVerificationRequest({ identifier, url }) {
        sendMail({
          subject: "Your Flexstart.org Login Link",
          to: identifier,
          component: <LoginLink url={url} />,
        });
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: `/login`,
    verifyRequest: `/login`,
    error: "/login",
    newUser: "/welcome",
  },
  cookies: {
    sessionToken: {
      name: `${VERCEL_DEPLOYMENT ? "__Secure-" : ""}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        // When working on localhost, the cookie domain must be omitted entirely (https://stackoverflow.com/a/1188145)
        domain: VERCEL_DEPLOYMENT ? "flexstart.org" : undefined,
        secure: VERCEL_DEPLOYMENT,
      },
    },
  },
  callbacks: {
    signIn: async ({ user, account, profile }) => {
      if (!user.email || (await isBlacklistedEmail(user.email))) {
        return false;
      }
      if (account?.provider === "google") {
        const userExists = await prisma.user.findUnique({
          where: { email: user.email },
          select: { name: true },
        });
        // if the user already exists via email,
        // update the user with their name and image from Google
        if (userExists && !userExists.name) {
          await prisma.user.update({
            where: { email: user.email },
            data: {
              name: profile?.name,
              image: profile?.image,
            },
          });
        }
      }
      return true;
    },
    jwt: async ({ token, user, trigger, session }) => {
      if (!token.email || (await isBlacklistedEmail(token.email))) {
        return {};
      }
      if (user) {
        token.user = user;
      }
      if (trigger === "update") {
        const refreshedUser = await prisma.user.findUnique({
          where: { id: token.sub },
        });
        token.user = refreshedUser;
        token.name = refreshedUser?.name;
        token.email = refreshedUser?.email;
        token.image = refreshedUser?.image;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = {
        // @ts-ignore
        id: token.sub,
        ...session.user,
      };
      return session;
    },
  },
  events: {
    async signIn(message) {
      if (message.isNewUser) {
        const username = `${
          message.user.name
            ?.toLowerCase()
            .trim()
            .replace(/[\W_]+/g, "-") + nanoid()
        }`;
        const email = message.user.email as string;
        const ns = message.user.id;
        const user = await prisma.user.findUnique({
          where: { email },
          select: {
            createdAt: true,
          },
        });
        // only send the welcome email if the user was created in the last 10 seconds
        // (this is a workaround because the `isNewUser` flag is triggered when a user does `dangerousEmailAccountLinking`)
        if (
          user?.createdAt &&
          new Date(user.createdAt).getTime() > Date.now() - 10000
        ) {
          await Promise.all([
            fetch(`https://flexstart.org/api/users/namespace`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ns }),
            }),
            prisma.user.update({
              where: { email },
              data: {
                billingCycleStart: new Date().getDate(),
                namespace: ns,
                username: username,
              },
            }),
            sendMarketingMail({
              subject: "✨ Welcome to Flexstart",
              to: email,
              component: <WelcomeEmail name={message.user?.name!} />,
            }),
          ]);
        }
      }
    },
  },
};

export default NextAuth(authOptions);
