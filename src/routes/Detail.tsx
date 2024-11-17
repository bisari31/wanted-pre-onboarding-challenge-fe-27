import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { priorityMap } from '@/lib/constants';
import { Priority, TodoFormType, todoFormSchema } from '@/lib/schemas';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Params, useNavigate, useParams } from 'react-router-dom';
import { todoQueries } from '@/queries/query-factory';
import todoService from '@/services/todoService';
import routes from '@/lib/routes';

export const loader =
  (queryClient: QueryClient) =>
  ({ params }: { params: Params<'id'> }) => {
    return queryClient.ensureQueryData(todoQueries.todoById(params.id));
  };

export default function Detail() {
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data } = useQuery({
    enabled: !!id,
    ...todoQueries.todoById(id),
    select: (data) => data.data,
  });

  const { register, reset, handleSubmit } = useForm<TodoFormType>({
    resolver: zodResolver(todoFormSchema),
    values: {
      content: data?.content ?? '',
      title: data?.title ?? '',
      priority: data?.priority ?? 'low',
    },
  });
  const { mutate: deleteTodoMutate } = useMutation({
    mutationFn: todoService.deleteTodoById,
    onSuccess: () => {
      navigate(routes.home);
      queryClient.invalidateQueries({
        queryKey: todoQueries.lists(),
      });
    },
  });
  const { mutate: updateTodoMutate } = useMutation({
    mutationFn: todoService.updateTodoById,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: todoQueries.lists(),
      });
      toggleEditMode();
    },
  });

  const toggleEditMode = () => setIsEditing((prev) => !prev);

  const handleCancel = () => {
    reset();
    toggleEditMode();
  };

  const handleUpdateTodo = (formData: TodoFormType) => {
    if (!id) return;
    updateTodoMutate({
      content: formData.content,
      id,
      title: formData.title,
      priority: formData.priority,
    });
  };

  return (
    <div className="flex-1">
      <h2 className="py-3 text-lg font-bold">상세보기</h2>
      <form
        onSubmit={handleSubmit(handleUpdateTodo)}
        className="flex w-full flex-col gap-1"
      >
        <div className="flex">
          <select disabled={!isEditing} id="" {...register('priority')}>
            {Object.keys(priorityMap).map((priority) => (
              <option key={priority} value={priority}>
                {priorityMap[priority as Priority].name}
              </option>
            ))}
          </select>
          <Input
            readOnly={!isEditing}
            {...register('title')}
            className={cn(isEditing && 'border-black')}
          />
        </div>
        <Textarea
          {...register('content')}
          readOnly={!isEditing}
          className={cn(isEditing && 'border-black', 'h-56 w-full resize-none')}
        />
        <div className="mt-5 flex w-full gap-5">
          {isEditing && (
            <>
              <Button
                className="w-full"
                type="button"
                variant={'outline'}
                onClick={handleCancel}
              >
                취소
              </Button>
              <Button className="w-full" type="submit">
                완료
              </Button>
            </>
          )}
          {!isEditing && (
            <>
              <Button
                type="button"
                onClick={() => deleteTodoMutate(id)}
                variant={'destructive'}
                className="w-full"
              >
                삭제
              </Button>
              <Button className="w-full" type="button" onClick={toggleEditMode}>
                수정
              </Button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
