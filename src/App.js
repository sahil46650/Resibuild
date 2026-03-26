import './App.css';
import About from './Components/About/About';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Home from './Components/Home/Home';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Pagenotfound from './Components/Pagenotfound';
import Event from './Components/Events/Event';
import Contact from './Components/Contact/Contact';
import Eventsdetailed from './Components/Events/Events_detailed';
import Insights from './Components/Insights/Insights';
import Insightsdetailed from './Components/Insights/Insights_detailed';
import Cpd from './Components/CPD/Cpd';
import Podcast from './Components/Podcasts/Podcast';
import PodcastDetailed from './Components/Podcasts/PodcastDetailed';
import Search from './Components/Search';
import './assets/css/newres.css';

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation(); // Hook to detect route changes

  useEffect(() => {
    // Reset loading state to true on route change
    setLoading(true);

    // Set timeout to hide preloader after 3 seconds
    const preloaderTimeout = setTimeout(() => {
      setLoading(false); // Hide preloader after 3 seconds
    }, 2000);

    // Cleanup timeout on component unmount or when the route changes
    return () => clearTimeout(preloaderTimeout);
  }, [location]); // Trigger effect when location changes

  // Update body class with page ID based on current route
  useEffect(() => {
    // Remove any existing page class from body
    document.body.classList.forEach(className => {
      if (className.startsWith('page-')) {
        document.body.classList.remove(className);
      }
    });

    // Add the new page class based on location.pathname
    const pageId = location.pathname.split('/')[1] || 'home'; // Default to 'home' if root path
    document.body.classList.add(`page-${pageId}`);
  }, [location]); // Run this effect when the route changes

  return (
    <div>
      {/* Preloader (this will be shown for 3 seconds after route change) */}
      {loading && (
        <div className="preloader">
          <div className="spinner">
            <img
              src="https://resi.build/backend/wp-content/themes/resibuild/assets/images/logo.png"
              alt="Preloader Logo"
              className="preloader-logo"
            />
          </div> {/* Example spinner */}
        </div>
      )}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/search" element={<Search />} />
        <Route path="/events" element={<Event />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/cpd" element={<Cpd />} />
        <Route path="/podcasts" element={<Podcast />} />
        <Route path="/podcasts/:eventId" element={<PodcastDetailed />} />
        <Route path="/events/:eventId" element={<Eventsdetailed />} />
        <Route path="/insights/:eventId" element={<Insightsdetailed />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
