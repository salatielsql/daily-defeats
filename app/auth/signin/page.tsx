import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { LoginProviders } from "@/components/login-providers"

export default async function SignIn() {
  const session = await auth()

  if (session) {
    redirect("/feed")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-yellow-200 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-purple-800">Welcome!</h1>
          <p className="text-gray-600 mt-2">Sign in to share your daily defeats and connect with others</p>
        </div>

        <LoginProviders />

        <p className="text-center text-sm text-gray-500 mt-8">
          By signing in, you agree to our Terms of Service and Privacy Policy. Your posts will be anonymous, but we need
          your login to prevent spam.
        </p>
      </div>
    </div>
  )
}

