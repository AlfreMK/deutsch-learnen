<template>
  <slot
    name="header"
    :reset-quiz="resetQuiz"
  />
  <v-stepper v-model="currentStep">
    <v-stepper-header>
      <v-stepper-item
        v-for="(_, i) in exercises"
        :key="i"
        :value="i + 1"
      />
    </v-stepper-header>

    <v-stepper-window>
      <v-stepper-window-item
        v-for="(exercise, index) in exercises"
        :key="index"
        :value="index + 1"
      >
        <div class="d-flex flex-column align-center ga-2">
          <div
            class="py-4 d-flex align-center ga-2"
            style="width: 200px; height: 100px;"
          >
            {{ exercise.title }}
            <!-- We force a re-render of the input to ensure it is focused when the step changes. -->
            <v-text-field
              v-if="index === currentStep - 1"
              v-model.trim="userAnswers[index]"
              variant="outlined"
              density="compact"
              autofocus
              @keyup.enter="nextStep"
            />
          </div>
        </div>
      </v-stepper-window-item>
    </v-stepper-window>

    <v-stepper-actions
      :next-text="isFinalStep ? 'Finish' : 'Next'"
      @click:next="() => isFinalStep ? finishQuiz() : nextStep()"
    >
      <template #prev>
        <div />
      </template>
    </v-stepper-actions>
  </v-stepper>

  <WrongAnswerDialog
    v-model="showWrongAnswerModal"
    :correct-answer="wrongAnswerInfo?.expected ?? ''"
    @reset="closeWrongAnswerModalAndReset"
  />

  <QuizSuccessDialog
    v-model="showSuccessModal"
    :summary="successSummary"
    @reset="closeSuccessAndReset"
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  exercises: QuizExercise[]
}>()

const currentStep = ref(1)
const isFinalStep = computed(() => currentStep.value === props.exercises.length)

const userAnswers = ref<string[]>(props.exercises.map(() => ''))

const correctByIndex = ref<Record<number, boolean>>({})

const showWrongAnswerModal = ref(false)
const wrongAnswerInfo = ref<{ expected: string } | null>(null)
const showSuccessModal = ref(false)

watch(() => props.exercises, () => {
  resetQuiz()
})
const resetQuiz = () => {
  showSuccessModal.value = false
  currentStep.value = 1
  userAnswers.value = props.exercises.map(() => '')
  correctByIndex.value = {}
}

const score = computed(() =>
  Object.values(correctByIndex.value).filter(Boolean).length,
)

const successSummary = computed(() =>
  props.exercises.map(q => ({ title: q.title, expectedAnswer: q.expectedAnswer })),
)

function isAnswerCorrect(index: number): boolean {
  const answer = userAnswers.value[index]?.toLowerCase() ?? ''
  const expected = props.exercises[index]?.expectedAnswer.trim().toLowerCase() ?? ''
  const correct = answer === expected
  correctByIndex.value[index] = correct
  return correct
}

const nextStep = () => {
  if (isFinalStep.value) {
    finishQuiz()
    return
  }
  const index = currentStep.value - 1
  if (!isAnswerCorrect(index)) {
    wrongAnswerInfo.value = { expected: props.exercises[index]?.expectedAnswer ?? '' }
    showWrongAnswerModal.value = true
    return
  }
  currentStep.value++
}

const finishQuiz = () => {
  const index = currentStep.value - 1
  if (!isAnswerCorrect(index)) {
    wrongAnswerInfo.value = { expected: props.exercises[index]?.expectedAnswer ?? '' }
    showWrongAnswerModal.value = true
    return
  }
  if (score.value === props.exercises.length) {
    showSuccessModal.value = true
  }
}

function closeWrongAnswerModalAndReset() {
  showWrongAnswerModal.value = false
  wrongAnswerInfo.value = null
  resetQuiz()
}

function closeSuccessAndReset() {
  showSuccessModal.value = false
  resetQuiz()
}
</script>
