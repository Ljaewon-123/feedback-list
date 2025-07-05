<script setup lang="ts">
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { z } from 'zod';

definePageMeta({
  layout: false
})

const user = useSupabaseUser(); // 인증된 사용자 정보를 제공하는 composable

if (!user.value) { // user.value가 null이면 인증되지 않은 상태
  // 사용자가 인증되지 않았다면 로그인 페이지로 리디렉션
  await navigateTo('/login');
}

const toast = useToast();
const supabase = useSupabaseClient()
const loading = ref(false);

const resolver = zodResolver(
  z.object({
    password: z
      .string()
      .min(3, { message: 'Minimum 3 characters.' })
      .max(8, { message: 'Maximum 8 characters.' })
  })
);

const initialValues = {
  password: '',
};
const password = ref(initialValues.password);

// 폼 제출 핸들러
const handler = async (e: any) => {
  if(!e.valid) return 

  loading.value = true;

  const { data, error } = await supabase.auth.updateUser({
    password: password.value
  })

  if (error) {
    toast.add({ severity: 'error', summary: 'Update Password Failed', detail: error.message, life: 3000 });
  } else {
    toast.add({ severity: 'success', summary: 'Update Password Successful', detail: 'Update Password', life: 3000 });
    await delay()
    await navigateTo('/login'); 
  }

  loading.value = false;
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Password Update
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow-sm sm:rounded-lg sm:px-10 border border-gray-200">
        <Form v-slot="$form" @submit="handler" :initialValues :resolver="resolver" class="space-y-6">
          <div>
            <div class="flex justify-between items-center mb-1">
              <label for="password" class="block text-sm font-bold text-gray-700">
                Password
              </label>
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
              :loading="loading"
            />
          </div>
        </Form>
      </div>
    </div>
  </div>
  <Toast />
</template>