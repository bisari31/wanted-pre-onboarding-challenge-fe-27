import CreateForm from '@/components/todos/CreateForm';
import DetailForm from '@/components/todos/DetailForm';
import TodoList from '@/components/todos/TodoList';
import { useSearchParams } from 'react-router-dom';

export default function Home() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  return (
    <div className="w-full">
      <CreateForm />
      <div className="flex gap-5">
        <TodoList />
        <DetailForm key={id} />
      </div>
    </div>
  );
}
