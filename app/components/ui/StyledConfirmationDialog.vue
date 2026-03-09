<script setup lang="ts">
interface Props {
  title: string
  confirmText?: string
  cancelText?: string
  color?: string
  disabledDialog?: boolean
  dataTestId?: string
}

withDefaults(defineProps<Props>(), {
  confirmText: 'Continue',
  cancelText: 'Cancel',
  color: 'primary',
  disabledDialog: false,
})

interface Emits {
  (e: 'confirm' | 'cancel'): void
}
const emit = defineEmits<Emits>()

const confirmationDialog = defineModel<boolean>({ default: false })

const onConfirm = () => {
  emit('confirm')
  confirmationDialog.value = false
}

const onCancel = () => {
  emit('cancel')
  confirmationDialog.value = false
}
</script>

<template>
  <v-dialog
    v-model="confirmationDialog"
    data-testid="confirmation-dialog"
    max-width="600"
  >
    <template #activator="{ props: attrs }">
      <slot
        name="activator"
        :attrs="{
          ...attrs,
          ...(disabledDialog ? { onClick: () => emit('confirm') } : {}),
        }"
      />
    </template>
    <StyledConfirmationForm
      :title="title"
      :cancel-text="cancelText"
      :confirm-text="confirmText"
      :color="color"
      :data-testid="dataTestId"
      @cancel="onCancel"
      @confirm="onConfirm"
    >
      <slot />
      <template
        v-if="$slots.title"
        #title
      >
        <slot
          name="title"
        />
      </template>
    </StyledConfirmationForm>
  </v-dialog>
</template>
