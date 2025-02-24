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
  <ClientOnly>
    <div>
      <div>Client side</div>
      <template v-if="cart?.items">
        <CartTable
          v-if="cart.items.length > 0"
          :cart="cart"
          :is-preview="isPreview"
          :is-drop-down="isDropDown"
        />
        <CartEmpty v-else-if="!isPreview && !isDropDown" />
      </template>
      <div v-else>
        <div>Pre render</div>
        <CartTableSkeleton />
      </div>
    </div>
    <template #fallback>
      <div>
        <div>Pre render</div>
        <CartTableSkeleton />
      </div>
    </template>
  </ClientOnly>
</template>
