import type { AsyncDataOptions, NuxtApp } from '#app'

export function useStaticData<T>(
  key: string,
  fetcher: (nuxtApp?: NuxtApp) => Promise<T>,
  options: AsyncDataOptions<T> = {},
) {
  const haveBeenPreRendered = !!import.meta.prerender
  const isStatic = useState<boolean>(`isStatic-${key}`, () => haveBeenPreRendered)

  const { data, status, error } = useLazyAsyncData<T>(
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

  const refresh = async (): Promise<void> => {
    return refreshNuxtData(key)
  }

  return {
    data,
    status,
    error,
    isStatic,
    refresh,
  }
}
