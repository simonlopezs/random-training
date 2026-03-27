<script setup lang="ts">
import { useTrainingStore } from '@/stores/training'

const store = useTrainingStore()
</script>

<template>
  <div class="flex min-h-[80vh] flex-col items-center justify-center gap-8 px-4">
    <!-- Progress -->
    <div class="w-full max-w-xs">

      <p class="mb-2 text-center text-2xl font-mono font-semibold text-foreground">
        {{ store.formattedTime }}
      </p>
      <div class="mb-1 flex justify-between text-sm text-muted-foreground">
        <span>{{ store.completedCount }} / {{ store.totalCards }}</span>
        <span>{{ store.remainingCards }} restantes</span>
      </div>
      <div class="h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          class="h-full rounded-full bg-primary transition-all duration-500"
          :style="{ width: `${(store.completedCount / store.totalCards) * 100}%` }"
        />
      </div>
    </div>

    <!-- Card -->
    <div
      v-if="store.currentCard"
      class="flex h-64 w-64 flex-col items-center justify-center gap-4 rounded-2xl border-2 border-primary/20 bg-card p-6 text-center shadow-lg"
    >
      <img :src="store.currentCard.exercise.image" :alt="store.currentCard.exercise.name" class="h-24 w-24 rounded-xl object-cover" />
      <span class="text-6xl font-black text-foreground">{{ store.currentCard.reps }}</span>
      <span class="text-2xl font-semibold text-muted-foreground">
        {{ store.currentCard.exercise.name }}
      </span>
    </div>

    <!-- Next / Finish button -->
    <button
      @click="store.nextCard()"
      class="w-full max-w-xs rounded-lg bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-md transition-transform active:scale-95"
    >
      {{ store.remainingCards === 0 ? 'Terminar' : 'Siguiente' }}
    </button>

    <button
      v-if="store.remainingCards > 0"
      @click="store.finishEarly()"
      class="mt-4 text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
    >
      Terminar entrenamiento
    </button>
  </div>
</template>
