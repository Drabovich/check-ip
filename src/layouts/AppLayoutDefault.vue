<script setup lang="ts">
  import Header from "@/layouts/components/Header/index.vue"
</script>

<template>
  <div>
    <Header />
    <div class="container mx-auto px-3">
      <slot></slot>
    </div>
  </div>
</template>
