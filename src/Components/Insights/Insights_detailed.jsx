import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Testimonails from "../Testimonails";
import CTA from "../Contact/CTA";
import $ from "jquery";
import Comment from "./Comment";

const Insights_detailed = () => {
    const { eventId } = useParams(); // Get slug from the URL
    const [eventData, setEventData] = useState({});
    // const [authorName, setAuthorName] = useState("");
    const [categoryNames, setCategoryNames] = useState([]);
    const [mediaUrl, setMediaUrl] = useState("");
    const [prevPost, setPrevPost] = useState(null);
    const [nextPost, setNextPost] = useState(null);
    const [eventsData, setEventsData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    // const location = useLocation(); // Access current route
    const navigate = useNavigate();


    useEffect(() => {
        const fetchInsights = async () => {
            try {
                // Fetch insights
                const response = await fetch(
                    "https://resi.build/backend/wp-json/wp/v2/insights"
                );
                const insights = await response.json();

                // Fetch featured media for each insight
                const insightsWithImages = await Promise.all(
                    insights.map(async (event) => {
                        let featuredImageUrl = "";
                        if (event.featured_media) {
                            try {
                                const mediaResponse = await fetch(
                                    `https://resi.build/backend/wp-json/wp/v2/media/${event.featured_media}`
                                );
                                const mediaData = await mediaResponse.json();
                                featuredImageUrl = mediaData.source_url;
                            } catch (error) {
                                console.error(
                                    `Error fetching media for ID ${event.featured_media}:`,
                                    error
                                );
                            }
                        }
                        return { ...event, featuredImageUrl };
                    })
                );

                setEventsData(insightsWithImages);
            } catch (error) {
                console.error("Error fetching insights:", error);
            }
        };

        fetchInsights();
    }, []);

    useEffect(() => {
        // Fetch current event data
        fetch(`https://resi.build/backend/wp-json/wp/v2/insights?slug=${eventId}`)
            .then((response) => response.json())
            .then(async (data) => {
                if (data && data.length > 0) {
                    const event = data[0];
                    setEventData({
                        content: event.content.rendered || "",
                        title: event.title.rendered || "",
                        author: event.author || "",
                        insightsCategories: event["insights-categories"] || [],
                        modified: event.modified || "",
                        date: event.date || "",
                        id: event.id,
                        featuredMedia: event.featured_media,
                    });

                    // Fetch author data
                    // fetch(`https://resi.build/backend/wp-json/wp/v2/users/${event.author}`)
                    //     .then((res) => res.json())
                    //     .then((authorData) => setAuthorName(authorData.name));

                    // Fetch featured media URL
                    if (event.featured_media) {
                        fetch(`https://resi.build/backend/wp-json/wp/v2/media/${event.featured_media}`)
                            .then((res) => res.json())
                            .then((mediaData) => setMediaUrl(mediaData.source_url));
                    }

                    // Fetch category names
                    const categoryNames = await Promise.all(
                        event["insights-categories"].map((catId) =>
                            fetch(`https://resi.build/backend/wp-json/wp/v2/insights-categories/${catId}`)
                                .then((res) => res.json())
                                .then((category) => category.name)
                        )
                    );
                    setCategoryNames(categoryNames);

                    // Fetch navigation data for next and previous posts
                    const prevNextData = await fetch(
                        `https://resi.build/backend/wp-json/wp/v2/insights?_fields=id,slug,title&per_page=50`
                    ).then((res) => res.json());

                    const currentIndex = prevNextData.findIndex((post) => post.id === event.id);
                    if (currentIndex > 0) setPrevPost(prevNextData[currentIndex - 1]);
                    if (currentIndex < prevNextData.length - 1) setNextPost(prevNextData[currentIndex + 1]);
                }
            })
            .catch((error) => console.error("Error fetching event data:", error));
    }, [eventId]);

    const formatDate = (dateString) => {
        const options = { day: "numeric", month: "long", year: "numeric" };
        return new Date(dateString).toLocaleDateString("en-US", options);
    };

    const formatModifiedDate = (dateString) => {
        const options = { month: "short", day: "numeric" };
        return new Date(dateString).toLocaleDateString("en-US", options);
    };
    useEffect(() => {


        $("form").submit(function (event) {
            event.preventDefault(); // Prevent default form submission
            if (searchQuery.trim()) {
                // Navigate to the search page with query parameter
                navigate(`/search?q=${searchQuery}`);
                setSearchQuery(""); // Clear the search query state
                $("#search").removeClass("open"); // Close the search bar
            }
        });
    }, [searchQuery, navigate]);
    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <>
            <div className="page-banner-area bg-1 ptb-130 Insights-page-banner">
                <div className="container">
                    <div className="page-banner-content">
                        <span className="custom-subtitle custom-text-white">
                            Updated: {eventData.modified ? formatModifiedDate(eventData.modified) : "N/A"}
                        </span>
                        <h1
                            className="custom-text-white"
                            dangerouslySetInnerHTML={{ __html: eventData.title || "Untitled" }}
                        ></h1>
                    </div>
                </div>
            </div>
            <div className="blog-post-area ptb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="blog-details-content">
                                {mediaUrl && (
                                    <div className="blog-img">
                                        <img src={mediaUrl} alt={eventData.title || "Image"} />
                                        <div className="tag">
                                            {categoryNames.length > 0
                                                ? categoryNames.join(", ")
                                                : "No Categories"}
                                        </div>
                                        <h2
                                    className="blog-title"
                                    dangerouslySetInnerHTML={{ __html: eventData.title || "Untitled" }}
                                ></h2>
                                    </div>
                                )}

                                <ul>
                                    <li>{eventData.date ? formatDate(eventData.date) : "No Date"}</li>
                                    {/* <li>{authorName || "Unknown Author"}</li> */}
                                </ul>

                                <div className="content-wrapper"
                                    dangerouslySetInnerHTML={{ __html: eventData.content || "No Content Available" }}
                                ></div>
                                <div className="prev-next d-flex justify-content-between">
                                    {prevPost && (
                                        <Link to={`/insights/${prevPost.slug}`} className="prev-post">
                                            <i className="ri-arrow-left-s-line"></i> Prev Post
                                        </Link>
                                    )}
                                    {nextPost && (
                                        <Link to={`/insights/${nextPost.slug}`} className="next-post">
                                            Next Post <i className="ri-arrow-right-s-line"></i>
                                        </Link>
                                    )}
                                </div>
                                <Comment postId={eventData.id} />



                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="widget-sidebar">
                                <div className="sidebar-widget srce-form">
                                    <h3>Search</h3>

                                    <form className="src-form">
                                        {/* <input type="text" className="form-control" placeholder="Search here..." /> */}
                                        <input
                                            type="text" className="form-control"
                                            value={searchQuery} // Bind value to state
                                            onChange={handleSearchChange} // Handle input change
                                            placeholder="Search here..."
                                        />
                                        {/* <button className="src-btn">
                                            <i className="ri-search-line"></i>
                                        </button> */}
                                        <button type="submit" className=" src-btn" onClick={(e) => {
                                            e.preventDefault();
                                            if (searchQuery.trim()) {
                                                navigate(`/search?q=${searchQuery}`);
                                                setSearchQuery(""); // Clear the input after navigation
                                                // $("#search").removeClass("open"); // Close the search bar
                                            }
                                        }}
                                        >
                                            <i className="ri-search-line"></i>
                                        </button>
                                    </form>
                                </div>
                                <div className="sidebar-widget recent-post">
                                    <h3>Recent Posts</h3>
                                    {eventsData.slice(0, 6).map((insight) => (
                                        <article className="item" key={insight.id}>
                                            <Link to={`/insights/${insight.slug}`} className="thumb">
                                                {insight.featuredImageUrl ? (
                                                    <img
                                                        src={insight.featuredImageUrl}
                                                        alt={insight.title.rendered}
                                                        className="featured-image"
                                                    />
                                                ) : (
                                                    <div className="placeholder-image">No Image</div>
                                                )}
                                            </Link>

                                            <div className="info">
                                                <span className="date">{formatDate(insight.date)}</span>
                                                <h4 className="title usmall">
                                                    <Link to={`/insights/${insight.slug}`}>
                                                        <span dangerouslySetInnerHTML={{ __html: insight.title.rendered }} />
                                                    </Link>

                                                </h4>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CTA />
            <Testimonails />
        </>
    );
};

export default Insights_detailed;
