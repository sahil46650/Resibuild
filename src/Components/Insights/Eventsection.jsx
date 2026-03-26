import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Eventsection = () => {
    const [eventheading, setHeading] = useState("");
    const [eventbtn_text, setBtnText] = useState("");
    const [eventbtn_link, setBtnLink] = useState("");
    const [mediaUrls, setMediaUrls] = useState({});
    const [Eventdata, setEventsData] = useState([]);

    const getReactRoute = (wordpressUrl) => {
        // Extract slug from WordPress URL and map it to React route
        const url = new URL(wordpressUrl);
        return url.pathname.replace("/backend/", "/");
    };

    useEffect(() => {
        // Fetch ACF fields from WordPress
        fetch("https://resi.build/backend/wp-json/wp/v2/pages/127")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                if (data?.acf) {
                    setHeading(data.acf.event_section.event_section.heading || "");
                    setBtnText(data.acf.event_section.event_section.button_text || "");
                    setBtnLink(data.acf.event_section.event_section.button_url || "");
                } else {
                    console.warn("ACF data not found in the response.");
                }
            })
            .catch((error) => {
                console.error("Error fetching ACF data:", error);
            });

        // Fetch Events
        fetch("https://resi.build/backend/wp-json/wp/v2/events")
            .then((response) => response.json())
            .then((data) => {
                setEventsData(data);
                return data;
            })
            .then(async (events) => {
                // Fetch media URLs for all events
                const mediaPromises = events.map((event) =>
                    fetch(`https://resi.build/backend/wp-json/wp/v2/media/${event.featured_media}`)
                        .then((res) => res.json())
                        .then((media) => ({ [event.featured_media]: media.source_url }))
                        .catch((error) => {
                            console.error("Error fetching media:", error);
                            return {};
                        })
                );
                const mediaData = await Promise.all(mediaPromises);
                const mergedMediaUrls = Object.assign({}, ...mediaData);
                setMediaUrls(mergedMediaUrls);
            })
            .catch((error) => console.error("Error fetching Events:", error));
    }, []);



    return (
        <section className="events-on-demand ptb-100 events-main-page">
            <div className="container">
                <div
                    className="row wow animate__animated animate__fadeInUp delay-0-2s animated"
                    style={{ visibility: "visible", animationName: "fadeInUp" }}
                >
                    <div className="col-md-10">
                        <h2
                            className="text-wrapper"
                            dangerouslySetInnerHTML={{ __html: eventheading }}
                        ></h2>
                        <br />
                    </div>
                    <div className="col-md-2">
                        <Link to={eventbtn_link} className="default-btn custom-flex" tabIndex="0">
                            {eventbtn_text}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M5 12H19"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></path>
                                <path
                                    d="M12 5L19 12L12 19"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></path>
                            </svg>
                        </Link>
                    </div>
                </div>
                <div className="row">
                    {Eventdata.slice(0, 3).map((event) => (
                        <div className="col-lg-4" key={event.id}>
                            <div className="services-content bg-color-white">
                                {mediaUrls[event.featured_media] && (
                                    <img
                                        src={mediaUrls[event.featured_media]}
                                        alt={event.title.rendered || "Event Image"}
                                    />
                                )}
                                <div className="podcast-content">
                                    <h3>
                                        {event.acf?.external_url ? (
                                            <a
                                                href={event.acf.external_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                dangerouslySetInnerHTML={{
                                                    __html: event.title.rendered,
                                                }}
                                            ></a>
                                        ) : (
                                            <Link
                                                to={getReactRoute(event.link)}
                                                dangerouslySetInnerHTML={{
                                                    __html: event.title.rendered,
                                                }}
                                            ></Link>
                                        )}
                                    </h3>
                                    <p
                                        className="text-wrap2"
                                        dangerouslySetInnerHTML={{
                                            __html: event.excerpt.rendered,
                                        }}
                                    ></p>
                                    {event.acf?.external_url ? (
                                        <a
                                            href={event.acf.external_url}
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
                                                ></path>
                                                <path
                                                    d="M24.7145 10.8877C24.5313 10.8877 24.348 10.8249 24.2095 10.6972C23.9302 10.4437 23.9302 10.0322 24.2095 9.77877L29.7782 4.72662C30.0575 4.47321 30.5112 4.47321 30.7905 4.72662C31.0698 4.98004 31.0698 5.39159 30.7905 5.64501L25.2218 10.6972C25.081 10.8249 24.8978 10.8877 24.7145 10.8877Z"
                                                    fill="#7AB800"
                                                ></path>
                                            </svg>
                                        </a>
                                    ) : (
                                        <Link
                                            to={getReactRoute(event.link)}
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
                                                ></path>
                                                <path
                                                    d="M24.7145 10.8877C24.5313 10.8877 24.348 10.8249 24.2095 10.6972C23.9302 10.4437 23.9302 10.0322 24.2095 9.77877L29.7782 4.72662C30.0575 4.47321 30.5112 4.47321 30.7905 4.72662C31.0698 4.98004 31.0698 5.39159 30.7905 5.64501L25.2218 10.6972C25.081 10.8249 24.8978 10.8877 24.7145 10.8877Z"
                                                    fill="#7AB800"
                                                ></path>
                                            </svg>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

    );
};

export default Eventsection;