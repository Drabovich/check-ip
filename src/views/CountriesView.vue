<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useIpAddressStore } from '@/stores/ip';

import { Search } from '@element-plus/icons-vue'
import type { RowTable } from "@/utils/types/ip";

const userStore = useIpAddressStore();
const searchValueIp = ref<string>("")
const dataTable = ref<RowTable[]>([])
const multipleSelection = ref<string[]>([])

onMounted(() => {
  dataTable.value = userStore.arrResultRequestIp;
})

// Фильтрация при поиске
const filterTableData = computed<RowTable[]>(() => {
  const searchValue = searchValueIp.value.toLowerCase().trim();

  if (!searchValue) {
    return dataTable.value;
  } else {
    return dataTable.value.filter((data) => {
      return (
        data.ip.toLowerCase().includes(searchValue) ||
        data.country.toLowerCase().includes(searchValue) ||
        data.city.toLowerCase().includes(searchValue)
      );
    });
  }
});

// Список выбранных элементов для удаления
const handleSelectionChange = (el: RowTable[]): void => {
  multipleSelection.value = el.reduce((acc: string[], item) => {
    acc.push(item.ip)
    return acc;
  }, [])
}

// Удаление элементов из стора и таблицы
const handleDeleteItemTable = (): void => {
  dataTable.value = dataTable.value.filter(item => {
    return !multipleSelection.value.includes(item.ip);
  })
  userStore.arrResultRequestIp = dataTable.value
}
</script>

<template>
  <div class="pt-20">
    <!-- Если нет записей, показываем стандартный шаблон -->
    <div 
      v-if="!dataTable.length"
      class="text-center"
    >
      <p>Вы еще не сделали запрос IP адресов</p>
      <router-link 
        :to="{ name: 'home' }"
        class="underline text-blue-400"
      >
        Перейти к форме запроса
      </router-link>
    </div>

    <!-- Вывод полученных данных в таблицу -->
    <div v-else>
      <div class="mb-3">
        <el-input
          v-model="searchValueIp"
          class="custom-search"
          placeholder="Введите данные"
          :prefix-icon="Search"
        />
      </div>
      <div class="max-w-[700px]">
        <el-table 
          :data="filterTableData"
          class="custom-table"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="50" />
          <el-table-column prop="ip" sortable label="IP" width="150" />
          <!-- Показываем флаг страны по коду -->
          <el-table-column prop="countryCode" sortable label="Flag" width="100" align="center">
            <template #default="scope">
              <span
                  v-if="scope.row.countryCode === '-'"
              >
                {{ scope.row.countryCode }}
              </span>
              <span
                  v-else
                  class="flex justify-center items-center"
              >
                <img
                    class="w-5 h-5"
                    :src="`https://flagsapi.com/${scope.row.countryCode}/flat/64.png`"
                >
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="country" sortable label="Country" width="150" align="center" />
          <el-table-column prop="city" sortable label="City" width="150" align="center" />
          <!-- Вывод результата запроса полученной записи -->
          <el-table-column prop="status" sortable label="Status" width="100" align="center">
            <template #default="scope">
              <span v-if="scope.row.status === 'fail'" class="text-red-600 text-2xl">&#10006;</span>
              <span v-else class="text-green-600 text-2xl">&#10004;</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- Кнопка удаления записей в таблице -->
      <div 
        v-if="multipleSelection.length"
        class="mt-4"
      >
        <el-button 
            type="danger"
            size="large"
            @click="handleDeleteItemTable"
        >
          Удалить
        </el-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.custom-search {
  max-width: 700px;
  width: 100%;
}

.custom-table {
  width: 100%;

  th {
    background-color: #F2F0F0 !important;
  }
}
</style>
