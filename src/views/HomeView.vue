<script setup lang="ts">
import { useTrainingStore } from '@/stores/training'
import StepIndicator from '@/components/StepIndicator.vue'
import StepLanding from '@/components/StepLanding.vue'
import StepExercises from '@/components/StepExercises.vue'
import StepReps from '@/components/StepReps.vue'
import StepTraining from '@/components/StepTraining.vue'
import StepDone from '@/components/StepDone.vue'

const store = useTrainingStore()
</script>

<template>
  <div class="mx-auto max-w-md">
    <StepIndicator :current="store.currentStep" :total="3" />

    <StepLanding v-if="store.currentStep === 0" />
    <StepExercises v-else-if="store.currentStep === 1" />
    <StepReps v-else-if="store.currentStep === 2" />
    <StepTraining v-else-if="store.currentStep === 3" />
    <StepDone v-else-if="store.currentStep === 4" />
  </div>
</template>
