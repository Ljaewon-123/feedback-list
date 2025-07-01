<template>
  <div>
    <header>
      <Menubar>
        <template #start>
          We Need Main Icon!!
        </template>

        <template #end> 
          <div class="flex items-center gap-2">
            <NuxtLink to="https://github.com/Ljaewon-123/feedback-list/discussions" target="_blank">
              <Button icon="pi pi-comments" size="small" variant="outlined" aria-label="Comments" />
            </NuxtLink>
            <NuxtLink to="https://github.com/Ljaewon-123/feedback-list" target="_blank" >
              <Button icon="pi pi-github" size="small" variant="outlined" aria-label="Github" />
            </NuxtLink>
            <ThemeSwitcher />
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

const selectedCity = ref();
const cities = ref([
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
]);
</script>

