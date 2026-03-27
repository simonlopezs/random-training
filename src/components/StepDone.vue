<script setup lang="ts">
import { useTrainingStore } from '@/stores/training'

const store = useTrainingStore()
</script>

<template>
  <div class="flex min-h-[80vh] flex-col items-center justify-center gap-6 px-4 text-center">
    <span class="text-7xl">🎉</span>
    <h2 class="text-3xl font-bold text-foreground">¡Entrenamiento completado!</h2>
    <p class="text-4xl font-mono font-bold text-foreground">
      {{ store.formattedTime }}
    </p>
    <p class="text-lg text-muted-foreground">
      {{ store.completedCount }} series completadas
    </p>
    <button
      @click="store.reset()"
      class="mt-4 rounded-lg bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-md transition-transform active:scale-95"
    >
      Volver al inicio
    </button>
  </div>
</template>
