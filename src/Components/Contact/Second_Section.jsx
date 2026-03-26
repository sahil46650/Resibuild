import React, { useState, useEffect } from "react";

const Second_Section = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setimage] = useState("");

    useEffect(() => {
        // Fetch ACF fields from WordPress
        fetch("https://resi.build/backend/wp-json/wp/v2/pages/129")
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
                    setTitle(data?.acf?.section_section?.title || "");
                    setDescription(data?.acf?.section_section?.text || "");
                    setimage(data?.acf?.section_section?.image.url || "");
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
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="about-content wow animate__animated animate__fadeInUp delay-0-4s animated" style={{ visibility: "visible", animationName: "fadeInUp" }}>
                                <h2 className="text-wrapper custom-text-white">
                                    {title}
                                </h2>
                                <p
                                    className="custom-text-white"
                                    dangerouslySetInnerHTML={{ __html: description }}
                                ></p>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="about-img mr-15">
                                <div className="about-img-1 wow animate__animated animate__fadeInUp delay-0-2s animated" style={{ visibility: "visible", animationName: "fadeInUp" }}>
                                    <img src={image} alt="Images" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </section>
        </>
    );
};

export default Second_Section;
