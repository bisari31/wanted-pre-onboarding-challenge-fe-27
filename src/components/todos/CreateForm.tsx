import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { priorityMap } from '@/lib/constants';
import { Priority, TodoFormType, todoFormSchema } from '@/lib/schemas';
import { todoQueries } from '@/queries/query-factory';
import todoService from '@/services/todoService';
import { zodResolver } from '@hookform/resolvers/zod';
import { SelectGroup, SelectLabel } from '@radix-ui/react-select';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export default function CreateForm() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isValid },
  } = useForm<TodoFormType>({
    resolver: zodResolver(todoFormSchema),
  });
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: createTodoMutate } = useMutation({
    mutationFn: todoService.create,
    onSuccess: ({ data }) => {
      navigate(data.id);
      queryClient.invalidateQueries({ queryKey: todoQueries.lists() });
      reset({ priority: data.priority, content: '', title: '' });
    },
  });

  const handleSubmitForm = (data: TodoFormType) => {
    const { content, priority, title } = data;
    createTodoMutate({ title, content, priority });
  };

  return (
    <div className="flex justify-end">
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="flex w-full items-center gap-2"
      >
        <Controller
          control={control}
          name="priority"
          render={({ field }) => {
            return (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className={`w-40`}>
                  <SelectValue placeholder="우선순위" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel className="p-2 text-sm font-bold">
                      우선순위
                    </SelectLabel>
                    {Object.keys(priorityMap).map((priority) => (
                      <SelectItem
                        key={priority}
                        className="flex items-center gap-2"
                        value={priority}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`h-2 w-2 rounded-full ${priorityMap[priority as Priority].bgColor}`}
                          />
                          <span>{priorityMap[priority as Priority].name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            );
          }}
        />
        <Input
          className="max-w-60"
          {...register('title')}
          placeholder="타이틀을 입력해주세요"
        />
        <Input {...register('content')} placeholder="콘텐츠를 입력해주세요" />
        <Button disabled={!isValid} className="">
          등록
        </Button>
      </form>
    </div>
  );
}
