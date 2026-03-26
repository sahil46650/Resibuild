import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import banner_bg from '../../assets/images/banner-bg.jpg'


const Cpd_banner = () => {
    const [title, setTitle] = useState("");
    const [description, setdescription] = useState("");
    const [buttontext, setbuttontext] = useState("");
    const [buttonlink, setbuttonlink] = useState("");
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


                    // Title, description, and other fields
                    setTitle(data?.acf?.banner_section.heading || "");
                    setdescription(data?.acf?.banner_section.description || "");
                    setbuttontext(data?.acf?.banner_section.button_text || "");
                    setbuttonlink(data?.acf?.banner_section.button_link.url || "");
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
            <div className="banner-area other-pages">
                <video
                    autoPlay
                    muted
                    loop

                    id="background-video"
                    poster={banner_bg}
                >
                    <source src="https://baltejb8.sg-host.com/wp-content/uploads/2025/01/CPD-Page.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="page-banner-area bg-1 ptb-130 about-page-banner">
                    <div className="container">
                        <div className="page-banner-content">
                            <h1 className="wow animate__animated animate__fadeInUp delay-0-2s animated custom-text-white" style={{ visibility: "visible", animationName: "fadeInUp" }}>{title}</h1>
                            <p className="custom-text-white w-50">{description}

                            </p>
                            <Link to={buttonlink} className="default-btn custom-flex" tabindex="0">
                                {buttontext}
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M5 12H19"
                                        stroke="#006072"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M12 5L19 12L12 19"
                                        stroke="#006072"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cpd_banner;
