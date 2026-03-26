import React, { useState, useEffect } from "react";
import "../assets/css/custom.css";
import "../assets/css/style.css";
import "../assets/css/responsive.css";
import $ from "jquery";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [logoUrl, setLogoUrl] = useState("");
  const [whitelogoUrl, whitesetLogoUrl] = useState("");
  const [isSticky, setIsSticky] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu toggle
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch menu data
    fetch("https://resi.build/backend/wp-json/menus/v1/menus/2")
      .then((response) => response.json())
      .then((data) => {
        setMenuItems(data.items);
      })
      .catch((error) => console.error("Error fetching menu data:", error));

    // Fetch ACF logo
    fetch("https://resi.build/backend/wp-json/wp/v2/options")
      .then((response) => response.json())
      .then((data) => {
        const logo = data.header_logo;
        const whitelogo = data.stickey_header_logo_;
        if (logo && logo.url) {
          setLogoUrl(logo.url);
        }
        if (whitelogo && whitelogo.url) {
          whitesetLogoUrl(whitelogo.url);
        }
      })
      .catch((error) => console.error("Error fetching ACF data:", error));

    // Scroll event for sticky menu
    const handleScroll = () => {
      if (window.pageYOffset > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    $('a[href="#search"]').on("click", function (event) {
      event.preventDefault();
      $("#search").addClass("open");
      $('#search > form > input[type="search"]').focus();
    });

    $("#search, #search button.close").on("click keyup", function (event) {
      if (
        event.target === this ||
        event.target.className === "close" ||
        event.keyCode === 27
      ) {
        $(this).removeClass("open");
      }
    });

    $("form").submit(function (event) {
      event.preventDefault();
      if (searchQuery.trim()) {
        navigate(`/search?q=${searchQuery}`);
        setSearchQuery("");
        $("#search").removeClass("open");
      }
    });
  }, [searchQuery, navigate]);

  const getReactRoute = (wordpressUrl) => {
    const url = new URL(wordpressUrl);
    return url.pathname.replace("/backend/", "/");
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isHomePage = location.pathname === "/";
  return (
    // <div className="banner-area">
    <div
      className={`menu ${isSticky ? "sticky-menu fixed" : ""} ${isHomePage ? "top-menu" : "rest-page"
        }`}
      id="sticky-menu"
    >
      <div className="navbar-area1">
        <div className="mobile-responsive-nav">
          <div className="container">
            <div className="mobile-responsive-menu">
              <div className="logo">
                <Link to="/">
                  <img
                    src={isHomePage || isSticky ? whitelogoUrl : logoUrl} // Always use whitelogoUrl on home page
                    className="main-logo"
                    alt="logo"
                  />
                </Link>
              </div>
              {/* Mobile menu toggle button */}
              <button
                className="mobile-menu-toggle"
                onClick={toggleMobileMenu}
              >
                {isMobileMenuOpen ? (
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 25V5M5 15H25"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>

                ) : (

                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 7H25M5 15H25M5 23H25"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="mobile-menu">
            <div className="container">
              <ul className="navbar-nav">
                {menuItems.length > 0 ? (
                  menuItems.map((item) => (
                    <li
                      className={`nav-item ${
                        location.pathname === getReactRoute(item.url) ? "active" : ""
                      }`} key={item.ID}>
                      <Link to={getReactRoute(item.url)} onClick={closeMobileMenu} className="nav-link">
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
        )}

        {/* Desktop Nav */}
        <div className="desktop-nav">
          <div className="container">
            <nav className="navbar navbar-expand-md navbar-light">
              <Link className="navbar-brand" to="/">
                <img
                  src={isHomePage || isSticky ? whitelogoUrl : logoUrl} // Always use whitelogoUrl on home page
                  className="main-logo"
                  alt="logo"
                />
              </Link>
              <div
                className="collapse navbar-collapse mean-menu"
                id="navbarSupportedContent"
                style={{ display: "block" }}
              >
                <ul className="navbar-nav me-auto">
                  {menuItems.length > 0 ? (
                    menuItems.map((item) => (
                      <li
                      className={`nav-item ${
                        location.pathname === getReactRoute(item.url) ? "active" : ""
                      }`} key={item.ID}>
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
                <div className="others-options">
                  <ul className="nav navbar-nav navbar-right">
                    <li className="custom-flex-list">
                      <a href="#search">
                        Search
                        <svg
                          width="21"
                          height="22"
                          viewBox="0 0 21 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20.8007 20.3108L15.3789 14.9755C16.7987 13.433 17.6711 11.3929 17.6711 9.14796C17.6704 4.3457 13.7149 0.453247 8.83519 0.453247C3.95548 0.453247 0 4.3457 0 9.14796C0 13.9502 3.95548 17.8427 8.83519 17.8427C10.9436 17.8427 12.8773 17.1134 14.3963 15.901L19.8392 21.2573C20.1044 21.5185 20.5349 21.5185 20.8001 21.2573C21.066 20.9961 21.066 20.572 20.8007 20.3108ZM8.83519 16.5049C4.70643 16.5049 1.35942 13.2111 1.35942 9.14796C1.35942 5.0848 4.70643 1.79098 8.83519 1.79098C12.964 1.79098 16.311 5.0848 16.311 9.14796C16.311 13.2111 12.964 16.5049 8.83519 16.5049Z"
                            fill="white"
                          />
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>

        <div id="search">
          <button type="button" className="close">
            ×
          </button>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="search"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="SEARCH KEYWORD(s)"
            />
            <button
              type="submit"
              className="default-btn custom-flex btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                if (searchQuery.trim()) {
                  navigate(`/search?q=${searchQuery}`);
                  setSearchQuery("");
                  $("#search").removeClass("open");
                }
              }}
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Header;
