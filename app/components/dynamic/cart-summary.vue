<script setup lang="ts">
defineProps<{
  title: string
  isCheckout?: boolean
}>()
const { data: cart } = useFetchCart()
</script>

<template>
  <DynamicRendering :data="cart">
    <CartSummary
      :cart="cart"
      :title="title"
      :is-checkout="isCheckout"
    />
    <template #fallback>
      <CartSummary
        :cart="undefined"
        :title="title"
        :is-checkout="isCheckout"
      />
    </template>
  </DynamicRendering>
</template>
