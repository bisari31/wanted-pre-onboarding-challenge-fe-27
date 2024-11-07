import Auth from '@/routes/Auth';
import Layout from '@/routes/Layout';
import Main from '@/routes/Main';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route index element={<Main />} />
      <Route path="auth" element={<Auth />} />
    </Route>,
  ),
);

export default router;
