<script setup lang="ts">
const { homepageCollections } = useAppConfig()
</script>

<template>
  <div class="py-12">
    <DynamicCollection
      v-for="collection in homepageCollections"
      :key="collection"
      :handle="collection"
    />
  </div>
</template>
