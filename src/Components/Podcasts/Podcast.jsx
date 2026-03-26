import React from "react";
import Testimonails from "../Testimonails";
import Banner from "./Banner";
import AllPodcast from "./AllPodcast";
import CTAPodcast from "./CTA";
import LinkedInFeed from "./Linkedinfeed";

const Podcast = () => {
    return (
        <>
            <Banner />

            <section className="events-on-demand ptb-100 events-main-page Insight-sec">
                <div className="container">
                    <div className="row wow animate__animated animate__fadeInUp delay-0-2s">
                        <div className="col-md-10">
                            <h2 className="text-wrapper">
                                <span className="hightlight-green">Our Podcast</span>
                                - Latest Episodes
                            </h2>
                        </div>
                    </div>
                    <AllPodcast />
                </div>
            </section>
            <LinkedInFeed />
            <CTAPodcast />
            <Testimonails />
            



        </>
    );
};

export default Podcast;
