import Signup from '@/routes/Signup';
import Layout from '@/routes/Layout';
import Home, { loader as homeLoader } from '@/routes/Home';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Login, { loader as authLoader } from '@/routes/Login';
import Detail, { loader as detailLoader } from '@/routes/Detail';
import { QueryClient } from '@tanstack/react-query';
import routes from '@/lib/routes';

export const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route
        path={routes.home}
        element={<Home />}
        loader={homeLoader(queryClient)}
      >
        <Route
          path=":id"
          element={<Detail />}
          loader={detailLoader(queryClient)}
        />
      </Route>
      <Route loader={authLoader}>
        <Route path={routes.login} element={<Login />} />
        <Route path={routes.signup} element={<Signup />} />
      </Route>
    </Route>,
  ),
);

export default router;
