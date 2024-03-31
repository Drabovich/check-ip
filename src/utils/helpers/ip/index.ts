import type { RowTable } from "@/utils/types/ip"

// Сборка объекта для вывода в таблицу из данных API
export const parseRequest = (arr: any): RowTable[] => {
    if(!arr.length) return [];

    return arr.reduce((acc: any, item: any) => {
        acc.push({
            ip: item.value.data.query,
            countryCode: item.value.data.countryCode ?? "-",
            country: item.value.data.country ?? "-",
            city: item.value.data.city ?? "-",
            status: item.value.data.status,
        })
        return acc
    }, [])
}