import type { AsyncDataOptions, NuxtApp } from '#app'

export function useStaticData<T>(
  key: string,
  fetcher: (nuxtApp?: NuxtApp) => Promise<T>,
  options: AsyncDataOptions<T> = {},
) {
  // Un mode ou on refresh à chaque fois mais on sert le cache en attendant - genre pour les stocks ?
  // Un mode ou on refresh que si c'est un payload static, sinon c'est le cache - genre pour les prix...
  // Avoir peut être un avertissement disant que ça peut affecter la perf de refetch à chaque fois car ça bloque la navigation...
  // A utiliser genre sur la page produit... mais pas sur les autres pages...
  // Peut être que c'est pas un useStatic qu'il faut mettre en place, mais plus un composable qui donne l'heure du dernier fetch
  // Et donc on decide de la règle de refetch en fonction de ce cache...
  // En fait ça se gère avec la règle de cache de useFetch (genre no-cache)

  // const haveBeenPreRendered = !!import.meta.prerender
  const nuxtApp = useNuxtApp()
  // watchEffect(() => {
  //   console.log('nuxtApp.static.data[key]', nuxtApp.static, nuxtApp.static.data[key])
  //   console.log('nuxtApp.payload.data[key]', nuxtApp.payload, nuxtApp.payload.data[key])
  // })

  const isStatic = useState<boolean>(`isStatic-${key}`, () => !!nuxtApp.payload.prerenderedAt)
  // const isStatic = ref(!!nuxtApp.payload.prerenderedAt)

  const { data, status, error, refresh: refreshAsyncData } = useLazyAsyncData<T>(
    key,
    () => {
      console.log('fetching data from', isStatic.value ? 'server' : 'client')
      return fetcher()
    },
    options,
  )

  watchEffect(() => {
    console.log('isStatic', isStatic.value)
    // console.log('data', data.value)
  })

  // onMounted(() => {
  //   if (isStatic.value && !import.meta.server) {
  //     console.log('refresh for the first time')
  //     refresh().then(() => {
  //       console.log('refreshed for the first time')
  //       isStatic.value = false
  //     })
  //   }
  // })

  const refresh = async (): Promise<void> => {
    refreshAsyncData().then(() => {
      isStatic.value = false
    })
  }

  return {
    data,
    status,
    error,
    isStatic,
    refresh,
  }
}
