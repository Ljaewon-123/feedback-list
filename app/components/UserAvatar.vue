<script setup lang="ts">
const { imageUrl } = defineProps<{ imageUrl: string }>();
const toast = useToast();
const { isDark } = useDarkMode()
const supabase = useSupabaseClient()

const signOut = async() => {
  const { error } = await supabase.auth.signOut()
  if(error) {
    toast.add({ severity: 'error', summary: 'failed', detail: 'Logout Error', life: 3000 })
    return
  }
  return await navigateTo('/login')
}

const menu = templateRef<any>('menu');
const toggle = (event: any) => {
  menu.value.toggle(event);
};

const profileItems = ref([
  { separator: true },
  {
    label: 'Theme',
    items: [
      {
        label: 'Light',
        icon: 'pi pi-sun',
        theme: { mode: 'light' },
        command: () => isDark.value = !isDark.value
      },
      {
        label: 'Dark',
        icon: 'pi pi-moon',
        theme: { mode: 'dark' },
        command: () => isDark.value = !isDark.value
      },
    ]
  },
  { separator: true },
  {
    label: "Logout",
    icon: 'pi pi-sign-out',
    command: () => signOut()
  }
])

</script>

<template>
  <div>
    <Avatar 
      :image="imageUrl" 
      class="mr-2" 
      size="small" 
      shape="circle" 
      @click="toggle"
    />
    <Menu ref="menu" id="overlay_menu" :model="profileItems" :popup="true" >
      <template #item="{ item, props }">
        <div v-if="!item.theme" v-ripple class="flex items-center" v-bind="props.action">
          <span :class="item.icon" />
          <span>{{ item.label }}</span>
        </div>
        <div v-else v-ripple class="flex items-center justify-between" v-bind="props.action">
          <div class="flex items-center">
            <span :class="item.icon" />
            <span>{{ item.label }}</span>
          </div>
          <span 
            v-if="item.theme.mode == 'dark' ? isDark : !isDark" 
            class="w-1.5 h-1.5 rounded-full bg-[#27272a] dark:bg-zinc-100"
          ></span>
        </div>
      </template>
    </Menu>
  </div>
</template>