<script setup lang="ts">
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { z } from 'zod';

definePageMeta({
  layout: false
})

const toast = useToast();
const supabase = useSupabaseClient()
const loading = ref(false);

const resolver = zodResolver(
  z.object({
    email: z.string()
      .min(1, { message: "Email is required." }) // 최소 1글자 (필수 필드)
      .email({ message: "Invalid email address." }), // 유효한 이메일 형식 검사
    password: z
      .string()
      .min(3, { message: 'Minimum 3 characters.' })
      .max(8, { message: 'Maximum 8 characters.' })
      // .refine((value) => /[a-z]/.test(value), {
      //     message: 'Must have a lowercase letter.'
      // })
      // .refine((value) => /[A-Z]/.test(value), {
      //     message: 'Must have an uppercase letter.'
      // })
      // .refine((value) => /d/.test(value), {
      //     message: 'Must have a number.'
      // })
  })
);

const initialValues = {
  email: '',
  password: ''
};
const email = ref(initialValues.email);
const password = ref(initialValues.password);

// 폼 제출 핸들러
const handleLogin = async (e: any) => {
  if(!e.valid) return 

  loading.value = true;

  // const { error: signupError } = await supabase.auth.signUp({
  //   email: email.value,
  //   password: password.value,
  // })
  // console.log(signupError)

  const { error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
  })
  
  loading.value = false;

  if (error) {
    toast.add({ severity: 'error', summary: 'Login Failed', detail: error.message, life: 3000 });
  } else {
    toast.add({ severity: 'success', summary: 'Login Successful', detail: 'Welcome back!', life: 3000 });
      await navigateTo('/login')
  }
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Get Started
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Sign up to your account
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow-sm sm:rounded-lg sm:px-10 border border-gray-200">
        <Form v-slot="$form" @submit="handleLogin" :initialValues :resolver="resolver" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-bold text-gray-700 mb-1">
              Email
            </label>
            <div >
              <InputText v-model="email" name="email" placeholder="Email" fluid />
              <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{ $form.email.error.message }}</Message>
            </div>
          </div>

          <div>
            <div class="flex justify-between items-center mb-1">
              <label for="password" class="block text-sm font-bold text-gray-700">
                Password
              </label>
              <div class="text-sm text-emerald-500 dark:text-emerald-400">
                <a href="#" class="font-medium">
                  Forgot Password?
                </a>
              </div>
            </div>
            <div>
              <Password v-model="password" name="password" placeholder="Password" :feedback="false" toggleMask fluid />
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
              class="w-full justify-center py-3 px-4 border-2! border-emerald-700! rounded-md shadow-sm text-lg font-semibold text-white bg-emerald-500! hover:bg-emerald-600! focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              
            />
          </div>
        </Form>
      </div>
    </div>

    <div class="mt-6 text-center text-sm">
      <span class="text-gray-600">Don't have an account?</span>
      <a href="#" class="text-emerald-500 dark:text-emerald-400 ml-1 font-medium">Sign Up Now</a>
    </div>

    <div class="mt-8 text-center text-xs text-gray-500 px-4">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus, obcaecati accusantium, tenetur quasi molestias labore quia dolores sunt doloribus eligendi corrupti illo eos quisquam amet? Natus numquam animi corrupti ab?
    </div>
  </div>
  <Toast />
</template>