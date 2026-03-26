import React, { useState, useEffect } from "react";
import EventsBanner from "./Events_Banner";
import CTA from "./CTA";
import Testimonails from "../Testimonails";
import Partners from "./Partners";
import AllEvents from "./All_Events";


const Event = () => {
    const [Eventtitle, setEventtitle] = useState("");
        useEffect(() => {
    
            // Fetch ACF fields from WordPress
            fetch("https://resi.build/backend/wp-json/wp/v2/pages/121")
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    // Check if ACF data exists
                    if (data?.acf) {
    
                        // Title, description, and other fields
                        
                        setEventtitle(data?.acf?.events_section_title || "");
    
    
                    } else {
                        console.warn("ACF data not found in the response.");
                    }
                })
                .catch((error) => {
                    console.error("Error fetching ACF data:", error);
                });
    
        }, []);
    return (
        <>
            <EventsBanner />
            <section className="events-on-demand ptb-100 events-main-page">
                    <div className="container">
                        <div className="row wow animate__animated animate__fadeInUp delay-0-2s" id="all-events">
                            <div className="col-md-10">
                                <h2 className="text-wrapper" dangerouslySetInnerHTML={{ __html: Eventtitle }} ></h2>

                            </div>
                        </div>
                        <AllEvents />
                    </div>
                </section>
            <CTA/>
            <Partners/>
            <Testimonails/>
        </>
    );
};

export default Event;
