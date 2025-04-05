<script setup lang="ts">
import { doc } from 'firebase/firestore'

const db = useFirestore()
const route = useRoute()

const defeatId = route.params.id
const defeatDoc = doc(db, 'defeats/' + defeatId)

const data = useDocument(defeatDoc)

useSeoMeta({
  title: data.value?.message,
  ogImage: `/og/${defeatId}`,
})
</script>

<template>
  <div>
    <h1>{{ defeatId }}</h1>

    <div v-if="data">
      <h2>Defeat Details</h2>
      <p><strong>Emoji:</strong> {{ data.emoji }}</p>
      <p><strong>Message:</strong> {{ data.message }}</p>
      <p><strong>Date:</strong> {{ data.timestamp.toDate().toLocaleString() }}</p>
    </div>
  </div>
</template>

<style scoped></style>
