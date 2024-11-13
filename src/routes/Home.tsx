import CreateForm from '@/components/todos/CreateForm';
import DetailForm from '@/components/todos/DetailForm';
import TodoList from '@/components/todos/TodoList';
import auth from '@/lib/auth';
import { redirect, useSearchParams } from 'react-router-dom';

export const loader = () => {
  if (!auth.get()) return redirect('/login');
  return null;
};

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
