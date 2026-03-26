import React, { useState, useEffect } from "react";

import Banner from "./Banner.jsx";
import 'remixicon/fonts/remixicon.css';
// import PartnerCarousel from "./PartnerCarousel.jsx";
import Insights from "./Insights";
import InsightSlide from "./InsightSlide";
import Testimonails from "../Testimonails.jsx";
import CTA from "./CTA.jsx";
import Eventssection from "./Events_section.jsx";
import { useNavigate } from "react-router-dom";



const Home = () => {
    const [logoUrl, setLogoUrl] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    // const [establishedYear, setEstablishedYear] = useState("");
    // const [cpdEvents, setCpdEvents] = useState("");
    // const [peopleEducated, setPeopleEducated] = useState("");
    // const [speaker, setspeaker] = useState("");
    const [events, setevents] = useState("");
    const [insightheading, setinsightheading] = useState("");
    const [insighttext, setinsighttext] = useState("");
    const [insightLinktext, setinsightLinktext] = useState("");
    const [insightLink, setinsightLink] = useState("");
    const [ctabookingimg, setctabookingimg] = useState("");
    const [ctabookingheading, setctabookingheading] = useState("");
    const [ctabookingtext, setctabookingtext] = useState("");
    const [ctabooking_btn_text, setctabooking_btn_text] = useState("");
    const [ctabooking_btn_link, setctabooking_btn_link] = useState("");
    const [podcastheading, setpodcastheading] = useState([]);

    const [eventCategories, seteventCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const navigate = useNavigate();


    useEffect(() => {

        // Fetch categories (taxonomy events-categories)
        fetch("https://resi.build/backend/wp-json/wp/v2/event-categories")
            .then((response) => response.json())
            .then((data) => {
                seteventCategories(data);
            })
            .catch((error) => console.error("Error fetching categories:", error));
    }, []);

    useEffect(() => {

        // Fetch ACF fields from WordPress
        fetch("https://resi.build/backend/wp-json/wp/v2/pages/41")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                // Check if ACF data exists
                if (data?.acf) {
                    // Set the state for all fields
                    const acfData = data.acf.second_section;

                    // Logo
                    if (acfData?.left_image?.url) {
                        setLogoUrl(acfData.left_image.url);
                    }

                    // Title, description, and other fields
                    setTitle(data?.acf?.second_section.title || "");
                    setDescription(data?.acf?.second_section.description || "");
                    // setEstablishedYear(data?.acf?.second_section.established_year || "");
                    // setCpdEvents(data?.acf?.second_section.cpd_events || "");
                    // setPeopleEducated(data?.acf?.second_section.people_educated || "");
                    // setspeaker(data?.acf?.speaker_section.title || "");
                    setevents(data?.acf?.event_section.heading || "");
                    setinsightheading(data?.acf?.insights_section.heading || "");
                    setinsighttext(data?.acf?.insights_section.description || "");
                    setinsightLinktext(data?.acf?.insights_section.link_title || "");
                    setinsightLink(data?.acf?.insights_section.url || "");
                    setctabookingimg(data?.acf?.cta_booking.image.url || "");
                    setctabookingheading(data?.acf?.cta_booking.heading || "");
                    setctabookingtext(data?.acf?.cta_booking.description || "");
                    setctabooking_btn_text(data?.acf?.cta_booking.button_text || "");
                    setctabooking_btn_link(data?.acf?.cta_booking.button_url || "");
                    setpodcastheading(data.acf.podcast_section.heading || "");
                } else {
                    console.warn("ACF data not found in the response.");
                }
            })
            .catch((error) => {
                console.error("Error fetching ACF data:", error);
            });

    }, []);

    const handleCategoryChange = (e) => {
        const categoryName = e.target.value;
        setSelectedCategory(categoryName);

        if (categoryName) {
            // Navigate to search page with category as query parameter
            navigate(`/search?q=${categoryName}`);
        }
    };


    return (
        <>

            <Banner />
            {/* <!-- End Banner Area --> */}
            <section className="custom-about-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 p-0">
                            <img src={logoUrl} alt="img" className="w-100" />
                        </div>
                        <div className="col-lg-6 bg-green p-0">
                            <div className="home-about-us">
                                <div className="overlap">
                                    <h2
                                        className="text-wrapper custom-text-white"
                                        dangerouslySetInnerHTML={{ __html: title }}
                                    ></h2>
                                    <p
                                        className="since-the-initial custom-text-white"
                                        dangerouslySetInnerHTML={{ __html: description }}
                                    ></p>
                                    {/* <div className="facts-figure-list">
                                        <div className="group custom-text-white">
                                            <div className="overlap-group">
                                                <div
                                                    className="div"
                                                    dangerouslySetInnerHTML={{ __html: establishedYear }}
                                                ></div>
                                            </div>
                                            <p className="text-wrapper-3">Established</p>
                                        </div>
                                        <div className="group custom-text-white">
                                            <div className="overlap-group">
                                                <div
                                                    className="div"
                                                    dangerouslySetInnerHTML={{ __html: cpdEvents }}
                                                ></div>
                                            </div>
                                            <p className="text-wrapper-3">CPD Events</p>
                                        </div>
                                        <div className="group custom-text-white">
                                            <div className="overlap-group">
                                                <div
                                                    className="div"
                                                    dangerouslySetInnerHTML={{ __html: peopleEducated }}
                                                ></div>
                                                <div className="text-wrapper-2">+</div>
                                            </div>
                                            <p className="text-wrapper-3">People Educated</p>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- End Futures Area --> */}
            {/* <!-- Start About Area --> */}
            {/* <!-- End About Area --> */}
            {/* <!-- Start Speaker Area --> */}
            {/* <div className="speaker-section custom-box-shadow">
                <div className="container ptb-30">
                    <div className="row align-items-center">
                        <div className="col-lg-5 col-sm-12 p-0 wow animate__animated animate__fadeInUp delay-0-2s">
                            <h3
                                className="custom-subtitle"
                                dangerouslySetInnerHTML={{ __html: speaker }}
                            ></h3>
                        </div>
                        <div className="col-lg-7 col-sm-12 p-0 wow animate__animated animate__fadeInUp delay-0-2s">
                            <div className="partner-area">
                                <div className="container">
                                    <PartnerCarousel />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            {/* <!-- End Speaker Area --> */}
            <section className="events-on-demand ptb-100 bg-F4F4F4">
                <div className="container">
                    <div className="row wow animate__animated animate__fadeInUp delay-0-2s">
                        <div className="col-md-10">
                            <h2 className="text-wrapper" dangerouslySetInnerHTML={{ __html: events }} />

                        </div>
                        <div className="col-md-2">
                            <select
                                className="form-select"
                                aria-label="Select category"
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                            >
                                <option value="">Search By Topic</option>
                                {eventCategories.map((category) => (
                                    <option key={category.id} value={category.name}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <Eventssection />


                </div>
            </section>
            {/* <!-- Start Ready to talk Area --> */}
            <CTA />
            {/* <!-- End Ready to talk Area --> */}
            {/* <!-- Start Customer Area --> */}
            <div className="customer-area ptb-100 bg-color-022641 custom-insights-section">
                <div className="container">
                    <div className="row wow animate__animated animate__fadeInUp delay-0-2s">
                        <div className="col-md-10">
                            <h2
                                className="text-wrapper custom-text-white"
                                dangerouslySetInnerHTML={{ __html: podcastheading }}
                            ></h2>
                        </div>
                        <div className="col-md-2"></div>
                    </div>
                    <Insights />
                </div>
            </div>


            {/* <!-- End Customer Area --> */}
            {/* <!-- Insight & News Section --> */}
            <div className="insight-section ptb-100 bg-green">
                <div className="container">
                    <div className="row align-items-center wow animate__animated animate__fadeInUp delay-0-2s animated" style={{ visibility: "visible", animationName: "fadeInUp" }}>
                        <div className="col-lg-5 col-md-12">
                            <h2
                                className="text-wrapper"
                                dangerouslySetInnerHTML={{ __html: insightheading }}
                            ></h2>
                            <p dangerouslySetInnerHTML={{ __html: insighttext }}></p>
                            <a href={insightLink} className="read-more">
                                {insightLinktext}
                                <i className="ri-arrow-right-line"></i>
                            </a>
                        </div>
                        <InsightSlide />
                    </div>
                </div>
            </div>

            {/* <!-- Insight & News Section --> */}
            <section className="cta-book-section ptb-30">
                <div className="container">
                    <div className="row align-items-center wow animate__animated animate__fadeInUp delay-0-2s animated">
                        <div className="col-xl-6 col-lg-12 col-md-12">
                            <img src={ctabookingimg} alt="ctabookingimg" />
                        </div>
                        <div className="col-xl-6 col-lg-12 col-md-12">
                            <div className="section-title custom-align-rtl" style={{ visibility: "visible", animationName: "fadeInUp" }}>
                                <h2 dangerouslySetInnerHTML={{ __html: ctabookingheading }}></h2>
                                <p dangerouslySetInnerHTML={{ __html: ctabookingtext }}></p>
                                <a href={ctabooking_btn_link} className="default-btn custom-flex" tabIndex="0">
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
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Testimonails />
        </>
    )
};

export default Home;
