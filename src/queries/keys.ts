import todoService from '@/services/todoService';

export const todoKeys = {
  defaultKey: ['todos'],
  todos: (query?: any) => ({
    queryFn: () => todoService.getTodos(query),
    queryKey: [...todoKeys.defaultKey, query],
  }),
  todoById: (id: string | undefined) => ({
    queryFn: () => todoService.getTodoById(id),
    queryKey: [...todoKeys.defaultKey, id],
  }),
};
