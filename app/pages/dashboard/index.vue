<script setup lang="ts">
import type { PostgrestSingleResponse } from '@supabase/postgrest-js'

// ...? export 되네??
export type Project = {
  id: number 
  created_at: string
  project_name: string
  description: string
  is_private: boolean
  password: string
  user_id: string
}
const supabase = useSupabaseClient<Project>()
const { data: projectsSupbase } = await useAsyncData<PostgrestSingleResponse<Project[]>>('supabase.projects', async () => {
  return await supabase
  .from('project')
  .select();
}, { server: false })
const projects = computed(() => projectsSupbase.value?.data)
</script>

<template>
  <div class="mx-auto w-full max-w-[1200px] px-4 @lg:px-6 @xl:px-12 @2xl:px-20 @3xl:px-24 my-8 flex flex-col gap-8">
    <div class="flex gap-4">
      <NuxtLink to="/dashboard/new/new-project">
        <Button size="small" variant="outlined">
          New project
        </Button>
      </NuxtLink>
      <IconField>
        <InputIcon class="pi pi-search" />
        <InputText placeholder="Search for a project" size="small" />
      </IconField>
    </div>
    <ul class="grid grid-cols-1 gap-2 md:gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
      <li v-for="project in projects" :key="project.id" >
        <DashboardCard :title="project.project_name" :subtitle="project.description" :to="`/dashboard/project/${project.project_name}/list`">
          <template #content>
            <div class="flex justify-between items-center">
              <NuxtTime
                :datetime="project.created_at"
                relative
                locale="ko-KR"
              />
              <span v-if="project.is_private" v-tooltip="'Enter your password'" class="pi pi-key"></span>
            </div>
          </template>
        </DashboardCard>
      </li>
    </ul>
  </div>
</template>