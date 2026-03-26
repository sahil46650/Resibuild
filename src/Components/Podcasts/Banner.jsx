import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import banner_bg from '../../assets/images/banner-bg.jpg'


const About_banner = () => {
    const [title, setTitle] = useState("");
    const [description, setdescription] = useState("");
    const [buttontext, setbuttontext] = useState("");
    const [buttonlink, setbuttonlink] = useState("");
    useEffect(() => {

        // Fetch ACF fields from WordPress
        fetch("https://resi.build/backend/wp-json/wp/v2/pages/123")
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
                    setTitle(data?.acf?.banner_content.banner_content.heading || "");
                    setdescription(data?.acf?.banner_content.banner_content.description || "");
                    setbuttontext(data?.acf?.banner_content.banner_content.button_text || "");
                    setbuttonlink(data?.acf?.banner_content.banner_content.button_link || "");
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
                    <source src="https://baltejb8.sg-host.com/wp-content/uploads/2025/01/Podcasts-1.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="page-banner-area bg-1 ptb-130 about-page-banner">
                    <div className="container">
                        <div className="page-banner-content">
                            {/* Title with dangerouslySetInnerHTML */}
                            <h1
                                className="wow animate__animated animate__fadeInUp delay-0-2s animated custom-text-white"
                                style={{ visibility: "visible", animationName: "fadeInUp" }}
                                dangerouslySetInnerHTML={{ __html: title }}
                            ></h1>

                            {/* Description with dangerouslySetInnerHTML */}
                            <p
                                className="custom-text-white w-50"
                                dangerouslySetInnerHTML={{ __html: description }}
                            ></p>

                            {/* Button */}
                            <Link href={buttonlink} className="default-btn custom-flex" tabIndex="0">
                                <span dangerouslySetInnerHTML={{ __html: buttontext }}></span>
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

export default About_banner;
