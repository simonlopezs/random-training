<script setup lang="ts">
import { useTrainingStore, EXERCISES } from '@/stores/training'

const store = useTrainingStore()
</script>

<template>
  <div class="flex flex-col gap-6 px-4 py-6">
    <div>
      <h2 class="text-2xl font-bold text-foreground">Elige tus ejercicios</h2>
      <p class="mt-1 text-sm text-muted-foreground">
        Selecciona los ejercicios que quieres incluir en tu entrenamiento
      </p>
    </div>

    <div class="grid grid-cols-2 gap-3">
      <button
        v-for="exercise in EXERCISES"
        :key="exercise.id"
        @click="store.toggleExercise(exercise.id)"
        :class="[
          'flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all active:scale-95',
          store.selectedExerciseIds.includes(exercise.id)
            ? 'border-primary bg-primary/10 shadow-sm'
            : 'border-border bg-card hover:border-muted-foreground/30',
        ]"
      >
        <img :src="exercise.image" :alt="exercise.name" class="h-16 w-16 rounded-lg object-cover" />
        <span
          class="text-sm font-medium"
          :class="
            store.selectedExerciseIds.includes(exercise.id)
              ? 'text-primary'
              : 'text-card-foreground'
          "
        >
          {{ exercise.name }}
        </span>
      </button>
    </div>

    <div class="sticky bottom-0 bg-background pb-4 pt-2">
      <p class="mb-2 text-center text-sm text-muted-foreground">
        {{ store.selectedExerciseIds.length }} ejercicio{{
          store.selectedExerciseIds.length !== 1 ? 's' : ''
        }}
        seleccionado{{ store.selectedExerciseIds.length !== 1 ? 's' : '' }}
      </p>
      <div class="flex gap-3">
        <button
          @click="store.prevStep()"
          class="flex-1 rounded-lg border border-border px-6 py-3 font-medium text-foreground transition-colors hover:bg-accent"
        >
          Atrás
        </button>
        <button
          @click="store.nextStep()"
          :disabled="!store.canContinueFromExercises"
          :class="[
            'flex-1 rounded-lg px-6 py-3 font-semibold transition-all',
            store.canContinueFromExercises
              ? 'bg-primary text-primary-foreground active:scale-95'
              : 'cursor-not-allowed bg-muted text-muted-foreground',
          ]"
        >
          Continuar
        </button>
      </div>
    </div>
  </div>
</template>
