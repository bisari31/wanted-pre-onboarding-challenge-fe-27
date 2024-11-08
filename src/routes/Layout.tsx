import Header from '@/components/Header';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="px-5">
      <Header />
      <main className="flex min-h-[calc(100vh-56px)] pb-10">
        <Outlet />
      </main>
    </div>
  );
}
