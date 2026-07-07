<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCheckinStore } from '../stores/checkin'
import { Delete, Check } from 'lucide-vue-next'
const store = useCheckinStore()
const router = useRouter()

const digits = ref < string[] > ([])
const Keypad = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '⌫']



function pressKey(key: string) {
    if (key === '⌫') { // Fall 1: löschen
        digits.value.pop()
        return
    }
    if (digits.value.length >= 6) {
        return // Fall 2: pin voll → ignorieren
    }
    digits.value.push(key) // Fall 3: ziffer anhängen
}

function goNext() {
    router.push({ name: 'ScanId' })
}

const canSubmit = computed(() => digits.value.length === 6)

function submitPin() {
    if (!canSubmit.value) return
    store.submitPin(digits.value.join(''))
}

const displayPin = computed(() => {
    const padded = [...digits.value, ...Array(6 - digits.value.length).fill('_')]
    return padded.slice(0, 3).join('') + '-' + padded.slice(3).join('')
})
</script>

<template>
    <div class="screen">
        <div class="card">
    
            <!-- ANSICHT 1: Eingabe — nur solange NICHT bestätigt -->
            <template v-if="!store.pinConfirmed">
            <h1 class="title">Enter your Booking-PIN</h1>
            <p class="hint">Bisher eingegeben: {{ digits.length }} Ziffern</p>
    
            <div class="pin-display">
              <span v-for="(char, index) in displayPin" :key="index" class="pin-char">{{ char }}</span>
            </div>
    
            <div class="keypad">
          <button
            v-for="key in Keypad"
                :key="key"
                @click="pressKey(key)"
                class="key"
                :class="{ 'key-zero': key === '0', 'key-back': key === '⌫' }"
                >
                <Delete v-if="key === '⌫'" :size="24" :stroke-width="2.5" />
                <span v-else>{{ key }}</span>
                </button>
            </div>
    
            <button class="submit-btn" :disabled="!canSubmit" @click="submitPin">
              Submit
            </button>
</template>

      <!-- ANSICHT 2: Erfolg — sobald bestätigt -->
        <template v-else>
            <h1 class="title">
                Booking-PIN<br />successful!</h1>
            <div class="check">
                <Check :size="48" :stroke-width="3" />
            </div>
            
            <button class="submit-btn" @click="goNext">next</button>
        </template>

            </div>
        </div>
        </template>

        <style scoped>

.key-zero {
    grid-column: 2;
    /* setzt die Null in die mittlere Spalte */
}

.pin-char {
    display: inline-block;
        font-family: 'Inter', sans-serif;

    transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1), color 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}

.screen {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #dcd6c2;
    padding: 24px;
}

.card {
    width: min(420px, 92vw);
    background: var(--color-bg);
    border-radius: 38px;
    padding: 48px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.title {
    color: var(--color-text);
    font-size: 1.5rem;
    text-align: center;
    font-family: 'Inter', sans-serif;
    margin-bottom: 8px;
    hyphens: none;
    white-space: nowrap;
}

.hint {
    text-align: center;
    color: var(--color-text-muted);
    font-family: 'Inter', sans-serif;
    font-size: 1.2rem;
    margin-bottom: 24px;
}

.check {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background: #2c895a;
    color: #fdfcf7;
    font-size: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0 32px;
    animation: pop-in 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes pop-in {
    0% {
        transform: scale(0);
        opacity: 0;
    }
    70% {
        transform: scale(1.15);
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}

.keypad {
    font-family: 'Inter', sans-serif;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    width: 100%;
    max-width: 280px;
}

.key {
        font-family: 'Inter', sans-serif;

    background: linear-gradient(160deg, #35603e, #2a4d32);
    color: #fdfcf7;
    border: none;
    border-radius: 16px;
    padding: 20px 0;
    font-size: 1.35rem;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(47, 82, 54, 0.25);
    transition: transform 0.12s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.submit-btn {
        font-family: 'Inter', sans-serif;

    background: var(--color-primary);
    color: #fdfcf7;
    margin-top: 24px;
    border: none;
    border-radius: 999px;
    padding: 20px 50px;
    font-size: 1.05rem;
    font-weight: 700;
    cursor: pointer;
    margin-bottom: 24px;
    transition: opacity 0.2s ease, transform 0.12s cubic-bezier(0.4, 0, 0.2, 1);
}

.submit-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
}

.submit-btn:not(:disabled):active {
    transform: scale(0.96);
}

.key:hover {
    background: linear-gradient(160deg, #3d6845, #35603e);
    box-shadow: 0 6px 14px rgba(47, 82, 54, 0.35);
}

.key:active {
    transform: translateY(2px) scale(0.96);
    box-shadow: 0 2px 6px rgba(47, 82, 54, 0.3);
}

.key:active {
    transform: scale(0.92);
}

.submit-btn {
    background: var(--color-primary);
    color: #fdfcf7;
    border: none;
    border-radius: 999px;
    padding: 20px 50px;
    font-size: 1.05rem;
    font-weight: 700;
    cursor: pointer;
    margin-bottom: 24px;
    transition: opacity 0.2s ease, transform 0.12s cubic-bezier(0.4, 0, 0.2, 1);
}

.submit-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
}

.submit-btn:not(:disabled):active {
    transform: scale(0.96);
}

/* PIN-Anzeige — der Star des Screens */

.pin-display {
    position: relative;
    background: linear-gradient(145deg, #c7ee9e, #d1dca2);
    border: 2px solid transparent;
    border-radius: 18px;
    padding: 20px 28px;
    font-size: 1.9rem;
    font-weight: 700;
    letter-spacing: 6px;
    color: var(--color-primary);
    margin-bottom: 28px;
    box-shadow: inset 0 2px 6px rgba(47, 82, 54, 0.08), 0 8px 24px rgba(47, 82, 54, 0.12);
    animation: input-glow 3s ease-in-out infinite;
    overflow: hidden;
}

/* wandernder Lichtstreifen quer über das Feld */

.pin-display::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 40%;
    height: 100%;
    background: linear-gradient( 100deg, transparent, rgba(255, 255, 255, 0.5), transparent);
    animation: sweep 6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

@keyframes sweep {
    0% {
        left: -60%;
    }
    20% {
        left: 140%;
    }
    100% {
        left: 140%;
    }
}

@keyframes input-glow {
    0%,
    100% {
        box-shadow: inset 0 2px 6px rgba(47, 82, 54, 0.08), 0 8px 24px rgba(47, 82, 54, 0.10);
    }
    50% {
        box-shadow: inset 0 2px 6px rgba(47, 82, 54, 0.08), 0 12px 32px rgba(47, 82, 54, 0.16);
    }
}

@keyframes pop-char {
    0% {
        transform: translateY(6px);
        opacity: 0;
    }
    100% {
        transform: translateY(0);
        opacity: 1;
    }
}

.pin-char:not(:empty) {
    animation: pop-char 0.18s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes pop-in {
    0% {
        transform: scale(0.7);
        opacity: 0;
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}

.pin-char {
    display: inline-block;
    transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1), color 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}

/* die zuletzt gefüllte Ziffer hebt sich ab */

.pin-char:not(:empty) {
    animation: pop-char 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>