import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const LastSection = () => {
    const [designCpdSection, setDesignCpdSection] = useState({});

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
                if (data?.acf) {
                    // Update state with fetched data
                    setDesignCpdSection(data.acf.design_fire_section || {});
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

            {/* Design CPD Section */}
            <div className="about-section-pointers ptb-130 cstm-cpd-class">
                <div className="container">
                    <h2 className="text-wrapper">{designCpdSection.heading}</h2>
                    <p>{designCpdSection.text}</p>
                    <br />

                    {designCpdSection.about_cpd?.map((item, index) => (
                        <div className="row align-items-center pb-70" key={index} >
                            {index % 2 === 0 ? (
                                <>
                                    <div className="col-lg-6">
                                        <div className="about-content wow animate__fadeInUp">
                                            <h2 className="text-wrapper cstm"
                                               
                                                    dangerouslySetInnerHTML={{
                                                        __html: item.about_heading,
                                                    }} />
                                               
                                            <p dangerouslySetInnerHTML={{ __html: item.text }} />
                                            <div className="row">
                                                <div className="col-lg-12 custom-flex-list justify-content-start gap10">
                                                    {item.left_button_text && item.left_button_link?.url && (
                                                        <Link
                                                            to={item.left_button_link.url}
                                                            className="default-btn custom-flex"
                                                            tabIndex="0"
                                                        >
                                                            {item.left_button_text}
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
                                                                />
                                                                <path
                                                                    d="M12 5L19 12L12 19"
                                                                    stroke="white"
                                                                    strokeWidth="2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                            </svg>
                                                        </Link>
                                                    )}
                                                    {item.right_button_text &&
                                                        item.right_button_link?.url && (
                                                            <Link
                                                                to={item.right_button_link.url}
                                                                className="default-btn custom-flex"
                                                                tabIndex="0"
                                                            >
                                                                {item.right_button_text}
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
                                                                    />
                                                                    <path
                                                                        d="M12 5L19 12L12 19"
                                                                        stroke="white"
                                                                        strokeWidth="2"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                    />
                                                                </svg>
                                                            </Link>
                                                        )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="about-img mr-15">
                                            <img
                                                src={item.image}
                                                alt="Images"
                                            />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="col-lg-6">
                                        <div className="about-img mr-15">
                                            <img
                                                src={item.image}
                                                alt="Images"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="about-content wow animate__fadeInUp">
                                            <h2 className="text-wrapper">
                                                <span
                                                    dangerouslySetInnerHTML={{
                                                        __html: item.about_heading,
                                                    }}
                                                />
                                            </h2>
                                            <p dangerouslySetInnerHTML={{ __html: item.text }} />
                                            <div className="row">
                                                <div className="col-lg-12 custom-flex-list justify-content-start gap10">
                                                    {item.left_button_text && item.left_button_link?.url && (
                                                        <Link
                                                            to={item.left_button_link.url}
                                                            className="default-btn custom-flex"
                                                            tabIndex="0"
                                                        >
                                                            {item.left_button_text}
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
                                                                />
                                                                <path
                                                                    d="M12 5L19 12L12 19"
                                                                    stroke="white"
                                                                    strokeWidth="2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                            </svg>
                                                        </Link>
                                                    )}
                                                    {item.right_button_text &&
                                                        item.right_button_link?.url && (
                                                            <Link
                                                                to={item.right_button_link.url}
                                                                className="default-btn custom-flex"
                                                                tabIndex="0"
                                                            >
                                                                {item.right_button_text}
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
                                                                    />
                                                                    <path
                                                                        d="M12 5L19 12L12 19"
                                                                        stroke="white"
                                                                        strokeWidth="2"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                    />
                                                                </svg>
                                                            </Link>
                                                        )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default LastSection;
