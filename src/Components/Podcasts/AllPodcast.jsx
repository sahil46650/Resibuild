import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import headphone from '../../assets/images/Home/icons/Headphones.png';
// import heart from '../../assets/images/Home/icons/fi_heart.png';
// import chart from '../../assets/images/Home/icons/Chat.png';

const AllPodcast = () => {
    const [mediaUrls, setMediaUrls] = useState({});
    const [insightData, setInsightData] = useState([]);
    const [insightCategories, setInsightCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState("all");
    const [filteredInsights, setFilteredInsights] = useState([]);
    const [postsToShow, setPostsToShow] = useState(6);  // Initially show 6 posts
    const [categoryPostsToShow, setCategoryPostsToShow] = useState({});  // Tracks posts per category
    const [imagesLoaded, setImagesLoaded] = useState(false);


    // Fetch insights and categories data
    useEffect(() => {
        // Fetch insights (posts with their categories) - Ensure we're fetching all posts
        fetch("https://resi.build/backend/wp-json/wp/v2/podcasts?per_page=100")
            .then((response) => response.json())
            .then((data) => {
                // console.log("Fetched Insights: ", data);  // Log the insights to see if all posts are fetched
                setInsightData(data);
            })
            .catch((error) => console.error("Error fetching insights:", error));

        // Fetch categories (taxonomy insights-categories)
        fetch("https://resi.build/backend/wp-json/wp/v2/podcasts-category")
            .then((response) => response.json())
            .then((data) => {
                // console.log("Fetched Categories: ", data);  // Log the categories
                setInsightCategories(data);
            })
            .catch((error) => console.error("Error fetching categories:", error));
    }, []);

    // Update filtered insights based on the active category
    useEffect(() => {
        if (activeCategory === "all") {
            setFilteredInsights(insightData);  // Show all insights if 'all' category is selected
        } else {
            const categoryId = parseInt(activeCategory);  // Get the active category id

            // Filter posts by category
            const filtered = insightData.filter((insight) => {
                // console.log(`Filtering insight ${insight.id} by category ${categoryId}`);
                return Array.isArray(insight["podcasts-category"]) && insight["podcasts-category"].includes(categoryId);
            });

            // console.log("Filtered Insights:", filtered);  // Log the filtered insights
            setFilteredInsights(filtered);  // Update filtered insights
        }
    }, [activeCategory, insightData]);  // Re-run when activeCategory or insightData changes

    // Fetch media URLs for featured images (if any)
    useEffect(() => {
        const fetchMediaUrls = async () => {
            const mediaData = {};
            for (let insight of insightData) {
                const mediaId = insight.featured_media;
                if (mediaId && !mediaData[mediaId]) {
                    try {
                        const mediaResponse = await fetch(`https://resi.build/backend/wp-json/wp/v2/media/${mediaId}`);
                        const mediaJson = await mediaResponse.json();
                        mediaData[mediaId] = mediaJson.source_url;
                    } catch (error) {
                        console.error(`Error fetching media for insight ${insight.id}:`, error);
                    }
                }
            }
            setMediaUrls(mediaData);
        };

        if (insightData.length > 0) {
            fetchMediaUrls();
        }
    }, [insightData]);  // Re-run when insightData changes

    // Handle Load More functionality (for "All" and categories)
    const loadMorePosts = () => {
        if (activeCategory === "all") {
            setPostsToShow((prevPosts) => prevPosts + 3);  // Load 3 more posts for "All"
        } else {
            setCategoryPostsToShow((prevState) => {
                return {
                    ...prevState,
                    [activeCategory]: (prevState[activeCategory] || 6) + 3  // Load 3 more posts for active category
                };
            });
        }
    };

    // Get posts to display based on active category
    const getPostsToDisplay = () => {
        if (activeCategory === "all") {
            return filteredInsights.slice(0, postsToShow);  // For all category
        } else {
            return filteredInsights.slice(0, categoryPostsToShow[activeCategory] || 6);  // For individual category
        }
    };

    const getReactRoute = (wordpressUrl) => {
        // Extract slug from WordPress URL and map it to React route
        const url = new URL(wordpressUrl);
        return url.pathname.replace("/backend/", "/");
    };
    // Check if all images are loaded
    const handleImageLoad = (id) => {
        setImagesLoaded((prev) => ({
            ...prev,
            [id]: true,
        }));
    };
    return (
        <div className="custom-insights-section all-podcasts">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation" id="all">
                    <button
                        className={`nav-link ${activeCategory === "all" ? "active" : ""}`}
                        onClick={() => setActiveCategory("all")}
                    >
                        All Podcasts
                    </button>
                </li>
                {insightCategories.map((category) => (
                    <li className="nav-item" role="presentation" key={category.id} id={category.id}>
                        <button
                            className={`nav-link ${activeCategory === String(category.id) ? "active" : ""}`}
                            onClick={() => setActiveCategory(String(category.id))}
                        >
                            {category.name}
                        </button>
                    </li>
                ))}
            </ul>

            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active">
                    <div className="row">
                        {getPostsToDisplay().length > 0 ? (
                            getPostsToDisplay().map((insight) => (
                                <div className="col-lg-4 col-sm-12" id={insight.id} key={insight.id}>
                                    <div className="services-content bg-color-white">
                                        {!imagesLoaded[insight.id] && <div className="skeleton-loader"></div>}
                                        <img
                                            src={mediaUrls[insight.featured_media]}
                                            alt={insight.title.rendered}
                                            onLoad={() => handleImageLoad(insight.id)}
                                            style={{
                                                display: imagesLoaded[insight.id] ? "block" : "none",
                                            }}
                                        />

                                        <div className="podcast-content">
                                            <h3>
                                                <Link to={getReactRoute(insight.link)}
                                                    dangerouslySetInnerHTML={{ __html: insight.title.rendered }}></Link>
                                            </h3>
                                            {/* <p dangerouslySetInnerHTML={{ __html: insight.excerpt.rendered }}></p> */}
                                            {/* <div className="facts-figure-podcast-list">
                                                <div className="group custom-text-white">
                                                    <div className="overlap-group">
                                                        <img src={headphone} alt="" />
                                                        <p className="text-wrapper-3">{insight.acf.podcasts_analysis.listen}k</p>
                                                    </div>
                                                </div>
                                                <div className="group custom-text-white">
                                                    <div className="overlap-group">
                                                        <img src={heart} alt="" />
                                                        <p className="text-wrapper-3">{insight.acf.podcasts_analysis.likes}k</p>
                                                    </div>
                                                </div>
                                                <div className="group custom-text-white">
                                                    <div className="overlap-group">
                                                        <img src={chart} alt="" />
                                                        <p className="text-wrapper-3">{insight.acf.podcasts_analysis.comments}k</p>
                                                    </div>
                                                </div>
                                            </div> */}
                                            <Link to={getReactRoute(insight.link)} className="read-more pt-4">
                                                Watch Now
                                                <svg
                                                    width="25"
                                                    height="26"
                                                    viewBox="0 0 25 26"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <rect
                                                        width="24.8221"
                                                        height="25.1613"
                                                        rx="12.411"
                                                        fill="#006072"
                                                    />
                                                    <path
                                                        d="M9.92871 8.91799V16.2431C9.92871 16.8016 10.5286 17.141 10.9905 16.837L16.6031 13.1745C16.7013 13.1107 16.7823 13.0225 16.8384 12.918C16.8945 12.8135 16.9239 12.6962 16.9239 12.577C16.9239 12.4577 16.8945 12.3404 16.8384 12.236C16.7823 12.1315 16.7013 12.0433 16.6031 11.9795L10.9905 8.32407C10.8865 8.25509 10.7663 8.21618 10.6426 8.21143C10.5188 8.20668 10.3961 8.23628 10.2873 8.2971C10.1786 8.35792 10.0879 8.4477 10.0248 8.55698C9.96165 8.66626 9.92846 8.79099 9.92871 8.91799Z"
                                                        fill="white"
                                                    />
                                                </svg>
                                            </Link>
                                        </div>


                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="no-posts-message">No posts available</p>
                        )}
                    </div>

                    {/* Load More Button */}
                    {filteredInsights.length > getPostsToDisplay().length && (
                        <div className="load-more-btn">
                            <button className="default-btn custom-flex" onClick={loadMorePosts}>Load More</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllPodcast;
