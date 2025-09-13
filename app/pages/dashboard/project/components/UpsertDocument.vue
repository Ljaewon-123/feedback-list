<script setup lang="ts">
import z from 'zod'

export type DocumentMeta = {
  id: number
  updated_at: Date
  created_at: Date
  docs_name: string
  tag: string[]
  description: string
}
const documentMetaSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().optional(),
    tag: z.string().refine(val =>
    val.split(',').every(tag => /^[a-zA-Z0-9-_ ]+$/.test(tag.trim())),
			{
				message: 'Tags must be separated by commas and contain only letters, numbers, hyphens, underscores, or spaces.'
			}
    )
})
const { document, refresh } = defineProps<{
  document?: Partial<DocumentMeta> 
  refresh: Function
}>()
const formDucs = ref({
  name: document?.docs_name ?? '',
  description: document?.description ?? '',
  tag: document?.tag?.join(',') ?? '', // string[] → string
})
watch(
  () => document,
  (newDoc) => {
    formDucs.value = {
      name: newDoc?.docs_name ?? '',
      description: newDoc?.description ?? '',
      tag: newDoc?.tag?.join(',') ?? ''
    }
  },
  { deep: true } // immediate: 마운트 시 바로 적용
)
const documentId = computed(() => document?.id ?? null)
const visible = defineModel('visible', { default: false });
const { avatarUrl } = useAuth();
const supabase = useSupabaseClient<DocumentMeta>()
const toast = useToast();
const route = useRoute()

const onFormSubmit = async () => {
	try {
    // Zod 유효성 검사
    const validated = documentMetaSchema.parse(formDucs.value)
    const payload = {
      docs_name: validated.name,
      description: validated.description,
      tag: validated.tag.split(',').map(tag => tag.trim()) // string[]로 변환
    }
    // Supabase에 저장
    if(documentId.value) {
      const res = await supabase
        .from('document_meta')
        .update(payload)
        .eq('id', documentId.value)
    } else {
      await supabase
        .from('document_meta')
        .insert([
          payload
        ])
    }

    toast.add({ severity: 'success', summary: 'Created new document.', life: 3000 })
    await refresh()
    // await navigateTo('/dashboard')
  } catch (error: any) {
    console.error(error)
    // Zod 에러 메시지 처리
    if (error instanceof z.ZodError) {
			error.errors.forEach(err => {
				toast.add({ severity: 'error', summary: err.message, life: 3000 })
			})
    } else {
      toast.add({ severity: 'error', summary: 'Error creating new Document.', life: 3000 })
    }
  }
}

</script>

<template>
  <Dialog v-model:visible="visible" modal header="New Document" :style="{ width: '32rem' }">
      <template #header>
        {{ documentId }}
          <div class="inline-flex items-center justify-center gap-2">
              <Avatar :image="avatarUrl" shape="circle" />
              <span class="font-bold whitespace-nowrap">{{ route.params.name }}</span>
          </div>
      </template>
      <span class="text-surface-500 dark:text-surface-400 block mb-8">Update your document.</span>
      <div class="flex items-center gap-4 mb-4">
          <label for="name" class="font-semibold w-24">Name</label>
          <InputText v-model="formDucs.name" id="name" class="flex-auto" autocomplete="off" />
      </div>
    <div class="flex items-center gap-4 mb-4">
        <label for="description" class="font-semibold w-24">Description</label>
        <Textarea v-model="formDucs.description" id="description" rows="2" class="flex-auto" autocomplete="off" />
    </div>
      <div class="flex items-center mb-2 gap-4">
          <label for="tag" class="font-semibold w-24 mb-6">Tag</label>
          <div class="flex flex-col flex-auto">
            <InputText v-model="formDucs.tag" id="tag" class="flex-auto" autocomplete="off" />
            <Message size="small" severity="secondary" variant="simple">
                Please enter tags separated by commas (e.g., a, b, c).
            </Message>
          </div>
      </div>
      <template #footer>
          <Button label="Cancel" text severity="secondary" @click="visible = false" autofocus />
          <Button label="Save" variant="outlined" @click="onFormSubmit(), visible = false" autofocus />
      </template>
  </Dialog>
</template>