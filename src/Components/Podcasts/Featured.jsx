import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Featured = () => {
    const { eventId } = useParams(); // Get slug from the URL
    const [eventData, setEventData] = useState({});
    const [loading, setLoading] = useState(true); // For loading state
    const [error, setError] = useState(null); // For error handling

    useEffect(() => {
        // Fetch current event data
        setLoading(true); // Start loading
        fetch(`https://resi.build/backend/wp-json/wp/v2/podcasts?slug=${eventId}`)
            .then((response) => response.json())
            .then(async (data) => {
                if (data && data.length > 0) {
                    const event = data[0];
                    setEventData({
                        title: event.acf.featured_section.title || "",
                        details: event.acf.featured_section.details || [], // Multiple details
                    });
                } else {
                    setError("Podcast not found.");
                }
            })
            .catch((error) => {
                setError("Error fetching event data.");
                console.error("Error fetching event data:", error);
            })
            .finally(() => {
                setLoading(false); // Stop loading after data is fetched
            });
    }, [eventId]);

    if (loading) {
        return <div>Loading...</div>; // Show loading state
    }

    if (error) {
        return <div>{error}</div>; // Show error if any
    }

    return (
        <div className="services-post-area pb-70">
            <div className="container">
                <div className="row">
                    <h2 className="text-wrapper"
                        dangerouslySetInnerHTML={{  __html: eventData.title }}>
                    </h2>
                </div>
                <div className="row justify-content-center pt-30">
                    {eventData.details.map((detail, index) => (
                        <div
                            className="col-lg-4 col-sm-6 wow animate__animated animate__fadeInUp"
                            style={{ visibility: "visible", animationName: "fadeInUp" }}
                            key={index}
                        >
                            <div className="single-services image-extra-class">
                                <img src={detail.image} alt={detail.name} />
                                <div className="services-content">
                                    <h3>
                                        <a href={detail.linkedin_url?.url || "#"} target="_blank" rel="noopener noreferrer">
                                            {detail.name}
                                        </a>
                                    </h3>
                                    {/* Render additional HTML content */}
                                    {detail.additionalHtmlContent && (
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: detail.additionalHtmlContent,
                                            }}
                                        ></div>
                                    )}
                                    <a href={detail.linkedin_url?.url || "#"} target="_blank" rel="noreferrer" className="default-btn custom-flex" tabIndex="0">
                                        Find Out More
                                        <svg width="25" height="10" viewBox="0 0 25 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M24.4833 4.99996H0.515438C0.230336 4.99996 0 4.77881 0 4.50507C0 4.23134 0.230336 4.01018 0.515438 4.01018H23.2382L20.1101 1.00682C19.9088 0.813504 19.9088 0.499559 20.1101 0.306242C20.3115 0.112926 20.6385 0.112926 20.8398 0.306242L24.8489 4.15556C24.9971 4.29784 25.0406 4.50971 24.9601 4.6953C24.8796 4.87933 24.6911 4.99996 24.4833 4.99996Z"
                                                fill="white"
                                            ></path>
                                            <path
                                                d="M19.9317 9.83864C19.7839 9.83864 19.6361 9.78278 19.5244 9.66926C19.2992 9.44401 19.2992 9.07821 19.5244 8.85296L24.0153 4.36242C24.2406 4.13717 24.6064 4.13717 24.8317 4.36242C25.0569 4.58767 25.0569 4.95347 24.8317 5.17872L20.3408 9.66926C20.2272 9.78278 20.0795 9.83864 19.9317 9.83864Z"
                                                fill="white"
                                            ></path>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Featured;
