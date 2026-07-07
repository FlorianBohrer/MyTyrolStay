<script setup lang="ts">

import { useRouter } from 'vue-router'

const router = useRouter()

function handleClick() {
  router.push('/pin')
}


</script>

<template>
  <h1>Welcome to myTyrol Check-In</h1>
  <button @click="handleClick">Touch to Start</button>
</template>

<style scoped>

</style>