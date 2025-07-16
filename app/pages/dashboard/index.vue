<script setup lang="ts">
const user = useSupabaseClient()
</script>

<template>
  <div class="mx-auto w-full max-w-[1200px] px-4 @lg:px-6 @xl:px-12 @2xl:px-20 @3xl:px-24 my-8 flex flex-col gap-8">
    <div class="flex gap-4">
      <Button size="small" variant="outlined">
        New project
      </Button>
      <IconField>
        <InputIcon class="pi pi-search" />
        <InputText placeholder="Search for a project" size="small" />
      </IconField>
    </div>
    <ul class="grid grid-cols-1 gap-2 md:gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
      <li class="w-full">
        <DashboardCard>
          <template #content>hi</template>
        </DashboardCard>
      </li>
      <li>
        <DashboardCard/>
      </li>
      <li>
        <DashboardCard/>
      </li>
    </ul>
  </div>
</template>