<template>
  <StyledConfirmationDialog
    v-model="isOpen"
    title="Set random seed"
    confirm-text="Close"
    persistent
    @confirm="isOpen = false"
  >
    <template #activator="{ attrs }">
      <slot
        name="activator"
        :attrs="attrs"
      />
    </template>
    You can set a random seed to ensure the exercises are shuffled in the same order (useful for some quizzes).
    <v-number-input
      v-model="seed"
      class="my-4"
      label="Seed"
      clearable
    />
  </StyledConfirmationDialog>
</template>

<script setup lang="ts">
const isOpen = ref(false)
const seed = defineModel<number | undefined>({ default: undefined })
</script>
