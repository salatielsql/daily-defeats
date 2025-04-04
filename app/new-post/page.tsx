import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { NewPostForm } from "@/components/new-post-form"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function NewPost() {
  // const session = await auth()

  // if (!session) {
  //   redirect("/auth/signin")
  // }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-yellow-200 p-4">
      <div className="max-w-md mx-auto">
        <Link href="/feed">
          <Button variant="ghost" className="mb-4 bg-white/80 hover:bg-white">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Feed
          </Button>
        </Link>

        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-xl">
          <h1 className="text-2xl font-bold text-purple-800 mb-6 text-center">Share Today's Defeat</h1>

          <NewPostForm />

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Your post will be shared anonymously.</p>
            <p>Be honest, be kind, and remember we're all in this together!</p>
          </div>
        </div>
      </div>
    </div>
  )
}

