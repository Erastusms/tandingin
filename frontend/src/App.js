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
import Sidebar from './PageAdmin/Sidenav';
import Dashboard from './appPages/Dashboard';
import AppRoot from './app/AppRoot';
import AdminRoot from './PageAdmin/AdminRoot';
import DashboardAdmin from './PageAdmin/DashboardAdmin';




import { logout } from "./actions/auth";
import MemberCompetition from './PageMember/MemberCompetition';
import AdminCompetition from './PageAdmin/AdminCompetition';
import AdminProfile from './PageAdmin/AdminProfile';
import LeagueDetails from './PageAdmin/LeagueDetails';
import MemberRoot from './PageMember/MemberRoot';
import ErrorDashboard from './pages/ErrorDashboard';
import Competition from './PageMember/Competition';

import ProtectedRoute from './ProtectedRoute';





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
    element: 
    (
    <ProtectedRoute>
      <AdminRoot/>
    </ProtectedRoute>
    ) ,
    errorElement:<Error/>,
    children: [
      {path:'/admin/dashboard', element:<DashboardAdmin/>},
      {path:'/admin/dashboard/:id', element:<LeagueDetails/>},
      {path:'/admin/mycompetition',element:<AdminCompetition/>},
      // {path:'/admin/member_and_league',element:<MemberCompetition/>},
      {path:'/admin/profile',element:<AdminProfile/>},
      {
        
      }

    ],
  },
  {
    path:'/member',
    element: (
    <ProtectedRoute>
    <MemberRoot/>
    </ProtectedRoute>
    ) ,
    errorElement:<ErrorDashboard/>,
    children: [
      {path:'/member/dashboard', element:(
      
      <MemberCompetition/>
      
    )},
      {path:'/member/competition', element:
      (

          <Competition/>

      )
      
      },

      {
        
      }

    ],
  },
]);
function App() {
  return <RouterProvider router={router}/> ;
}

export default App;
