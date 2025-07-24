<script setup lang="ts">
definePageMeta({
  layout: false
})
const { user } = useAuth()

watch(user, () => {
  if (user.value) {
      // Redirect to protected page
      return navigateTo('/dashboard')
  }
}, { immediate: true })
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
    <div class="flex flex-col items-center p-6 bg-white dark:bg-gray-800 shadow-2xl rounded-2xl">
      <i 
        class="pi pi-spin pi-spinner text-blue-600 dark:text-blue-400"
        style="font-size: 4rem"
      ></i>
      <h1 class="mt-4 text-2xl font-semibold text-gray-900 dark:text-gray-100">
        Waiting for login...
      </h1>
      <p class="mt-2 text-gray-600 dark:text-gray-400">
        Redirecting you shortly...
      </p>
    </div>
  </div>
</template>