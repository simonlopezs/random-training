import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export interface Exercise {
  id: string
  name: string
  singular: string
  feminine: boolean
  image: string
}

const IMG_BASE = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises'

export const EXERCISES: Exercise[] = [
  { id: 'squats', name: 'Sentadillas', singular: 'Sentadilla', feminine: true, image: `${IMG_BASE}/Bodyweight_Squat/1.jpg` },
  { id: 'pushups', name: 'Flexiones', singular: 'Flexión', feminine: true, image: `${IMG_BASE}/Close-Grip_Push-Up_off_of_a_Dumbbell/1.jpg` },
  { id: 'pullups', name: 'Dominadas', singular: 'Dominada', feminine: true, image: `${IMG_BASE}/Chin-Up/1.jpg` },
  { id: 'burpees', name: 'Burpees', singular: 'Burpee', feminine: false, image: `${IMG_BASE}/Freehand_Jump_Squat/1.jpg` },
  { id: 'dips', name: 'Fondos', singular: 'Fondo', feminine: false, image: `${IMG_BASE}/Dips_-_Triceps_Version/1.jpg` },
  { id: 'leg-raises', name: 'Elevaciones de piernas', singular: 'Elevación de piernas', feminine: true, image: `${IMG_BASE}/Hanging_Leg_Raise/1.jpg` },
  { id: 'mountain-climbers', name: 'Escaladores', singular: 'Escalador', feminine: false, image: `${IMG_BASE}/Mountain_Climbers/1.jpg` },
  { id: 'lunges', name: 'Zancadas', singular: 'Zancada', feminine: true, image: `${IMG_BASE}/Bodyweight_Walking_Lunge/1.jpg` },
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

  // Rest between sets
  const restSeconds = ref(3)

  // Training deck state
  const deck = ref<Card[]>([])
  const currentCard = ref<CurrentCard | null>(null)
  const completedCount = ref(0)
  const totalCards = ref(0)
  const completedCards = ref<Card[]>([])
  const seriesLog = ref<SeriesLog[]>([])
  let cardStartedAt = 0

  // Timer (tracks only training time, excludes rest)
  const elapsedSeconds = ref(0)
  let timerInterval: ReturnType<typeof setInterval> | null = null
  let timerRunning = false

  function startTimer() {
    timerRunning = true
    timerInterval = setInterval(() => {
      if (timerRunning) {
        elapsedSeconds.value++
      }
    }, 1000)
  }

  function pauseTimer() {
    timerRunning = false
  }

  function resumeTimer() {
    timerRunning = true
  }

  function stopTimer() {
    timerRunning = false
    if (timerInterval) {
      clearInterval(timerInterval)
      timerInterval = null
    }
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

  // Peek at next card without drawing (for announcements during rest)
  const nextCardPreview = ref<CurrentCard | null>(null)

  function peekNextCard() {
    if (deck.value.length === 0) {
      nextCardPreview.value = null
      return
    }
    const idx = Math.floor(Math.random() * deck.value.length)
    const card = deck.value[idx]!
    deck.value.splice(idx, 1)
    const exercise = EXERCISES.find((e) => e.id === card.exerciseId)!
    nextCardPreview.value = { exercise, reps: card.reps, surprise: !!card.surprise }
    completedCards.value.push(card)
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

  /** Promote the peeked card to current and resume training */
  function promotePeekedCard() {
    if (nextCardPreview.value) {
      currentCard.value = nextCardPreview.value
      nextCardPreview.value = null
      completedCount.value++
      cardStartedAt = Date.now()
      resumeTimer()
    }
  }

  function startTraining() {
    buildDeck()
    peekNextCard()
    startTimer()
    pauseTimer()
    currentStep.value = 3
  }

  /**
   * Called when user finishes a set.
   * Returns 'rest' if there are more cards (component should show countdown),
   * or 'done' if training is over.
   */
  function nextCard(): 'rest' | 'done' {
    logCurrentCard()
    if (deck.value.length > 0) {
      pauseTimer()
      peekNextCard()
      return 'rest'
    } else {
      stopTimer()
      currentCard.value = null
      currentStep.value = 4
      return 'done'
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
    restSeconds.value = 3
    deck.value = []
    currentCard.value = null
    nextCardPreview.value = null
    completedCards.value = []
    seriesLog.value = []
    cardStartedAt = 0
    completedCount.value = 0
    totalCards.value = 0
    elapsedSeconds.value = 0
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
    restSeconds,
    selectedExercises,
    canContinueFromExercises,
    canContinueFromReps,
    isTrainingDone,
    remainingCards,
    deck,
    currentCard,
    nextCardPreview,
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
    promotePeekedCard,
    finishEarly,
    reset,
  }
})
