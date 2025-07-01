<template>
  <div>
    <header>
      <Menubar>
        <template #start>
          We Need Main Icon!!
        </template>

        <template #end> 
          <div class="flex items-center gap-2">
            <!-- <Button icon="pi pi-comments" size="small" variant="outlined" aria-label="Comments" /> -->
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
              :pt="{
                // root: { style: { cursor: 'pointer'} },
                // label: { style: { cursor: 'pointer'} },
                // dropdown: { style: { cursor: 'pointer'} },
              }"
            >
              <template #option="{ option }">
                {{ option.code }}
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
</script>

