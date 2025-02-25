import type { AsyncDataOptions, NuxtApp } from '#app'

export function useStaticData<T>(
  key: string,
  fetcher: (nuxtApp?: NuxtApp) => Promise<T>,
  options: AsyncDataOptions<T> = {},
) {
  const isStatic: Ref<boolean> = ref(import.meta.server)

  console.log('isStatic', isStatic.value)

  const { data, status, error, refresh } = useLazyAsyncData<T>(
    key,
    () => {
      console.log('fetching data from', isStatic.value ? 'server' : 'client')
      return fetcher()
    },
    options,
  )

  watchEffect(() => {
    console.log('data', data.value)
  })

  onMounted(() => {
    if (isStatic.value) {
      // refresh().then(() => {
      //   isStatic.value = false // La donnée a été mise à jour côté client
      // })
    }
  })

  const invalidateStatic = async (): Promise<void> => {
    // await refresh()
    // isStatic.value = false
    // return data.value
  }

  return {
    data,
    status,
    error,
    isStatic,
    invalidateStatic,
  }
}
