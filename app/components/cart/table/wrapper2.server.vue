<script setup lang="ts">
import type { StoreCart } from '@medusajs/types'

const {
  isPreview,
  isDropDown,
} = defineProps<{
  isPreview?: boolean
  isDropDown?: boolean
}>()
// const { data: cart } = useFetchCart()
const medusa = useMedusaClient()
const { cartId } = useUserCart()

const cart = ref<StoreCart>()

if (cartId.value) {
  const cartResponse = await medusa.store.cart.retrieve(cartId.value, {
    fields: '*items,*region,*items.product,*items.variant,*items.thumbnail,*items.metadata,+items.total,*promotions,+shipping_methods.name',
  })

  cart.value = cartResponse.cart
}

watchEffect(() => {
  console.log('cart', cart.value)
  console.log('cartId', cartId.value)
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
    <!-- <template v-else>
      <CartTableSkeleton
        :is-preview="isPreview"
        :is-drop-down="isDropDown"
      />
    </template> -->
  </div>
</template>
