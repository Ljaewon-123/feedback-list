<script setup lang="ts">
import { UiBlurReveal } from '#components';

definePageMeta({
  layout: 'welcome',
})

const { isDark } = useDarkMode()
</script>

<template>
  <UiWavyBackground :backgroundFill="!isDark ? 'white' : '#18181b'" class="mx-auto max-w-4xl pb-40">
    <div class="z-[2] flex max-w-xl flex-col items-center gap-2 dark:text-[#18181b] dark:text-white">
      <UiBlurReveal
        :delay="0.5"
        class="flex flex-col items-center justify-center gap-4"
      >
        <span
          class="flex flex-col items-center justify-center bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text text-center text-4xl font-bold text-transparent md:text-6xl"
        >
          <span>
            Building
            <UiFlipWords
              :words="['beautiful', 'stunning', 'amazing']"
              :duration="3000"
              class="w-52
                    bg-gradient-to-b from-neutral-200 to-neutral-500
                    bg-clip-text text-black
                    dark:bg-none dark:text-white"
            />
          </span>
          web experience
        </span>

        <span class="text-center text-xl">
          Inspira UI is the new way to build beautiful website
        </span>

        <div class="my-2 flex flex-row items-center justify-center gap-4">
          <UiInteractiveHoverButton :text="'Get Started' "/>
          <Button
            to="/blocks"
            variant="secondary"
            severity="secondary"
            rounded 
          >
            Learn More
          </Button>
        </div>

        <div
          class="relative flex h-fit w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background p-px md:shadow-xl"
        >
          <img
            src="public/favicon.ico"
            class="w-full rounded-md"
          />
          <UiBorderBeam
            :size="250"
            :duration="12"
            :delay="9"
            :border-width="2"
          />
        </div>
      </UiBlurReveal>
    </div>
  </UiWavyBackground>
</template>
