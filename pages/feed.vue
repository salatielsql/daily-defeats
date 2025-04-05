<script setup lang="ts">
import { query, collection, Timestamp, where } from 'firebase/firestore'

const db = useFirestore()
const defeatsColl = collection(db, 'defeats')
const route = useRoute()

console.log(route.query.d)
// const selectedDate = $route.query.date || new Date(Date.now() - 24 * 60 * 60 * 1000) // Default to yesterday if no date is provided

const defeatsFromDate = query(
  defeatsColl,
  where('timestamp', '>=', Timestamp.fromDate(new Date(Date.now() - 24 * 60 * 60 * 1000)))
)

const defeats = useCollection(defeatsFromDate)
</script>

<template>
  <div>
    <h1>Feed Page</h1>
    <div v-if="defeats">
      <h2>Defeats</h2>
      <ul>
        <li v-for="defeat in defeats" :key="defeat.id">
          <p>
            <NuxtLink :to="`/derrota/${defeat.id}`"
              >{{ defeat.emoji }} - {{ defeat.message }}</NuxtLink
            >
          </p>
          <p>{{ defeat.timestamp.toDate().toLocaleString() }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
