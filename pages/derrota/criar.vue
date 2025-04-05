<script setup lang="ts">
import { addDoc, collection, Timestamp } from 'firebase/firestore'
const { $toast } = useNuxtApp()

const db = useFirestore()

const emojis = ['😀', '😂', '😍', '😎', '😢', '😡', '👍', '🎉']
let selectedEmoji = ''
let message = useState('message', () => '')

const maxMessageLength = 300

const submitForm = async () => {
  if (selectedEmoji && message) {
    // Handle form submission logic here
    console.log('Selected Emoji:', selectedEmoji)
    console.log('Message:', message)

    addDoc(collection(db, 'defeats'), {
      emoji: selectedEmoji,
      message: message,
      timestamp: Timestamp.now(),
    })
      .then(defeat => {
        console.log('Document written with ID: ', defeat?.id)
        $toast.success('Derrota criada com sucesso! ')
        selectedEmoji = ''
        message.value = ''
      })
      .catch(error => {
        console.error('Error adding document: ', error)
        $toast.error('Erro ao enviar a mensagem.')
      })
  } else {
    $toast.error('Por favor, selecione um emoji e escreva uma mensagem.')
  }
}
</script>

<template>
  <div>
    <Icon name="pixelarticons:calendar-range" />
    <h1>Compartilhar derrota do dia</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label>Select an Emoji:</label>
        <div class="emoji-picker">
          <label v-for="emoji in emojis" :key="emoji" class="emoji-option">
            <input v-model="selectedEmoji" type="radio" :value="emoji" name="emoji" />
            <span>{{ emoji }}</span>
          </label>
        </div>
      </div>
      <div>
        <label for="message">Message:</label>
        <textarea
          id="message"
          v-model="message"
          :maxlength="maxMessageLength"
          placeholder="Write your message here..."
        />
        <p>{{ message.length }}/{{ maxMessageLength }}</p>
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

textarea {
  resize: vertical;
  width: 100%;
  min-height: 100px;
}

p {
  font-size: 0.9rem;
  color: gray;
  margin: 0;
}

.emoji-picker {
  display: flex;
  gap: 1rem;
}

.emoji-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.emoji-option input {
  display: none;
}

.emoji-option span {
  display: inline-block;
  width: 40px;
  height: 40px;
  border: 2px solid transparent;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  cursor: pointer;
  transition: border-color 0.3s ease;
}

.emoji-option input:checked + span {
  border-color: #007bff;
}
</style>
