import { BlogComment, BlogEntry, BlogLike, BlogPreview, User } from '../model';
import { api } from './configs';

export const BlogsAPI = {
  addComment: async (
    blogId: number,
    text: string,
    userId: number
  ): Promise<void> =>
    (await api.post<void>(`/blogs/${blogId}/comments`, { text, userId })).data,
  addLike: async (blogId: number, userId: number): Promise<void> =>
    (await api.put<void>(`/blogs/${blogId}/likes/${userId}`, {})).data,
  loadBlogComments: async (blogId: number): Promise<BlogComment[]> =>
    (await api.get<BlogComment[]>(`/blogs/${blogId}/comments`)).data,
  loadBlogEntry: async (blogId: number): Promise<BlogEntry> =>
    (await api.get<BlogEntry>(`/blogs/${blogId}`)).data,
  loadBlogLikes: async (blogId: number): Promise<BlogLike[]> =>
    (await api.get<BlogLike[]>(`/blogs/${blogId}/likes`)).data,
  loadBlogPreviews: async (top = 5): Promise<BlogPreview[]> =>
    (await api.get<BlogPreview[]>(`/blogs?top=${top}`)).data,
  loadUsers: async (): Promise<User[]> =>
    (await api.get<User[]>('/users')).data,
  saveBlogEntry: async (
    title: string,
    text: string,
    userId: number
  ): Promise<void> =>
    (await api.post<void>('/blogs', { text, title, userId })).data,
  removeLike: async (blogId: number, userId: number): Promise<void> =>
    (await api.delete<void>(`/blogs/${blogId}/likes/${userId}`)).data,
};
