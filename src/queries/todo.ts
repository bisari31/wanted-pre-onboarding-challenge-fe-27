import useQueryString from '@/hooks/useQueryString';
import routes from '@/lib/routes';
import { todoKeys } from '@/queries/keys';
import todoService from '@/services/todoService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const useCreateTodo = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: todoService.create,
    onSuccess: ({ data }) => {
      navigate(data.id);
      queryClient.invalidateQueries({ queryKey: todoKeys.defaultKey });
    },
    onError: (err) => {
      console.log(err);
    },
  });
};

export const useTodos = () => {
  const { query } = useQueryString();
  return useQuery({
    ...todoKeys.todos(query),
    staleTime: 1000 * 60 * 30,
    select: (data) => {
      return data.data;
    },
  });
};

export const useTodoById = (id?: string) => {
  return useQuery({
    ...todoKeys.todoById(id),
    staleTime: 1000 * 60 * 30,
    enabled: !!id,
    select: (data) => {
      return data.data;
    },
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: todoService.updateTodoById,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: todoKeys.defaultKey,
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });
};
export const useDeleteTodo = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: todoService.deleteTodoById,
    onSuccess: () => {
      navigate(routes.home);
      queryClient.invalidateQueries({
        queryKey: todoKeys.defaultKey,
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });
};
