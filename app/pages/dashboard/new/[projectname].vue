<template>
  <div class="relative mx-auto my-10 max-w-2xl px-2 md:px-0">
    <Form v-slot="$form" :initialValues="formData" :resolver @submit="onFormSubmit">
      <Card class="border-2 border-surface dark:bg-zinc-800!">
        <template #title >
          Create a new project
        </template>
        <template #subtitle>
          <p class="m-0">
            Your project will have its own dedicated instance and full Postgres database.
            An API will be set up so you can easily interact with your new database.
          </p>
          <Divider />
        </template>
        <template #content>
          <div
            v-for="(item, index) in formItems"
            :key="item.title + index"
            class="relative text-sm flex flex-col gap-2 md:grid md:grid-cols-12"
            :class="{
              'border-t border-surface-200 dark:border-surface-700 py-4': index > 0,
              'pb-4': index === 0
            }"
          >
            <div class="transition-all duration-500 ease-in-out col-span-4 flex flex-col gap-2">
              {{ item.title }}
            </div>
            <div class="transition-all duration-500 ease-in-out order-1 col-span-8">
              <FormField v-slot="$field" v-if="item.modelKey" :name="item.modelKey" class="flex flex-col gap-1">
                <component
                  :is="item.component"
                  v-bind="item.props"
                  v-model="formData[item.modelKey]"
                />
                <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $field.error?.message }}</Message>
              </FormField>
              <FormField v-slot="$field" v-else :name="item.modelKey" class="flex flex-col gap-1">
                <component
                  :is="item.component"
                  v-bind="item.props"
                />
                <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $field.error?.message }}</Message>
              </FormField>
            </div>
          </div>
          <!-- 사실상 제일 쉬운방법 -->
          <div 
            v-if="isVisablePassword"
            class="relative text-sm flex flex-col gap-2 md:grid md:grid-cols-12" 
            :class="{ 'border-t border-surface-200 dark:border-surface-700 py-4': true }"
          >
            <div class="transition-all duration-500 ease-in-out col-span-4 flex flex-col gap-2">
              Password
            </div>
            <div class="transition-all duration-500 ease-in-out order-1 col-span-8">
              <FormField v-slot="$field" name="password" class="flex flex-col gap-1">
                <Password type="text" placeholder="Password" :feedback="false" toggleMask fluid />
                <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $field.error?.message }}</Message>
              </FormField>
            </div>
          </div>
        </template>
        <template #footer>
          <Divider />
          <div class="flex justify-end gap-4">
            <Button class="dark:text-white!" label="Cancel" severity="secondary" outlined size="small" />
            <Button type="submit" label="Create new project" size="small" />
          </div>
        </template>
      </Card>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod';
import type { Project } from '../index.vue';

type FormDataType = {
  projectName: string
  description: string
  isPrivate: boolean
  password: string | null
}
type FormItem = {
  title: string
  component: string
  modelKey: keyof FormDataType
  props?: Record<string, any>
}
// 폼 데이터
const formData = ref<FormDataType>({
  projectName: '',
  description: '',
  isPrivate: false,
  password: null
})
const isVisablePassword = computed(() => formData.value.isPrivate)

const formItems: FormItem[] = [
  {
    title: 'Project name',
    component: 'InputText',
    modelKey: 'projectName',
    props: {
      type: 'text',
      placeholder: 'Project name',
      size: 'small',
      fluid: true
    }
  },
  {
    title: 'Description',
    component: 'Textarea',
    modelKey: 'description',
    props: {
      rows: 2,
      fluid: true
    }
  },
  {
    title: 'Private?',
    component: 'ToggleSwitch',
    modelKey: 'isPrivate'
  }
];

const toast = useToast();

const resolver = zodResolver(
  z
    .object({
      projectName: z.string().min(1, { message: 'Project name is required.' }),
      description: z.string().optional(),
      isPrivate: z.boolean(),
      password: z
        .string()
        .min(4, { message: 'Password must be at least 4 characters.' })
        .max(16, { message: 'Password must be at most 16 characters.' })
        .nullable()
    })
    .superRefine((data, ctx) => {
      if (data.isPrivate && !data.password) {
        ctx.addIssue({
          path: ['password'],
          code: z.ZodIssueCode.custom,
          message: 'Password is required when private is true.',
        })
      }
    })
);

const supabase = useSupabaseClient<Project>()
const user = useSupabaseUser()
const onFormSubmit = async ({ valid }: { valid: boolean }) => {
  if (valid) {
    try {
      const { projectName, description, isPrivate, password } = formData.value
      await supabase
        .from('project')
        .insert([
          { 
            project_name: projectName,
            description: description,
            is_private: isPrivate,
            password: password,
            user_id: user.value?.id
          }
        ])
      toast.add({ severity: 'success', summary: 'Created new project.', life: 3000 });
      await navigateTo('/dashboard')
    } catch (error) {
      console.error(error)
      toast.add({ severity: 'error', summary: 'Error new porject.', life: 3000 });
    }
  }
};
</script>