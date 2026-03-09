<template>
  <StyledConfirmationDialog
    :model-value="modelValue"
    title="All correct!"
    confirm-text="Reset quiz"
    @update:model-value="$emit('update:modelValue', $event)"
    @confirm="$emit('reset')"
  >
    <template #title>
      <div class="d-flex align-center ga-2">
        <v-icon
          color="green"
          size="28"
          icon="mdi-check-circle"
        />
        <span class="font-weight-bold text-headline-medium">
          All correct!
        </span>
      </div>
    </template>
    <v-table density="comfortable">
      <thead>
        <tr>
          <th class="text-left text-body-medium">
            Question
          </th>
          <th class="text-left text-body-medium">
            Answer
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, i) in summary"
          :key="i"
        >
          <td>{{ row.title }}</td>
          <td>{{ row.expectedAnswer }}</td>
        </tr>
      </tbody>
    </v-table>
  </StyledConfirmationDialog>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean
  summary: QuizExercise[]
}>()

defineEmits<{
  'update:modelValue': [value: boolean]
  'reset': []
}>()
</script>
