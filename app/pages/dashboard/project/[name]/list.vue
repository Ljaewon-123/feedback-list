<template>
  <div class="mx-auto w-full max-w-[1200px] px-4 @lg:px-6 @xl:px-12 @2xl:px-20 @3xl:px-24 my-8 flex flex-col gap-8">
    <div class="flex gap-4">
      <Button @click="visibleUpsertDocumentDialog" size="small" variant="outlined">
        New Document
      </Button>
      <IconField>
        <InputIcon class="pi pi-search" />
        <InputText placeholder="Search for a project" size="small" />
      </IconField>
    </div>
    <div class="card">
      {{ docses }}
      <DataTable :value="docses?.data" tableStyle="min-width: 50rem">
        <Column field="id" header="Id"></Column>
        <Column field="docs_name" header="Name"></Column>
        <Column field="tag" header="Tag">
          <template #body="slotProps">
            <span class="flex gap-2">
              <Tag v-for="tag in slotProps.data.tag" icon="pi pi-hashtag" :value="tag" />
            </span>
          </template>
        </Column>
        <Column field="updated_at" header="UpdatedAt">
          <template #body="slotProps">
            <NuxtTime 
              :datetime="slotProps.data.updated_at" 
              year="numeric"
              month="long"
              day="numeric"
              hour="2-digit"
              minute="2-digit"
            />
          </template>
        </Column>
        <Column class="w-24 text-end!">
          <template #body="{ data }">
            <Button @click="toggle(data, $event)" icon="pi pi-ellipsis-v" rounded variant="outlined" aria-label="Filter" size="small" /> 
            <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
  <UpsertDocument v-model:visible="visible" :refresh="refresh" />
</template>

    <!-- if (documentId.value) {
      // ✅ UPDATE
      result = await supabase
        .from('document_meta')
        .update(payload)
        .eq('id', documentId.value)
    } else {
      // ✅ INSERT
      result = await supabase
        .from('document_meta')
        .insert([payload])
    }
const formDucs = ref({
  name: props.document?.name ?? '',
  description: props.document?.description ?? '',
  tag: props.document?.tag?.join(',') ?? '', // string[] → string
})
const documentId = computed(() => props.document?.id ?? null) -->
<script setup lang="ts">
import type { DocumentMeta } from '../components/UpsertDocument.vue';
import type { PostgrestSingleResponse } from '@supabase/postgrest-js'

const visible = ref(false);
const visibleUpsertDocumentDialog = () => {
  visible.value = true;
}
const supabase = useSupabaseClient<DocumentMeta>()
const { data: docses, refresh } = await useLazyAsyncData<PostgrestSingleResponse<DocumentMeta[]>>('supabase.docuemt_meta', async () => {
  return await supabase
    .from('document_meta')
    .select();
}, { server: false })
const currentData = ref<DocumentMeta>();
const menu = ref();
const items = ref([
  {
    label: 'Options',
    items: [
      {
        label: 'Update',
        icon: 'pi pi-user-edit',
        command: async () => {
          
        }
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: async () => {
          return await supabase
            .from('document_meta')
            .delete()
            .eq('id', currentData.value?.id);
        }
      }
    ]
  }
]);

const toggle = (data: any, event: any, ) => {
  currentData.value = data
  menu.value.toggle(event);
};
</script>
