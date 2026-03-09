<template>
  <div class="d-flex flex-column ga-6 pa-4">
    <QuizStepper
      :quiz-group="selectedQuiz"
      :randomize="randomize"
    >
      <template #header="{ resetQuiz }">
        <div class="d-flex ga-2 align-center justify-space-between">
          <h2 class="w-100">
            🇩🇪 Deutsch Learnen
          </h2>
          <div class="d-flex pa-2 ga-2 w-100 justify-center align-center">
            <v-select
              v-model="selectedQuiz"
              :items="allExercises"
              density="compact"
              label="Select Quiz"
              return-object
              hide-details
            />
            <v-switch
              v-model="randomize"
              v-tooltip="{
                text: 'Randomize the exercises order',
                location: 'bottom',
              }"
              hide-details
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
const selectedQuiz = ref<QuizGroup>(
  allExercises[0]!,
)

const randomize = ref(false)

useHead({
  titleTemplate: 'Deutsch Learnen',
})
</script>
