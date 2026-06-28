<template>
  <StyledConfirmationDialog
    v-model="isOpen"
    title="Settings"
    confirm-text="Close"
    @confirm="isOpen = false"
  >
    <template #activator="{ attrs }">
      <v-btn
        v-bind="attrs"
        icon="mdi-cog"
        variant="text"
        density="comfortable"
      />
    </template>
    <v-switch
      v-model="isEasyModeEnabled"
      hide-details
      label="Easy mode. You can continue the quiz even if you answer a question incorrectly."
    />
    <v-switch
      v-model="isSpeechEnabled"
      hide-details
      label="Enable speech."
    />
    <v-switch
      v-model="isExtraExercisesEnabled"
      hide-details
      label="Show extra exercises."
    />
    <v-divider />
    <v-switch
      v-model="isSortExercisesByDifficultyEnabled"
      hide-details
      label="Sort exercises by difficulty. The harder exercises will be at the start of the quiz."
    />
    <v-switch
      :model-value="randomize"
      hide-details
      :disabled="isRandomizeEnforced"
      :label="isRandomizeEnforced ? 'Random order is enforced for this quiz' : 'Randomize the exercises order'"
      @update:model-value="emit('update:randomize', $event ?? false)"
    />
    <v-number-input
      v-model="seed"
      :disabled="!randomize"
      class="my-4"
      label="Seed"
      clearable
      hint="You can set a random seed to ensure the exercises are shuffled in the same order (useful for some quizzes)."
      persistent-hint
      :hide-details="false"
    />
  </StyledConfirmationDialog>
</template>

<script setup lang="ts">
interface Props {
  isRandomizeEnforced: boolean
  randomize: boolean
}

const props = defineProps<Props>()

interface Emits {
  (e: 'update:randomize', value: boolean): void
}

const emit = defineEmits<Emits>()

const isOpen = ref(false)

const seed = defineModel<number | undefined>('seed', { default: undefined })
const isSpeechEnabled = defineModel<boolean>('isSpeechEnabled', { default: true })
const isExtraExercisesEnabled = defineModel<boolean>('isExtraExercisesEnabled', { default: false })
const isEasyModeEnabled = defineModel<boolean>('isEasyModeEnabled', { default: false })
const isSortExercisesByDifficultyEnabled = defineModel<boolean>('isSortExercisesByDifficultyEnabled', { default: false })

watch(isSortExercisesByDifficultyEnabled, (newValue, oldValue) => {
  if (newValue === true && oldValue === false) {
    emit('update:randomize', false)
  }
})
watch(() => props.randomize, (newValue, oldValue) => {
  if (newValue === true && oldValue === false) {
    isSortExercisesByDifficultyEnabled.value = false
  }
})
</script>
