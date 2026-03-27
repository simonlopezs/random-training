<script setup lang="ts">
import { useTrainingStore } from '@/stores/training'

const store = useTrainingStore()
</script>

<template>
  <div class="flex flex-col gap-6 px-4 py-6">
    <div>
      <h2 class="text-2xl font-bold text-foreground">Configura las repeticiones</h2>
      <p class="mt-1 text-sm text-muted-foreground">
        Define el rango de repeticiones aleatorias para cada ejercicio
      </p>
    </div>

    <div class="flex flex-col gap-6 rounded-xl border border-border bg-card p-6">
      <div>
        <label class="mb-2 block text-sm font-medium text-card-foreground">
          Repeticiones mínimas
        </label>
        <div class="flex items-center justify-center gap-4">
          <button
            @click="store.minReps = Math.max(1, store.minReps - 1)"
            class="flex h-12 w-12 items-center justify-center rounded-lg border border-border text-xl font-bold transition-colors hover:bg-accent active:scale-95"
          >
            −
          </button>
          <span class="min-w-[3rem] text-center text-3xl font-bold text-foreground">
            {{ store.minReps }}
          </span>
          <button
            @click="store.minReps = Math.min(store.maxReps, store.minReps + 1)"
            class="flex h-12 w-12 items-center justify-center rounded-lg border border-border text-xl font-bold transition-colors hover:bg-accent active:scale-95"
          >
            +
          </button>
        </div>
      </div>

      <div class="border-t border-border"></div>

      <div>
        <label class="mb-2 block text-sm font-medium text-card-foreground">
          Repeticiones máximas
        </label>
        <div class="flex items-center justify-center gap-4">
          <button
            @click="store.maxReps = Math.max(store.minReps, store.maxReps - 1)"
            class="flex h-12 w-12 items-center justify-center rounded-lg border border-border text-xl font-bold transition-colors hover:bg-accent active:scale-95"
          >
            −
          </button>
          <span class="min-w-[3rem] text-center text-3xl font-bold text-foreground">
            {{ store.maxReps }}
          </span>
          <button
            @click="store.maxReps++"
            class="flex h-12 w-12 items-center justify-center rounded-lg border border-border text-xl font-bold transition-colors hover:bg-accent active:scale-95"
          >
            +
          </button>
        </div>
      </div>
    </div>

    <!-- Resumen -->
    <div class="rounded-xl border border-border bg-muted/50 p-4">
      <h3 class="mb-2 text-sm font-semibold text-foreground">Resumen</h3>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="exercise in store.selectedExercises"
          :key="exercise.id"
          class="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
        >
          {{ exercise.name }}
        </span>
      </div>
      <p class="mt-2 text-sm text-muted-foreground">
        {{ store.minReps }} – {{ store.maxReps }} repeticiones por ejercicio
      </p>
    </div>

    <div class="sticky bottom-0 bg-background pb-4 pt-2">
      <div class="flex gap-3">
        <button
          @click="store.prevStep()"
          class="flex-1 rounded-lg border border-border px-6 py-3 font-medium text-foreground transition-colors hover:bg-accent"
        >
          Atrás
        </button>
        <button
          @click="store.startTraining()"
          :disabled="!store.canContinueFromReps"
          :class="[
            'flex-1 rounded-lg px-6 py-3 text-lg font-bold transition-all',
            store.canContinueFromReps
              ? 'bg-primary text-primary-foreground shadow-md active:scale-95'
              : 'cursor-not-allowed bg-muted text-muted-foreground',
          ]"
        >
          🎲 Comenzar
        </button>
      </div>
    </div>
  </div>
</template>
