<template>
  <div class="d-flex flex-column ga-6 pa-4 h-100">
    <QuizStepper
      :quiz-group="selectedQuiz"
      :randomize="randomize"
      :seed="seed"
      :is-speech-enabled="isSpeechEnabled"
      :is-easy-mode-enabled="isEasyModeEnabled"
      @completed="onCompletedQuiz"
    >
      <template #header="{ resetQuiz }">
        <div class="d-md-flex ga-2 align-center justify-space-between">
          <h2 class="w-100">
            🇩🇪 Deutsch Learnen
          </h2>
          <div class="d-flex flex-column d-md-flex-row pa-2 ga-2 w-100 justify-center md-align-center">
            <SettingsDialog
              v-model:is-easy-mode-enabled="isEasyModeEnabled"
              v-model:seed="seed"
              v-model:is-speech-enabled="isSpeechEnabled"
              v-model:is-extra-exercises-enabled="isExtraExercisesEnabled"
              :randomize="randomize"
              :is-randomize-enforced="isRandomizeEnforced"
              @update:randomize="onRandomizeInputChange"
            />
            <AutocompleteCheck
              v-model="selectedQuiz"
              :items="allExercisesWithCompleted"
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
const {
  selectedQuizTitle,
  isEasyModeEnabled,
  seed,
  isSpeechEnabled,
  randomize: randomizeInput,
  isExtraExercisesEnabled,
} = usePreferences()

const allExercises = computed(() => {
  return isExtraExercisesEnabled.value ? [...DEFAULT_EXERCISES, ...EXTRA_EXERCISES] : DEFAULT_EXERCISES
})

const { completedQuizzes, addCompletedQuiz } = useCompletedQuizzes()

const onCompletedQuiz = () => {
  if (!isEasyModeEnabled.value) {
    addCompletedQuiz(selectedQuiz.value)
  }
}

const allExercisesWithCompleted = computed(() => {
  return allExercises.value.map(exercise => ({
    ...exercise,
    completedAt: completedQuizzes.value[exercise.title],
  }))
})

const selectedQuiz = computed<QuizGroup>({
  get: () => {
    return allExercises.value.find(exercise => exercise.title === selectedQuizTitle.value)!
  },
  set: (value: QuizGroup) => {
    selectedQuizTitle.value = value.title
  },
})

const isRandomizeEnforced = computed(() => selectedQuiz.value?.isRandomizeEnforced ?? false)

const randomize = computed(() => isRandomizeEnforced.value ? true : randomizeInput.value)

const onRandomizeInputChange = (value: boolean | null) => {
  if (!isRandomizeEnforced.value) {
    randomizeInput.value = value ?? false
  }
}

useHead({
  titleTemplate: 'Deutsch Learnen',
})
</script>

<style scoped>
@media (width >= 768px) {
  .d-md-flex-row {
    flex-direction: row;
  }

  .md-align-center {
    align-items: center;
  }
}
</style>
