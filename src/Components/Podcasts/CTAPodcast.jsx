import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";


const CTAPodcast = () => {
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
                        title: event.acf.cta.cta.title || "",
                        buttontext: event.acf.cta.cta.button_text || "",
                        buttonlink: event.acf.cta.cta.button_url || "",
                        id: event.id,
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
        <>
            <div className="ready-to-talk-area ptb-130">
                <div className="container">
                    <div className="ready-to-talk-content wow animate__animated animate__fadeInUp delay-0-2s animated" style={{ visibility: "visible" }}>
                        <h2 dangerouslySetInnerHTML={{ __html: eventData.title }}></h2>
                        <Link to={eventData.buttonlink} className="default-btn custom-flex" tabIndex="0">
                            {eventData.buttontext}
                            {/* <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12H19" stroke="#006072" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                <path d="M12 5L19 12L12 19" stroke="#006072" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg> */}
                        </Link>
                    </div>
                </div>
            </div>

        </>
    );
};

export default CTAPodcast;
