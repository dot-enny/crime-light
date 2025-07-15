import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.tsx";
import { SignIn } from "./pages/auth/SignIn.tsx";
import { SignUp } from "./pages/auth/SignUp.tsx";
import { Dashboard } from "./pages/Dashboard.tsx";
import AppLayout from "./layout/appLayout.tsx";
import { MapView } from './pages/MapView.tsx';
import { DashBoardLayout } from './layouts/DashBoard.tsx';
import { AuthLayout } from './layouts/Auth.tsx';
import MakeReport from './pages/MakeReport.tsx';
import LandingPage from './pages/LandingPage.tsx';

const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { path: 'sign-in', element: <SignIn />, },
      { path: 'sign-up', element: <SignUp /> },
    ]
  },
  {
    path: '/dashboard',
    element: <DashBoardLayout />,
    children: [
      { path: '/dashboard', element: <Home />, },
      { path: 'map-view', element: <MapView /> },
      { path: 'make-report', element: <MakeReport /> },
    ]
  },
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "sign-in", element: <SignIn /> },
      { path: "sign-up", element: <SignUp /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
