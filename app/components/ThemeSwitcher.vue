<script setup lang="ts">
const colorMode = useColorMode()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set(_isDark) {
    colorMode.preference = _isDark ? 'dark' : 'light'
  }
})
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
