<template>
  <div
    class="d-flex align-center ga-4 text-body-medium"
  >
    <v-btn
      variant="text"
      prepend-icon="mdi-chart-bar"
      @click="emit('showStatsChart')"
    >
      Stats
    </v-btn>
    <span class="d-flex align-center ga-1">
      <v-icon
        color="green"
        size="18"
        icon="mdi-check-circle"
      />
      {{ successes }}
    </span>
    <span class="d-flex align-center ga-1">
      <v-icon
        color="red"
        size="18"
        icon="mdi-close-circle"
      />
      {{ fails }}
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  successes: number
  fails: number
}>()
interface Emits {
  (e: 'showStatsChart'): void
}
const emit = defineEmits<Emits>()
</script>
