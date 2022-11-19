import { BlogComment, BlogEntry, BlogLike, BlogPreview, User } from '../model';
import { api } from './configs/axiosConfigs';

export const BlogsAPI = {
  loadBlogEntry: async (blogId: number): Promise<BlogEntry> =>
    (await api.request({ method: 'GET', url: `/blogs/${blogId}` })).data,
  loadBlogComments: async (blogId: number): Promise<BlogComment[]> =>
    (await api.request({ method: 'GET', url: `/blogs/${blogId}/comments` })).data,
  loadBlogLikes: async (blogId: number): Promise<BlogLike[]> =>
    (await api.request({ method: 'GET', url: `/blogs/${blogId}/likes` })).data,
  loadBlogPreviews: async (top: number = 5): Promise<BlogPreview[]> =>
    (await api.request({ method: 'GET', url: `/blogs?top=${top}` })).data,
  loadUsers: async (): Promise<User[]> =>
    (await api.request({ method: 'GET', url: '/users' })).data,
};
