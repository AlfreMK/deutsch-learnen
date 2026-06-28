import type { DehydratedState, VueQueryPluginOptions } from '@tanstack/vue-query'
import { VueQueryPlugin, QueryClient, hydrate, dehydrate } from '@tanstack/vue-query'

import { useState } from '#app'

export default defineNuxtPlugin({
  parallel: true,
  setup(nuxtApp) {
    const vueQueryState = useState<DehydratedState | null>('vue-query')

    // Modify your Vue Query global settings here
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 60, // 1 hour
          refetchOnWindowFocus: true,
          refetchOnReconnect: true,
          refetchOnMount: true,
          refetchInterval: false,
        },
      },
    })
    const options: VueQueryPluginOptions = { queryClient }

    nuxtApp.vueApp.use(VueQueryPlugin, options)

    if (import.meta.server) {
      nuxtApp.hooks.hook('app:rendered', () => {
        vueQueryState.value = dehydrate(queryClient)
      })
    }

    if (import.meta.client) {
      nuxtApp.hooks.hook('app:created', () => {
        hydrate(queryClient, vueQueryState.value)
      })
    }
  },
})
