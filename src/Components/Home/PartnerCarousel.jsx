import React, { useEffect,useState } from 'react';
const PartnerCarousel = () => {
    
    const [sliderData, setSliderData] = useState([]);

    useEffect(() => {
        // Dynamically load jQuery, OwlCarousel JS, and CSS
        const loadResources = async () => {
            try {
                // Load jQuery
                await loadScript('https://code.jquery.com/jquery-3.6.0.min.js');
                
                const response = await fetch('https://resi.build/backend/wp-json/wp/v2/pages/41');
                const data = await response.json();

                // Extract slider data from the ACF field
                const slides = data.acf.speaker_section.speaker_images;
                setSliderData(slides);
                // Load OwlCarousel CSS
                loadStyle('https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css');
                loadStyle('https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.min.css');

                // Load OwlCarousel JS
                await loadScript('https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js');

                // Initialize OwlCarousel after resources are loaded
                window.jQuery('.partner-slide').owlCarousel({
                    loop: true,
                    margin: 40,
                    // nav: false,
                    dots: false,
                    // arrows:false,
                    autoPlay : true,
                    // stopOnHover : true,
                    // pagination:false,
                    autoHeight : true,
                    // smartSpeed:2000,
                    // autoplayTimeout:2000,
                    // autoplayHoverPause: true,
                    responsive: {
                        0: {
                            items: 2,
                        },
                        414: {
                            items: 2,
                        },
                        576: {
                            items: 3,
                        },
                        768: {
                            items: 4,
                        },
                        992: {
                            items: 3,
                        },
                        1200: {
                            items: 4,
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
        <div className="partner-carousel-area">
            <div className="container">
                <div className="partner-slide owl-carousel owl-theme">
                {sliderData.length > 0 ? (
                            sliderData.map((slide, index) => (
                    <div key={index} className="partner-item wow animate__animated animate__fadeInUp delay-0-2s">
                        <img src={slide.image.url} alt={index} />
                    </div>
                    ))
                ) : (
                    <p>Loading...</p>
                )}
                    
                </div>
            </div>
        </div>
    );
};

export default PartnerCarousel;
