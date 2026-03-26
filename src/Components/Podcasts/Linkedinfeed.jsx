import React, { useEffect } from "react";

const Linkedinfeed = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <div className="customer-area podcast-page">
        <div className="container">
          <div className="row wow animate__animated animate__fadeInUp delay-0-2s">
            <div className="col-md-10">
              <h2 className={"text-wrapper custom-text-white"}>
                <span className="hightlight-green">Latest Feeds </span>
                Linkedin
              </h2>
              <br />
            </div>

            <div className="col-md-2"></div>
          </div>
          <div className="elfsight-app-87f28532-f5aa-452c-bd30-4eb95a7721f4" data-elfsight-app-lazy></div>
          <a href="https://www.linkedin.com/company/resibuild-events/" target="_blank"  rel="noreferrer" className="default-btn custom-flex" tabindex="0">
            Find Out More
            <svg width="25" height="10" viewBox="0 0 25 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24.4833 4.99996H0.515438C0.230336 4.99996 0 4.77881 0 4.50507C0 4.23134 0.230336 4.01018 0.515438 4.01018H23.2382L20.1101 1.00682C19.9088 0.813504 19.9088 0.499559 20.1101 0.306242C20.3115 0.112926 20.6385 0.112926 20.8398 0.306242L24.8489 4.15556C24.9971 4.29784 25.0406 4.50971 24.9601 4.6953C24.8796 4.87933 24.6911 4.99996 24.4833 4.99996Z" fill="white" />
              <path d="M19.9317 9.83864C19.7839 9.83864 19.6361 9.78278 19.5244 9.66926C19.2992 9.44401 19.2992 9.07821 19.5244 8.85296L24.0153 4.36242C24.2406 4.13717 24.6064 4.13717 24.8317 4.36242C25.0569 4.58767 25.0569 4.95347 24.8317 5.17872L20.3408 9.66926C20.2272 9.78278 20.0795 9.83864 19.9317 9.83864Z" fill="white" />
            </svg>

          </a>
        </div>
      </div>
<br/>
    </>
  );
};

export default Linkedinfeed;
