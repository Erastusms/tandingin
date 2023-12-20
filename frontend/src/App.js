import {createBrowserRouter,createRoutesFromElements,RouterProvider} from 'react-router-dom';
import Home from "./pages/Home";
import Root from './pages/Root';
import Error from './pages/Error';
import About from './pages/About';
import SearchLeague from './pages/SearchLeague';
import Login from './pages/Login';
import Register from './pages/Register';
//App Component

//Admin Page
import Sidebar from './AdminPage/Sidenav';
import Dashboard from './appPages/Dashboard';
import AppRoot from './app/AppRoot';
import AdminRoot from './AdminPage/AdminRoot';
import DashboardAdmin from './AdminPage/DashboardAdmin';


import { logout } from "./actions/auth";
import MemberCompetition from './AdminPage/MemberCompetition';





const router = createBrowserRouter([
  {
    path:'/',
    element: <Root/> ,
    errorElement:<Error/>,
    children: [
      {path:'/', element: <Home/>},
      {path:'/About', element: <About/>},
      {path:'/SearchLeague', element: <SearchLeague/>},
      {path:'/login', element: <Login/>},
      {path:'/register', element: <Register/>},


    ],
  },
  {
    path:'/app',
    element: <AppRoot/> ,
    errorElement:<Error/>,
    children: [
      {path:'/app/dashboard', element: <Dashboard/>},
    ],
  },
  {
    path:'/admin',
    element: <AdminRoot/> ,
    errorElement:<Error/>,
    children: [
      {path:'/admin/dashboard', element:<DashboardAdmin/>},
      {path:'/admin/mycompetition', element:<MemberCompetition/>},

    ],
  },
]);
function App() {
  return <RouterProvider router={router}/> ;
}

export default App;
