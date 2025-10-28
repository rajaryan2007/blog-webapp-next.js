
import {createAuthClient} from "better-auth/react"

const baseURL =
  process.env.BASE_URL ||
  (typeof window !== 'undefined'
    ? window.location.origin
    : 'http://localhost:3000');

export const authClient = createAuthClient({
  baseURL,
});




export const {signUp,signIn,signOut,useSession } = authClient;