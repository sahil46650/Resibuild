import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Testimonails from "../Testimonails";
import "./Events_detailed.css";

const Events_detailed = () => {
    const { eventId } = useParams(); // Get slug from the URL
    const [eventData, setEventData] = useState({
        bannertitle: "",
        bannerdescription: "",
        abouttitle: "",
        aboutdesc: "",
        aboutimg: "",
        sidebarevent: "",
        side_cat: "",
        side_location: "",
        side_date: "",
        sidebar_days: [],
        content: "",
        featuredImage: "",
    });

    useEffect(() => {
        // Fetch the event data based on the slug
        fetch(`https://resi.build/backend/wp-json/wp/v2/events?slug=${eventId}&_embed`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                if (data && data.length > 0) {
                    const event = data[0]; // The API returns an array
                    if (event.acf) {
                        // Update state with event details
                        setEventData({
                            bannertitle: event.acf.banner_section?.heading || "",
                            bannerdescription: event.acf.banner_section?.sub_heading || "",
                            abouttitle: event.acf.about_section?.about_title || "",
                            aboutdesc: event.acf.about_section?.description || "",
                            aboutimg: event.acf.about_section?.image?.url || "",
                            sidebarevent: event.acf.sidebar?.event || "",
                            side_cat: event.acf.sidebar?.category || "",
                            side_location: event.acf.sidebar?.location || "",
                            side_date: event.acf.sidebar?.date || "",
                            sidebar_days: event.acf.sidebar?.days || [],
                            content: event.content || "",
                            featuredImage: event._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "",
                        });
                    } else {
                        console.warn("Event ACF data not found.");
                    }
                } else {
                    console.warn("Event not found with the given slug.");
                }
            })
            .catch((error) => {
                console.error("Error fetching event data:", error);
            });
    }, [eventId]); // Re-run when the slug changes

    useEffect(() => {
        if (!eventData.content?.rendered) return;

        const initHubspotForm = () => {
            const formMatch = eventData.content.rendered.match(
                /data-form-id="([^"]+)"/
            );

            const portalMatch = eventData.content.rendered.match(
                /data-portal-id="([^"]+)"/
            );

            const regionMatch = eventData.content.rendered.match(
                /data-region="([^"]+)"/
            );

            if (!formMatch || !portalMatch) return;

            const formId = formMatch[1];
            const portalId = portalMatch[1];
            const region = regionMatch ? regionMatch[1] : "eu1";

            const container = document.getElementById("hubspot-event-form");

            if (!container) return;

            container.innerHTML = "";

            if (window.hbspt) {
                window.hbspt.forms.create({
                    region,
                    portalId,
                    formId,
                    target: "#hubspot-event-form",
                });
            }
        };

        if (!window.hbspt) {
            const script = document.createElement("script");
            script.src = "https://js-eu1.hsforms.net/forms/embed/v2.js";
            script.async = true;
            script.onload = initHubspotForm;

            document.body.appendChild(script);

            return () => {
                document.body.removeChild(script);
            };
        } else {
            initHubspotForm();
        }
    }, [eventData.content]);

    return (
        <>
            {/* Banner Section */}
            {(eventData.bannertitle || eventData.bannerdescription) && (
                <div className="page-banner-area bg-1 ptb-130 Insights-page-banner" style={{backgroundImage: `url(${eventData.featuredImage})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat",
    }}>
                    <div className="container">
                        <div className="page-banner-content">
                            {eventData.bannerdescription && (
                                <span className="custom-subtitle custom-text-white">
                                    {eventData.bannerdescription}
                                </span>
                            )}
                            {eventData.bannertitle && (
                                <h1
                                    className="wow animate__animated animate__fadeInUp delay-0-2s animated custom-text-white"
                                    style={{ visibility: "visible", animationName: "fadeInUp" }}
                                    dangerouslySetInnerHTML={{ __html: eventData.bannertitle }}
                                ></h1>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="case-study-details-area ptb-100">
                <div className="container">
                    {/* About Section */}
                    {(eventData.abouttitle || eventData.aboutdesc || eventData.aboutimg) && (
                        <div className="case-overview">
                            {eventData.aboutimg && <img src={eventData.aboutimg} alt="Image-abt" />}
                            {eventData.abouttitle && <h2 className="insight-detail-heading">{eventData.abouttitle}</h2>}
                            {eventData.aboutdesc && <p dangerouslySetInnerHTML={{ __html: eventData.aboutdesc }}/>}
                        </div>
                    )}
                    {/* Full Width HubSpot Form */}
                    <div className="event-registration-section mb-5">
                        <div id="hubspot-event-form" style={{ marginBottom: "40px" }}></div>
                    </div>

                    <div className="row">
                        {/* Sidebar */}
                        {(eventData.sidebarevent ||
                            eventData.side_cat ||
                            eventData.side_location ||
                            eventData.side_date ||
                            eventData.sidebar_days.length > 0) && (
                            <div className="col-lg-4">
                                <div className="widget-sidebar project-info-sticky">
                                    <div className="sidebar-widget project-info">
                                        <ul>
                                            {eventData.sidebarevent && (
                                                <li>
                                                    <h4>Event:</h4>
                                                    <span>{eventData.sidebarevent}</span>
                                                </li>
                                            )}
                                            {eventData.side_cat && (
                                                <li>
                                                    <h4>Category:</h4>
                                                    <span>{eventData.side_cat}</span>
                                                </li>
                                            )}
                                            {eventData.sidebar_days.map((day, index) => (
                                                <li key={index}>
                                                    <h4>{day.day}</h4>
                                                    <span>{day.event}</span>
                                                </li>
                                            ))}
                                            {eventData.side_location && (
                                                <li>
                                                    <h4>Location:</h4>
                                                    <span>{eventData.side_location}</span>
                                                </li>
                                            )}
                                            {eventData.side_date && (
                                                <li>
                                                    <h4>Date:</h4>
                                                    <span>{eventData.side_date}</span>
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Event Content */}
                        {/* {eventData.content && (
                            <div className="col-lg-8">
                                <div className="case-study-details">
                                    <div
                                        className="event-content"
                                        dangerouslySetInnerHTML={{ __html: eventData.content.rendered }}
                                    ></div>
                                </div>
                            </div>
                        )} */}

                        {eventData.content && (
                            <div className="col-lg-8">
                                <div className="case-study-details">

                                    {/* HubSpot Form */}
                                    <div
                                        id="hubspot-event-form"
                                        style={{ marginBottom: "40px" }}
                                    ></div>

                                    {/* Event Content */}
                                    <div
                                        className="event-content"
                                        dangerouslySetInnerHTML={{
                                            __html: eventData.content.rendered
                                                .replace(
                                                    /<div className="hs-form-html"[\s\S]*?<\/div>/g,
                                                    ""
                                                )
                                                .replace(
                                                    /<div className="wp-block-leadin-hubspot-form-block">[\s\S]*?<\/div>/g,
                                                    ""
                                                ),
                                        }}
                                    ></div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Testimonails/>
        </>
    );
};

export default Events_detailed;
