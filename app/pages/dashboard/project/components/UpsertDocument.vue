<script setup lang="ts">
const visible = defineModel('visible', { default: false });
</script>

<template>
  <Dialog v-model:visible="visible" modal header="New Document" :style="{ width: '25rem' }">
      <template #header>
          <div class="inline-flex items-center justify-center gap-2">
              <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
              <span class="font-bold whitespace-nowrap">Amy Elsner</span>
          </div>
      </template>
      <span class="text-surface-500 dark:text-surface-400 block mb-8">Update your information.</span>
      <div class="flex items-center gap-4 mb-4">
          <label for="name" class="font-semibold w-24">Name</label>
          <InputText id="name" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex items-center gap-4 mb-2">
          <label for="category" class="font-semibold w-24">Category</label>
          <InputText id="category" class="flex-auto" autocomplete="off" />
      </div>
      <template #footer>
          <Button label="Cancel" text severity="secondary" @click="visible = false" autofocus />
          <Button label="Save" variant="outlined" severity="secondary" @click="visible = false" autofocus />
      </template>
  </Dialog>
</template>