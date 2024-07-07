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
import HowitWorks from './HowitWorks';


const Home = () => {
    
  return (
    
    <div>
      <NavbarComp />
      
      <Banner />

      {/* How it Works */}
      
      <HowitWorks />
      {/* Services */}
      <Service />
      
      {/* Projects */}
      <Projects />
      
      {/* FAQ */}
      <FAQ />
      
      {/* Team */}
      <Team />

      {/* Counter */}
      <Counter />
    
      {/* Review */}
      <Review />

      {/* Footer */}
      <Footer />
    

    </div>
    
  );
};

export default Home;
