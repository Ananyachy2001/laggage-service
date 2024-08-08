import React from 'react';
import 'tailwindcss/tailwind.css';
import NavbarComp from './NavbarComp'; 
import Banner from './Banner';
import Service from './Service';
import Projects from './Projects';
import FAQ from './FAQ';
import Team from './Team';
import Counter from './Counter';
import Review from './Review';
import Footer from './Footer';
import Choose from './Choose';
import Blog from './Blog';
import LuggageStorageLocations from '../SearchLugLocation/LuggageStorageLocations';
import ScrollToTopButton from './ScrollToTopButton';
import HowItWorks from './HowitWorks';


const Home = () => {
    
  return (
    
    <div>
      <NavbarComp />
      
      <Banner />


      <LuggageStorageLocations />

      {/* How it Works */}
      <HowItWorks />
      {/* Services */}
      {/* <Service /> */}
      
      {/* Projects */}
      <Projects />
      
      {/* FAQ */}
      <FAQ />
      
      {/* Team */}
      <Team />

      {/* Counter */}
      <Counter />

      <Choose />
    
      {/* Review */}
      <Review />

      <Blog/>

      {/* Footer */}
      <Footer />

      <ScrollToTopButton />
      {/* <ChatbotButton /> */}
      
    

    </div>
    
  );
};

export default Home;
