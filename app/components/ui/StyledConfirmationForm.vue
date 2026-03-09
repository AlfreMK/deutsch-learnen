<script setup lang="ts">
import type { VCard, VBtn } from 'vuetify/components'

type VCardProps = InstanceType<typeof VCard>['$props']
type VBtnProps = InstanceType<typeof VBtn>['$props']

interface Props extends /* @vue-ignore */ VCardProps {
  title?: string
  minHeight?: number | string
  color?: string
  confirmText?: string
  confirmButtonProps?: VBtnProps
}

withDefaults(defineProps<Props>(), {
  confirmText: 'Confirm',
  color: 'primary',
})

interface Emits {
  (e: 'cancel' | 'confirm'): void
}

const emit = defineEmits<Emits>()
</script>

<template>
  <v-card
    class="h-100 bg-backgroundLighter1 rounded-lg pt-1 border-contrastLow"
    :min-height="minHeight"
  >
    <slot name="content">
      <v-card-title class="pb-4 pt-6 px-6">
        <div class="d-flex flex-column ga-2 ma-0">
          <slot name="title">
            <span class="font-weight-bold text-headline-medium">
              {{ title }}
            </span>
          </slot>
        </div>
      </v-card-title>
      <v-card-text
        class="d-flex flex-column justify-space-between h-100 pb-3 mx-2"
        style="font-size: 16px;"
      >
        <slot />
      </v-card-text>
    </slot>
    <div class="bg-backgroundLighter1">
      <v-divider />
      <div
        class="d-flex justify-end py-4 px-6 ga-3"
      >
        <v-btn
          :color="color"
          data-testid="form-confirmation-confirm"
          v-bind="confirmButtonProps"
          @click="emit('confirm')"
        >
          {{ confirmText }}
        </v-btn>
      </div>
    </div>
  </v-card>
</template>
