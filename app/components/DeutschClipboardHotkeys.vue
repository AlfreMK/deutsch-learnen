<template>
  <div class="deutsch-clipboard-hotkeys">
    <v-table density="comfortable">
      <thead>
        <tr>
          <th class="text-left">
            Character
          </th>
          <th class="text-left">
            Type with
          </th>
          <th
            class="text-left"
            style="width: 100px;"
          />
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in items"
          :key="item.char"
        >
          <td>
            <span class="text-large font-weight-medium">{{ item.char }}</span>
            <span
              v-if="item.name"
              class="text-caption text-medium-emphasis ml-1"
            >
              ({{ item.name }})
            </span>
          </td>
          <td>
            <v-hotkey
              :keys="item.keys"
              display-mode="symbol"
              variant="outlined"
              inline
            />
          </td>
          <td>
            <v-btn
              size="small"
              variant="tonal"
              class="my-1"
              :icon="copied === item.char ? 'mdi-check' : 'mdi-content-copy'"
              @click="copyToClipboard(item.char)"
            />
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup lang="ts">
/**
 * German umlauts and ß with platform-aware hotkeys (Mac: Option+u then letter; Option+s for ß).
 * Uses Vuetify v-hotkey for display and useHotkey for copy shortcuts.
 * @see https://vuetifyjs.com/en/components/hotkeys/
 * @see https://vuetifyjs.com/en/features/hotkey
 */
const items = [
  { char: 'ä', name: 'a umlaut', keys: 'alt+u-a' },
  { char: 'ö', name: 'o umlaut', keys: 'alt+u-o' },
  { char: 'ü', name: 'u umlaut', keys: 'alt+u-u' },
  { char: 'ß', name: 'eszett', keys: 'alt+s' },
]

const copied = ref<string | null>(null)
const { start: startResetCopied } = useTimeoutFn(() => {
  copied.value = null
}, 1500)

const copyToClipboard = async (char: string) => {
  try {
    await navigator.clipboard.writeText(char)
    copied.value = char
    startResetCopied()
  }
  catch {
    copied.value = null
  }
}
</script>
