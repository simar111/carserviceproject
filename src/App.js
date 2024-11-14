import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AboutUs from './Aboutus';
import Navbarr from './Navbar';
import  ContactUs from './Contact';
import Login from './Login';
import ServicesPage from './Service';
import Booking from './Form';
import SignUpPage from './Sign';
import HomePage from './Home';
import ServiceDetailsPage from './ServiceDetailsPage';
const App = () => {
  return (
    <div>
    
    <Router>
    <Navbarr />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Service" element={<ServicesPage />} />
        <Route path="/Booking" element={<Booking />} />
        <Route path="/Signup" element={<SignUpPage />} />
        <Route path="/Service-details" element={<ServiceDetailsPage />} />
      </Routes>
    </Router>
    </div>
  );
};

export default App;
