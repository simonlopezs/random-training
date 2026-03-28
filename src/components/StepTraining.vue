<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useTrainingStore } from '@/stores/training'
import { useSpeechCommand } from '@/composables/useSpeechCommand'

const store = useTrainingStore()

// Voice recognition for "next" command
const { isListening, start: startListening, stop: stopListening } = useSpeechCommand(
  [store.voiceKeyword],
  () => handleNext(),
)

if (store.voiceEnabled) {
  startListening()
}

// Rest countdown state
const isResting = ref(false)
const restCountdown = ref(0)
let restInterval: ReturnType<typeof setInterval> | null = null

// The card to display: during rest it's the preview, otherwise the current card
const displayCard = computed(() => {
  if (isResting.value && store.nextCardPreview) return store.nextCardPreview
  return store.currentCard
})

function speakExercise(reps: number, name: string, feminine: boolean) {
  if (!window.speechSynthesis) return
  const repsText = reps === 1 ? (feminine ? 'una' : 'un') : String(reps)
  const utterance = new SpeechSynthesisUtterance(`${repsText} ${name}`)
  utterance.lang = 'es-ES'
  utterance.rate = 1.1
  window.speechSynthesis.speak(utterance)
}

function startRestCountdown() {
  isResting.value = true
  restCountdown.value = store.restSeconds

  // Announce the next exercise
  const preview = store.nextCardPreview
  if (preview) {
    const name = preview.reps === 1 ? preview.exercise.singular : preview.exercise.name
    speakExercise(preview.reps, name, preview.exercise.feminine)
  }

  restInterval = setInterval(() => {
    restCountdown.value--
    if (restCountdown.value <= 0) {
      clearInterval(restInterval!)
      restInterval = null
      isResting.value = false
      store.promotePeekedCard()
    }
  }, 1000)
}

function handleNext() {
  if (isResting.value) return
  const result = store.nextCard()
  if (result === 'rest') {
    startRestCountdown()
  }
}

const showFinishSheet = ref(false)

function handleFinishEarly() {
  if (restInterval) {
    clearInterval(restInterval)
    restInterval = null
  }
  isResting.value = false
  showFinishSheet.value = false
  store.finishEarly()
}

// Start with rest countdown for the first card
onMounted(() => {
  if (store.nextCardPreview) {
    startRestCountdown()
  }
})

onUnmounted(() => {
  if (restInterval) {
    clearInterval(restInterval)
  }
  stopListening()
})
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

    <!-- Status badge (fixed height to prevent layout shift) -->
    <div class="flex h-10 items-center justify-center rounded-full px-4"
      :class="isResting ? 'bg-blue-500/10' : 'bg-muted/50'"
    >
      <span class="text-sm font-medium" :class="isResting ? 'text-blue-500' : 'text-muted-foreground'">
        {{ isResting ? restCountdown : 'En curso' }}
      </span>
    </div>

    <!-- Card -->
    <div
      v-if="displayCard"
      class="flex h-64 w-64 flex-col items-center justify-center gap-4 rounded-2xl border-2 bg-card p-6 text-center shadow-lg transition-colors"
      :class="isResting ? 'border-blue-500/50' : displayCard.surprise ? 'border-amber-500/40' : 'border-primary/20'"
    >
      <img :src="displayCard.exercise.image" :alt="displayCard.exercise.name" class="h-24 w-24 rounded-xl object-cover" />
      <span
        class="text-6xl font-black"
        :class="displayCard.surprise && !isResting ? 'text-amber-500' : 'text-foreground'"
      >
        {{ displayCard.reps }}
      </span>
      <span class="text-2xl font-semibold text-muted-foreground">
        {{ displayCard.reps === 1 ? displayCard.exercise.singular : displayCard.exercise.name }}
      </span>
    </div>

    <!-- Next / Finish button -->
    <button
      @click="handleNext()"
      :disabled="isResting"
      :class="[
        'w-full max-w-xs rounded-lg px-8 py-4 text-lg font-semibold shadow-md transition-transform',
        isResting
          ? 'cursor-not-allowed bg-muted text-muted-foreground'
          : 'bg-primary text-primary-foreground active:scale-95',
      ]"
    >
      {{ store.remainingCards === 0 && !isResting ? 'Terminar' : 'Siguiente' }}
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
              @click="handleFinishEarly()"
              class="flex-1 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground active:scale-95"
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
