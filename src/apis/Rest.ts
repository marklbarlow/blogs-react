import { api } from './configs/axiosConfigs';

export const Rest = {
  delete: async <T>(url: string): Promise<T> =>
    (await api.request({ method: 'DELETE', url })).data,
  get: async <T>(url: string): Promise<T> =>
    (await api.request({ method: 'GET', url })).data,
  post: async <T>(url: string, data: unknown): Promise<T> =>
    (await api.request({ data, method: 'POST', url })).data,
  put: async <T>(url: string, data: unknown): Promise<T> =>
    (await api.request({ data, method: 'PUT', url })).data,
};
