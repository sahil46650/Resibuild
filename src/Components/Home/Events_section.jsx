import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Events_section = () => {
    const [mediaUrls, setMediaUrls] = useState({});
    const [Eventsdata, setEventsdata] = useState([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);


    var paragraphs = document.querySelectorAll('.services-content p');

    paragraphs.forEach(function (paragraph) {
        var height = paragraph.offsetHeight;
        paragraph.style.marginBottom = -height + 'px';
    });
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

        fetch("https://resi.build/backend/wp-json/wp/v2/events")
            .then((response) => response.json())
            .then((data) => {
                setEventsdata(data); // Set the fetched testimonials data
            })
            .catch((error) => console.error("Error fetching Events:", error));
    }, []);

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
        <>
            <div className="row justify-content-center pt-30 article_row_m">
                {Eventsdata.slice(0, 4).map((Eventdata) => (
                    <div
                        key={Eventdata.id}
                        className="col-lg-6 col-sm-6 p-0 wow animate__animated animate__fadeInUp delay-0-2s article_items_m"
                    >
                        {!imagesLoaded[Eventdata.id] && <div className="skeleton-loader-home-event4"></div>}
                        <div className="single-services">
                            {/* Fetch the featured image URL */}
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
                            <div className="services-content">
                                <h3>
                                    {Eventdata.acf.external_url ? (
                                        <a
                                            href={Eventdata.acf.external_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            dangerouslySetInnerHTML={{
                                                __html: Eventdata.title.rendered,
                                            }}
                                        ></a>
                                    ) : (
                                        <Link
                                            to={getReactRoute(Eventdata.link)}
                                            dangerouslySetInnerHTML={{
                                                __html: Eventdata.title.rendered,
                                            }}
                                        ></Link>
                                    )}
                                </h3>

                                {/* Render HTML content safely */}
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: Eventdata.excerpt.rendered,
                                    }}
                                ></p>

                                {Eventdata.acf.external_url ? (
                                    <a
                                        href={Eventdata.acf.external_url}
                                        className="read-more default-btn-bordered"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        dangerouslySetInnerHTML={{
                                            __html: 'View Details <i class="ri-arrow-right-line"></i>',
                                        }}
                                    ></a>
                                ) : (
                                    <Link
                                        to={getReactRoute(Eventdata.link)}
                                        className="read-more default-btn-bordered"
                                        dangerouslySetInnerHTML={{
                                            __html: 'View Details <i class="ri-arrow-right-line"></i>',
                                        }}
                                    ></Link>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </>
    );
};

export default Events_section;
