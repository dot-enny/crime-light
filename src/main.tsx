import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home.tsx';
import { SignIn } from './pages/auth/SignIn.tsx';
import { SignUp } from './pages/auth/SignUp.tsx';
import { MapView } from './pages/MapView.tsx';
import { DashBoardLayout } from './layouts/DashBoard.tsx';
import { AuthLayout } from './layouts/Auth.tsx';
import MakeReport from './pages/MakeReport.tsx';

const router = createBrowserRouter([
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { path: 'sign-in', element: <SignIn />, },
      { path: 'sign-up', element: <SignUp /> },
    ]
  },
  {
    path: '/',
    element: <DashBoardLayout />,
    children: [
      { path: '/', element: <Home />, },
      { path: 'map-view', element: <MapView /> },
      { path: 'make-report', element: <MakeReport /> },
    ]
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
