<script setup lang="ts">
import { ref } from 'vue'
import { useTrainingStore } from '@/stores/training'
import { useSpeechCommand } from '@/composables/useSpeechCommand'

const store = useTrainingStore()
const { isListening, start } = useSpeechCommand(
  [store.voiceKeyword],
  () => store.nextCard(),
)

if (store.voiceEnabled) {
  start()
}

const showFinishSheet = ref(false)
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
        <span>{{ store.remainingCards }} {{ store.remainingCards === 1 ? 'restante' : 'restantes' }}</span>
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
      class="flex h-64 w-64 flex-col items-center justify-center gap-4 rounded-2xl border-2 bg-card p-6 text-center shadow-lg"
      :class="store.currentCard.surprise ? 'border-amber-500/40' : 'border-primary/20'"
    >
      <img :src="store.currentCard.exercise.image" :alt="store.currentCard.exercise.name" class="h-24 w-24 rounded-xl object-cover" />
      <span
        class="text-6xl font-black"
        :class="store.currentCard.surprise ? 'text-amber-500' : 'text-foreground'"
      >
        {{ store.currentCard.reps }}
      </span>
      <span class="text-2xl font-semibold text-muted-foreground">
        {{ store.currentCard.reps === 1 ? store.currentCard.exercise.singular : store.currentCard.exercise.name }}
      </span>
    </div>

    <!-- Next / Finish button -->
    <button
      @click="store.nextCard()"
      class="w-full max-w-xs rounded-lg bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-md transition-transform active:scale-95"
    >
      {{ store.remainingCards === 0 ? 'Terminar' : 'Siguiente' }}
    </button>

    <!-- Voice active indicator -->
    <p v-if="isListening" class="flex items-center gap-2 text-sm text-muted-foreground">
      <span class="h-2 w-2 animate-pulse rounded-full bg-red-500" />
      Voz activa
    </p>

    <button
      v-if="store.remainingCards > 0"
      @click="showFinishSheet = true"
      class="mt-4 text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
    >
      Terminar entrenamiento
    </button>

    <!-- Confirm finish bottom sheet -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="showFinishSheet"
          class="fixed inset-0 z-40 bg-black/50"
          @click="showFinishSheet = false"
        />
      </Transition>
      <Transition name="slide-up">
        <div
          v-if="showFinishSheet"
          class="fixed inset-x-0 bottom-0 z-50 rounded-t-2xl bg-background p-6 shadow-2xl"
        >
          <div class="mx-auto mb-4 h-1 w-10 rounded-full bg-muted" />
          <h3 class="text-lg font-bold text-foreground">Terminar entrenamiento</h3>
          <p class="mt-1 text-sm text-muted-foreground">
            Quedan {{ store.remainingCards }} {{ store.remainingCards === 1 ? 'carta' : 'cartas' }} por completar.
          </p>
          <div class="mt-4 flex gap-3">
            <button
              @click="showFinishSheet = false"
              class="flex-1 rounded-lg border border-border px-6 py-3 font-medium text-foreground transition-colors hover:bg-accent"
            >
              Cancelar
            </button>
            <button
              @click="showFinishSheet = false; store.finishEarly()"
              class="flex-1 rounded-lg bg-destructive px-6 py-3 font-semibold text-destructive-foreground active:scale-95"
            >
              Terminar
            </button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}
</style>
