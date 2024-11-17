import todoService from '@/services/todoService';
import { queryOptions } from '@tanstack/react-query';

export const todoQueries = {
  all: () => ['todos'],
  lists: () => [...todoQueries.all(), 'list'],
  todos: (filter?: unknown) =>
    queryOptions({
      queryFn: () => todoService.getTodos(filter),
      queryKey: [...todoQueries.lists(), filter],
    }),
  detail: () => [...todoQueries.all(), 'detail'],
  todoById: (id: string | undefined) =>
    queryOptions({
      queryFn: () => todoService.getTodoById(id),
      queryKey: [...todoQueries.detail(), id],
    }),
};
