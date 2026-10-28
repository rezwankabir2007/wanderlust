import { createAuthClient } from "better-auth/react"
import { jwtClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    // এখানে অবশ্যই NEXT_PUBLIC_ দিয়ে ভ্যারিয়েবলটি ধরতে হবে
    baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "https://wanderlust-backend-mu.vercel.app", 
    plugins: [
        jwtClient()
    ]
})

export const { signIn, signUp, useSession } = authClient;