import Auth from '@/routes/Auth';
import AuthGuard from '@/routes/AuthGuard';
import Layout from '@/routes/Layout';
import Home from '@/routes/Home';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />} errorElement={<div>에러 페이지</div>}>
      <Route element={<AuthGuard />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="auth" element={<Auth />} />
    </Route>,
  ),
);

export default router;
