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
      <DataTable @rowSelect="clickRow" :value="docses?.data" tableStyle="min-width: 50rem" selectionMode="single">
        <Column field="id" header="Id"></Column>
        <Column field="docs_name" header="Name"></Column>
        <Column field="tag" header="Tag">
          <template #body="slotProps">
            <span class="flex gap-2">
              <Tag v-for="tag in slotProps.data.tag" icon="pi pi-hashtag" :value="tag" />
            </span>
          </template>
        </Column>
        <Column field="description" header="Description" class="truncate" />
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
  <UpsertDocument v-model:visible="visible" :document="currentData" :refresh="refresh" />
  <ConfirmDialog group="templating">
    <template #message="slotProps">
      <div class="flex flex-col items-center w-full gap-4 border-b border-surface-200 dark:border-surface-700">
        <i :class="slotProps.message.icon" class="!text-6xl text-primary-500"></i>
        <p>{{ slotProps.message.message }}</p>
      </div>
    </template>
  </ConfirmDialog>
</template>

<script setup lang="ts">
import type { DocumentMeta } from '../components/UpsertDocument.vue';
import type { PostgrestSingleResponse } from '@supabase/postgrest-js'

const visible = ref(false);
const visibleUpsertDocumentDialog = () => {
  visible.value = true;
  currentData.value = undefined
}
const supabase = useSupabaseClient<DocumentMeta>()
const { data: docses, refresh } = await useLazyAsyncData<PostgrestSingleResponse<DocumentMeta[]>>('supabase.docuemt_meta', async () => {
  return await supabase
    .from('document_meta')
    .select();
}, { server: false })
const currentData = ref<DocumentMeta>();
const toast = useToast();
const confirm = useConfirm();
const menu = ref();
const items = ref([
  {
    label: 'Options',
    items: [
      {
        label: 'Update',
        icon: 'pi pi-user-edit',
        command: async () => {
          visible.value = true;
        }
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: async () => {
          showTemplate();
        }
      }
    ]
  }
]);

const toggle = (data: any, event: any, ) => {
  currentData.value = data
  menu.value.toggle(event);
};

const clickRow = async (evt: any) => {
  console.log(evt)
  await navigateTo(`/dashboard/project/docs-${evt.data.id}`)
}

const showTemplate = () => {
    confirm.require({
        group: 'templating',
        header: 'Confirmation',
        message: 'Please confirm to proceed moving forward.',
        icon: 'pi pi-exclamation-circle',
        rejectProps: {
            label: 'Cancel',
            icon: 'pi pi-times',
            outlined: true,
            size: 'small'
        },
        acceptProps: {
            label: 'Save',
            icon: 'pi pi-check',
            size: 'small'
        },
        accept: async () => {
          try {
            await supabase
              .from('document_meta')
              .delete()
              .eq('id', currentData.value?.id);
              toast.add({ severity: 'success', summary: 'Success delete.', life: 3000 })
              await refresh();
          } catch (error) {
            toast.add({ severity: 'error', summary: 'Failed delete.', life: 3000 })
          }
        },
        reject: () => {
          toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
};
</script>
