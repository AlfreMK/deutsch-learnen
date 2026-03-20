<template>
  <StyledConfirmationDialog
    v-model="isOpen"
    title="Wrong answer"
    :confirm-text="confirmText"
    persistent
    @confirm="emit('confirm')"
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
  confirmText?: string
}>()

const emit = defineEmits<{
  confirm: []
}>()

const isOpen = defineModel<boolean>({ default: false })

onKeyStroke('Enter', () => {
  if (isOpen.value) {
    emit('confirm')
    isOpen.value = false
  }
})
</script>
