<script setup lang="ts">
import { signOut } from 'firebase/auth'

const currentUser = useCurrentUser()
const auth = useFirebaseAuth()

if (!currentUser.value) {
  navigateTo('/login')
}

const name = useState('name', () => currentUser.value?.displayName || '')

watch(currentUser, newUser => {
  name.value = newUser?.displayName || ''
})

const handleSignOut = () => {
  if (!auth) return

  signOut(auth)
    .then(() => {
      navigateTo('/login')
    })
    .catch(() => {})
}
</script>

<template>
  <div>
    <h1>Oi, {{ name }}</h1>
    <button @click="handleSignOut">Sair</button>
  </div>
</template>

<style scoped></style>
