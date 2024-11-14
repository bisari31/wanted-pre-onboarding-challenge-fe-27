import todoService from '@/services/todoService';

export const todoKeys = {
  todos: {
    queryFn: () => todoService.getTodos(),
    queryKey: ['todos'],
  },
};
