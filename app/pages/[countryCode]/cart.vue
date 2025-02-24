<script setup lang="ts">
import { Client } from '@medusajs/js-sdk'
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
            <ClientOnly>
              <div>
                <div>Client side</div>
                <CartTableWrapper />
              </div>
              <template #fallback>
                <div>
                  <div>Pre render</div>
                  <CartTableSkeleton />
                </div>
              </template>
            </ClientOnly>
          </div>
        </div>
        <div class="relative">
          <div class="flex flex-col gap-y-8 sticky top-12">
            <div class="bg-white py-6">
              <ClientOnly>
                <template #fallback>
                  <div>Pre render</div>
                  <CartSummaryWrapper
                    title="Summary"
                    has-checkout-button
                  />
                </template>
                <div>Client side</div>
                <CartSummaryWrapper
                  title="Summary"
                  has-checkout-button
                />
              </ClientOnly>
            </div>
          </div>
        </div>
      </div>
    </div>
  </UContainer>
</template>
