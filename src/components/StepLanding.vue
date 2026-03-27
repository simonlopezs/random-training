<script setup lang="ts">
import { useTrainingStore } from '@/stores/training'

const store = useTrainingStore()
</script>

<template>
  <div class="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
    <div class="text-6xl mb-6">🎲</div>
    <h1 class="text-4xl font-bold tracking-tight text-foreground">Random Training</h1>
    <p class="mt-3 text-lg text-muted-foreground">
      Genera entrenamientos aleatorios con ejercicios de calistenia
    </p>
    <button
      @click="store.nextStep()"
      class="mt-8 rounded-lg bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-md transition-transform active:scale-95"
    >
      Comenzar
    </button>
  </div>
</template>
