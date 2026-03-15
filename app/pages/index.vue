<template>
  <div class="d-flex flex-column ga-6 pa-4 h-100">
    <QuizStepper
      :quiz-group="selectedQuiz"
      :randomize="randomize"
      :seed="seed"
    >
      <template #header="{ resetQuiz }">
        <div class="d-md-flex ga-2 align-center justify-space-between">
          <RandomSeedDialog v-model="seed">
            <template #activator="{ attrs }">
              <h2
                v-bind="attrs"
                class="w-100 cursor-pointer"
              >
                🇩🇪 Deutsch Learnen
              </h2>
            </template>
          </RandomSeedDialog>
          <div class="d-md-flex pa-2 ga-2 w-100 justify-center align-center">
            <v-autocomplete
              v-model="selectedQuiz"
              :items="allExercises"
              density="compact"
              label="Select Quiz"
              return-object
              hide-details
            />
            <div
              v-tooltip="{
                text: isRandomizeEnforced ? 'Random order is enforced' : 'Randomize the exercises order',
                location: 'bottom',
              }"
            >
              <v-switch
                :model-value="randomize"
                hide-details
                :disabled="isRandomizeEnforced"
                @update:model-value="onRandomizeInputChange"
              />
            </div>
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

const seed = ref<number | undefined>()

const randomizeInput = ref(false)

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
