"use server"


import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form"

export const registerUser = async(userData:FieldValues) => {
  try{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user`,{
        method:"POST",
        headers:{
            "content-Type":"application/json"
        },
        body:JSON.stringify(userData)
})
const result = await res.json();
 if(result?.success){
    (await cookies()).set("accessToken",result.data.accessToken)
 }
 return result;
  }catch(error:any){
        console.log(error)
  }
}
export const loginUser = async(userData:FieldValues) => {
  try{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`,{
        method:"POST",
        headers:{
            "content-Type":"application/json"
        },
        body:JSON.stringify(userData)
})
 const result = await res.json();
 if(result?.success){
    (await cookies()).set("accessToken",result.data.accessToken)
 }
 return result;
  }catch(error:any){
        console.log(error)
  }
}


export const getCurrentUser = async() => {
  const  accessToken = (await  cookies()).get("accessToken")!.value;
  let decodeData = null;

  if(accessToken){
    decodeData =  await jwtDecode(accessToken)
  }
  return decodeData;
}

export const reChaptchaTokenVerificaiton =  async (token:string) => {
  try{
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify",{
      method:"POST",
      headers:{
        "Content-Type":"application/x-www-form-urlencoded",
      },
      
      body:  new URLSearchParams({
         secret:process.env.NEXT_PUBLIC_RECAPTCHA_SERVER_KEY! ,
         response:token,
      })
   },
  
  )
  return res.json()
  }catch(err) {
       console.log(err)
  }
}

// export const reCaptchaTokenVerification = async (token: string) => {
//   try {
//     const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       body: new URLSearchParams({
//         secret: process.env.NEXT_PUBLIC_RECAPTCHA_SERVER_KEY!,
//         response: token,
//       }),
//     });

//     return res.json();
//   } catch (err: any) {
//     return Error(err);
//   }
// };