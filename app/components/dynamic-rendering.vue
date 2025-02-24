<script lang="ts" setup>
const {
  data,
} = defineProps<{
  data?: unknown
}>()
</script>

<template>
  <ClientOnly>
    <div>
      <div>Client side</div>
      <template v-if="data">
        <slot />
      </template>
      <div v-else>
        <div>Loading</div>
        <slot name="fallback" />
      </div>
    </div>
    <template #fallback>
      <div>Pre render</div>
      <slot name="fallback" />
    </template>
  </ClientOnly>
</template>
