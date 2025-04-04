import type React from "react"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Sparkles, Heart, MessageCircle } from "lucide-react"

export default async function Home() {
  const session = await auth()

  if (session) {
    redirect("/feed")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-yellow-200">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center text-center space-y-8 pt-20">
          <div className="relative">
            <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-md">Daily Defeats</h1>
            <Sparkles className="absolute -top-8 -right-8 w-12 h-12 text-yellow-300" />
          </div>

          <p className="text-xl md:text-2xl text-white max-w-2xl">
            A colorful space to anonymously share your daily struggles and connect with others. Because we're all in
            this together! 💪
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link href="/auth/signin">
              <Button
                size="lg"
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold px-8 py-6 rounded-full text-lg shadow-lg transition-all duration-300 hover:scale-105"
              >
                Get Started
              </Button>
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Heart className="w-10 h-10 text-pink-500" />}
              title="Share Anonymously"
              description="Express your daily defeats without revealing your identity. It's a safe space."
            />
            <FeatureCard
              icon={<MessageCircle className="w-10 h-10 text-blue-500" />}
              title="Connect With Others"
              description="Read stories from people facing similar challenges. You're not alone."
            />
            <FeatureCard
              icon={<Sparkles className="w-10 h-10 text-yellow-400" />}
              title="Feel Better"
              description="Turn your defeats into shared experiences and find comfort in community."
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 p-3 bg-purple-100 rounded-full">{icon}</div>
        <h3 className="text-xl font-bold text-purple-800 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  )
}

