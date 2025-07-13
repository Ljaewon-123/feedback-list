<template>
    <div>
      <div class="flex justify-between p-4 border">
        <div class="px-3 py-2">
          We need main icon!
        </div>
        <Button
          :label="'Go to document'"
          icon="pi pi-book"
          severity="secondary"
          text
          rounded
          class="text-gray-700 hover:bg-gray-100 px-3 py-2 text-sm font-medium"
          :pt="{
            root: { class: 'focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2' },
            label: { class: 'hidden sm:inline-block' } // 작은 화면에서는 텍스트 숨기기
          }"
        />
      </div>
      <slot/>
    </div>
</template>
