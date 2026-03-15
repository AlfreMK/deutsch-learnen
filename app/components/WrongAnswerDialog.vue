<template>
  <StyledConfirmationDialog
    v-model="isOpen"
    title="Wrong answer"
    confirm-text="Reset quiz"
    persistent
    @confirm="emit('reset')"
  >
    <template #title>
      <div class="d-flex align-center ga-2">
        <v-icon
          color="red"
          size="28"
          icon="mdi-alert-circle"
        />
        <span class="font-weight-bold text-headline-medium">
          Wrong answer
        </span>
      </div>
    </template>
    <p class="mb-2">
      The correct answer is:
    </p>
    <p class="text-large font-weight-bold">
      {{ correctAnswer }}
    </p>
  </StyledConfirmationDialog>
</template>

<script setup lang="ts">
defineProps<{
  correctAnswer: string
}>()

const emit = defineEmits<{
  reset: []
}>()

const isOpen = defineModel<boolean>({ default: false })

onKeyStroke('Enter', () => {
  if (isOpen.value) {
    emit('reset')
    isOpen.value = false
  }
})
</script>
