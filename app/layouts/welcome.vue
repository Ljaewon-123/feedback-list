<template>
  <div>
    <header>
      <Menubar class="rounded-none! border-none! ">
        <template #start>
          We Need Main Icon!!
        </template>

        <template #end> 
          <div class="flex items-center gap-2">
            <NuxtLink to="https://github.com/Ljaewon-123/feedback-list/discussions" target="_blank">
              <Button class="hover-bg-clickable" icon="pi pi-comments" size="small" variant="outlined" aria-label="Comments" />
            </NuxtLink>
            <NuxtLink to="https://github.com/Ljaewon-123/feedback-list" target="_blank" >
              <Button class="hover-bg-clickable" icon="pi pi-github" size="small" variant="outlined" aria-label="Github" />
            </NuxtLink>
            <ThemeSwitcher class="hover-bg-clickable" />
            <Select 
              v-model="version"
              :options="versions" 
              optionLabel="name" 
              size="small" 
              placeholder="Now version" 
              :highlightOnSelect="false"
              checkmark
            >
              <template #option="{ option }" >
                <div class="h-[10px] px-3 flex items-center">
                  {{ option.code }}
                </div>
              </template>
            </Select>
            <UserAvatar v-if="isLoggedIn"
              :image-url="avatarUrl"
            />
            <NuxtLink v-else to="/login" class="font-bold " >
              <Button size="small" label="Sign in" icon="pi pi-user" class="cursor-pointer!" variant="outlined" :pt="{
                root:'hover:ring-2! border-zinc-600! dark:border-gray-500!',
              }" />
            </NuxtLink>
          </div>
        </template>
    </Menubar>
    </header>
    <slot/>
  </div>
</template>

<script setup lang="ts">
const version = ref({ name: 'V1', code: 'Vsersion 1' });
const versions = ref([
  { name: 'V1', code: 'Vsersion 1' },
]);
const { isLoggedIn, avatarUrl } = useAuth();
</script>

