import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTodos } from '@/queries/todo';
import { useSearchParams } from 'react-router-dom';

export default function TodoList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data } = useTodos();
  const id = searchParams.get('id');
  return (
    <div>
      <h2 className="py-3 text-lg font-bold">할 일 목록</h2>
      <div className="flex flex-col gap-1">
        {data?.map((todo) => (
          <Button
            onClick={() => setSearchParams({ id: todo.id })}
            variant={'outline'}
            className={cn(
              id === todo.id && 'bg-stone-100',
              `line-clamp-1 flex w-60 justify-start`,
            )}
            key={todo.id}
          >
            {todo.title}
          </Button>
        ))}
      </div>
    </div>
  );
}
