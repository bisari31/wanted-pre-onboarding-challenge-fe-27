import { apiRequesterWithToken } from '@/services';
import { Todo } from '@/types/todo';

const todoService = {
  create: async (todo: Pick<Todo, 'title' | 'content' | 'priority'>) => {
    const { data } = await apiRequesterWithToken.post<{ data: Todo }>(
      '/todos',
      todo,
    );
    return data;
  },
  getTodos: async (query: unknown) => {
    const { data } = await apiRequesterWithToken<{ data: Todo[] | number }>(
      '/todos',
      {
        params: query,
      },
    );
    return data;
  },
  getTodoById: async (id: string | undefined) => {
    const { data } = await apiRequesterWithToken<{ data: Todo }>(
      `/todos/${id}`,
    );
    return data;
  },
  updateTodoById: async (
    todo: Pick<Todo, 'title' | 'content' | 'id' | 'priority'>,
  ) => {
    const { data } = await apiRequesterWithToken.put<{ data: Todo }>(
      `/todos/${todo.id}`,
      todo,
    );
    return data;
  },
  deleteTodoById: async (id?: Todo['id']) => {
    const { data } = await apiRequesterWithToken.delete<{ data: null }>(
      `/todos/${id}`,
    );
    return data;
  },
};

export default todoService;
