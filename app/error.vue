<script setup lang="ts">
import type { NuxtError } from '#app'
import { NuxtLink } from '#components'

const props = defineProps({
  error: Object as () => NuxtError
})

const statusCode = computed(() => props.error?.statusCode)
const message = computed(() => props.error?.message)

</script>

<template>
  <main class="grid min-h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
    <div class="text-center">
      <p class="text-base font-semibold text-indigo-600">{{ statusCode }}</p>
      <h1 class="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">{{ message }}</h1>
      <p class="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">Sorry, we couldn’t find the page you’re looking for.</p>
      <div class="mt-10 flex items-center justify-center gap-x-6">
        <NuxtLink to="/" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Go back home</NuxtLink>
        <NuxtLink href="/document" class="text-sm font-semibold text-gray-900">Contact support <span aria-hidden="true">&rarr;</span></NuxtLink>
      </div>
    </div>
  </main>
</template>