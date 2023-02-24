import { api } from './configs/axiosConfigs';

export const Rest = {
  delete: async <T>(url: string): Promise<T> => (await api.delete(url)).data,
  get: async <T>(url: string): Promise<T> => (await api.get(url)).data,
  post: async <T>(url: string, data: unknown): Promise<T> =>
    (await api.post(url, data)).data,
  put: async <T>(url: string, data: unknown): Promise<T> =>
    (await api.put(url, data)).data,
};
