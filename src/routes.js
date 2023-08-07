import { Navigate, useRoutes } from 'react-router-dom';
import io from 'socket.io-client';

// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import EditorPage from './pages/EditorPage';
import DashboardAppPage from './pages/DashboardAppPage';

// ----------------------------------------------------------------------
const socket = io("http://localhost:4000");
// const socket = Socket.connect("http://localhost:4000")


export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <LoginPage socket={socket}/>,
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardAppPage socket={socket}/> },
        { path: 'user', element: <UserPage  socket={socket}/> },
        { path: 'products', element: <EditorPage  socket={socket}/> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" /> },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
