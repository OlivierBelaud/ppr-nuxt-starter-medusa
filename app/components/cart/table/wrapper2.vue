<script setup lang="ts">
const {
  isPreview,
  isDropDown,
} = defineProps<{
  isPreview?: boolean
  isDropDown?: boolean
}>()
const { data: cart } = useFetchCart()

watchEffect(() => {
  console.log('cart', cart.value)
})
</script>

<template>
  <div>
    <template v-if="cart?.items">
      <CartTable
        v-if="cart.items.length > 0"
        :cart="cart"
        :is-preview="isPreview"
        :is-drop-down="isDropDown"
      />
      <CartEmpty v-else-if="!isPreview && !isDropDown" />
    </template>
    <template v-else>
      <CartTableSkeleton
        :is-preview="isPreview"
        :is-drop-down="isDropDown"
      />
    </template>
  </div>
</template>
