import { useRoutes } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';

// Auth
// import Login from './pages/Login';
// import Register from './pages/Register';
import NotFound from './pages/Page404';
import Home from './pages/Home';
import Sholat from './pages/Sholat';

// Settings
// import Settings from './pages/settings';
// import AccountSettings from './pages/settings/Account';

export default function Router() {
  return useRoutes([
    // { path: '/', element: <Navigate to="/login" /> },
    {
      path: '/',
      element: <AppLayout />,
      children: [
        { path: '', element: <Home /> },
        // { path: 'login', element: <Login /> },
        // { path: 'register', element: <Register /> },
        // { path: 'home', element: <Home /> },
        { path: 'sholat', element: <Sholat /> },
        // {
        //   path: 'settings',
        //   children: [
        //     { path: '', element: <Settings /> },
        //     { path: 'account', element: <AccountSettings /> },
        //   ],
        // },
      ],
    },
    { path: '*', element: <NotFound replace /> },
  ]);
}
