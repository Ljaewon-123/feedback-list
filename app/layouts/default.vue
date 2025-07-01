<template>
  <div>
    <header>
      <Menubar>
        <template #start>
          We Need Main Icon!!
          <!-- <span class="cursor-pointer">
            되는 클래스인데 primevue에 적용이 안되네 
          </span> -->
        </template>

        <template #end> 
          <div class="flex items-center gap-2">
            <Button class="cursor-pointer!" icon="pi pi-home" size="small" variant="outlined" aria-label="Home" />
            <Button icon="pi pi-comments" size="small" variant="outlined" aria-label="Comments" />
            <Button icon="pi pi-github" size="small" variant="outlined" aria-label="Github" />
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

