import type { AsyncDataOptions, NuxtApp } from '#app'

export function useStaticData<T>(
  key: string,
  fetcher: (nuxtApp?: NuxtApp) => Promise<T>,
  options: AsyncDataOptions<T> = {},
) {
  const isStatic = useState<boolean>(`isStatic-${key}`, () => import.meta.server)

  const { data, status, error, refresh } = useLazyAsyncData<T>(
    key,
    () => {
      console.log('fetching data from', isStatic.value ? 'server' : 'client')
      return fetcher()
    },
    options,
  )

  watchEffect(() => {
    console.log('isStatic', isStatic.value)
    console.log('data', data.value)
  })

  onMounted(() => {
    if (isStatic.value) {
      refresh().then(() => {
        isStatic.value = false
      })
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
