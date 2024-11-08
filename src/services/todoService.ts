import { apiRequesterWithToken } from '@/services';

const todoService = {
  create: async (todo: Pick<Todo, 'title' | 'content'>) => {
    const { data } = await apiRequesterWithToken.post<{ data: Todo }>(
      '/todos',
      todo,
    );
    return data;
  },
  getTodos: async () => {
    const { data } = await apiRequesterWithToken<{ data: Todo[] }>('/todos');
    return data;
  },
  getTodoById: async (id: string | null) => {
    const { data } = await apiRequesterWithToken<{ data: Todo }>(
      `/todos/${id}`,
    );
    return data;
  },
  updateTodoById: async (todo: Pick<Todo, 'title' | 'content' | 'id'>) => {
    const { data } = await apiRequesterWithToken.put<{ data: Todo }>(
      `/todos/${todo.id}`,
      todo,
    );
    return data;
  },
  deleteTodoById: async (id: Todo['id']) => {
    const { data } = await apiRequesterWithToken.delete<{ data: null }>(
      `/todos/${id}`,
    );
    return data;
  },
};

export default todoService;
