import React, { useEffect, useState } from 'react';

// Import images
import quote from '../assets/images/Home/icons/quote.png'
import quote_outline from '../assets/images/Home/icons/quote-outlined.png'
const Testimonails = () => {
    const [testimonials, setTestimonials] = useState([]);
    useEffect(() => {
        // Dynamically load jQuery, OwlCarousel JS, and CSS
        const loadResources = async () => {
            try {
                // Load jQuery
                await loadScript('https://code.jquery.com/jquery-3.6.0.min.js');

                const response = await fetch("https://resi.build/backend/wp-json/wp/v2/testimonials");

                // Check if the response is successful
                if (!response.ok) {
                    throw new Error('Failed to fetch testimonials');
                }

                const data = await response.json();
                setTestimonials(data);

                // Load OwlCarousel CSS
                loadStyle('https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css');
                loadStyle('https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.min.css');

                // Load OwlCarousel JS
                await loadScript('https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js');

                // Initialize OwlCarousel after resources are loaded
                window.jQuery('.customer-slide').owlCarousel({
                    loop: false,
                    margin: 10,
                    dots: false,
                    nav: false,
                    autoplay: true,
                    responsive: {
                        0: {
                            items: 1
                        },
                        768: {
                            items: 1
                        },
                        1000: {
                            items: 1
                        }
                    }
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
        <section className="testimonial-bg ptb-100">
            <div className="container customer-wrap">
                <div className="customer-slide owl-carousel owl-theme">
                    {testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="single-customer wow animate__animated animate__fadeInUp delay-0-2s testimonial-content">
                            <img src={quote} alt="quote" />
                            <h3 className="custom-text-white pt-30" dangerouslySetInnerHTML={{ __html: testimonial.title.rendered }} />
                            <p className="custom-text-white w-85" dangerouslySetInnerHTML={{ __html: testimonial.content.rendered }} />
                            <div className="custom-flex-list">
                                <div className="testimonial-info">
                                    <h5 className="hightlight-green">{testimonial.acf.client_name}</h5>
                                    <p className="custom-text-white">{testimonial.acf.client_designation}</p>
                                </div>
                                <img src={quote_outline} alt="quote outline" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

    );
};

export default Testimonails;
