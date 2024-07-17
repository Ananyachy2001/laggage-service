import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


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
import AllPartner from './pages/SuperAdmin/AllPartner';
import AllUser from './pages/SuperAdmin/AllUser';
import Reservations from './pages/User/Reservations';
import AllLuggage from './pages/Luggage/AllLuggage';
import LuggageDetails from './pages/Luggage/LuggageDetails';
import AddLocation from './pages/Partner/AddLocation';
import AllCustomer from './pages/Partner/AllCustomer';
import PartnerAnalytics from './pages/Partner/PartnerAnalytics';
import AdminAnalytics from './pages/SuperAdmin/AdminAnalytics';
import SearchNearLocation from './pages/SearchNearLocation';
import Home from './pages/Home/Home';
import LuggageStoreDetails from './pages/SearchLugLocation/LuggageStoreDetails';
import LuggageLocation from './pages/SearchLugLocation/LuggageLocation';
import PartnerAvailabilityCalendar from './pages/Partner/PartnerAvailabilityCalender';
import UserReminder from './pages/User/ClientBooking';
import AdminLoginForm from './pages/SuperAdmin/AdminLoginForm';
import PartnerProfile from './pages/Partner/PartnerProfile';
import AdminProfile from './pages/SuperAdmin/AdminProfile';
import AllClient from './pages/SuperAdmin/AllClient';
import ClientProfile from './pages/User/ClientProfile';
import ClientRefundForm from './pages/User/ClientRefundFOrm';
import ClientBooking from './pages/User/ClientBooking';
import AllLocations from './pages/SuperAdmin/AllLocations';
import PartnerLocations from './pages/Partner/PartnerLocation';
import AllBookings from './pages/SuperAdmin/AllBookings';
import PartnerBookings from './pages/Partner/PartnerBookings';
import Logout from './pages/Home/Logout';
import BookingConfirmation from './pages/SearchLugLocation/BookingConfirmation';
import ClientMenu from './pages/User/ClientMenu';
import AdminDashboard from './pages/SuperAdmin/AdminDashboard';
import ClientWallet from './pages/User/ClientWallet';
import ClientBookingHistory from './pages/User/ClientBookingHistory';
import PartnerDetails from './pages/SuperAdmin/PartnerDetails';
import ComingSoon from './pages/CominSoon';
import PartnerDashboard from './pages/Partner/PartnerDashboard';
import ClientDetails from './pages/SuperAdmin/ClientDetails';
import ClientDashboard from './pages/User/ClientDashboard';
import UnauthorizedPage from './pages/UnauthorizedPage';


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
        {/* common  */}
        <Route exact path="/" element={<Home />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        
        
        <Route path="/logout" element={<Logout />} />
        <Route path="/comingsoon" element={<ComingSoon />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="*" element={<UnauthorizedPage />} />


        {/* admin  */}
        <Route exact path="/superadmin/dashboard" element={<AdminDashboard />} />
        <Route exact path="/superadmin/login" element={<AdminLoginForm />} />
        {/* <Route exact path="/superadmin/profile" element={<AdminProfile />} /> */}
        <Route exact path="/superadmin/clients" element={<AllClient />} />
        <Route exact path="/superadmin/user" element={<AllUser/>} />
        <Route exact path="/superadmin/partners" element={<AllPartner/>} />
        <Route exact path="/superadmin/partners/:id" element={<PartnerDetails />} />
        <Route exact path="/superadmin/clients/:id" element={<ClientDetails />} />
        <Route exact path="/superadmin/locations" element={<AllLocations/>} />
        <Route exact path="/superadmin/bookings" element={<AllBookings/>} />
        <Route exact path="/superadmin/analytics" element={<AdminAnalytics/>} />

        {/* patner  */}
        <Route exact path="/partner/addlocation" element={<AddLocation/>} />
        <Route exact path="/partner/profile" element={<PartnerProfile />} />
        <Route exact path="/partner/allcustomers" element={<AllCustomer/>} />
        <Route exact path="/partner/analytics" element={<PartnerAnalytics/>} />
        <Route exact path="/partner_availability_calender" element={<PartnerAvailabilityCalendar />} />
        <Route exact path="/partner/locations" element={<PartnerLocations/>} />
        <Route exact path="/partner/bookings" element={<PartnerBookings/>} />
        <Route exact path="/partner/dashboard" element={<PartnerDashboard />} />


        {/* clients  */}
        <Route exact path="/reservations" element={<Reservations/>} />
        <Route exact path="/clientbooking" element={<ClientBooking />} />
        <Route exact path="/client/profile" element={<ClientProfile />} />
        <Route exact path="/client/menu" element={<ClientMenu />} />
        <Route exact path="/client/refundform" element={<ClientRefundForm />} />
        <Route exact path="/client/bookingconfirmation" element={<BookingConfirmation />} />
        <Route exact path="/client/bookinghistory" element={<ClientBookingHistory />} />
        <Route exact path="/client/wallet" element={<ClientWallet />} />
        <Route exact path="/client/dashboard" element={<ClientDashboard />} />



        {/* luggage  */}
        <Route exact path="/luggage_locations" element={<LuggageLocation />} />
        <Route exact path="/luggage_store_details" element={<LuggageStoreDetails />} />
        <Route exact path="/userserviceagency" element={<UserServiceAgency />} />
        <Route exact path="/searchluggage" element={<SearchLuggage/>} />
        <Route exact path="/searchnearlocation" element={<SearchNearLocation/>} />
        <Route exact path="/allluggage" element={<AllLuggage/>} />
        <Route exact path="/luggage/:id" element={<LuggageDetails/>} />

  


        
      </Routes>
    </>
  );
}

export default App;
