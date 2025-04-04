// This is a mock implementation - in a real app, you'd fetch from a database
interface Post {
  id: string
  content: string
  date: string
  time: string
  likes: number
  comments: number
  emoji: string
}

const EMOJIS = ["😔", "😢", "😓", "😞", "😣", "😖", "😫", "😩", "🥺", "😭"]

const MOCK_POSTS: Post[] = [
  {
    id: "1",
    content: "I spent 3 hours debugging only to find out I forgot a semicolon.",
    date: "2025-04-03",
    time: "9:30 AM",
    likes: 24,
    comments: 5,
    emoji: "😖",
  },
  {
    id: "2",
    content: "My coffee spilled all over my laptop right before an important meeting.",
    date: "2025-04-03",
    time: "10:15 AM",
    likes: 32,
    comments: 8,
    emoji: "😭",
  },
  {
    id: "3",
    content: "I missed my train by literally 10 seconds and had to wait an hour for the next one.",
    date: "2025-04-03",
    time: "11:45 AM",
    likes: 18,
    comments: 3,
    emoji: "😩",
  },
  {
    id: "4",
    content: "My presentation crashed in the middle of showing it to the entire company.",
    date: "2025-04-02",
    time: "2:30 PM",
    likes: 45,
    comments: 12,
    emoji: "😓",
  },
  {
    id: "5",
    content: "I accidentally replied-all to an email that was meant just for one person.",
    date: "2025-04-02",
    time: "4:15 PM",
    likes: 56,
    comments: 15,
    emoji: "😣",
  },
]

export async function getPosts(date: string): Promise<Post[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Filter posts by date
  return MOCK_POSTS.filter((post) => post.date === date)
}

export async function createPost(content: string): Promise<Post> {
  // In a real app, you'd save to a database
  const newPost: Post = {
    id: Math.random().toString(36).substring(2, 9),
    content,
    date: new Date().toISOString().split("T")[0],
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    likes: 0,
    comments: 0,
    emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
  }

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return newPost
}

