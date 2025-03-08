import RegisterForm from "@/components/modules/auth/register/RegisterForm"
import Link from "next/link"

const RegisterPage = () => {
  return (
    <div className="w-screen h-screen flex flex-col space-y-4 justify-center items-center bg-wh">
      <h1>Login</h1>
      <RegisterForm/>
      <Link href="login">login</Link>
    </div>
  )
}

export default RegisterPage