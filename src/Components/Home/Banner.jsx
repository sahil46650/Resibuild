import React, { useEffect, useState } from 'react';
import banner_bg from '../../assets/images/banner-bg.jpg'
import { Link } from 'react-router-dom';
const Banner = () => {
    const [sliderData, setSliderData] = useState([]);
    // const [videodata, setvideodata] = useState([]);
    useEffect(() => {
        // Dynamically load jQuery, OwlCarousel JS, and CSS
        const loadResources = async () => {
            try {
                // Load jQuery
                await loadScript('https://code.jquery.com/jquery-3.6.0.min.js');

                const response = await fetch('https://resi.build/backend/wp-json/wp/v2/pages/41');
                const data = await response.json();

                // Extract slider data from the ACF field
                const slides = data.acf.slider.slides_data;
                // const video = data.acf.slider.background_video.url;
                // setvideodata(video);
                setSliderData(slides);

                // Load OwlCarousel CSS
                loadStyle('https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css');
                loadStyle('https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.min.css');

                // Load OwlCarousel JS
                await loadScript('https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js');

                // Initialize OwlCarousel after resources are loaded
                window.jQuery('.case-studies-slide1').owlCarousel({
                    loop: true,
                    margin: 30,
                    nav: true,
                    dots: false,
                    autoplay: true,
                    smartSpeed: 1000,
                    autoplayHoverPause: true,
                    navText: [
                        "<i class='ri-arrow-left-line'></i>",
                        "<i class='ri-arrow-right-line'></i>",
                    ],
                    responsive: {
                        0: {
                            items: 1,
                        },
                        414: {
                            items: 1,
                        },
                        576: {
                            items: 1,
                        },
                        768: {
                            items: 1,
                        },
                        992: {
                            items: 1,
                        },
                        1200: {
                            items: 1,
                        },
                    },
                });
            } catch (error) {
                console.error('Error loading resources:', error);
            }
        };

        loadResources();
    }, []);

    // Helper function to load scripts dynamically
    const loadScript = (src) => {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error(`Script load error for ${src}`));
            document.head.appendChild(script);
        });
    };

    // Helper function to load styles dynamically
    const loadStyle = (href) => {
        const link = document.createElement('link');
        link.href = href;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        document.head.appendChild(link);
    };

    return (
        <div className="banner-area home">
            <video
                autoPlay
                muted
                loop
                
                id="background-video"
                poster={banner_bg}
            >
                <source src="https://www.resi.build/backend/wp-content/uploads/2025/01/Landing-page-resibuild-v3-1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div className="container">
                <div className="col-lg-12">
                    <div className="owl-carousel owl-theme case-studies-slide1">
                        {sliderData.length > 0 ? (
                            sliderData.map((slide, index) => (
                                <div key={index} className="single-case-studies1 custom-section-slider wow animate__animated animate__fadeInUp delay-0-2s"
                                >
                                    <div className="banner-content">
                                        <h1
                                            className="wow animate__animated animate__fadeInUp delay-0-4s"
                                            dangerouslySetInnerHTML={{ __html: slide.title }}
                                        ></h1>
                                        <div className="banner-btn d-flex align-items-center wow animate__animated animate__fadeInUp delay-0-8s">
                                            <Link
                                                to={slide.left_button_link}
                                                className="default-btn custom-flex"
                                                dangerouslySetInnerHTML={{ __html: slide.left_button_text }}
                                            ></Link>
                                            <p>
                                                <Link
                                                    to={slide.right_button_link}
                                                    dangerouslySetInnerHTML={{ __html: slide.right_button_text }}
                                                ></Link>
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            ))
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
