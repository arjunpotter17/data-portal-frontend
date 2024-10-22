import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Email" },
        password: {
          label: "password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials: Record<"username" | "password", string> | undefined) {
        try {
          if(!credentials){
            return null;
          }
          const response = await fetch('http://localhost:5000/api/user/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: credentials.username,
              password: credentials.password,
            }),
          })
          const user = await response.json();
          console.log("User:             ", user);
          if (response.ok && user) {
            console.log("User authorized:", user);
            return {
              name: "arjun",
              email: user.email,
              id: '1'
            };
          } else {
            // Return null if the login fails
            return null;
          }
        } catch (error) {
          console.error("Error authorizing user:", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages:{
    signIn: '/auth/login',
  }
});

export { handler as GET, handler as POST };
