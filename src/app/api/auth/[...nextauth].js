import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const jwtToken = credentials?.jwt;

        if (jwtToken) {
          return { token: jwtToken };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.jwt = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.jwt) {
        session.jwt = token.jwt;
      }
      return session;
    },
  },
  pages: {
    signIn: "/pages/users/Dashboard",
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`, // Nome do cookie de sessão
      options: {
        httpOnly: true, // Impede que o cookie seja acessado pelo JavaScript
        secure: process.env.NODE_ENV === "production", // Garante que seja enviado apenas via HTTPS em produção
        sameSite: "lax", // Protege contra CSRF
      },
    },
  },
});
