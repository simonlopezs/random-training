<script setup lang="ts">
import { ref } from 'vue'
import { useTrainingStore } from '@/stores/training'
const store = useTrainingStore()

const isSupported = !!(window.SpeechRecognition || window.webkitSpeechRecognition)
const showVoiceSheet = ref(false)
const keywordDraft = ref('')
const micPermissionDenied = ref(false)

function onToggleVoice() {
  if (store.voiceEnabled) {
    store.voiceEnabled = false
  } else {
    keywordDraft.value = store.voiceKeyword
    showVoiceSheet.value = true
  }
}

async function confirmVoice() {
  const trimmed = keywordDraft.value.trim()
  if (trimmed) {
    store.voiceKeyword = trimmed.toLowerCase()
  }
  // Request microphone permission now so user doesn't get prompted during training
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    stream.getTracks().forEach((t) => t.stop())
    micPermissionDenied.value = false
    store.voiceEnabled = true
    showVoiceSheet.value = false
  } catch {
    micPermissionDenied.value = true
  }
}

function cancelVoice() {
  showVoiceSheet.value = false
}
</script>

<template>
  <div class="flex flex-col gap-6 px-4 py-6">
    <div>
      <h2 class="text-2xl font-bold text-foreground">Configura las repeticiones</h2>
      <p class="mt-1 text-sm text-muted-foreground">
        Define el rango de repeticiones aleatorias para cada ejercicio
      </p>
    </div>

    <div class="flex flex-col gap-4 rounded-xl border border-border bg-card p-5">
      <!-- Min reps -->
      <div>
        <label class="mb-2 block text-sm font-medium text-card-foreground">
          Repeticiones mínimas
        </label>
        <div class="flex items-center justify-center gap-4">
          <button
            @click="store.minReps = Math.max(1, store.minReps - 1)"
            class="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-lg font-bold transition-colors hover:bg-accent active:scale-95"
          >
            −
          </button>
          <span class="min-w-[3rem] text-center text-2xl font-bold text-foreground">
            {{ store.minReps }}
          </span>
          <button
            @click="store.minReps = Math.min(store.maxReps, store.minReps + 1)"
            class="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-lg font-bold transition-colors hover:bg-accent active:scale-95"
          >
            +
          </button>
        </div>
      </div>

      <div class="border-t border-border"></div>

      <!-- Max reps -->
      <div>
        <label class="mb-2 block text-sm font-medium text-card-foreground">
          Repeticiones máximas
        </label>
        <div class="flex items-center justify-center gap-4">
          <button
            @click="store.maxReps = Math.max(store.minReps, store.maxReps - 1)"
            class="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-lg font-bold transition-colors hover:bg-accent active:scale-95"
          >
            −
          </button>
          <span class="min-w-[3rem] text-center text-2xl font-bold text-foreground">
            {{ store.maxReps }}
          </span>
          <button
            @click="store.maxReps++"
            class="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-lg font-bold transition-colors hover:bg-accent active:scale-95"
          >
            +
          </button>
        </div>
      </div>

      <div class="border-t border-border"></div>

      <!-- Surprise toggle -->
      <button
        @click="store.surpriseEnabled = !store.surpriseEnabled; if (store.surpriseEnabled) store.surpriseReps = Math.round(1.5 * store.maxReps)"
        class="flex w-full items-center justify-between py-1"
      >
        <div class="flex items-center gap-3">
          <span class="text-lg">🎉</span>
          <div class="text-left">
            <p class="text-sm font-medium text-foreground">Repeticiones sorpresa</p>
            <p class="text-xs text-muted-foreground">Cartas extra con repeticiones altas</p>
          </div>
        </div>
        <div
          class="h-6 w-11 rounded-full p-0.5 transition-colors"
          :class="store.surpriseEnabled ? 'bg-amber-500' : 'bg-muted'"
        >
          <div
            class="h-5 w-5 rounded-full bg-white shadow transition-transform"
            :class="store.surpriseEnabled ? 'translate-x-5' : 'translate-x-0'"
          />
        </div>
      </button>

      <!-- Surprise config (collapsible) -->
      <template v-if="store.surpriseEnabled">
        <div>
          <label class="mb-2 block text-sm font-medium text-card-foreground">
            Cantidad de sorpresas
          </label>
          <div class="flex items-center justify-center gap-4">
            <button
              @click="store.surpriseCount = Math.max(1, store.surpriseCount - 1)"
              class="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-lg font-bold transition-colors hover:bg-accent active:scale-95"
            >
              −
            </button>
            <span class="min-w-[3rem] text-center text-2xl font-bold text-foreground">
              {{ store.surpriseCount }}
            </span>
            <button
              @click="store.surpriseCount++"
              class="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-lg font-bold transition-colors hover:bg-accent active:scale-95"
            >
              +
            </button>
          </div>
        </div>

        <div class="border-t border-border"></div>

        <div>
          <label class="mb-2 block text-sm font-medium text-card-foreground">
            Repeticiones por sorpresa
          </label>
          <div class="flex items-center justify-center gap-4">
            <button
              @click="store.surpriseReps = Math.max(store.maxReps + 1, store.surpriseReps - 1)"
              class="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-lg font-bold transition-colors hover:bg-accent active:scale-95"
            >
              −
            </button>
            <span class="min-w-[3rem] text-center text-2xl font-bold text-amber-500">
              {{ store.surpriseReps }}
            </span>
            <button
              @click="store.surpriseReps++"
              class="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-lg font-bold transition-colors hover:bg-accent active:scale-95"
            >
              +
            </button>
          </div>
          <p class="mt-1 text-center text-xs text-muted-foreground">
            Mínimo {{ store.maxReps + 1 }} (mayor que max reps)
          </p>
        </div>
      </template>

      <div class="border-t border-border"></div>

      <!-- Rest time between sets -->
      <div>
        <label class="mb-2 block text-sm font-medium text-card-foreground">
          Descanso entre series (segundos)
        </label>
        <div class="flex items-center justify-center gap-4">
          <button
            @click="store.restSeconds = Math.max(1, store.restSeconds - 1)"
            class="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-lg font-bold transition-colors hover:bg-accent active:scale-95"
          >
            −
          </button>
          <span class="min-w-[3rem] text-center text-2xl font-bold text-foreground">
            {{ store.restSeconds }}
          </span>
          <button
            @click="store.restSeconds++"
            class="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-lg font-bold transition-colors hover:bg-accent active:scale-95"
          >
            +
          </button>
        </div>
      </div>
    </div>

    <!-- Voice control toggle -->
    <button
      v-if="isSupported"
      @click="onToggleVoice()"
      class="flex w-full items-center justify-between rounded-xl border border-border bg-card p-4 transition-colors"
      :class="store.voiceEnabled ? 'border-primary/40' : ''"
    >
      <div class="flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5" :class="store.voiceEnabled ? 'text-primary' : 'text-muted-foreground'">
          <path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3Zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.93V21h2v-3.07A7 7 0 0 0 19 11h-2Z" />
        </svg>
        <div class="text-left">
          <p class="text-sm font-medium text-foreground">Control por voz</p>
          <p class="text-xs text-muted-foreground">
            {{ store.voiceEnabled ? `Palabra: "${store.voiceKeyword}"` : 'Di una palabra para avanzar' }}
          </p>
        </div>
      </div>
      <div
        class="h-6 w-11 rounded-full p-0.5 transition-colors"
        :class="store.voiceEnabled ? 'bg-primary' : 'bg-muted'"
      >
        <div
          class="h-5 w-5 rounded-full bg-white shadow transition-transform"
          :class="store.voiceEnabled ? 'translate-x-5' : 'translate-x-0'"
        />
      </div>
    </button>

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
        {{ store.minReps === store.maxReps ? store.minReps : `${store.minReps} – ${store.maxReps}` }} {{ store.minReps === 1 && store.maxReps === 1 ? 'repetición' : 'repeticiones' }} por ejercicio
      </p>
      <p v-if="store.surpriseEnabled" class="text-sm text-amber-500">
        {{ store.surpriseCount }} {{ store.surpriseCount === 1 ? 'sorpresa' : 'sorpresas' }} de {{ store.surpriseReps }} {{ store.surpriseReps === 1 ? 'repetición' : 'repeticiones' }}
      </p>
      <p class="text-sm text-muted-foreground">
        {{ store.restSeconds }}s de descanso entre series
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
    <!-- Voice config bottom sheet -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="showVoiceSheet"
          class="fixed inset-0 z-40 bg-black/50"
          @click="cancelVoice()"
        />
      </Transition>
      <Transition name="slide-up">
        <div
          v-if="showVoiceSheet"
          class="fixed inset-x-0 bottom-0 z-50 rounded-t-2xl bg-background p-6 shadow-2xl"
        >
          <div class="mx-auto mb-4 h-1 w-10 rounded-full bg-muted" />
          <h3 class="text-lg font-bold text-foreground">Control por voz</h3>
          <p class="mt-1 text-sm text-muted-foreground">
            Palabra que activa el siguiente ejercicio
          </p>
          <input
            v-model="keywordDraft"
            type="text"
            class="mt-4 w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="siguiente"
            @keydown.enter="confirmVoice()"
          />
          <p v-if="micPermissionDenied" class="mt-2 text-sm text-red-500">
            Permiso de micrófono denegado. Actívalo en la configuración del navegador.
          </p>
          <button
            @click="confirmVoice()"
            :disabled="!keywordDraft.trim()"
            :class="[
              'mt-4 w-full rounded-lg px-6 py-3 font-semibold transition-all',
              keywordDraft.trim()
                ? 'bg-primary text-primary-foreground active:scale-95'
                : 'cursor-not-allowed bg-muted text-muted-foreground',
            ]"
          >
            Confirmar
          </button>
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
