<script setup lang="ts">
const user = useSupabaseClient()
</script>

<template>
  <div >
    hello...??
    user
    <div>
      {{ user }}
    </div>
  </div>
</template>