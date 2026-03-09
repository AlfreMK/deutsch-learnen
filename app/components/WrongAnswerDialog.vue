<template>
  <StyledConfirmationDialog
    :model-value="modelValue"
    title="Wrong answer"
    confirm-text="Reset quiz"
    @update:model-value="$emit('update:modelValue', $event)"
    @confirm="$emit('reset')"
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
  modelValue: boolean
  correctAnswer: string
}>()

defineEmits<{
  'update:modelValue': [value: boolean]
  'reset': []
}>()
</script>
