
export const runtime = 'nodejs';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            // Request additional scopes
            authorization: {
                params: {
                    // "openid profile email" are requested by default;
                    // add the birthday scope to request the date of birth (if available)
                    scope: "openid profile email https://www.googleapis.com/auth/user.birthday.read"
                }
            }
        })
    ],
    callbacks: {
        // Include custom fields in the JWT token
        async jwt({ token, account, profile }) {
            if (account && profile) {
                token.picture = profile.picture;
                token.name = profile.name;
                // The birthday field might be returned as "birthday". Adjust if necessary.
                token.dob = profile.birthday;
            }
            return token;
        },
        // Make the additional fields available in the session
        async session({ session, token }) {
            session.user.picture = token.picture;
            session.user.name = token.name;
            session.user.dob = token.dob;
            return session;
        }
    }
});