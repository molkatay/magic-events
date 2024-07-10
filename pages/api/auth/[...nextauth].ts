import NextAuth, { User as NextAuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt_decode from "jwt-decode";
import { clearJWT, getJWT, refreshAccessToken } from "../../../lib/jwt";

interface CustomUser extends NextAuthUser {
accessToken: string;
expires_in: number;
username: string;
password: string;
}

export default NextAuth({
pages: {
signIn: "/login",
// signUp: "/register",
  },
providers: [
CredentialsProvider({
name: "Drupal",
credentials: {
username: { label: "Username", type: "text", placeholder: "Username" },
password: { label: "Password", type: "password" },
},
async authorize(credentials): Promise<CustomUser | null> {
try {
const formData = new URLSearchParams();
formData.append("grant_type", "password");
formData.append("client_id", process.env.DRUPAL_CLIENT_ID);
formData.append("client_secret", process.env.DRUPAL_CLIENT_SECRET);
formData.append("username", credentials.username);
formData.append("password", credentials.password);

// Get access token from Drupal.
          const response = await fetch(
`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/oauth/token`,
{
method: "POST",
body: formData,
headers: {
"Content-Type": "application/x-www-form-urlencoded",
},
}
);

if (!response.ok) {
const error = await response.json();
console.error("Failed to fetch access token:", error);
return null;
}

const json = await response.json();

if (!json.access_token) {
console.error("No access token in response:", json);
return null;
}

return {
accessToken: json.access_token,
expires_in: json.expires_in,
username: credentials.username,
password: credentials.password,
};
} catch (error) {
console.error("Error authorizing credentials:", error);
return null;
}
},
}),
],
events: {
signOut: async function ({ token }) {
return await clearJWT(token);
},
},
callbacks: {
async jwt({ token, user, account }) {
if (account && user) {
token.accessToken = (user as CustomUser).accessToken;
token.accessTokenExpires = Date.now() + (user as CustomUser).expires_in * 1000;
token.username = (user as CustomUser).username;
token.password = (user as CustomUser).password;
}

return await getJWT(token);
},
async session({ session, token }) {
if (token?.accessToken) {
const accessToken = token.accessToken;
session.accessToken = accessToken;
// Decode token and pass info to session.
        // This data will be available client-side.
        const decoded = jwt_decode<User>(accessToken);

session.user.id = decoded.id;
session.user.email = decoded.email;
session.user.name = decoded.name;
session.user.image = decoded.image;
session.basicAuth = btoa(`${token.username}:${token.password}`);
}
return session;
},
},
});
