import React, { useState, useEffect } from "react";
import tick from '../../assets/images/Home/icons/tick.png';

const Why_choose = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [points, setPoints] = useState([]);

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
          setTitle(data?.acf?.why_choose_section?.heading || "");
          setDescription(data?.acf?.why_choose_section?.description || "");
          setImage(data?.acf?.why_choose_section?.image?.url || "");
          setPoints(data?.acf?.why_choose_section?.points || []);
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
      <div className="about-section-pointers ptb-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div
                className="about-content wow animate__animated animate__fadeInUp delay-0-4s animated"
                style={{ visibility: "visible", animationName: "fadeInUp" }}
              >
                <h2
                  className="text-wrapper"
                  dangerouslySetInnerHTML={{ __html: title }}
                ></h2>
                <p>{description}</p>
                <div className="row align-items-center">
                  <div className="col-lg-12">
                    <ul>
                      {points.map((point, index) => (
                        <li key={index}>
                          <img src={tick} alt="" />
                          {point.enter_point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-img mr-15">
                <div
                  className="about-img-1 wow animate__animated animate__fadeInUp delay-0-2s animated"
                  style={{ visibility: "visible", animationName: "fadeInUp" }}
                >
                  <img src={image} alt="Images" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Why_choose;
