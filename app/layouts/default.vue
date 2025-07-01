<template>
  <div>
    <header>
      <Toolbar>
        <template #start>
            <Button icon="pi pi-plus" class="mr-2" severity="secondary" text />
            <Button icon="pi pi-print" class="mr-2" severity="secondary" text />
            <Button icon="pi pi-upload" severity="secondary" text />
        </template>

        <template #center>
            <IconField>
                <InputIcon>
                    <i class="pi pi-search" />
                </InputIcon>
                <InputText placeholder="Search" />
            </IconField>
        </template>

        <template #end> <SplitButton label="Save" :model="items"></SplitButton></template>
    </Toolbar>
    </header>
    <slot/>
  </div>
</template>

<script setup lang="ts">
const items = ref([
    {
        label: 'Update',
        icon: 'pi pi-refresh'
    },
    {
        label: 'Delete',
        icon: 'pi pi-times'
    }
])
</script>