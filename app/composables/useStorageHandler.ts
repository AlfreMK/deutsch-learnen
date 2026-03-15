import { useStorage } from '@vueuse/core'
import type { DeepReadonly } from 'vue'

type StorageItem = Record<string, unknown>

const defaultKey = 'deutsch-learnen' as const

/**
 * Composable that uses the local or session storage to store different resources related to
 * preferences of the user.
 * @param customKey - The key to store the resource in the storage.
 * @param storage - The storage to use, can be `localStorage` or `sessionStorage`. Defaults to `localStorage`.
 * @returns Object with the resource and methods to modify it.
 */
export const useStorageHandler = <TItem extends StorageItem>(
  customKey: string,
  storage: 'local' | 'session' = 'local',
) => {
  const storages = {
    local: localStorage,
    session: sessionStorage,
  } as const

  if (!storages[storage]) {
    throw new Error(`Storage type "${storage}" is not supported`)
  }

  const storageKey = `${defaultKey}.${customKey}`

  const storageItem = useStorage<TItem>(
    storageKey,
    {} as TItem,
    storages[storage],
    {
      mergeDefaults: true,
      serializer: {
        read: (stringObject: string) => (stringObject ? JSON.parse(stringObject) : {}),
        write: (object: TItem) => JSON.stringify(object),
      },
    },
  )

  const isStorageItemEmpty = computed(() => Object.keys(storageItem.value).length === 0)

  const setStorageItem = (newItem: TItem) => {
    storageItem.value = newItem
  }

  const clearStorageItem = () => {
    storageItem.value = {} as TItem
  }

  return {
    storageKey,
    storageItem: readonly(storageItem) as DeepReadonly<Ref<TItem>>,
    isStorageItemEmpty,
    setStorageItem,
    clearStorageItem,
  }
}
