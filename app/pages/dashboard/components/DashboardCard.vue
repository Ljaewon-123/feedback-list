<script setup lang="ts">
interface Props {
  title?: string
  subtitle?: string
  to: string
}
const { title = 'Title', subtitle = 'Subtitle', to } = defineProps<Props>()

const clickHandler = async () => {
  if(!to) throw new Error('Define Link URL')
  await navigateTo(to)
}
</script>

<template>
  <Card @click="clickHandler" class="group cursor-pointer border-2 border-surface hover-bg-clickable">
    <template #title>
      <div class="flex justify-between flex-shrink truncate text-sm overflow-visible">
        <span>{{ title }}</span>
        <span class="group-hover-transition-right-3">
          <i class="pi pi-angle-right" style="font-size: 1.5rem"></i>
        </span>
      </div>
    </template>
    <template #subtitle>
      <div class="flex-shrink truncate text-sm">
        {{ subtitle }}
      </div>
    </template>
    <template #content>
      <p class="m-0 text-xs">
        <slot name="content">content</slot>
      </p>
    </template>
  </Card>
</template>