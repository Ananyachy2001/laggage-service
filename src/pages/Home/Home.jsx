import React, { useState } from 'react';
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
import translations from './translations';

const Home = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  return (
    <div>
      <NavbarComp 
        currentLanguage={currentLanguage} 
        setLanguage={setCurrentLanguage} 
      />
      <Banner currentLanguage={currentLanguage} />
      <LuggageStorageLocations currentLanguage={currentLanguage} />
      <HowItWorks currentLanguage={currentLanguage} />
      <FAQ currentLanguage={currentLanguage} />
      <Review currentLanguage={currentLanguage} />
      <Choose currentLanguage={currentLanguage} />
      <Blog currentLanguage={currentLanguage} />
      <Footer currentLanguage={currentLanguage} />
      <ScrollToTopButton />
    </div>
  );
};

export default Home;
