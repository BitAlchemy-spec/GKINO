// src/router.tsx
import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';

// Lazy-загрузка компонентов (код-сплиттинг)
const Root = lazy(() => import('./pages/Root/Root'));
const RegistrationForm = lazy(() => import('./components/RegistrationForm/RegistrationForm'));
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    //  errorElement: <ErrorPage />,
    children: [
      {
        index: true, // маршрут по умолчанию для "/"
        element: <HomePage />,
      },
      {
        path: 'login',
        element: <RegistrationForm />,
      },
    ],
  },
  // Пример отдельного layout (например, для админки):
  // {
  //   path: '/admin',
  //   element: <AdminLayout />,
  //   children: [
  //     {
  //       path: 'dashboard',
  //       element: <AdminDashboard />,
  //     },
  //   ],
  // },
]);

export default router;
