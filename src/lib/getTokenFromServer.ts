import { headers } from "next/headers";
import { auth } from "./auth";

export const getTokenFromServer =async ()=>{
      const jwtToken = await auth.api.getToken({
    headers: await headers(),
  });

  const tokenString = typeof jwtToken === 'string' ? jwtToken : jwtToken?.token;
//   console.log("JWT Token String:", tokenString);

return tokenString;
}