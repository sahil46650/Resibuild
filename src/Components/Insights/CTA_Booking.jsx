import React, { useState, useEffect }  from "react";
import { Link } from "react-router-dom";

const CTA_Booking = () => {

    const [ctabookingimg, setctabookingimg] = useState("");
    const [ctabookingheading, setctabookingheading] = useState("");
    const [ctabookingtext, setctabookingtext] = useState("");
    const [ctabooking_btn_text, setctabooking_btn_text] = useState("");
    const [ctabooking_btn_link, setctabooking_btn_link] = useState("");


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
                // Check if ACF data exists
                if (data?.acf) {

                    // Title, description, and other fields
                    setctabookingimg(data?.acf?.cta_booking.cta_booking.image.url || "");
                    setctabookingheading(data?.acf?.cta_booking.cta_booking.heading || "");
                    setctabookingtext(data?.acf?.cta_booking.cta_booking.description || "");
                    setctabooking_btn_text(data?.acf?.cta_booking.cta_booking.button_text || "");
                    setctabooking_btn_link(data?.acf?.cta_booking.cta_booking.button_url || "");
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
            <section className="cta-book-section ptb-30">
                <div className="container">
                    <div className="row align-items-center wow animate__animated animate__fadeInUp delay-0-2s animated">
                        <div className="col-xl-6 col-lg-12 col-md-12">
                            <img src={ctabookingimg} alt="ctabookingimg" />
                        </div>
                        <div className="col-xl-6 col-lg-12 col-md-12">
                            <div className="section-title custom-align-rtl" style={{ visibility: "visible", animationName: "fadeInUp" }}>
                                <h2>{ctabookingheading}</h2>
                                <p className="">
                                    {ctabookingtext}
                                </p>
                                <Link to={ctabooking_btn_link} className="default-btn custom-flex" tabIndex="0">
                                    {ctabooking_btn_text}
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
                    </div>
                </div>
            </section>
        </>
    );
};

export default CTA_Booking;
