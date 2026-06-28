<script setup lang="ts">
interface Props {
  imageUrl: string | undefined | null
  size?: string
  iconSize?: string
  loading?: boolean
  cover?: boolean
  alt: string
  dataTestId?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: '100px',
  iconSize: '50px',
  cover: false,
  loading: false,
})

const imageUrl = computed(() => props.imageUrl ?? undefined)

const style = computed(() => ({
  minHeight: props.size,
  minWidth: props.size,
  height: props.size,
  width: props.size,
}))
</script>

<template>
  <v-img
    v-if="imageUrl || loading"
    :src="imageUrl"
    class="rounded"
    :cover="cover"
    :style="style"
    :alt="alt"
    :data-testid="dataTestId"
  >
    <template #placeholder>
      <v-skeleton-loader
        type="image"
        height="100%"
        width="100%"
        data-testid="image-skeleton"
      />
    </template>
  </v-img>
  <div
    v-else
    class="d-flex justify-center align-center bg-contrastLow rounded"
    :style="style"
    data-testid="no-image-placeholder"
  >
    <v-icon
      icon="mdi-image-off-outline"
      color="contrastMedium"
      :size="iconSize"
      aria-label="No image"
    />
  </div>
</template>

<style scoped>
:deep(.v-skeleton-loader__image) {
  height: 100%;
}
</style>
