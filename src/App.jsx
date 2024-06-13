import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import SearchLuggage from './pages/SearchLuggage';
import UserServiceAgency from './pages/UserServiceAgency';
import Login from './pages/Authentication/Login';
import AllHost from './pages/SuperAdmin/AllHost';
import AllUser from './pages/SuperAdmin/AllUser';

function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/userserviceagency" element={<UserServiceAgency />} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/superadmin/host" element={<AllHost/>} />
        <Route exact path="/superadmin/user" element={<AllUser/>} />
        <Route exact path="/searchluggage" element={<SearchLuggage/>} />

        
      </Routes>
    </>
  );
}

export default App;
