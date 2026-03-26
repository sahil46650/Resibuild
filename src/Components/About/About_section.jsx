import React, { useState, useEffect } from "react";

const About_section = () => {

    const [title, setTitle] = useState("");
    const [description, setdescription] = useState("");
    // const [year, setyear] = useState("");
    // const [cpdevents, setcpdevents] = useState("");
    // const [educated, seteducated] = useState("");
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

                    // Title, description, and other fields
                    setTitle(data?.acf?.about_section.heading || "");
                    setdescription(data?.acf?.about_section.description || "");
                    // setyear(data?.acf?.about_section.established_year || "");
                    // setcpdevents(data?.acf?.about_section.cpd_events || "");
                    // seteducated(data?.acf?.about_section.people_educated || "");
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
            <section className="custom-about-section bg-blue ptb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12  p-0">
                            <div className="home-about-us">
                                <div className="overlap align-text-center">
                                    <h2 className="text-wrapper custom-text-white" dangerouslySetInnerHTML={{ __html: title }}> 
                                    </h2>
                                    <p
                                        className="since-the-initial custom-text-white"
                                        dangerouslySetInnerHTML={{ __html: description }}
                                    ></p>
                                    <br />
{/* 
                                    <div className="facts-figure-list">
                                        <div className="group custom-text-white">
                                            <div className="overlap-group">
                                                <div className="div">{year}</div>
                                            </div>
                                            <p className="text-wrapper-3">Established</p>
                                        </div>
                                        <div className="group custom-text-white">
                                            <div className="overlap-group">
                                                <div className="div">{cpdevents}</div>
                                            </div>
                                            <p className="text-wrapper-3">
                                                CPD Events
                                            </p>
                                        </div>
                                        <div className="group custom-text-white">
                                            <div className="overlap-group">
                                                <div className="div">{educated}</div>
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
        </>
    );
};

export default About_section;
