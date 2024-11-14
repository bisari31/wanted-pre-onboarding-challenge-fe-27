import Signup from '@/routes/Signup';
import Layout from '@/routes/Layout';
import Home, { loader as homeLoader } from '@/routes/Home';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Login, { loader as authLoader } from '@/routes/Login';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      {/* <Route element={<Layout />} errorElement={<div>에러 페이지</div>}> */}
      <Route index element={<Home />} loader={homeLoader} />
      <Route path="login" element={<Login />} loader={authLoader} />
      <Route path="signup" element={<Signup />} loader={authLoader} />
    </Route>,
  ),
);

export default router;
