import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { priorityMap } from '@/lib/constants';
import { Priority, TodoFormType, todoFormSchema } from '@/lib/schemas';
import { cn } from '@/lib/utils';
import { todoKeys } from '@/queries/keys';
import { useTodoById, useDeleteTodo, useUpdateTodo } from '@/queries/todo';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@radix-ui/react-select';
import { QueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Params, useParams } from 'react-router-dom';

export const loader =
  (queryClient: QueryClient) =>
  ({ params }: { params: Params<'id'> }) => {
    return queryClient.ensureQueryData(todoKeys.todoById(params.id));
  };

export default function Detail() {
  const { id } = useParams();
  const { data } = useTodoById(id);
  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TodoFormType>({
    resolver: zodResolver(todoFormSchema),
    values: {
      content: data?.content ?? '',
      title: data?.title ?? '',
      priority: data?.priority ?? 'low',
    },
  });
  const [isEditing, setIsEditing] = useState(false);
  const { mutate: deleteMutate } = useDeleteTodo();
  const { mutate: updateMutate } = useUpdateTodo();
  const toggleEditMode = () => setIsEditing((prev) => !prev);
  const handleCancel = () => {
    reset();
    toggleEditMode();
  };
  const handleUpdateTodo = (formData: TodoFormType) => {
    if (!id) return;
    updateMutate(
      {
        content: formData.content,
        id,
        title: formData.title,
        priority: formData.priority,
      },
      { onSuccess: () => toggleEditMode() },
    );
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
                onClick={() => deleteMutate(id)}
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
