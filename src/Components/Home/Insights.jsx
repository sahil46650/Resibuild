import React, { useEffect, useState } from 'react';

// Import images
// import headphone from '../../assets/images/Home/icons/Headphones.png';
// import heart from '../../assets/images/Home/icons/fi_heart.png';
// import chart from '../../assets/images/Home/icons/Chat.png';
import { Link } from 'react-router-dom';

const Insights = () => {
    const [Eventsdata, setEventsdata] = useState([]);
    const [mediaUrls, setMediaUrls] = useState({});
    const [imagesLoaded, setImagesLoaded] = useState(false);

    useEffect(() => {
        // Fetch media URLs for featured images
        const fetchMediaUrls = async () => {
            const mediaData = {};

            for (let event of Eventsdata) {
                const mediaId = event.featured_media;
                if (mediaId) {
                    const mediaResponse = await fetch(`https://resi.build/backend/wp-json/wp/v2/media/${mediaId}`);
                    const mediaJson = await mediaResponse.json();
                    mediaData[mediaId] = mediaJson.source_url; // Store the image URL using the media ID as the key
                }
            }

            setMediaUrls(mediaData); // Update the state with all media URLs
        };

        fetchMediaUrls();
    }, [Eventsdata]);

    useEffect(() => {
        const loadResources = async () => {
            try {
                // Load jQuery
                await loadScript('https://code.jquery.com/jquery-3.6.0.min.js');

                const eventsResponse = await fetch('https://resi.build/backend/wp-json/wp/v2/podcasts');
                if (!eventsResponse.ok) {
                    throw new Error('Failed to fetch podcasts');
                }
                const eventsData = await eventsResponse.json();
                setEventsdata(eventsData);

                // Load OwlCarousel CSS
                loadStyle('https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css');
                loadStyle('https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.min.css');

                // Load OwlCarousel JS
                await loadScript('https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js');

                // Initialize OwlCarousel
                window.jQuery('.case-studies-slide').owlCarousel({
                    // loop: true,
                    margin: 30,
                    nav: true,
                    dots: false,
                    // autoplay: true,
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
                            items: 3,
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

    const loadScript = (src) => {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            script.onload = resolve;
            script.onerror = () => reject(new Error(`Script load error for ${src}`));
            document.head.appendChild(script);
        });
    };

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
        <div className="row align-items-center pt-30">
            <div className="col-lg-12">
                <div className="owl-carousel owl-theme case-studies-slide">
                    {Eventsdata.slice(0, 6).map((Eventdata) => (
                        <div
                            key={Eventdata.id} // Add the unique key prop
                            className="single-case-studies1 custom-section-slider wow animate__animated animate__fadeInUp delay-0-2s"
                        >
                            <div className="services-content bg-color-white">
                                {!imagesLoaded[Eventdata.id] && <div className="skeleton-loader-home-podcasts"></div>}
                                {mediaUrls[Eventdata.featured_media] && (
                                    <img className='custom-height-img'
                                        src={mediaUrls[Eventdata.featured_media]}
                                        alt={Eventdata.title.rendered}
                                        onLoad={() => handleImageLoad(Eventdata.id)}
                                        style={{
                                            display: imagesLoaded[Eventdata.id] ? "block" : "none",
                                        }}
                                    />
                                )}
                                <div className="podcast-content">
                                    <h3>
                                        <Link
                                            to={getReactRoute(Eventdata.link)}
                                            dangerouslySetInnerHTML={{ __html: Eventdata.title.rendered }}
                                        ></Link>
                                    </h3>
                                    {/* <p dangerouslySetInnerHTML={{ __html: Eventdata.excerpt.rendered }}></p> */}
                                    {/* <div className="facts-figure-podcast-list">
                                        <div className="group custom-text-white">
                                            <div className="overlap-group">
                                                <img src={headphone} alt="Headphone Icon" />
                                                <p className="text-wrapper-3">{Eventdata.acf.podcasts_analysis.listen}k</p>
                                            </div>
                                        </div>
                                        <div className="group custom-text-white">
                                            <div className="overlap-group">
                                                <img src={heart} alt="Heart Icon" />
                                                <p className="text-wrapper-3">{Eventdata.acf.podcasts_analysis.likes}k</p>
                                            </div>
                                        </div>
                                        <div className="group custom-text-white">
                                            <div className="overlap-group">
                                                <img src={chart} alt="Chart Icon" />
                                                <p className="text-wrapper-3">{Eventdata.acf.podcasts_analysis.comments}k</p>
                                            </div>
                                        </div>
                                    </div> */}
                                    <Link
                                        to={getReactRoute(Eventdata.link)}
                                        className="read-more"
                                        dangerouslySetInnerHTML={{ __html: 'Watch Now' }}
                                    ></Link>
                                </div>


                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Insights;
