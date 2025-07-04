<template>
  <div>
    <header>
      <div class="card">
        <Menubar class="rounded-none!" :model="items">
          <template #start>
            hi
          </template>
          <template #end>
            <Avatar 
              image="https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456" 
              class="mr-2" 
              size="small" 
              shape="circle" 
              @click="toggle"
            />
          </template>
        </Menubar>
        <Toast />
        <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
      </div>
    </header>
    <div class="bg-white dark:bg-[#18181b] h-screen text-black dark:text-white">
      <slot/>
    </div>
  </div>
</template>

<script setup lang="ts">
const toast = useToast();


const menu = templateRef<any>('menu');
const toggle = (event: any) => {
  menu.value.toggle(event);
};

// 좋은데?
const items = ref([
    {
        label: 'File',
        icon: 'pi pi-file',
        items: [
            {
                label: 'New',
                icon: 'pi pi-plus',
                command: () => {
                    toast.add({ severity: 'success', summary: 'Success', detail: 'File created', life: 3000 });
                }
            },
            {
                label: 'Print',
                icon: 'pi pi-print',
                command: () => {
                    toast.add({ severity: 'error', summary: 'Error', detail: 'No printer connected', life: 3000 });
                }
            }
        ]
    },
    {
        label: 'Search',
        icon: 'pi pi-search',
        command: () => {
            toast.add({ severity: 'warn', summary: 'Search Results', detail: 'No results found', life: 3000 });
        }
    },
    {
        separator: true
    },
    {
        label: 'Sync',
        icon: 'pi pi-cloud',
        items: [
            {
                label: 'Import',
                icon: 'pi pi-cloud-download',
                command: () => {
                    toast.add({ severity: 'info', summary: 'Downloads', detail: 'Downloaded from cloud', life: 3000 });
                }
            },
            {
                label: 'Export',
                icon: 'pi pi-cloud-upload',
                command: () => {
                    toast.add({ severity: 'info', summary: 'Shared', detail: 'Exported to cloud', life: 3000 });
                }
            }
        ]
    }
]);
</script>

