<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router';
import { useIpAddressStore } from '@/stores/ip';
import { getInfoAllIp } from '@/services/ip'

import { parseRequest } from '@/utils/helpers/ip'
import { REGEX_IP_ADDRESS } from '@/utils/constants/REGEX'
import { MESSAGES } from '@/utils/constants/MESSAGES'
import ShowErrorText from '@/components/ShowErrorText/index.vue'
import type { InfoAboutIp } from "@/utils/types/ip";

const router = useRouter();
const userStore = useIpAddressStore();

const objInfoAboutIp = reactive<InfoAboutIp>({
  textareaValue: "",
  textErrorTextarea: "",
  loading: false
})

// Отправка формы с введенными ip адресами
const handleSendTextarea = (): void => {
    objInfoAboutIp.textErrorTextarea = ""

    // Валидация массива введенных IP адресов
    if (!REGEX_IP_ADDRESS.test(objInfoAboutIp.textareaValue)) {
        objInfoAboutIp.textErrorTextarea = MESSAGES.IP_ADDRESS
        return;
    }

    // Получение массива ip из строки ввода польз.
    const transformationIpInArray: string[] =
        objInfoAboutIp.textareaValue.trim().split(', ');

    // Запрос на API и запись результатов в store
    objInfoAboutIp.loading = true;
    getInfoAllIp(transformationIpInArray)
      .then((results) => {
        userStore.arrResultRequestIp = parseRequest(results)
        router.push({ name: 'countries' });
      })
      .catch(error => {
        objInfoAboutIp.textErrorTextarea = MESSAGES.INTERNAL_SERVER_ERROR;
        console.error(error);
      })
      .finally(() => {
        objInfoAboutIp.loading = false;
      });
}
</script>

<template>
    <div class="flex flex-col gap-y-5">
        <p class="pt-20 max-w-[620px]">
          Чтобы получить информацию об одном или нескольких IP адресах,
          <br>
          введите их в поле ниже через запятую.
          <br>
          IP для тестового запроса: 176.59.54.251, 24.48.0.1, 172.16.0.1
        </p>
        <div>
            <el-input
                v-model="objInfoAboutIp.textareaValue"
                class="custom-textarea"
                :rows="2"
                type="textarea"
                placeholder="Введите IP адреса"
            />
        </div>
        <div>
            <el-button 
                type="info"
                :loading="objInfoAboutIp.loading"
                size="large"
                @click="handleSendTextarea"
            >
                Отправить
            </el-button>
        </div>
        <ShowErrorText
            :errorMessage="objInfoAboutIp.textErrorTextarea"
        />
    </div>
</template>

<style lang="scss">
.custom-textarea {
  max-width: 620px;
  width: 100%;
}
</style>