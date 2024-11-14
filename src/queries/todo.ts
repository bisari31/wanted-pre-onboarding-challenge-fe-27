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
      navigate(`/?id=${data.id}`);
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: (err) => {
      console.log(err);
    },
  });
};

export const useTodos = () => {
  return useQuery({
    ...todoKeys.todos,
    staleTime: 1000 * 60 * 30,
    select: (data) => {
      const list = [...data.data];
      return list.reverse();
    },
  });
};

export const useTodoById = (id: string | null) => {
  return useQuery({
    queryKey: ['todos', id],
    queryFn: () => todoService.getTodoById(id),
    staleTime: 1000 * 60 * 30,
    enabled: !!id,
    select: (data) => {
      return data.data;
    },
  });
};

export const useUpdateTodo = (toggleMode: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: todoService.updateTodoById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toggleMode();
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
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      navigate('/');
    },
    onError: (err) => {
      console.log(err);
    },
  });
};
