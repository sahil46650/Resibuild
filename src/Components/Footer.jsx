import React, { useState, useEffect } from "react";
import logo_white from '../assets/images/Home/Logo-white.png'
import mail from "../assets/images/icon/icon-9.svg"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser"; // Import EmailJS


const iconMapping = {
    "dashicons-youtube": "ri-youtube-fill",
    "dashicons-facebook-alt": "ri-facebook-circle-fill", // Correct mapping for Facebook
    "dashicons-spotify": "ri-spotify-fill",
    "dashicons-linkedin": "ri-linkedin-fill"
};

const Footer = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [logoUrl, setLogoUrl] = useState("");
    const [aboutText, setAboutText] = useState("");
    const [email, setemail] = useState("");
    const [socialIcons, setSocialIcons] = useState([]);
    const [formEmail, setFormEmail] = useState("");
    const [formSuccess, setFormSuccess] = useState("");

    // Fetch menu data and ACF logo data from the WordPress API
    useEffect(() => {
        // Fetch menu data
        fetch("https://resi.build/backend/wp-json/menus/v1/menus/4")
            .then((response) => response.json())
            .then((data) => {
                // Assuming the API response contains an 'items' array
                setMenuItems(data.items);
            })
            .catch((error) => console.error("Error fetching menu data:", error));
        // Fetch ACF fields (specifically the logo field) from WordPress options
        fetch("https://resi.build/backend/wp-json/wp/v2/options")
            .then((response) => response.json())
            .then((data) => {
                // Assuming 'header_logo' is the ACF field name for the logo
                const logo = data.footer_1?.footer_logo;
                const footerAboutText = data.footer_1?.about_text;
                const Emailtext = data.footer_3?.email;
                const footerData = data.footer_4;
                if (logo && logo.url) {
                    setLogoUrl(logo.url); // Set the logo URL
                }
                if (footerAboutText) {
                    setAboutText(footerAboutText); // Set the about text
                }
                if (Emailtext) {
                    setemail(Emailtext); // Set the about text
                }
                if (footerData.social_icons) setSocialIcons(footerData.social_icons);
            })
            .catch((error) => console.error("Error fetching ACF data:", error));

    }, []);

   

    useEffect(() => {
        // Add scroll-to-top functionality when the component is mounted
        const goTopButton = document.querySelector('.go-top');

        // Check if the button exists
        if (goTopButton) {
            // Handle scroll events
            const handleScroll = () => {
                const scrolled = window.scrollY;
                if (scrolled > 300) {
                    goTopButton.classList.add('active');
                } else {
                    goTopButton.classList.remove('active');
                }
            };

            // Smooth scroll to the top
            const handleGoTopClick = () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            };

            // Add event listeners
            goTopButton.addEventListener('click', handleGoTopClick);
            window.addEventListener('scroll', handleScroll);

            // Cleanup on component unmount
            return () => {
                goTopButton.removeEventListener('click', handleGoTopClick);
                window.removeEventListener('scroll', handleScroll);
            };
        }
    }, []);
    const getReactRoute = (wordpressUrl) => {
        // Extract slug from WordPress URL and map it to React route
        const url = new URL(wordpressUrl);
        return url.pathname.replace("/backend/", "/");
      };

      const handleSubscription = (e) => {
        e.preventDefault();

        // Use EmailJS to send the subscription email
        emailjs
            .send(
                "service_0dt1dno", // Replace with your EmailJS Service ID
                "template_83nnksq", // Replace with your EmailJS Template ID
                { user_email: formEmail }, // EmailJS variables
                "QO3CrzddbW0Pbn-D5" // Replace with your EmailJS Public Key
            )
            .then(
                (result) => {
                    setFormSuccess("Thank you for subscribing to us!");
                    setFormEmail(""); // Clear the input field
                },
                (error) => {
                    console.error("Failed to send email:", error);
                }
            );
    };

    return (

        <>
            <div className="footer-area pt-100 pb-70">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-sm-6">
                            <div className="single-footer-widget wow animate__animated animate__fadeInUp delay-0-2s">
                                <Link to="/" className="white-logo">
                                    {/* <img src={logo_white} alt="Image-white" /> */}
                                    <img src={logoUrl || { logo_white }} alt="logo" />

                                </Link>
                                <p className="custom-text-white w-85 custom-font-W500">
                                    {aboutText}
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-2 col-sm-6">
                            <div className="single-footer-widget wow animate__animated animate__fadeInUp delay-0-4s">
                                <h3>Links</h3>
                                <ul className="import-link">
                                    {/* Render fetched menu items */}
                                    {menuItems.length > 0 ? (
                                        menuItems.map((item) => (
                                            <li className="nav-item" key={item.ID}>
                                                <Link to={getReactRoute(item.url)} className="nav-link">
                                                    {item.title}
                                                </Link>
                                            </li>
                                        ))
                                    ) : (
                                        <li className="nav-item">
                                            <span className="nav-link">Loading Menu...</span>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-2 col-sm-6">
                            <div className="single-footer-widget wow animate__animated animate__fadeInUp delay-0-6s">
                                <h3>Get in Touch</h3>
                                <ul className="import-link">
                                    <li className="">
                                        <span className="custom-padding-right"><img src={mail} alt="Image-mail" /></span>
                                        <a href={`mailto:${email}`}>{email}</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <div className="single-footer-widget wow animate__animated animate__fadeInUp delay-0-8s">
                                <h3>Join Our Newsletter</h3>
                                {/* <form className="newsletter-form" data-toggle="validator">
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Enter Your Email"
                                        name="EMAIL"
                                        required
                                        autoComplete="off"
                                    />
                                    <button className="default-btn" type="submit">Subscribe</button>
                                    <div id="validator-newsletter" className="form-result"></div>
                                </form> */}

                                <form className="newsletter-form" data-toggle="validator" onSubmit={handleSubscription}>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Enter Your Email"
                                        value={formEmail}
                                        onChange={(e) => setFormEmail(e.target.value)}
                                        required
                                    />
                                    <button className="default-btn" type="submit">
                                        Subscribe
                                    </button>
                                   
                                    </form>
                                    {formSuccess && (
                                        <div className="form-success-message">
                                            {formSuccess}
                                        </div>
                                    )}
                            </div>
                            <div className="copy-right-social-icon wow animate__animated animate__fadeInRight delay-0-2s animated" style={{ visibility: "visible", animationName: "fadeInRight" }}>
                                <ul>
                                    {socialIcons.map((icon, index) => (
                                        <li key={index}>
                                            <a href={icon.url || "#!"} target="_blank" rel="noopener noreferrer">
                                                {/* Map Dashicons to Remix Icon classes */}
                                                <i className={`ri ${iconMapping[icon.icon] || icon.icon.replace("dashicons-", "")}`}></i>
                                            </a>
                                        </li>
                                    ))}
                                </ul>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="go-top">
                <i className="ri-arrow-up-s-fill"></i>
                <i className="ri-arrow-up-s-fill"></i>
            </div>
        </>
    );
};

export default Footer;
