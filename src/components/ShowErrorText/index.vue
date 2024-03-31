<script setup lang="ts">
defineProps<{ errorMessage?: string }>();
</script>

<template>
  <div v-if="errorMessage" class="text-red-400 text-sm pt-1">
    {{ errorMessage }}
  </div>
</template>
