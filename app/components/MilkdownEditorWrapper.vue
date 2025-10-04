<template>
  <MilkdownProvider>
    <MilkdownEditor v-model:md="markdown"/>
  </MilkdownProvider>
</template>

<script setup lang="ts">
import { MilkdownProvider } from "@milkdown/vue";

const markdown = defineModel('md', { default: `# Write your **markdown** here!`})
</script>