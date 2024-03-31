import axios from "axios";

// Отправка массива введенных IP на API
export const getInfoAllIp = (arrayIp: string[]): Promise<any>  => {
  const requests = arrayIp.map((ip: string) => axios.get(`/${ip}`));
  return Promise.allSettled(requests);
}

