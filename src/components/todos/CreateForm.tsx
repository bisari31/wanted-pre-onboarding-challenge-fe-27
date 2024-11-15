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
import { useCreateTodo } from '@/queries/todo';
import { zodResolver } from '@hookform/resolvers/zod';
import { SelectGroup, SelectLabel } from '@radix-ui/react-select';
import { Controller, useForm } from 'react-hook-form';

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

  const { mutate } = useCreateTodo();

  const handleSubmitForm = (data: TodoFormType) => {
    const { content, priority, title } = data;
    mutate(
      { title, content, priority },
      {
        onSuccess: (data) => {
          reset({ priority: data.data.priority, content: '', title: '' });
        },
      },
    );
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
