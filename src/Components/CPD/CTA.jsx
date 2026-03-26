import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CTA = () => {
    const [ctaheading, setCtaHeading] = useState("");
    const [ctabuttontext, setCtaButtonText] = useState("");
    const [ctabuttonlink, setCtaButtonLink] = useState("");

    useEffect(() => {
        // Fetch ACF fields from WordPress
        fetch("https://resi.build/backend/wp-json/wp/v2/pages/125")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                // Check if ACF data exists
                if (data?.acf) {
                    setCtaHeading(data?.acf?.cta?.cta.title || "Default Heading");
                    setCtaButtonText(data?.acf?.cta?.cta.button_text || "Default Button Text");
                    setCtaButtonLink(data?.acf?.cta?.cta.button_url || "#");
                    
                } else {
                    console.warn("ACF data not found in the response.");
                }
            })
            .catch((error) => {
                console.error("Error fetching ACF data:", error);
            });
    }, []);

    return (
        <div className="ready-to-talk-area ptb-130">
            <div className="container">
                <div className="ready-to-talk-content wow animate__animated animate__fadeInUp delay-0-2s">
                    <h2>{ctaheading}</h2>
                    <Link
                        to={ctabuttonlink}
                        rel="noopener noreferrer"
                        className="default-btn-bordered"
                    >
                        {ctabuttontext}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CTA;
