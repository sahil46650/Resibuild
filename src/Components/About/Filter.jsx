import React, { useState, useEffect } from "react";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from "react-router-dom";

const Filter = () => {
    const [mediaUrls, setMediaUrls] = useState({
        events: {},
        podcasts: {},
        insights: {},
        cpd: {},
    });
    const [Eventsdata, setEventsdata] = useState([]);
    const [Podcastsdata, setPodcastsdata] = useState([]);
    const [Insightsdata, setInsightsdata] = useState([]);
    // const [cpddata, setcpddata] = useState([]);
    const [activeTabLink, setActiveTabLink] = useState("/events");
    const [imagesLoaded, setImagesLoaded] = useState(false);

    // Function to fetch media URLs for featured media
    const fetchMediaUrls = async (data, type) => {
        const mediaData = {};

        // Loop through the data and fetch the media URL for each featured media
        for (let item of data) {
            const mediaId = item.featured_media;
            if (mediaId) {
                const mediaResponse = await fetch(
                    `https://resi.build/backend/wp-json/wp/v2/media/${mediaId}`
                );
                const mediaJson = await mediaResponse.json();
                mediaData[mediaId] = mediaJson.source_url; // Store the image URL using the media ID as key
            }
        }

        setMediaUrls((prevMediaUrls) => ({
            ...prevMediaUrls,
            [type]: mediaData, // Add media URLs for the respective type (events, podcasts, insights)
        }));
    };

    useEffect(() => {
        // Fetch Events, Podcasts, and Insights data
        const fetchData = async () => {
            try {
                const eventsResponse = await fetch("https://resi.build/backend/wp-json/wp/v2/events");
                const eventsData = await eventsResponse.json();
                setEventsdata(eventsData); // Set the fetched events data
                await fetchMediaUrls(eventsData, "events"); // Fetch media URLs for events

                const podcastsResponse = await fetch("https://resi.build/backend/wp-json/wp/v2/podcasts");
                const podcastsData = await podcastsResponse.json();
                setPodcastsdata(podcastsData); // Set the fetched podcasts data
                await fetchMediaUrls(podcastsData, "podcasts"); // Fetch media URLs for podcasts

                const insightsResponse = await fetch("https://resi.build/backend/wp-json/wp/v2/insights");
                const insightsData = await insightsResponse.json();
                setInsightsdata(insightsData); // Set the fetched insights data
                await fetchMediaUrls(insightsData, "insights"); // Fetch media URLs for insights

                // const cpdResponse = await fetch("https://resi.build/backend/wp-json/wp/v2/cpd");
                // const cpddata = await cpdResponse.json();
                // setcpddata(cpddata); // Set the fetched insights data
                // await fetchMediaUrls(cpddata, "cpd"); // Fetch media URLs for insights

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);
    // Check if all images are loaded
    const handleImageLoad = (id) => {
        setImagesLoaded((prev) => ({
            ...prev,
            [id]: true,
        }));
    };
    const renderItem = (data, type) => {
        return data.slice(0, 3).map((item) => (
            <div className="col-lg-4 col-sm-12" key={item.id}>
                <div className="services-content bg-color-white">
                    {!imagesLoaded[item.id] && <div className="skeleton-loader-home-insight"></div>}
                    {mediaUrls[type][item.featured_media] && (
                        <img
                            src={mediaUrls[type][item.featured_media]}
                            alt={item.title.rendered}
                            onLoad={() => handleImageLoad(item.id)}
                            style={{
                                display: imagesLoaded[item.id] ? "block" : "none",
                            }}
                        />
                    )}
                    <div className="podcast-content">
                        <h3>
                            {item.acf?.external_url ? (
                                <a
                                    href={item.acf.external_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span
                                        dangerouslySetInnerHTML={{ __html: item.title.rendered }}
                                    />
                                </a>
                            ) : (
                                <Link to={getReactRoute(item.link)}>
                                    <span
                                        dangerouslySetInnerHTML={{ __html: item.title.rendered }}
                                    />
                                </Link>
                            )}
                        </h3>
                    </div>


                </div>
            </div>
        ));
    };

    // Function to handle the tab change and update the "Find Out More" button link
    const handleTabChange = (tabName) => {
        switch (tabName) {
            case 'home':
                setActiveTabLink('/events' || "#"); // Set link from the first event, you can change logic as needed
                break;
            case 'profile':
                setActiveTabLink('/podcasts' || "#"); // Set link from the first podcast
                break;
            case 'insight':
                setActiveTabLink('/insights' || "#"); // Set link from the first insight
                break;
            // case 'contact':
            //     setActiveTabLink('/cpd' || "#"); // Set link from the first insight
            //     break;
            default:
                setActiveTabLink("#");
                break;
        }
    };

    const getReactRoute = (wordpressUrl) => {
        // Extract slug from WordPress URL and map it to React route
        const url = new URL(wordpressUrl);
        return url.pathname.replace("/backend/", "/");
    };

    return (
        <section className="tabs-section ptb-100">
            <div className="container">
                <div className="custom-tabs-section bg-color-white ptb-30">
                    <h2 className="text-wrapper custom-text-white">
                        Staying up-to-date is difficult but combining this with passion and inspiration is even trickier!
                    </h2>
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button
                                className="nav-link active"
                                id="home-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#home"
                                type="button"
                                role="tab"
                                aria-controls="home"
                                aria-selected="true"
                                onClick={() => handleTabChange('home')}
                            >Events</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button
                                className="nav-link"
                                id="profile-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#profile"
                                type="button"
                                role="tab"
                                aria-controls="profile"
                                aria-selected="false"
                                onClick={() => handleTabChange('profile')}
                            >Podcast</button>
                        </li>
                        {/* <li className="nav-item" role="presentation">
                            <button
                                className="nav-link"
                                id="contact-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#contact"
                                type="button"
                                role="tab"
                                aria-controls="contact"
                                aria-selected="false"
                                onClick={() => handleTabChange('contact')}
                            >CPD</button>
                        </li> */}
                        <li className="nav-item" role="presentation">
                            <button
                                className="nav-link"
                                id="insight-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#insight"
                                type="button"
                                role="tab"
                                aria-controls="insight"
                                aria-selected="false"
                                onClick={() => handleTabChange('insight')}
                            >Insight</button>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <div className="row">
                                {renderItem(Eventsdata, "events")}
                            </div>
                        </div>
                        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                            <div className="row">
                                {renderItem(Podcastsdata, "podcasts")}
                            </div>
                        </div>
                        {/* <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                            <div className="row">
                                {renderItem(cpddata, "cpd")}
                            </div>
                        </div> */}
                        <div className="tab-pane fade" id="insight" role="tabpanel" aria-labelledby="insight-tab">
                            <div className="row">
                                {renderItem(Insightsdata, "insights")}
                            </div>
                        </div>
                    </div>
                </div>
                <Link to={activeTabLink} className="default-btn custom-flex" tabIndex="0">
                    Find Out More
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19" stroke="#006072" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M12 5L19 12L12 19" stroke="#006072" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                </Link>
            </div>
        </section>
    );
};

export default Filter;
