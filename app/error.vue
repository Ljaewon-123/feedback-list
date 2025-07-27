<script setup lang="ts">
import type { NuxtError } from '#app'
import { NuxtLink } from '#components'

const props = defineProps({
  error: Object as () => NuxtError
})

const statusCode = computed(() => props.error?.statusCode)
const message = computed(() => props.error?.message)
console.error(props.error)
</script>

<template>
  <main class="grid min-h-screen place-items-center bg-white dark:bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
    <div class="text-center w-full max-w-md px-4">
      <p class="text-base font-semibold text-indigo-600 dark:text-indigo-400">{{ statusCode }}</p>
      <h1
        class="mt-4 text-5xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 sm:text-7xl 
              w-full max-w-lg mx-auto truncate"
      >
        {{ message }}
      </h1>
      <p class="mt-6 text-lg font-medium text-gray-500 dark:text-gray-400 sm:text-xl/8">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <div class="mt-10 flex items-center justify-center gap-x-6">
        <NuxtLink
          to="/"
          class="rounded-md bg-indigo-600 dark:bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white 
                shadow-xs hover:bg-indigo-500 dark:hover:bg-indigo-400 focus-visible:outline-2 
                focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Go back home
        </NuxtLink>
        <NuxtLink href="/" class="text-sm font-semibold text-gray-900 dark:text-gray-200">
          Contact support <span aria-hidden="true">→</span>
        </NuxtLink>
      </div>
    </div>
  </main>
</template>
