<template>
  <v-autocomplete
    v-model="selectedQuiz"
    :items="items"
    density="compact"
    label="Select Quiz"
    return-object
    hide-details
  >
    <template #append-inner>
      <v-icon
        v-if="checkedQuizzes.has(selectedQuiz.title)"
        icon="mdi-check-circle"
        color="primary"
      />
    </template>
    <template #item="{ props: attrs, item }">
      <v-list-item
        v-bind="attrs"
      >
        <template #append>
          <v-icon
            v-if="!!item.completedAt"
            v-tooltip="{
              text: `Completed on ${isoToLocaleDateString(item.completedAt)}.`,
              location: 'bottom left',
            }"
            icon="mdi-check-circle"
            color="primary"
          />
        </template>
      </v-list-item>
    </template>
  </v-autocomplete>
</template>

<script setup lang="ts">
type CheckableItem = QuizGroup & {
  completedAt?: string
}

const props = defineProps<{
  items: CheckableItem[]
}>()

const selectedQuiz = defineModel<QuizGroup>({ required: true })

const checkedQuizzes = computed(() => {
  return new Set(props.items.filter(item => !!item.completedAt).map(item => item.title))
})
</script>
