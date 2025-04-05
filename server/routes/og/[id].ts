import { defineEventHandler, getQuery } from 'h3'
import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import satori from 'satori'
import fs from 'fs'
import path from 'path'

// // Initialize Firebase Admin SDK
// const serviceAccountFile = path.resolve(import.meta.dirname)
console.log('Service Account File:', path.resolve('service-account.json'))
initializeApp({
  credential: cert(path.resolve('service-account.json')),
})

const db = getFirestore()

export default defineEventHandler(async event => {
  const postId = getRouterParam(event, 'id')

  if (!postId) {
    return { error: 'Post ID is required' }
  }

  try {
    // Fetch post data from Firestore
    const doc = await db
      .collection('defeats')
      .doc(postId as string)
      .get()

    if (!doc.exists) {
      return { error: 'Post not found' }
    }

    const data = doc.data()
    console.log('Fetched data:', data)
    const text = data?.message || 'Default Text'

    // Generate SVG using Satori
    const svg = await satori(
      {
        type: 'div',
        props: {
          children: [
            {
              type: 'h1',
              props: {
                children: text,
                style: {
                  fontSize: '32px',
                  color: '#333',
                },
              },
            },
          ],
          style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '1200px',
            height: '630px',
            backgroundColor: '#f9f9f9',
          },
        },
      },
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'GeistMono',
            data: fs.readFileSync(path.resolve('fonts/gm-black.otf')),
            weight: 900,
            style: 'normal',
          },
        ],
      }
    )

    // Return the SVG as a response
    event.res.setHeader('Content-Type', 'image/svg+xml')
    return svg
  } catch (error) {
    return { error: error.message }
  }
})
