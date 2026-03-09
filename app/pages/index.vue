<template>
  <div class="d-flex flex-column ga-6 pa-4">
    <QuizStepper :exercises="exercises">
      <template #header="{ resetQuiz }">
        <div class="d-flex ga-2 align-center justify-space-between">
          <h2 class="w-100">
            🇩🇪 Deutsche Quizze
          </h2>
          <div class="d-flex pa-2 ga-2 w-100 justify-center">
            <v-select
              v-model="selectedExercise"
              :items="allExercises"
              density="compact"
              label="Select Exercise"
              return-object
            />
            <v-btn
              variant="outlined"
              @click="resetQuiz"
            >
              Reset Quiz
            </v-btn>
          </div>
        </div>
      </template>
    </QuizStepper>
    <DeutschClipboardHotkeys />
  </div>
</template>

<script setup lang="ts">
const selectedExercise = ref<QuizGroup>(
  allExercises[0]!,
)

const exercises = computed(() => selectedExercise.value?.exercises ?? [])
</script>
