import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import TaskDetails from './pages/TaskDetails';
import Members from './pages/Members';
import TaskList from './pages/TaskList';
import Layout from './components/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: 'tasks',
        element: <TaskList />
      },
      {
        path: 'tasks/:taskId',
        element: <TaskDetails />
      },
      {
        path: 'members',
        element: <Members />
      }
    ]
  }
]);

export default function Router() {
  return <RouterProvider router={router} />;
}