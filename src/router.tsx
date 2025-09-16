// src/router.tsx
import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';

// Lazy-загрузка компонентов (код-сплиттинг)
const Root = lazy(() => import('./pages/Root/Root'));
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const MoviePage = lazy(() => import('./pages/MoviePage/MoviePage'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'movies/:id',
        element: <MoviePage />,
      },
    ],
  },
]);

export default router;
