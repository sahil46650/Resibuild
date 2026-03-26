import React, { useState, useEffect } from "react";
import Aboutbanner from "./About_banner";
import Aboutsection from "./About_section";
import Whychoose from "./Why_choose";
import CTA from "./CTA";
import Testimonails from "../Testimonails";
import Filter from "./Filter";
import { Link } from "react-router-dom";

const About = () => {
    const [title, setTitle] = useState("");
    const [buttontext, setButtontext] = useState("");
    const [buttonlink, setButtonlink] = useState("");
    const [points, setPoints] = useState([]);

    useEffect(() => {
        // Fetch ACF fields from WordPress
        fetch("https://resi.build/backend/wp-json/wp/v2/pages/54")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                // Check if ACF data exists
                if (data?.acf) {
                    setTitle(data?.acf?.event_section?.heading || "");
                    setButtontext(data?.acf?.event_section?.button_text || "");
                    setButtonlink(data?.acf?.event_section?.button_url || "");
                    setPoints(data?.acf?.event_section.core_values || []);
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
            <Aboutbanner />
            <Aboutsection />
            <Whychoose />
            <Filter />

            <section className="events-on-demand ptb-100 bg-F4F4F4 ">
                <div className="container">
                    <div className="row wow animate__animated animate__fadeInUp delay-0-2s">
                        <div className="col-md-10">
                            <h2
                                className="text-wrapper"
                                dangerouslySetInnerHTML={{ __html: title }}
                            ></h2>
                        </div>
                        <div className="col-md-2">
                            <Link
                                to={buttonlink}
                                className="default-btn custom-flex"
                                tabIndex="0"
                            >
                                {buttontext}
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
                    <div className="row justify-content-center pt-30 article_row_m">
                        {points.map((point, index) => (
                            <div
                                className="col-lg-6 col-sm-6 p-0 wow animate__animated animate__fadeInUp delay-0-2s article_items_m"
                                key={index}
                            >
                                <div className="single-services">
                                    {point.image && (
                                        <img
                                            src={point.image}
                                            alt="Service-Image"
                                        />
                                    )}
                                    <div className="services-content">
                                        <h3>
                                            <a href="#!">{point.title}</a>
                                        </h3>
                                        <p>{point.text}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <CTA />
            <Testimonails />
        </>
    );
};

export default About;
