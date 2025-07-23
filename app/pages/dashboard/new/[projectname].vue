<template>
  <div class="relative mx-auto my-10 max-w-2xl">
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
          <div class="relative text-sm flex flex-col gap-2 md:grid md:grid-cols-12" >
            <div class="transition-all duration-500 ease-in-out col-span-4 flex flex-col gap-2">
              Project name
            </div>
            <div class="transition-all duration-500 ease-in-out order-1 col-span-8">
              name content
            </div>
          </div>
          <div class="relative text-sm flex flex-col gap-2 md:grid md:grid-cols-12" :class="{ 'border-t border-surface-200 dark:border-surface-700': true }">
            <div class="transition-all duration-500 ease-in-out col-span-4 flex flex-col gap-2">
              Description
            </div>
            <div class="transition-all duration-500 ease-in-out order-1 col-span-8">
              description content
            </div>
          </div>
          <div class="relative text-sm flex flex-col gap-2 md:grid md:grid-cols-12">
            <div class="transition-all duration-500 ease-in-out col-span-4 flex flex-col gap-2">
              Private?
            </div>
            <div class="transition-all duration-500 ease-in-out order-1 col-span-8">
              Private content
            </div>
          </div>
          <div class="relative text-sm flex flex-col gap-2 md:grid md:grid-cols-12">
            <div class="transition-all duration-500 ease-in-out col-span-4 flex flex-col gap-2">
              if need password
            </div>
            <div class="transition-all duration-500 ease-in-out order-1 col-span-8">
              password content
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