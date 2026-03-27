<script setup lang="ts">
import { ref } from 'vue'
import { useTrainingStore } from '@/stores/training'

const store = useTrainingStore()
const showDetail = ref(false)

function formatDuration(secs: number) {
  const m = Math.floor(secs / 60)
  const s = secs % 60
  return m > 0 ? `${m}m ${s.toString().padStart(2, '0')}s` : `${s}s`
}
</script>

<template>
  <div class="flex min-h-[80vh] flex-col items-center justify-center gap-6 px-4 text-center">
    <span class="text-7xl">{{ store.completedCount < store.totalCards ? '💪' : '🎉' }}</span>
    <h2 class="text-3xl font-bold text-foreground">
      {{ store.completedCount < store.totalCards ? '¡Entrenamiento terminado!' : '¡Entrenamiento completado!' }}
    </h2>
    <p class="text-4xl font-mono font-bold text-foreground">
      {{ store.formattedTime }}
    </p>
    <p class="text-lg text-muted-foreground">
      {{ store.completedCount < store.totalCards ? `${store.completedCount} de ${store.totalCards}` : store.completedCount }} {{ store.completedCount === 1 ? 'serie completada' : 'series completadas' }}
    </p>

    <div class="w-full max-w-xs rounded-xl border border-border bg-card p-4 text-left">
      <ul class="flex flex-col gap-2">
        <li
          v-for="item in store.completedBreakdown"
          :key="item.exercise.id"
          class="flex items-center justify-between text-sm"
        >
          <span class="text-foreground">{{ item.exercise.name }}</span>
          <span class="text-muted-foreground">
            <template v-if="item.surprises > 0">{{ item.total - item.surprises }} + <span class="text-amber-500">{{ item.surprises }}</span></template>
            <template v-else>{{ item.total }}</template>
            {{ item.total === 1 ? 'serie' : 'series' }} · {{ item.reps }} reps
          </span>
        </li>
      </ul>
    </div>

    <button
      v-if="store.seriesLog.length > 0"
      @click="showDetail = true"
      class="text-sm font-medium text-primary underline underline-offset-4"
    >
      Ver detalle
    </button>

    <button
      @click="store.reset()"
      class="mt-4 rounded-lg bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-md transition-transform active:scale-95"
    >
      Volver al inicio
    </button>

    <!-- Detail bottom sheet -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="showDetail"
          class="fixed inset-0 z-40 bg-black/50"
          @click="showDetail = false"
        />
      </Transition>
      <Transition name="slide-up">
        <div
          v-if="showDetail"
          class="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-background p-6 shadow-2xl"
        >
          <div class="mx-auto mb-4 h-1 w-10 rounded-full bg-muted" />

          <!-- Series history -->
          <h3 class="text-lg font-bold text-foreground">Historial de series</h3>
          <table class="mt-2 w-full text-left text-sm">
            <thead>
              <tr class="text-muted-foreground">
                <th class="pb-1 font-medium">#</th>
                <th class="pb-1 font-medium">Ejercicio</th>
                <th class="pb-1 text-right font-medium">Reps</th>
                <th class="pb-1 text-right font-medium">Tiempo (s)</th>
                <th class="pb-1 text-right font-medium">Promedio (s/rep)</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(log, i) in store.seriesLog"
                :key="i"
                :class="log.surprise ? 'text-amber-500' : 'text-foreground'"
              >
                <td class="py-0.5">{{ i + 1 }}</td>
                <td class="py-0.5">{{ log.exerciseName }}</td>
                <td class="py-0.5 text-right">{{ log.reps }}</td>
                <td class="py-0.5 text-right">{{ log.durationSecs.toFixed(1) }}</td>
                <td class="py-0.5 text-right">{{ log.secsPerRep.toFixed(1) }}</td>
              </tr>
            </tbody>
          </table>

          <!-- Average per exercise -->
          <h3 class="mt-6 text-lg font-bold text-foreground">Promedio por ejercicio</h3>
          <table class="mt-2 w-full text-left text-sm">
            <thead>
              <tr class="text-muted-foreground">
                <th class="pb-1 font-medium"></th>
                <th class="pb-1 text-right font-medium">Promedio (s/rep)</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="avg in store.avgSecsPerRepByExercise"
                :key="avg.exercise.id"
                class="text-foreground"
              >
                <td class="py-0.5">{{ avg.exercise.name }}</td>
                <td class="py-0.5 text-right">{{ avg.avgSecsPerRep.toFixed(1) }}</td>
              </tr>
            </tbody>
          </table>

          <button
            @click="showDetail = false"
            class="mt-6 w-full rounded-lg border border-border px-6 py-3 font-medium text-foreground transition-colors hover:bg-accent"
          >
            Cerrar
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
