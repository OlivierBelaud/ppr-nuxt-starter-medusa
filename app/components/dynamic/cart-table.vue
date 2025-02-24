<script setup lang="ts">
const {
  isPreview,
  isDropDown,
} = defineProps<{
  isPreview?: boolean
  isDropDown?: boolean
}>()
const { data: cart } = useFetchCart()
</script>

<template>
  <DynamicRendering :data="cart">
    <CartTable
      v-if="cart?.items && cart.items.length > 0"
      :cart="cart"
      :is-preview="isPreview"
      :is-drop-down="isDropDown"
    />
    <CartEmpty v-else-if="!isPreview && !isDropDown" />
    <template #fallback>
      <CartTableSkeleton />
    </template>
  </DynamicRendering>
</template>
