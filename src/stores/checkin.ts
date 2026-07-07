import { defineStore } from 'pinia'
import { ref } from 'vue'

// 'checkin' ist die eindeutige ID dieses Stores.
export const useCheckinStore = defineStore('checkin', () => {
  // State — dieselben ref()s wie in Komponenten, nur hier zentral
  const bookingPin = ref('')
  const pinConfirmed = ref(false)

  // Action — eine Funktion, die den State ändert
  function submitPin(pin: string) {
    bookingPin.value = pin
    pinConfirmed.value = true
    // (später: hier käme der echte Backend-Call zur Verifizierung)
  }

  // Alles, was Komponenten nutzen sollen, muss zurückgegeben werden
  return { bookingPin, pinConfirmed, submitPin }
})