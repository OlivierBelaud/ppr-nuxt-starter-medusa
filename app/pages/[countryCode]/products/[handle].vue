<script setup lang="ts">
const route = useRoute()

const handle = computed(() => route.params.handle as string)
// const { data: product } = await useFetchProductByHandle(handle.value)

const medusa = useMedusaClient()
const { currentRegionId } = useCurrentCountry()

const { data, isStatic, refresh } = useStaticData(
  `test-product:${handle.value}:region:${currentRegionId.value}`,
  async () => {
    console.log('handle', handle.value, currentRegionId.value)
    return await medusa.store.product.list({
      handle: handle.value,
      region_id: currentRegionId.value,
      fields: '*variants,*variants.calculated_price,+variants.inventory_quantity',
    })
  },
  {
    // transform: data => data.products[0],
    dedupe: 'defer',
  },
)
const product = computed(() => data.value?.products?.[0])

onMounted(() => {
  console.log('refresh for the second time')
  refresh().then(() => {
    console.log('refreshed for the second time')
  })
})

watchEffect(() => {
  console.log('product', product.value)
})
</script>

<template>
  <div>
    <ProductDetail
      v-if="product"
      :product="product"
      :is-static="isStatic"
    />
    <!-- TODO: Implement ProductRelated component -->
    <!-- <LazyProductRelated :product="product" /> -->
  </div>
</template>
