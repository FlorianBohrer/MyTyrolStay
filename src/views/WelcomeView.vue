<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function handleClick() {
  router.push({ name: 'Pin' })
}

</script>

<template>
  <div class="screen">
    <div class="card">
      <!-- Logo -->
      <div class="logo">
        <svg width="72" height="72" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
          <circle cx="36" cy="36" r="34" stroke="var(--color-primary)" stroke-width="3" fill="none" />
          <path d="M18 40L36 24L54 40" stroke="var(--color-primary)" stroke-width="3.5"
                stroke-linecap="round" stroke-linejoin="round" fill="none" />
          <path d="M26 38V52H46V38" stroke="var(--color-primary)" stroke-width="3.5"
                stroke-linecap="round" stroke-linejoin="round" fill="none" />
          <rect x="33" y="42" width="6" height="10" fill="var(--color-primary)" />
        </svg>
        <span class="logo-text">MyTyrolStay</span>
      </div>

      <!-- Titel -->
      <h1 class="title">Welcome to<br />Bolzano</h1>

      <!-- touch to start -->
      <button class="touch" @click="handleClick" aria-label="Touch to start">
        <span class="touch-label">touch to start</span>
        <span class="touch-dot"></span>
      </button>

      <!-- Sprach-Badge -->
      <div class="lang-badge">🇬🇧 English</div>
    </div>
  </div>
</template>

<style scoped>
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
  box-shadow: 0 20px 60px rgba(47, 82, 54, 0.18);
}

.logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
.logo-text {
  font-weight: 700;
  font-family: 'Inter', sans-serif;
  font-size: 1.4rem;
  color: var(--color-primary);
}

.title {
  text-align: center;
  color: var(--color-text-muted);
  font-family: 'Inter', sans-serif;
  font-size: 2.5rem;
  margin: 24px 0 40px;
}

.touch {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  background: transparent;
  border: none;
  cursor: pointer;
  margin-bottom: 40px;
}
.touch-label {
  font-weight: 700;
  font-size: 1.3rem;
  color: var(--color-text);
}
.touch-dot {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 3px solid var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
}
.touch-dot::after {
  content: '';
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--color-primary);
}

.lang-badge {
  background: var(--color-accent-light);
  color: var(--color-primary);
  border-radius: 999px;
  padding: 8px 18px;
  font-weight: 600;
}

/* Animation for touch dot */

/* ---- Lebendiger Verlaufs-Hintergrund ---- */
@keyframes gradient-shift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.screen {
  background: linear-gradient(120deg, #dcd6c2, #cfe9d2, #dcd6c2, #e8dfc4);
  background-size: 300% 300%;
  animation: gradient-shift 12s ease infinite;
}

/* ---- Logo schwebt sanft auf und ab ---- */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-8px); }
}
.logo svg {
  animation: float 3s ease-in-out infinite;
}

/* ---- Karte bekommt einen wandernden Glanz-Rand ---- */
@keyframes border-glow {
  0%, 100% { box-shadow: 0 20px 60px rgba(47,82,54,0.18), 0 0 0 1px rgba(143,196,154,0.3); }
  50%      { box-shadow: 0 24px 70px rgba(47,82,54,0.28), 0 0 0 2px rgba(143,196,154,0.6); }
}
.card {
  animation: fade-up 0.7s ease-out both, border-glow 4s ease-in-out 1s infinite;
}

/* ---- Titel bekommt einen durchlaufenden Schimmer ---- */
@keyframes shimmer {
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
}
.title {
  background: linear-gradient(90deg,
    var(--color-text-muted) 0%,
    var(--color-primary) 50%,
    var(--color-text-muted) 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: fade-up 0.6s ease-out 0.4s both, shimmer 4s linear 1.2s infinite;
}

/* ---- Sprach-Badge hüpft leicht bei Hover ---- */
.lang-badge {
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  cursor: pointer;
}
.lang-badge:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 6px 16px rgba(47,82,54,0.2);
}

/* ---- Reduzierte Bewegung respektieren ---- */
@media (prefers-reduced-motion: reduce) {
  .screen, .logo svg, .card, .title, .lang-badge {
    animation: none;
  }
}

 @keyframes fade-up {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes pop-in {
  0%   { opacity: 0; transform: scale(0.6); }
  70%  { transform: scale(1.08); }
  100% { opacity: 1; transform: scale(1); }
}

@keyframes pulse-ring {
  0%   { box-shadow: 0 0 0 0 rgba(47, 82, 54, 0.4); }
  70%  { box-shadow: 0 0 0 18px rgba(47, 82, 54, 0); }
  100% { box-shadow: 0 0 0 0 rgba(47, 82, 54, 0); }
}

/* ---- Die Elemente in Bewegung setzen ---- */

/* ---- Lebendiger Verlaufs-Hintergrund ---- */
@keyframes gradient-shift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.screen {
  background: linear-gradient(120deg, #dcd6c2, #cfe9d2, #dcd6c2, #e8dfc4);
  background-size: 300% 300%;
  animation: gradient-shift 12s ease infinite;
}

/* ---- Logo schwebt sanft auf und ab ---- */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-8px); }
}
.logo svg {
  animation: float 3s ease-in-out infinite;
}

/* ---- Karte bekommt einen wandernden Glanz-Rand ---- */
@keyframes border-glow {
  0%, 100% { box-shadow: 0 20px 60px rgba(47,82,54,0.18), 0 0 0 1px rgba(143,196,154,0.3); }
  50%      { box-shadow: 0 24px 70px rgba(47,82,54,0.28), 0 0 0 2px rgba(143,196,154,0.6); }
}
.card {
  animation: fade-up 0.7s ease-out both, border-glow 4s ease-in-out 1s infinite;
}

/* ---- Titel bekommt einen durchlaufenden Schimmer ---- */
@keyframes shimmer {
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
}
.title {
  background: linear-gradient(90deg,
    var(--color-text-muted) 0%,
    var(--color-primary) 50%,
    var(--color-text-muted) 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: fade-up 0.6s ease-out 0.4s both, shimmer 4s linear 1.2s infinite;
}

/* ---- Sprach-Badge hüpft leicht bei Hover ---- */
.lang-badge {
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  cursor: pointer;
}
.lang-badge:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 6px 16px rgba(47,82,54,0.2);
}

/* ---- Reduzierte Bewegung respektieren ---- */
@media (prefers-reduced-motion: reduce) {
  .screen, .logo svg, .card, .title, .lang-badge {
    animation: none;
  }
}
/* 

.card {
  animation: fade-up 0.7s ease-out both;
}


.logo {
  animation: pop-in 0.6s ease-out 0.2s both;
}

.title {
  animation: fade-up 0.6s ease-out 0.4s both;
}
.touch {
  animation: fade-up 0.6s ease-out 0.6s both;
}
.lang-badge {
  animation: fade-up 0.6s ease-out 0.8s both;
}

.touch-dot {
  animation: pulse-ring 2s ease-out infinite;
}


.touch:hover .touch-label {
  color: var(--color-primary);
}
.touch:active .touch-dot {
  transform: scale(0.9);
}

@media (prefers-reduced-motion: reduce) {
  .card, .logo, .title, .touch, .lang-badge, .touch-dot {
    animation: none;
  }
} */
</style>