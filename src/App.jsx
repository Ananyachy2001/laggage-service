import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

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
import Reservations from './pages/User/Reservations';
import AllLuggage from './pages/Luggage/AllLuggage';
import LuggageDetails from './pages/Luggage/LuggageDetails';
import AddLocation from './pages/Host/AddLocation';
import AllCustomer from './pages/Host/AllCustomer';
import HostAnalytics from './pages/Host/HostAnalytics';

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
        <Route exact path="/reservations" element={<Reservations/>} />
        <Route exact path="/allluggage" element={<AllLuggage/>} />
        <Route exact path="/luggage/:id" element={<LuggageDetails/>} />
        <Route exact path="/host/addlocation" element={<AddLocation/>} />
        <Route exact path="/host/allcustomers" element={<AllCustomer/>} />
        <Route exact path="/host/analytics" element={<HostAnalytics/>} />


        
      </Routes>
    </>
  );
}

export default App;
