<script setup lang="ts">
import { ref, computed } from 'vue'



const digits = ref<string[]>([])
const Keypad = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0','⌫']   


function pressKey(key: string) {
  if (key === '⌫') {            // Fall 1: löschen
    digits.value.pop()          
    return                      
  }
  if (digits.value.length >= 6) {
    return                      // Fall 2: PIN voll → ignorieren
  }
  digits.value.push(key)        // Fall 3: ziffer anhängen
}

const displayPin = computed(() => {
    const padded = [...digits.value, ...Array(6 - digits.value.length).fill('_')]
  return padded.slice(0, 3).join('')+ '-' + padded.slice(3).join('')
})

</script>

<template>
  <h1>Enter your Booking-PIN</h1>
  <p>Bisher eingegeben: {{ digits.length }} Ziffern</p>

  <div class="keypad">
    <button 
        v-for="key in Keypad" 
        :key="key" 
        @click="pressKey(key)">
        {{ key }}
    </button>
  </div>

  <p> {{ displayPin }}</p>
</template>

<style scoped>
</style>