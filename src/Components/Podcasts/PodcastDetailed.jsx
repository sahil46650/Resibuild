import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CTAPodcast from "./CTAPodcast";
import Testimonails from "../Testimonails";
import PodcastPlayer from "./PodcastPlayer";
import Featured from "./Featured";
import Linkedinfeed from "./Linkedinfeed";

const PodcastDetailed = () => {
  const { eventId } = useParams(); // Get slug from the URL
  const [eventData, setEventData] = useState({});
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error handling

  useEffect(() => {
    // Fetch current event data
    setLoading(true); // Start loading
    fetch(`https://resi.build/backend/wp-json/wp/v2/podcasts?slug=${eventId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          const event = data[0];
          setEventData({
            content: event.content.rendered || "",
            buttontext: event.acf.bannner_section.button_text || "",
            buttonlink: event.acf.bannner_section.button_link || "",
            media: event.acf.add_media.add_media.url || "",
            popdcasttitle: event.acf.add_media.podcast_title || "",
            popdcastauthor: event.acf.add_media.podcast_author || "",
            popdcastimage: event.acf.add_media.podcast_image || "",
            availableOn: event.acf.podcast_available.available_on || [],
            title: event.title.rendered || "Untitled",
            author: event.author || "Unknown",
            insightsCategories: event["podcasts-category"] || [],
            modified: event.modified || "",
            date: event.date || "",
            id: event.id,
            featuredMedia: event.featured_media,
          });
        } else {
          setError("Podcast not found.");
        }
      })
      .catch((error) => {
        setError("Error fetching event data.");
        console.error("Error fetching event data:", error);
      })
      .finally(() => {
        setLoading(false); // Stop loading after data is fetched
      });
  }, [eventId]);

  const {
    title,
    date,
    buttontext,
    buttonlink,
    availableOn,
    popdcasttitle,
    popdcastauthor,
    popdcastimage,
    media,
    content,
  } = eventData;

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (error) {
    return <div>{error}</div>; // Show error if any
  }

  return (
    <>
      <div className="page-banner-area bg-1 ptb-130 Insights-page-banner">
        <div className="container">
          <div className="page-banner-content">
            <h1
              className="wow animate__animated animate__fadeInUp delay-0-2s custom-text-white"
              dangerouslySetInnerHTML={{ __html: title }}
            ></h1>
            <p className="custom-text-white">
              Published on: {new Date(date).toLocaleDateString()}
            </p>
            <br />
            <a href={buttonlink} className="default-btn custom-flex" tabIndex="0">
              {buttontext}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12H19"
                  stroke="#006072"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 5L19 12L12 19"
                  stroke="#006072"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <PodcastPlayer
        title={popdcasttitle}
        author={popdcastauthor}
        audioSrc={media}
        podcastImage={popdcastimage}
      />
      <div className="speaker-section custom-box-shadow no-shadow">
        <div className="container ptb-30">
          <div className="row align-items-center">
            <div className="col-lg-5 col-sm-4">
              <h3 className="custom-subtitle">Podcast Available On</h3>
            </div>
            <div className="col-lg-7 col-sm-6">
              <div className="partner-container">
                {availableOn.map((item, index) => (
                  <div className="partner-item" key={index}>
                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                      <img src={item.image} alt={`Podcast link ${index + 1}`} />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="podcast-detail-content">
          <div
            className="podcast-content pt-100 pb-100"
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
        </div>
      </div>
       <Featured/>   
       <Linkedinfeed/>      
      <CTAPodcast />
      <Testimonails />
    </>
  );
};

export default PodcastDetailed;
