import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import App from '../App';
import Loading from '../components/shared/Loading';
import SocialLogin from '../pages/SocialLogin';
import AuthCheck from '../components/AuthCheck/AuthCheck';

const Hosting = lazy(() => import('../pages/Hosting'));
const Main = lazy(() => import('../pages/Main'));
const Detail = lazy(() => import('../pages/detail'));
const Accommodation = lazy(() => import('../pages/Accommodation'));
const NotFound = lazy(() => import('../pages/404'));
const CheckReservation = lazy(() => import('../pages/CheckReservation'));
const SocialAddInfo = lazy(() => import('../pages/SocialAddInfo'));
const CheckReservationDetail = lazy(() => import('../pages/CheckReservationDetail'));
const WishList = lazy(() => import('../pages/WishList'));
const Account = lazy(() => import('../pages/Account'));
const Users = lazy(() => import('../pages/Users'));

const onlyLogin = 'ONLY_LOGIN';
const onlyLogout = 'ONLY_LOGOUT';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: (
      <Suspense fallback={<Loading />}>
        <NotFound />
      </Suspense>
    ),
    children: [
      {
        path: '',
        element: (
          <Suspense fallback={<Loading />}>
            <AuthCheck option={null}>
              <Main />
            </AuthCheck>
          </Suspense>
        ),
      },
      {
        path: 'hosting',
        element: (
          <Suspense fallback={<Loading />}>
            <AuthCheck option={onlyLogin}>
              <Hosting />
            </AuthCheck>
          </Suspense>
        ),
      },
      {
        path: 'detail',
        element: (
          <Suspense fallback={<Loading />}>
            <AuthCheck option={null}>
              <Detail />
            </AuthCheck>
          </Suspense>
        ),
      },
      {
        path: 'reservations',
        children: [
          {
            path: '',
            element: (
              <Suspense fallback={<Loading />}>
                <AuthCheck option={onlyLogin}>
                  <CheckReservation />
                </AuthCheck>
              </Suspense>
            ),
          },
          {
            path: 'detail/:reservationId',
            element: (
              <Suspense fallback={<Loading />}>
                <AuthCheck option={onlyLogin}>
                  <CheckReservationDetail />
                </AuthCheck>
              </Suspense>
            ),
          },
        ],
      },
      {
        path: 'social',
        children: [
          {
            path: 'login',
            element: (
              <AuthCheck option={onlyLogout}>
                <SocialLogin />
              </AuthCheck>
            ),
          },
          {
            path: 'add_info',
            element: (
              <Suspense fallback={<Loading />}>
                <AuthCheck option={onlyLogout}>
                  <SocialAddInfo />
                </AuthCheck>
              </Suspense>
            ),
          },
        ],
      },
      {
        path: 'accommodation',
        element: (
          <Suspense fallback={<Loading />}>
            <AuthCheck option={onlyLogin}>
              <Accommodation />
            </AuthCheck>
          </Suspense>
        ),
      },
      {
        path: 'wishlists',
        element: (
          <Suspense fallback={<Loading />}>
            <AuthCheck option={onlyLogin}>
              <WishList />
            </AuthCheck>
          </Suspense>
        ),
      },
      {
        path: 'users/:userId',
        element: (
          <Suspense fallback={<Loading />}>
            <AuthCheck option={null}>
              <Users />
            </AuthCheck>
          </Suspense>
        ),
      },
      {
        path: 'account-settings',
        element: (
          <Suspense fallback={<Loading />}>
            <AuthCheck option={null}>
              <Account />
            </AuthCheck>
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
