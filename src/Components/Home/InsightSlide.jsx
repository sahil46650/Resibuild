import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Import images
const InsightSlide = () => {

    const [Eventsdata, setEventsdata] = useState([]);
    const [mediaUrls, setMediaUrls] = useState({});
    const [imagesLoaded, setImagesLoaded] = useState(false);


    useEffect(() => {
        // Fetch media URLs for featured images
        const fetchMediaUrls = async () => {
            const mediaData = {};

            // Loop through the events and fetch the media URL for each featured media
            for (let event of Eventsdata) {
                const mediaId = event.featured_media;
                if (mediaId) {
                    const mediaResponse = await fetch(`https://resi.build/backend/wp-json/wp/v2/media/${mediaId}`);
                    const mediaJson = await mediaResponse.json();
                    mediaData[mediaId] = mediaJson.source_url;  // Store the image URL using the media ID as key
                }
            }

            setMediaUrls(mediaData);  // Update the state with all media URLs
        };

        fetchMediaUrls();
    }, [Eventsdata]);

    useEffect(() => {
        // Dynamically load jQuery, OwlCarousel JS, and CSS
        const loadResources = async () => {
            try {
                // Load jQuery
                await loadScript('https://code.jquery.com/jquery-3.6.0.min.js');

                const response = await fetch("https://resi.build/backend/wp-json/wp/v2/insights");

                // Check if the response is successful
                if (!response.ok) {
                    throw new Error('Failed to fetch testimonials');
                }

                const data = await response.json();
                setEventsdata(data);
                // Load OwlCarousel CSS
                loadStyle('https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css');
                loadStyle('https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.min.css');

                // Load OwlCarousel JS
                await loadScript('https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js');

                // Initialize OwlCarousel after resources are loaded
                window.jQuery('.insight-section-slider').owlCarousel({
                    loop: false,
                    margin: 10,
                    nav: true,
                    dots: false,
                    autoplay: true,
                    smartSpeed: 1000,
                    center: true,
                    navText: [
                        "<i class='ri-arrow-left-line'></i>",
                        "<i class='ri-arrow-right-line'></i>",
                    ],
                    responsive: {
                        0: {
                            items: 2,
                        },
                        414: {
                            items: 1,
                        },
                        576: {
                            items: 2,
                            center: false,
                            loop: true,
                        },
                        768: {
                            items: 3,
                            center: false,
                        },
                        992: {
                            items: 3,
                        },
                        1200: {
                            items: 3,
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
    const getReactRoute = (wordpressUrl) => {
        // Extract slug from WordPress URL and map it to React route
        const url = new URL(wordpressUrl);
        return url.pathname.replace("/backend/", "/");
    };
    // Check if all images are loaded
    const handleImageLoad = (id) => {
        setImagesLoaded((prev) => ({
            ...prev,
            [id]: true,
        }));
    };
    return (
        <div className="col-lg-7 col-md-12 p-0 wow animate__animated animate__fadeInUp delay-0-2s">
            <div className="insight-section-slide">
                <div className="container">
                    <div className="insight-section-slider owl-carousel owl-theme">
                        {Eventsdata.slice(0, 6).map((Eventdata) => (
                            <div key={Eventdata.id} className="insight-section-item wow animate__animated animate__fadeInUp delay-0-2s">
                                <div className="single-team bg-color-white">
                                    <div className="team-img">
                                        {!imagesLoaded[Eventdata.id] && <div className="skeleton-loader-home-insight"></div>}
                                        {mediaUrls[Eventdata.featured_media] && (
                                            <img
                                                src={mediaUrls[Eventdata.featured_media]}
                                                alt={Eventdata.title.rendered}
                                                onLoad={() => handleImageLoad(Eventdata.id)}
                                                style={{
                                                    display: imagesLoaded[Eventdata.id] ? "block" : "none",
                                                }}
                                            />
                                        )}
                                    </div>
                                    <div className="team-content">
                                        <h3>
                                            <Link
                                                to={getReactRoute(Eventdata.link)}
                                                dangerouslySetInnerHTML={{ __html: Eventdata.title.rendered }}
                                            ></Link>
                                        </h3>
                                        <p dangerouslySetInnerHTML={{ __html: Eventdata.excerpt.rendered }}></p>
                                        <Link
                                            to={getReactRoute(Eventdata.link)}
                                            className="read-more"
                                            dangerouslySetInnerHTML={{ __html: 'Read More <i className="ri-arrow-right-line"></i>' }}
                                        ></Link>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InsightSlide;
