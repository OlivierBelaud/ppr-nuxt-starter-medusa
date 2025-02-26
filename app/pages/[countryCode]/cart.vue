<script setup lang="ts">
const { retrieveCart } = useCart()

const { data: cart, isStatic, error } = useStaticData(
  `cart`,
  async () => await retrieveCart(),
)
</script>

<template>
  <UContainer class="py-12">
    <div>
      <div
        class="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-x-20 xl:gap-x-40"
      >
        <div class="flex flex-col bg-white py-6 gap-y-6">
          <div class="flex flex-col gap-y-3">
            <AppHeading
              as="h1"
            >
              Cart
            </AppHeading>
            <div
              v-if="error"
              class="text-red-500"
            >
              {{ error }}
            </div>
            <!-- <DynamicCartTable /> -->
            <CartTableSkeleton v-if="isStatic" />
            <template v-else>
              <CartTable
                v-if="cart?.items && cart.items.length > 0"
                :cart="cart"
              />
              <CartEmpty v-else />
            </template>
          </div>
        </div>
        <div class="relative">
          <div class="flex flex-col gap-y-8 sticky top-12">
            <div class="bg-white py-6">
              <!-- <DynamicCartSummary
                title="Summary"
              /> -->
              <CartSummary
                :cart="cart || undefined"
                title="Summary"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </UContainer>
</template>
