<script setup lang="ts">
interface Props {
  title?: string
  subtitle?: string
}
const { title = 'Title', subtitle = 'Subtitle' } = defineProps<Props>()
</script>

<template>
  <Card class="group cursor-pointer border-2 hover-bg-clickable">
    <template #title>
      <div class="flex justify-between">
        <span>{{ title }}</span>
        <span class="group-hover-transition-right-3">
          <i class="pi pi-angle-right" style="font-size: 1.5rem"></i>
        </span>
      </div>
    </template>
    <template #subtitle>{{ subtitle }}</template>
    <template #content>
      <p class="m-0">
        <slot name="content">content</slot>
      </p>
    </template>
  </Card>
</template>