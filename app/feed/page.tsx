import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { format, subDays } from "date-fns"
import Link from "next/link"
import { ArrowLeft, ArrowRight, PlusCircle } from "lucide-react"
import { PostList } from "@/components/post-list"
import { Button } from "@/components/ui/button"
import { UserNav } from "@/components/user-nav"

export default async function Feed({
  searchParams,
}: {
  searchParams: { date?: string }
}) {
  // const session = await auth()

  // if (!session) {
  //   redirect("/auth/signin")
  // }

  // Get the date from the URL or use today
  const today = new Date()
  const dateParam = searchParams.date ? new Date(searchParams.date) : today

  // Format the date for display
  const formattedDate = format(dateParam, "EEEE, MMMM do, yyyy")

  // Calculate previous and next day
  const prevDay = format(subDays(dateParam, 1), "yyyy-MM-dd")
  const nextDay = format(subDays(dateParam, -1), "yyyy-MM-dd")
  const isToday = format(dateParam, "yyyy-MM-dd") === format(today, "yyyy-MM-dd")

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-yellow-200">
      <header className="bg-white/80 backdrop-blur-sm shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-purple-800">
            Daily Defeats
          </Link>
          {/* <UserNav user={session.user} /> */}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <Link href={`/feed?date=${prevDay}`}>
            <Button variant="outline" className="bg-white/80 hover:bg-white">
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous Day
            </Button>
          </Link>

          <h1 className="text-2xl md:text-3xl font-bold text-center text-purple-900 bg-white/80 px-4 py-2 rounded-lg shadow-sm">
            {formattedDate}
          </h1>

          {!isToday && (
            <Link href={`/feed?date=${nextDay}`}>
              <Button variant="outline" className="bg-white/80 hover:bg-white">
                Next Day <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          )}

          {isToday && (
            <div className="w-[120px]"></div> // Empty div for spacing
          )}
        </div>

        <Link href="/new-post">
          <Button className="w-full mb-8 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold py-3 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
            <PlusCircle className="mr-2 h-5 w-5" /> Share Today's Defeat
          </Button>
        </Link>

        <PostList date={format(dateParam, "yyyy-MM-dd")} />
      </main>
    </div>
  )
}

