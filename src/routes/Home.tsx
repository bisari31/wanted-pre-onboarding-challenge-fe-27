import CreateForm from '@/components/todos/CreateForm';
import TodoList from '@/components/todos/TodoList';
import auth from '@/lib/auth';
import routes from '@/lib/routes';
import { todoKeys } from '@/queries/keys';
import { QueryClient } from '@tanstack/react-query';
import { Outlet, redirect } from 'react-router-dom';

export const loader = (queryClient: QueryClient) => () => {
  if (!auth.get()) return redirect(routes.login);
  return queryClient.ensureQueryData(todoKeys.todos());
};

export default function Home() {
  return (
    <div className="w-full">
      <CreateForm />
      <div className="flex gap-5">
        <TodoList />
        <Outlet />
      </div>
    </div>
  );
}
