<script setup lang="ts">
import type { StoreCollection } from '@medusajs/types'

const {
  handle,
} = defineProps<{
  handle: StoreCollection['handle']
}>()

const { data: collection } = await useFetchCollectionByHandle(handle)

const { data } = await useFetchProductsWithCache({
  query: {
    collection_id: collection.value?.id,
    limit: 4,
  },
})

const products = computed(() => data.value?.products || undefined)

watchEffect(() => {
  console.log('products', products.value)
})
</script>

<template>
  <DynamicRendering :data="collection">
    <CollectionPreview
      :collection="collection"
      :products="products"
    />
    <template #fallback>
      loading
      <CollectionPreview
        :collection="collection"
        :products="products"
      />
    </template>
  </DynamicRendering>
</template>
