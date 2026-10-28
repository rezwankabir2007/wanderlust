import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("wanderlust");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: { 
    enabled: true, 
  },
  // 🟢 ১. সিক্রেট কি নিশ্চিত করুন (Vercel env থেকে নিবে)
  secret: process.env.BETTER_AUTH_SECRET,
  
  // 🟢 ২. ফ্রন্টএন্ড এবং ব্যাকএন্ড ডোমেইনগুলোকে ট্রাস্টেড অরিজিন হিসেবে এলাউ করুন
  trustedOrigins: [
    "https://wanderlust-fontend.vercel.app",
    "http://localhost:3000",
    "http://localhost:5173"
  ],
  
  plugins: [jwt()],
  session: {
    strategy: "jwt",
    cookieCache: {
      enabled: true,
      maxAge: 7 * 24 * 60 * 60,
    },
  },
});