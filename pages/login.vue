<script setup lang="ts">
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
const { $toast } = useNuxtApp()
const auth = useFirebaseAuth()
const currentUser = useCurrentUser()

if (currentUser.value) {
  navigateTo('/feed')
}

const handleSignInWithGoogle = async () => {
  if (!auth) return

  try {
    const result = await signInWithPopup(auth, new GoogleAuthProvider())
    // The signed-in user info.
    const user = result.user

    if (user.emailVerified) {
      navigateTo('/feed')
    } else {
      // User is signed in but email is not verified
      console.log('User email is not verified:', user.email)
      $toast.error('Por favor use uma conta com email verificado')
      signOut(auth)
        .then(() => {
          navigateTo('/login')
        })
        .catch(() => {})
    }
  } catch (error) {
    // Handle Errors here.
    const errorCode = error.code
    const errorMessage = error.message
    // The email of the user's account used.
    const email = error.customData.email
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error)

    console.error('Error signing in:', errorCode, errorMessage, email, credential)
    $toast.error('Error signing in with Google:' + errorMessage)
  }
}
</script>

<template>
  <div>
    <h1>Login Page</h1>
    <button @click="handleSignInWithGoogle">Sign in with Google</button>
  </div>
</template>

<style scoped></style>
