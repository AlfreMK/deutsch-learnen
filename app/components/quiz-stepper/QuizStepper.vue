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
          <StyledImage
            v-if="isImageQueryEnabled && index === currentStep && wikipediaImageUrl"
            :image-url="wikipediaImageUrl"
            :alt="englishImageQueryTerm"
            size="200px"
            class="rounded"
          />
          <div
            class="py-4 d-md-flex align-center ga-2"
            style="width: 280px; height: 100px;"
          >
            {{ exercise.prepend }}
            <!-- We force a re-render of the input to ensure it is focused when the step changes. -->
            <v-text-field
              v-if="index === currentStep"
              :ref="element => answerInputRef = (element as HTMLInputElement)"
              v-model="userAnswers[index]"
              autofocus
              @keyup.enter="nextStep"
            />
            {{ exercise.append }}
          </div>
          <QuizStepperExerciseStats
            :successes="currentExerciseStat.successes"
            :fails="currentExerciseStat.fails"
            @show-stats-chart="showStatsChart = true"
          />
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

  <StyledConfirmationDialog
    v-model="showStatsChart"
    title="Exercise stats"
    confirm-text="Close"
    @confirm="showStatsChart = false"
  >
    <ExerciseStatsChart
      :quiz-title="quizGroup.title"
      :exercises="exercises"
    />
  </StyledConfirmationDialog>

  <WrongAnswerDialog
    v-model="showWrongAnswerModal"
    :correct-answer="wrongAnswerInfo?.expected ?? ''"
    :confirm-text="isEasyModeEnabled ? 'Continue' : 'Reset quiz'"
    @confirm="closeWrongAnswerModal"
  />

  <QuizSuccessDialog
    v-model="showSuccessModal"
    :summary="successSummary"
    @reset="closeSuccessAndReset"
  />
</template>

<script setup lang="ts">
import { isString } from 'lodash-es'
import { useWikipediaEnglishTermImage } from '~/composables/queries/wikipediaImage'
import { useShuffledExercises } from './useShuffledExercises'
import ExerciseStatsChart from './ExerciseStatsChart.vue'

const props = defineProps<{
  quizGroup: QuizGroup
  randomize: boolean
  seed?: number
  isSpeechEnabled: boolean
  isEasyModeEnabled: boolean
  isSortExercisesByDifficultyEnabled: boolean
}>()

const emit = defineEmits<{
  (e: 'completed'): void
}>()

const answerInputRef = ref<HTMLInputElement | undefined>(undefined)

const quizGroup = computed(() => props.quizGroup)
const randomize = computed(() => props.randomize)
const seed = computed(() => props.seed)
const isEasyModeEnabled = computed(() => props.isEasyModeEnabled)
const isSortExercisesByDifficultyEnabled = computed(() => props.isSortExercisesByDifficultyEnabled)

const { getStat, getDifficultyScore, recordResult } = useExerciseStats()

const { exercises, reset: resetExercises } = useShuffledExercises({
  quizGroup,
  randomize,
  seed,
  sortByDifficulty: isSortExercisesByDifficultyEnabled,
  getDifficultyScore: exercise => getDifficultyScore({ quizTitle: quizGroup.value.title, exerciseKey: getExerciseKey(exercise) }),
})

const currentStep = ref(0)
const currentExercise = computed(() => exercises.value[currentStep.value])
const isFinalStep = computed(() => currentStep.value === exercises.value.length - 1)

const isImageQueryEnabled = computed(() => currentExercise.value?.isImageQueryEnabled ?? false)

const englishImageQueryTerm = computed(() => {
  const prepend = currentExercise.value?.prepend
  if (!isString(prepend)) {
    return ''
  }
  return String(prepend).trim()
})

const { data: wikipediaImageUrl } = useWikipediaEnglishTermImage({
  term: englishImageQueryTerm,
  enabled: isImageQueryEnabled,
})

const userAnswers = ref<string[]>(exercises.value.map(() => ''))

const correctExercisesByIndex = ref<Record<number, boolean>>({})

const showWrongAnswerModal = ref(false)
const wrongAnswerInfo = ref<{ expected: string } | null>(null)
const showSuccessModal = ref(false)
const showStatsChart = ref(false)

const currentExerciseStat = computed<ExerciseStat>(() => {
  if (!currentExercise.value) {
    return { successes: 0, fails: 0 }
  }
  return getStat({ quizTitle: quizGroup.value.title, exerciseKey: getExerciseKey(currentExercise.value) })
})

watch(quizGroup, () => {
  resetQuiz()
})

watch(isEasyModeEnabled, (newValue, oldValue) => {
  const isHardModeEnabled = newValue === false && oldValue === true
  if (isHardModeEnabled) {
    resetQuiz()
  }
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
  const exercise = exercises.value[index]
  if (exercise) {
    recordResult({
      quizTitle: quizGroup.value.title,
      exerciseKey: getExerciseKey(exercise),
      isCorrect: correct,
    })
  }
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
    emit('completed')
  }
}

function closeWrongAnswerModal() {
  showWrongAnswerModal.value = false
  wrongAnswerInfo.value = null
  if (props.isEasyModeEnabled) {
    userAnswers.value[currentStep.value] = ''
    answerInputRef.value?.focus()
  }
  else {
    resetQuiz()
  }
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
