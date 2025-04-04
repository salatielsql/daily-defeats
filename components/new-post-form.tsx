"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { createPost } from "@/lib/posts"
import { Loader2 } from "lucide-react"

export function NewPostForm() {
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!content.trim()) return

    setIsSubmitting(true)

    try {
      await createPost(content)
      router.push("/feed")
      router.refresh()
    } catch (error) {
      console.error("Failed to create post:", error)
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Textarea
          placeholder="What defeated you today? Share your experience..."
          className="min-h-[150px] resize-none focus:ring-2 focus:ring-purple-500"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting || !content.trim()}
        className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold py-3 rounded-xl shadow-md transition-all duration-300"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Share Anonymously"
        )}
      </Button>
    </form>
  )
}

