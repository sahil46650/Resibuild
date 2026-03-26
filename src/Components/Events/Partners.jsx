import React, { useState, useEffect } from "react";

const Partners = () => {
    const [partners, setPartners] = useState([]);

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
                if (data?.acf?.our_partners) {
                    setPartners(data.acf.our_partners); // Assuming our_partners is an array
                } else {
                    console.warn("ACF 'our_partners' data not found in the response.");
                }
            })
            .catch((error) => {
                console.error("Error fetching ACF data:", error);
            });
    }, []);

    return (
        <section className="partners-section-logos ptb-130">
            <div className="container">
                <h2 className="text-wrapper custom-text-white">Our Partners</h2>
                <div className="served-industries">
                    <ul className="bussiness-modals">
                        {partners.length > 0 ? (
                            partners.map((partner, index) => (
                                <li key={index}>
                                    
                                        <img
                                            src={partner.add_image.url}
                                            alt={partner.add_image.alt || `Partner ${index + 1}`}
                                            title={partner.add_image.title || ""}
                                        />
                                   
                                </li>
                            ))
                        ) : (
                            <p>No partner logos available.</p>
                        )}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Partners;
