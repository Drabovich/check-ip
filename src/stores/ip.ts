import { ref, computed } from "vue"
import { defineStore } from 'pinia';
import type { RowTable } from "@/utils/types/ip"

export const useIpAddressStore = defineStore('ip', () => {
  const _arrResultRequestIp = ref<RowTable[]>([])

  const arrResultRequestIp = computed({
    get: () => _arrResultRequestIp.value,
    set: (newValue: RowTable[]) => {
      _arrResultRequestIp.value = newValue;
    }
  });

  return { arrResultRequestIp }
})