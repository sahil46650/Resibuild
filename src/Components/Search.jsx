import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Search = () => {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const [visibleResults, setVisibleResults] = useState(6); // Show 6 results by default
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const query = new URLSearchParams(location.search).get('q') || '';

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        // Build the API URL based on the query

          const apiUrl = query
          ? `https://resi.build/backend/wp-json/custom/v1/search?search=${query}&per_page=100`
          : 'https://resi.build/backend/wp-json/custom/v1/search?per_page=100';

        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error('Failed to fetch results');
        }

        const data = await response.json();

        // Filter out testimonials from the results
        const filteredResults = data.filter(result => result.subtype !== 'testimonials');
        
        setResults(filteredResults);
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  const getReactRoute = (wordpressUrl) => {
    const url = new URL(wordpressUrl);
    return url.pathname.replace("/backend/", "/");
  };

  const loadMoreResults = () => {
    setVisibleResults((prev) => prev + 3); // Load 3 more results
  };

  return (
    <>
      <div className="page-banner-area bg-1 ptb-130 about-page-banner ">
        <div className="container">
          <div className="page-banner-content">
            <h1 className="wow animate__animated animate__fadeInUp delay-0-2s animated custom-text-white">
              Search Results
            </h1>
            <p className="custom-text-white w-50">
              {results.length} Results for "{query}"
            </p>
          </div>
        </div>
      </div>

      <section className="events-on-demand ptb-100 events-main-page search-page-wrapper">
        <div className="container">
          <div className="row wow animate__animated animate__fadeInUp delay-0-2s animated">
            <div className="col-md-10"></div>
          </div>
          <div className="row justify-content-center pt-30">
            {loading ? (
              <div className="col-lg-12">
                <p>Loading results...</p>
              </div>
            ) : error ? (
              <div className="col-lg-12">
                <p>Error: {error}</p>
              </div>
            ) : results && results.length > 0 ? (
              results.slice(0, visibleResults).map((result, index) => (
                <div key={index} className="col-lg-12 col-sm-12">
                  <div className="services-content bg-color-white">
                    <div className="podcast-content search-result">
                      <h4 className="hightlight-green custom-font-W500">{result.type}</h4>
                      <h3>
                        <Link to={getReactRoute(result.link)}>
                          <span
                            className="dangerously-set-html"
                            dangerouslySetInnerHTML={{ __html: result.title }} // Display HTML content for title
                          />
                        </Link>
                      </h3>
                      <p
                        dangerouslySetInnerHTML={{ __html: result.excerpt }} // Display HTML content for title
                      />

                      <Link to={getReactRoute(result.link)} className="read-more hightlight-green">
                        Read More
                        <svg width="31" height="11" viewBox="0 0 31 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M30.3593 5.44386H0.639143C0.285617 5.44386 0 5.19504 0 4.88707C0 4.5791 0.285617 4.33029 0.639143 4.33029H28.8154L24.9366 0.951315C24.6869 0.733822 24.6869 0.380613 24.9366 0.16312C25.1862 -0.0543733 25.5917 -0.0543733 25.8414 0.16312L30.8127 4.49385C30.9964 4.65392 31.0504 4.89229 30.9505 5.10109C30.8506 5.30814 30.617 5.44386 30.3593 5.44386Z"
                            fill="#7AB800"
                          ></path>
                          <path
                            d="M24.7145 10.8877C24.5313 10.8877 24.348 10.8249 24.2095 10.6972C23.9302 10.4437 23.9302 10.0322 24.2095 9.77877L29.7782 4.72662C30.0575 4.47321 30.5112 4.47321 30.7905 4.72662C31.0698 4.98004 31.0698 5.39159 30.7905 5.64501L25.2218 10.6972C25.081 10.8249 24.8978 10.8877 24.7145 10.8877Z"
                            fill="#7AB800"
                          ></path>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-lg-12">
                <p>No results found for "{query}".</p>
              </div>
            )}
          </div>
          {visibleResults < results.length && (
            <div className="row justify-content-center">
              <div className="col-lg-12">
                <button className="load-more-btn default-btn custom-flex" onClick={loadMoreResults}>
                  Load More
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Search;
