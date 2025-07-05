<script setup lang="ts">
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { z } from 'zod';

definePageMeta({
  layout: false
})


const resolver = zodResolver(
  z.object({
    email: z.string()
      .min(1, { message: "Email is required." }) // 최소 1글자 (필수 필드)
      .email({ message: "Invalid email address." }), // 유효한 이메일 형식 검사
    password: z
      .string()
      .min(3, { message: 'Minimum 3 characters.' })
      .max(8, { message: 'Maximum 8 characters.' })
      .refine((value) => /[a-z]/.test(value), {
          message: 'Must have a lowercase letter.'
      })
      .refine((value) => /[A-Z]/.test(value), {
          message: 'Must have an uppercase letter.'
      })
      .refine((value) => /d/.test(value), {
          message: 'Must have a number.'
      })
  })
);

const initialValues = ref({
  username: '',
  password: ''
});

// 폼 제출 핸들러
const handleLogin = (e: any) => {
  if (e.valid) {
    alert('form is vaild')
    // toast.add({ severity: 'success', summary: 'Form is submitted.', life: 3000 });
  }
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Welcome back
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Sign in to your account
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow-sm sm:rounded-lg sm:px-10 border border-gray-200">
        <div class="space-y-3 mb-6">
          <Button
            label="Continue with GitHub"
            icon="pi pi-lock"
            variant="outlined"
            class="w-full justify-center p-3 rounded-lg border border-gray-300 text-gray-800 hover:bg-gray-50 flex items-center gap-2"
            :pt="{
              label: { class: 'text-base font-medium' },
              icon: { class: 'text-lg' }
            }"
          />

          <Button
            label="Continue with Google"
            icon="pi pi-google"
            variant="outlined"
            class="w-full justify-center p-3 rounded-lg border border-gray-300 text-gray-800 hover:bg-gray-50 flex items-center gap-2"
            :pt="{
              label: { class: 'text-base font-medium' },
              icon: { class: 'text-lg' }
            }"
          />
        </div>

        <div class="relative mb-6">
          <div class="absolute inset-0 flex items-center" aria-hidden="true">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="bg-white px-2 text-gray-500">or</span>
          </div>
        </div>

        <Form v-slot="$form" @submit="handleLogin" :initialValues :resolver="resolver" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-bold text-gray-700 mb-1">
              Email
            </label>
            <div >
              <InputText name="email" placeholder="Email" fluid />
              <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{ $form.email.error.message }}</Message>
            </div>
          </div>

          <div>
            <div class="flex justify-between items-center mb-1">
              <label for="password" class="block text-sm font-bold text-gray-700">
                Password
              </label>
              <div class="text-sm">
                <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot Password?
                </a>
              </div>
            </div>
            <div>
              <Password name="password" placeholder="Password" :feedback="false" toggleMask fluid />
              <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">
                  <ul class="my-0 px-4 flex flex-col gap-1">
                      <li v-for="(error, index) of $form.password.errors" :key="index">{{ error.message }}</li>
                  </ul>
              </Message>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              label="Sign In"
              class="w-full justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-semibold text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            />
          </div>
        </Form>
      </div>
    </div>

    <div class="mt-8 text-center text-xs text-gray-500 px-4">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus, obcaecati accusantium, tenetur quasi molestias labore quia dolores sunt doloribus eligendi corrupti illo eos quisquam amet? Natus numquam animi corrupti ab?
    </div>
  </div>
</template>