import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle } from "lucide-react"
import { getPosts } from "@/lib/posts"

export async function PostList({ date }: { date: string }) {
  const posts = await getPosts(date)

  if (posts.length === 0) {
    return (
      <div className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-purple-800 mb-2">No defeats shared yet</h2>
        <p className="text-gray-600">Be the first to share your defeat for this day!</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6">
      {posts.map((post) => (
        <Card
          key={post.id}
          className="overflow-hidden bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <CardHeader className="pb-0">
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8 bg-gradient-to-br from-pink-500 to-purple-500">
                <AvatarFallback className="text-white text-xs">{post.emoji}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">Anonymous</p>
                <p className="text-xs text-muted-foreground">{post.time}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-lg">{post.content}</p>
          </CardContent>
          <CardFooter className="border-t bg-gray-50 px-6 py-3">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-pink-600 hover:text-pink-700 hover:bg-pink-50">
                <Heart className="mr-1 h-4 w-4" />
                <span>{post.likes}</span>
              </Button>
              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                <MessageCircle className="mr-1 h-4 w-4" />
                <span>{post.comments}</span>
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

