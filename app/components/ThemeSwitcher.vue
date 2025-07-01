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
      :icon="isDark ? 'pi pi-moon' : 'pi pi-sun'"
      @click="isDark = !isDark"
    />
    <template #fallback>
      <Button
        :icon="'pi pi-desktop'"
      />
    </template>
  </ClientOnly>
</template>
