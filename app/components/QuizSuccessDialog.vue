<template>
  <StyledConfirmationDialog
    v-model="isOpen"
    title="All correct!"
    confirm-text="Reset quiz"
    persistent
    @confirm="emit('reset')"
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
          <td>{{ row.prepend || row.append }}</td>
          <td>{{ row.expectedAnswer }}</td>
        </tr>
      </tbody>
    </v-table>
  </StyledConfirmationDialog>
</template>

<script setup lang="ts">
defineProps<{
  summary: QuizExercise[]
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
