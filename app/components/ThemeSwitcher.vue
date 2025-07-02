<script setup lang="ts">
const { isDark } = useDarkMode()
</script>

<template>
  <ClientOnly >
    <Button
      size="small"
      variant="outlined"
      :icon="isDark ? 'pi pi-moon' : 'pi pi-sun'"
      @click="isDark = !isDark"
    />
    <template #fallback>
      <Button
        size="small"
        variant="outlined"
        :icon="'pi pi-desktop'"
      />
    </template>
  </ClientOnly>
</template>
