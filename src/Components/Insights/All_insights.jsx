import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AllInsights = () => {
    const [mediaUrls, setMediaUrls] = useState({});
    const [insightData, setInsightData] = useState([]);
    const [insightCategories, setInsightCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState("all");
    const [filteredInsights, setFilteredInsights] = useState([]);
    const [postsToShow, setPostsToShow] = useState(6);  // Initially show 6 posts
    const [categoryPostsToShow, setCategoryPostsToShow] = useState({});  // Tracks posts per category
    const [imagesLoaded, setImagesLoaded] = useState(false);  // Track if images are loaded



    // Fetch insights and categories data
    useEffect(() => {
        // Fetch insights (posts with their categories) - Ensure we're fetching all posts
        fetch("https://resi.build/backend/wp-json/wp/v2/insights?per_page=80")
            .then((response) => response.json())
            .then((data) => {
                setInsightData(data);
            })
            .catch((error) => console.error("Error fetching insights:", error));

        // Fetch categories (taxonomy insights-categories)
        fetch("https://resi.build/backend/wp-json/wp/v2/insights-categories")
            .then((response) => response.json())
            .then((data) => {
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
                return Array.isArray(insight["insights-categories"]) && insight["insights-categories"].includes(categoryId);
            });

            setFilteredInsights(filtered);  // Update filtered insights
        }
    }, [activeCategory, insightData]);

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
    }, [insightData]);

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
    
    const formatDate = (dateString) => {
        const options = { day: "numeric", month: "long", year: "numeric" };
        return new Date(dateString).toLocaleDateString("en-US", options);
    };
    return (
        <div className="custom-insights-section">
            {/* Preloader */}
            {/* {!imagesLoaded && (
                <div className="preloader">
                    <div className="spinner">
                        <img
                            src="https://resi.build/backend/wp-content/themes/resibuild/assets/images/logo.png"
                            alt="Preloader Logo"
                            className="preloader-logo"
                        />
                    </div>
                </div>
            )} */}

            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation" id="all">
                    <button
                        className={`nav-link ${activeCategory === "all" ? "active" : ""}`}
                        onClick={() => setActiveCategory("all")}
                    >
                        All Posts
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
                                            <p className="date-insight">{insight.date ? formatDate(insight.date) : "No Date"}</p>

                                            <Link to={getReactRoute(insight.link)} className="read-more hightlight-green">
                                                Read More
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

export default AllInsights;
