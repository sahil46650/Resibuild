import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const All_Events = () => {
    const [mediaUrls, setMediaUrls] = useState({});
    const [Eventsdata, setEventsdata] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12; // Number of items per page
    const [imagesLoaded, setImagesLoaded] = useState(false);


    // Fetch events data
    useEffect(() => {
        fetch("https://resi.build/backend/wp-json/wp/v2/events?per_page=100")
            .then((response) => response.json())
            .then((data) => setEventsdata(data))
            .catch((error) => console.error("Error fetching Events:", error));
    }, []);

    // Fetch media URLs for featured images
    useEffect(() => {
        const fetchMediaUrls = async () => {
            const mediaData = {};
            for (let event of Eventsdata) {
                const mediaId = event.featured_media;
                if (mediaId && !mediaData[mediaId]) {
                    const mediaResponse = await fetch(`https://resi.build/backend/wp-json/wp/v2/media/${mediaId}`);
                    const mediaJson = await mediaResponse.json();
                    mediaData[mediaId] = mediaJson.source_url; // Store the image URL
                }
            }
            setMediaUrls(mediaData);
        };

        if (Eventsdata.length > 0) {
            fetchMediaUrls();
        }
    }, [Eventsdata]);

    // Calculate pagination details
    const totalPages = Math.ceil(Eventsdata.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentEvents = Eventsdata.slice(startIndex, startIndex + itemsPerPage);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
        const allEventsSection = document.getElementById('all-events');
        if (allEventsSection) {
            allEventsSection.scrollIntoView({ behavior: 'smooth' });
        }
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
        <>
            <div className="row justify-content-center pt-30">
                {currentEvents.map((Eventdata) => (
                    <div className="col-lg-4 col-sm-12" key={Eventdata.id}>
                        <div className="services-content bg-color-white">
                            {!imagesLoaded[Eventdata.id] && <div className="skeleton-loader"></div>}
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
                            <div className="podcast-content">
                                <h3>
                                    {Eventdata.acf.external_url ? (
                                        <a
                                            href={Eventdata.acf.external_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            dangerouslySetInnerHTML={{
                                                __html: Eventdata.title.rendered,
                                            }}
                                        />
                                    ) : (
                                        <Link
                                            to={getReactRoute(Eventdata.link)}
                                            dangerouslySetInnerHTML={{
                                                __html: Eventdata.title.rendered,
                                            }}
                                        />
                                    )}
                                </h3>
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: `${Eventdata.excerpt.rendered
                                            .split(" ")
                                            .slice(0, 10)
                                            .join(" ")}...`,
                                    }}
                                ></p>
                                {Eventdata.acf.external_url ? (
                                    <a
                                        href={Eventdata.acf.external_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="read-more hightlight-green"
                                    >
                                        Read More
                                        <svg
                                            width="31"
                                            height="11"
                                            viewBox="0 0 31 11"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M30.3593 5.44386H0.639143C0.285617 5.44386 0 5.19504 0 4.88707C0 4.5791 0.285617 4.33029 0.639143 4.33029H28.8154L24.9366 0.951315C24.6869 0.733822 24.6869 0.380613 24.9366 0.16312C25.1862 -0.0543733 25.5917 -0.0543733 25.8414 0.16312L30.8127 4.49385C30.9964 4.65392 31.0504 4.89229 30.9505 5.10109C30.8506 5.30814 30.617 5.44386 30.3593 5.44386Z"
                                                fill="#7AB800"
                                            />
                                            <path
                                                d="M24.7145 10.8877C24.5313 10.8877 24.348 10.8249 24.2095 10.6972C23.9302 10.4437 23.9302 10.0322 24.2095 9.77877L29.7782 4.72662C30.0575 4.47321 30.5112 4.47321 30.7905 4.72662C31.0698 4.98004 31.0698 5.39159 30.7905 5.64501L25.2218 10.6972C25.081 10.8249 24.8978 10.8877 24.7145 10.8877Z"
                                                fill="#7AB800"
                                            />
                                        </svg>
                                    </a>
                                ) : (
                                    <Link
                                        to={getReactRoute(Eventdata.link)}
                                        className="read-more hightlight-green"
                                    >
                                        Read More
                                        <svg
                                            width="31"
                                            height="11"
                                            viewBox="0 0 31 11"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M30.3593 5.44386H0.639143C0.285617 5.44386 0 5.19504 0 4.88707C0 4.5791 0.285617 4.33029 0.639143 4.33029H28.8154L24.9366 0.951315C24.6869 0.733822 24.6869 0.380613 24.9366 0.16312C25.1862 -0.0543733 25.5917 -0.0543733 25.8414 0.16312L30.8127 4.49385C30.9964 4.65392 31.0504 4.89229 30.9505 5.10109C30.8506 5.30814 30.617 5.44386 30.3593 5.44386Z"
                                                fill="#7AB800"
                                            />
                                            <path
                                                d="M24.7145 10.8877C24.5313 10.8877 24.348 10.8249 24.2095 10.6972C23.9302 10.4437 23.9302 10.0322 24.2095 9.77877L29.7782 4.72662C30.0575 4.47321 30.5112 4.47321 30.7905 4.72662C31.0698 4.98004 31.0698 5.39159 30.7905 5.64501L25.2218 10.6972C25.081 10.8249 24.8978 10.8877 24.7145 10.8877Z"
                                                fill="#7AB800"
                                            />
                                        </svg>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="col-lg-12">
                <div className="pagination-area">
                    {/* Previous Button */}
                    <button
                        className="prev page-numbers"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <i className="ri-arrow-left-s-line"></i>
                    </button>

                    {/* Page Numbers */}
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            className={`page-numbers ${currentPage === index + 1 ? 'current' : ''}`}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}

                    {/* Next Button */}
                    <button
                        className="next page-numbers"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        <i className="ri-arrow-right-s-line"></i>
                    </button>
                </div>
            </div>
        </>
    );
};

export default All_Events;
