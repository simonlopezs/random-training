import { ref, onUnmounted } from 'vue'

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList
  resultIndex: number
}

export function useSpeechCommand(keywords: string[], onMatch: () => void) {
  const isListening = ref(false)
  const isSupported = ref(false)

  let recognition: SpeechRecognition | null = null

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  isSupported.value = !!SpeechRecognition

  function start() {
    if (!SpeechRecognition || isListening.value) return
    recognition = new SpeechRecognition()
    recognition.lang = 'es-ES'
    recognition.continuous = true
    recognition.interimResults = false

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i]![0]!.transcript.toLowerCase().trim()
        if (keywords.some((kw) => transcript.includes(kw))) {
          onMatch()
        }
      }
    }

    recognition.onend = () => {
      // Restart automatically if still supposed to be listening
      if (isListening.value && recognition) {
        recognition.start()
      }
    }

    recognition.onerror = (event: Event & { error?: string }) => {
      if (event.error === 'not-allowed') {
        isListening.value = false
      }
      // For other errors (network, no-speech), onend will restart
    }

    recognition.start()
    isListening.value = true
  }

  function stop() {
    isListening.value = false
    if (recognition) {
      recognition.onend = null
      recognition.abort()
      recognition = null
    }
  }

  function toggle() {
    if (isListening.value) {
      stop()
    } else {
      start()
    }
  }

  onUnmounted(() => {
    stop()
  })

  return { isListening, isSupported, toggle, start, stop }
}
