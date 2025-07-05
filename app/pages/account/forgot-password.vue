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
      .min(1, { message: "Email is required." }) 
      .email({ message: "Invalid email address." }), 
  })
);

const initialValues = {
  email: '',
};
const email = ref(initialValues.email);

// 폼 제출 핸들러
const handler = async (e: any) => {
  if(!e.valid) return 

  loading.value = true;

  const { error } = await supabase.auth.resetPasswordForEmail('valid.email@supabase.io', {
    redirectTo: 'http://localhost:3000/account/update-password',
  })

  if (error) {
    toast.add({ severity: 'error', summary: 'Email Send Failed', detail: error.message, life: 3000 });
  } else {
    toast.add({ severity: 'success', summary: 'Email Send Successful', detail: 'Reset Password', life: 3000 });
  }

  loading.value = false;
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Password Reset
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow-sm sm:rounded-lg sm:px-10 border border-gray-200">
        <Form v-slot="$form" @submit="handler" :initialValues :resolver="resolver" class="space-y-6">
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
            <Button
              type="submit"
              label="Sign In"
              class="w-full justify-center py-3 px-4 border-2! border-emerald-700! rounded-md shadow-sm text-lg font-semibold text-white bg-emerald-500! hover:bg-emerald-600! focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              
            />
          </div>
        </Form>
      </div>
    </div>
  </div>
  <Toast />
</template>