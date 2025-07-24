<template>
  <div class="relative mx-auto my-10 max-w-2xl px-2 md:px-0">
    <Form :resolver @submit="onFormSubmit">
      <Card class="border-2 border-surface dark:bg-zinc-800!">
        <template #title >
          Create a new project</template>
        <template #subtitle>
          <p class="m-0">
            Your project will have its own dedicated instance and full Postgres database.
            An API will be set up so you can easily interact with your new database.
          </p>
          <Divider />
        </template>
        <template #content>
          <div 
            v-for="item, index in formItems" 
            :key="`${item.title}` + index"
            class="relative text-sm flex flex-col gap-2 md:grid md:grid-cols-12"
            :class="{ 'border-t border-surface-200 dark:border-surface-700 py-4': index > 0, 'pb-4' : index===0 }"
          >
            <div class="transition-all duration-500 ease-in-out col-span-4 flex flex-col gap-2">
              {{ item.title }}
            </div>
            <div class="transition-all duration-500 ease-in-out order-1 col-span-8">
              <component :is="item.render()" />
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
              <Password type="text" placeholder="Password" :feedback="false" toggleMask fluid />
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

// 폼 데이터
const formData = ref({
  projectName: '',
  description: '',
  isPrivate: false,
  password: ''
})
const isVisablePassword = computed(() => formData.value.isPrivate)

// h 렌더 함수를 사용한 폼 아이템 설정
const formItems = [
  {
    title: 'Project name',
    render: () => h(resolveComponent('InputText'), {
      modelValue: formData.value.projectName,
      'onUpdate:modelValue': (value: string) => formData.value.projectName = value,
      type: 'text',
      placeholder: 'Project name',
      size: 'small',
      fluid: true
    })
  },
  {
    title: 'Description',
    render: () => h(resolveComponent('Textarea'), {
      modelValue: formData.value.description,
      'onUpdate:modelValue': (value: string) => formData.value.description = value,
      rows: 2,
      fluid: true
    })
  },
  {
    title: 'Private?',
    render: () => h(resolveComponent('ToggleSwitch'), {
      modelValue: formData.value.isPrivate,
      'onUpdate:modelValue': (value: boolean) => formData.value.isPrivate = value
    })
  },
    {
    title: 'A?',
    render: () => h(resolveComponent('A'))
  }
]
const toast = useToast();
const resolver = zodResolver(
  z
  .object({
    projectName: z.string().min(1, { message: 'Project name is required.' }),
    description: z.string().optional(),
    private: z.boolean(),
    password: z
      .string()
      .min(4, { message: 'Password must be at least 4 characters.' })
      .max(16, { message: 'Password must be at most 16 characters.' })
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.private && !data.password) {
      ctx.addIssue({
        path: ['password'],
        code: z.ZodIssueCode.custom,
        message: 'Password is required when private is true.',
      })
    }
  })
);

const onFormSubmit = ({ valid }: { valid: boolean }) => {
  if (valid) {
    toast.add({ severity: 'success', summary: 'Form is submitted.', life: 3000 });
  }
};
</script>