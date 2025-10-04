<template>
  <div class="container-layout">
    <div class="flex gap-4">
      <Button @click="upsertDocs" size="small" label="Edit" icon="pi pi-file-edit" variant="outlined" />
      <Button @click="share" size="small" label="Share" icon="pi pi-share-alt" variant="outlined" />
    </div>
    <div>
      <MilkdownEditorWrapper v-model:md="docsContent"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DocumentMeta } from './components/UpsertDocument.vue';

type Document = {
  id: number,
  content: string,
  updated_at: Date
}

const supabase = useSupabaseClient<Document>()
const router = useRouter()
const route = useRoute()
const toast = useToast();
const contentInfo = useState<DocumentMeta | null>('docs', () => null)

const { data: docsContent, error } = await useAsyncData('select:document', getDocument)
if (error.value) {
  console.error(error.value);
  toast.add({ severity: 'error', summary: 'failed', detail: 'Get document failure', life: 3000 })
}

const upsertDocs = async () => {
  const id = route.params.id
  console.log(docsContent.value)
  if (!id) return
  const { error } = await supabase
    .from('document')
    .upsert({
      id,
      content: docsContent.value,
      updated_at: new Date(),
    })
    .eq('id', id)
  if (error) {
    console.error(error.message);
    toast.add({ severity: 'error', summary: 'failed', detail: 'Update failure', life: 3000 })
    return
  }
  
  toast.add({ severity: 'success', summary: 'Success', detail: 'Update docuemnt', life: 3000 });
  await router.push(`/dashboard/project/${contentInfo.value?.docs_name}/list`)
}

async function getDocument () {
  const id = route.params.id
  if (!id) return
  const { data, error } = await supabase
    .from('document')
    .select('*')
    .eq('id', id)
    .maybeSingle()
  if (error) {
    console.error(error.message);
    toast.add({ severity: 'error', summary: 'failed', detail: 'Get document failure', life: 3000 })
    return `# Write your **markdown** here!`
  }

  return data?.content || `# Write your **markdown** here!`
}

const share = () => {
  return 'Sharing Devolping...'
}

</script>