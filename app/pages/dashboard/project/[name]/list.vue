<template>
  <div class="mx-auto w-full max-w-[1200px] px-4 @lg:px-6 @xl:px-12 @2xl:px-20 @3xl:px-24 my-8 flex flex-col gap-8">
    <div class="flex gap-4">
      <NuxtLink to="/dashboard/new/document">
        <Button @click="visibleUpsertDocumentDialog" size="small" variant="outlined">
          New Document
        </Button>
      </NuxtLink>
      <IconField>
        <InputIcon class="pi pi-search" />
        <InputText placeholder="Search for a project" size="small" />
      </IconField>
    </div>
    <div class="card">
      <DataTable :value="documents" tableStyle="min-width: 50rem">
        <Column field="uuid" header="Uuid"></Column>
        <Column field="name" header="Name"></Column>
        <Column field="category" header="Category">
          <template #body="slotProps">
            <span class="p-tag p-tag-rounded">
              <Tag icon="pi pi-user" :value="slotProps.data.category.name"></Tag>
            </span>
          </template>
        </Column>
        <Column field="updatedAt" header="UpdatedAt"></Column>
        <Column class="w-24 !text-end">
          <template #body="{ data }">
            <Button @click="visibleUpsertDocumentDialog" icon="pi pi-file-edit" severity="help" rounded></Button>
          </template>
        </Column>
        <Column class="w-24 !text-end">
          <template #body="{ data }">
            <Button icon="pi pi-trash" severity="danger" rounded></Button>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
  <UpsertDocument v-model:visible="visible" />
</template>


<script setup lang="ts">
const documents = ref();
const visible = ref(false);
const visibleUpsertDocumentDialog = () => {
  visible.value = true;
}
</script>
