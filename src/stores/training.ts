import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export interface Exercise {
  id: string
  name: string
  singular: string
  image: string
}

const IMG_BASE = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises'

export const EXERCISES: Exercise[] = [
  { id: 'squats', name: 'Sentadillas', singular: 'Sentadilla', image: `${IMG_BASE}/Bodyweight_Squat/1.jpg` },
  { id: 'pushups', name: 'Flexiones', singular: 'Flexión', image: `${IMG_BASE}/Close-Grip_Push-Up_off_of_a_Dumbbell/1.jpg` },
  { id: 'pullups', name: 'Dominadas', singular: 'Dominada', image: `${IMG_BASE}/Chin-Up/1.jpg` },
  { id: 'burpees', name: 'Burpees', singular: 'Burpee', image: `${IMG_BASE}/Freehand_Jump_Squat/1.jpg` },
  { id: 'dips', name: 'Fondos', singular: 'Fondo', image: `${IMG_BASE}/Dips_-_Triceps_Version/1.jpg` },
  { id: 'leg-raises', name: 'Elevaciones de piernas', singular: 'Elevación de piernas', image: `${IMG_BASE}/Hanging_Leg_Raise/1.jpg` },
  { id: 'mountain-climbers', name: 'Escaladores', singular: 'Escalador', image: `${IMG_BASE}/Mountain_Climbers/1.jpg` },
  { id: 'lunges', name: 'Zancadas', singular: 'Zancada', image: `${IMG_BASE}/Bodyweight_Walking_Lunge/1.jpg` },
]

export interface Card {
  exerciseId: string
  reps: number
  surprise?: boolean
}

export interface CurrentCard {
  exercise: Exercise
  reps: number
  surprise: boolean
}

export interface SeriesLog {
  exerciseId: string
  exerciseName: string
  reps: number
  surprise: boolean
  startedAt: number
  finishedAt: number
  durationSecs: number
  secsPerRep: number
}

export const useTrainingStore = defineStore('training', () => {
  const currentStep = ref(0)
  const selectedExerciseIds = ref<string[]>([])
  const minReps = ref(1)
  const maxReps = ref(10)
  const voiceEnabled = ref(false)
  const voiceKeyword = ref('siguiente')

  // Surprise reps
  const surpriseEnabled = ref(false)
  const surpriseCount = ref(4)
  const surpriseReps = ref(Math.round(1.5 * 10))

  // Training deck state
  const deck = ref<Card[]>([])
  const currentCard = ref<CurrentCard | null>(null)
  const completedCount = ref(0)
  const totalCards = ref(0)
  const completedCards = ref<Card[]>([])
  const seriesLog = ref<SeriesLog[]>([])
  let cardStartedAt = 0

  // Timer
  const startTime = ref(0)
  const endTime = ref(0)
  const elapsedSeconds = ref(0)
  let timerInterval: ReturnType<typeof setInterval> | null = null

  function startTimer() {
    startTime.value = Date.now()
    timerInterval = setInterval(() => {
      elapsedSeconds.value = Math.floor((Date.now() - startTime.value) / 1000)
    }, 1000)
  }

  function stopTimer() {
    if (timerInterval) {
      clearInterval(timerInterval)
      timerInterval = null
    }
    endTime.value = Date.now()
    elapsedSeconds.value = Math.floor((endTime.value - startTime.value) / 1000)
  }

  const formattedTime = computed(() => {
    const total = elapsedSeconds.value
    const h = Math.floor(total / 3600)
    const m = Math.floor((total % 3600) / 60)
    const s = total % 60
    if (h > 0) return `${h}h ${m.toString().padStart(2, '0')}m ${s.toString().padStart(2, '0')}s`
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  })

  const selectedExercises = computed(() =>
    EXERCISES.filter((e) => selectedExerciseIds.value.includes(e.id)),
  )

  const canContinueFromExercises = computed(() => selectedExerciseIds.value.length > 0)
  const canContinueFromReps = computed(() => minReps.value > 0 && maxReps.value >= minReps.value)
  const isTrainingDone = computed(() => deck.value.length === 0 && currentCard.value !== null)
  const remainingCards = computed(() => deck.value.length)

  const completedBreakdown = computed(() => {
    const map = new Map<string, { exercise: Exercise; total: number; reps: number; surprises: number }>()
    for (const card of completedCards.value) {
      const entry = map.get(card.exerciseId)
      if (entry) {
        entry.total++
        entry.reps += card.reps
        if (card.surprise) entry.surprises++
      } else {
        const exercise = EXERCISES.find((e) => e.id === card.exerciseId)!
        map.set(card.exerciseId, { exercise, total: 1, reps: card.reps, surprises: card.surprise ? 1 : 0 })
      }
    }
    return Array.from(map.values())
  })

  const avgSecsPerRepByExercise = computed(() => {
    const map = new Map<string, { exercise: Exercise; totalReps: number; totalSecs: number }>()
    for (const log of seriesLog.value) {
      const entry = map.get(log.exerciseId)
      if (entry) {
        entry.totalReps += log.reps
        entry.totalSecs += log.durationSecs
      } else {
        const exercise = EXERCISES.find((e) => e.id === log.exerciseId)!
        map.set(log.exerciseId, { exercise, totalReps: log.reps, totalSecs: log.durationSecs })
      }
    }
    return Array.from(map.values()).map((e) => ({
      exercise: e.exercise,
      avgSecsPerRep: e.totalReps > 0 ? Math.round((e.totalSecs / e.totalReps) * 100) / 100 : 0,
    }))
  })

  function toggleExercise(id: string) {
    const idx = selectedExerciseIds.value.indexOf(id)
    if (idx === -1) {
      selectedExerciseIds.value.push(id)
    } else {
      selectedExerciseIds.value.splice(idx, 1)
    }
  }

  function buildDeck() {
    const cards: Card[] = []
    for (const id of selectedExerciseIds.value) {
      for (let reps = minReps.value; reps <= maxReps.value; reps++) {
        cards.push({ exerciseId: id, reps })
      }
    }

    // Insert surprise cards into random exercises at random positions
    if (surpriseEnabled.value && surpriseReps.value > maxReps.value) {
      const ids = selectedExerciseIds.value
      for (let i = 0; i < surpriseCount.value; i++) {
        const exerciseId = ids[Math.floor(Math.random() * ids.length)]!
        cards.push({ exerciseId, reps: surpriseReps.value, surprise: true })
      }
    }

    deck.value = cards
    totalCards.value = cards.length
    completedCount.value = 0
    completedCards.value = []
    seriesLog.value = []
    cardStartedAt = 0
    currentCard.value = null
  }

  function logCurrentCard() {
    if (currentCard.value && cardStartedAt > 0) {
      const now = Date.now()
      const durationSecs = Math.round(((now - cardStartedAt) / 1000) * 100) / 100
      seriesLog.value.push({
        exerciseId: currentCard.value.exercise.id,
        exerciseName: currentCard.value.exercise.name,
        reps: currentCard.value.reps,
        surprise: currentCard.value.surprise,
        startedAt: cardStartedAt,
        finishedAt: now,
        durationSecs,
        secsPerRep: currentCard.value.reps > 0 ? Math.round((durationSecs / currentCard.value.reps) * 100) / 100 : 0,
      })
    }
  }

  function drawCard() {
    if (deck.value.length === 0) return
    logCurrentCard()
    const idx = Math.floor(Math.random() * deck.value.length)
    const card = deck.value[idx]!
    deck.value.splice(idx, 1)
    const exercise = EXERCISES.find((e) => e.id === card.exerciseId)!
    currentCard.value = { exercise, reps: card.reps, surprise: !!card.surprise }
    completedCards.value.push(card)
    completedCount.value++
    cardStartedAt = Date.now()
  }

  function startTraining() {
    buildDeck()
    drawCard()
    startTimer()
    currentStep.value = 3
  }

  function nextCard() {
    if (deck.value.length > 0) {
      drawCard()
    } else {
      logCurrentCard()
      stopTimer()
      currentCard.value = null
      currentStep.value = 4 // done
    }
  }

  function nextStep() {
    currentStep.value++
  }

  function prevStep() {
    if (currentStep.value > 0) currentStep.value--
  }

  function finishEarly() {
    logCurrentCard()
    stopTimer()
    currentStep.value = 4
  }

  function reset() {
    stopTimer()
    currentStep.value = 0
    selectedExerciseIds.value = []
    minReps.value = 1
    maxReps.value = 10
    voiceEnabled.value = false
    voiceKeyword.value = 'siguiente'
    surpriseEnabled.value = false
    surpriseCount.value = 4
    surpriseReps.value = Math.round(1.5 * 10)
    deck.value = []
    currentCard.value = null
    completedCards.value = []
    seriesLog.value = []
    cardStartedAt = 0
    completedCount.value = 0
    totalCards.value = 0
    elapsedSeconds.value = 0
    startTime.value = 0
    endTime.value = 0
  }

  return {
    currentStep,
    selectedExerciseIds,
    minReps,
    maxReps,
    voiceEnabled,
    voiceKeyword,
    surpriseEnabled,
    surpriseCount,
    surpriseReps,
    selectedExercises,
    canContinueFromExercises,
    canContinueFromReps,
    isTrainingDone,
    remainingCards,
    deck,
    currentCard,
    completedCount,
    completedBreakdown,
    seriesLog,
    avgSecsPerRepByExercise,
    totalCards,
    elapsedSeconds,
    formattedTime,
    toggleExercise,
    nextStep,
    prevStep,
    startTraining,
    nextCard,
    finishEarly,
    reset,
  }
})
