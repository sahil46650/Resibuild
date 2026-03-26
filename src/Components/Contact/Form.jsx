import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

const Form = () => {
    const [title, setTitle] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone_number: "",
        msg_subject: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState("");

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
                    setTitle(data?.acf?.contact_section?.heading || "");
                } else {
                    console.warn("ACF data not found in the response.");
                }
            })
            .catch((error) => {
                console.error("Error fetching ACF data:", error);
            });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Replace with your EmailJS user ID, service ID, and template ID
        const serviceID = "service_0dt1dno";
        const templateID = "template_83nnksq";
        const userID = "QO3CrzddbW0Pbn-D5";

        emailjs
            .send(serviceID, templateID, formData, userID)
            .then((response) => {
                setSubmitMessage("Message sent successfully!");
                setFormData({
                    name: "",
                    email: "",
                    phone_number: "",
                    msg_subject: "",
                    message: "",
                });
                setIsSubmitting(false);
            })
            .catch((error) => {
                setSubmitMessage("Failed to send the message. Please try again.");
                console.error("Error:", error);
                setIsSubmitting(false);
            });
    };

    return (
        <section className="tabs-section ptb-100">
            <div className="container">
                <div className="custom-tabs-section bg-color-white ptb-30">
                    <h2 className="text-wrapper custom-text-white">{title}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-lg-6 col-md-6">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="col-lg-6 col-md-6">
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="col-lg-6 col-md-6">
                                <div className="form-group">
                                    <label>Phone</label>
                                    <input
                                        type="text"
                                        name="phone_number"
                                        value={formData.phone_number}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="col-lg-6 col-md-6">
                                <div className="form-group">
                                    <label>Subject</label>
                                    <input
                                        type="text"
                                        name="msg_subject"
                                        value={formData.msg_subject}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Your Message</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        rows="6"
                                        required
                                    ></textarea>
                                </div>
                            </div>

                            <div className="col-lg-12 col-md-12 text-center mt-4">
                                <button
                                    type="submit"
                                    className="default-btn"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                </button>
                                <p className="submit-message">{submitMessage}</p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Form;
