<script setup lang="ts">
import type { StoreProduct } from '@medusajs/types'

defineProps<{
  product?: StoreProduct
  isStatic?: boolean
}>()
</script>

<template>
  <div class="flex flex-col gap-y-4 lg:max-w-[500px] mx-auto">
    <AppLink
      :to="`/collections/${product?.collection?.handle}`"
      class=""
    >
      {{ product?.collection?.title }}
    </AppLink>
    <h1
      class="text-3xl leading-10 font-medium text-color-highlighted"
      :class="{ 'animate-pulse': isStatic }"
    >
      {{ product?.title }}
    </h1>
    <p
      class="text-sm text-color-toned leading-6"
      :class="{ 'animate-pulse': isStatic }"
    >
      {{ product?.description }}
    </p>
  </div>
</template>
