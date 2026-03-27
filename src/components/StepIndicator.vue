<script setup lang="ts">
defineProps<{
  current: number
  total: number
}>()
</script>

<template>
  <div v-if="current > 0" class="flex items-center justify-center gap-2 px-4 py-3">
    <div
      v-for="step in total"
      :key="step"
      :class="[
        'h-2 rounded-full transition-all duration-300',
        step <= current ? 'w-8 bg-primary' : 'w-2 bg-muted',
      ]"
    />
  </div>
</template>
