<script setup lang="ts">
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'

const inputValue = ref<string>("");
</script>

<template>
  <header class="bg-custom-grey py-6">
    <div class="container px-3 mx-auto flex justify-between items-center">
      <div>
        <span class="uppercase font-bold">
          IP-PN.COM
        </span>
      </div>
      <div>
        <el-input
          class="custom-input"
          v-model="inputValue"
          placeholder="95.213.138.174"
          :prefix-icon="Search"
        />
      </div>
      <nav>
        <ul class="flex gap-x-8">
          <li>
            <router-link 
              :to="{ name: 'home' }"
              active-class="text-red-400"
            >
              Home
            </router-link>
          </li>
          <li>
            <router-link 
              :to="{ name: 'countries' }"
              active-class="text-red-400"
            >
              Countries
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style lang="scss">
.custom-input {
  width: 460px;
  @media (max-width: 768px) {
    width: unset;
  }
  @media (max-width: 540px) {
    display: none;
  }
}
</style>
