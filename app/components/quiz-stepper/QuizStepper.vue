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
        :value="i"
      />
    </v-stepper-header>

    <v-stepper-window>
      <v-stepper-window-item
        v-for="(exercise, index) in exercises"
        :key="index"
        :value="index"
      >
        <div class="d-flex flex-column align-center ga-2">
          <div
            class="py-4 d-md-flex align-center ga-2"
            style="width: 280px; height: 100px;"
          >
            {{ exercise.prepend }}
            <!-- We force a re-render of the input to ensure it is focused when the step changes. -->
            <v-text-field
              v-if="index === currentStep"
              v-model="userAnswers[index]"
              autofocus
              @keyup.enter="nextStep"
            />
            {{ exercise.append }}
          </div>
        </div>
      </v-stepper-window-item>
    </v-stepper-window>

    <v-stepper-actions
      :next-text="isFinalStep ? 'Finish' : 'Next'"
      @click:next="() => nextStep()"
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
import { useShuffledExercises } from './useShuffledExercises'

const props = defineProps<{
  quizGroup: QuizGroup
  randomize: boolean
  seed?: number
  isSpeechEnabled: boolean
}>()

const quizGroup = computed(() => props.quizGroup)
const randomize = computed(() => props.randomize)
const seed = computed(() => props.seed)
const { exercises, reset: resetExercises } = useShuffledExercises({ quizGroup, randomize, seed })

const currentStep = ref(0)
const currentExercise = computed(() => exercises.value[currentStep.value])
const isFinalStep = computed(() => currentStep.value === exercises.value.length - 1)

const userAnswers = ref<string[]>(exercises.value.map(() => ''))

const correctExercisesByIndex = ref<Record<number, boolean>>({})

const showWrongAnswerModal = ref(false)
const wrongAnswerInfo = ref<{ expected: string } | null>(null)
const showSuccessModal = ref(false)

watch(quizGroup, () => {
  resetQuiz()
})

const resetQuiz = () => {
  showSuccessModal.value = false
  currentStep.value = 0
  userAnswers.value = exercises.value.map(() => '')
  resetExercises()
  correctExercisesByIndex.value = {}
}

const score = computed(() =>
  Object.values(correctExercisesByIndex.value).filter(Boolean).length,
)

const successSummary = computed(() =>
  exercises.value.map(q => ({
    prepend: q.prepend,
    append: q.append,
    expectedAnswer: q.expectedAnswer,
  })),
)

function isAnswerCorrect(index: number): boolean {
  const answer = userAnswers.value[index]?.trim().toLowerCase() ?? ''
  const expected = exercises.value[index]?.expectedAnswer.trim().toLowerCase() ?? ''
  const correct = answer === expected
  correctExercisesByIndex.value[index] = correct
  return correct
}

const nextStep = () => {
  const index = currentStep.value
  if (!userAnswers.value[index]) {
    return
  }
  if (isFinalStep.value) {
    finishQuiz()
    return
  }
  if (!isAnswerCorrect(index)) {
    wrongAnswerInfo.value = { expected: exercises.value[index]?.expectedAnswer ?? '' }
    showWrongAnswerModal.value = true
    return
  }
  speak()
  currentStep.value++
}

const finishQuiz = () => {
  const index = currentStep.value
  if (!isAnswerCorrect(index)) {
    wrongAnswerInfo.value = { expected: exercises.value[index]?.expectedAnswer ?? '' }
    showWrongAnswerModal.value = true
    return
  }
  speak()
  if (score.value === exercises.value.length) {
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

const currentExpectedAnswer = computed(() =>
  currentExercise.value?.voiceText ?? currentExercise.value?.expectedAnswer.toString() ?? '',
)

const {
  speak: _speak,
  isSupported,
} = useSpeechSynthesis(currentExpectedAnswer, {
  lang: 'de-DE',
})

const speak = () => {
  if (currentExpectedAnswer.value && isSupported.value && props.isSpeechEnabled) {
    _speak()
  }
}
</script>
