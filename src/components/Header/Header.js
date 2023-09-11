import React from "react";
import "../../styles/style.css";

import { Link } from "gatsby";
import logo from "../../images/logo.png";

const Header = () => {
  return (
    <header id="navbar" className="navbar navbar-static-top navbar-default">
      <div className="navbar__global">
        <div className="navbar navbar-static-top navbar-default">
          <div className="navbar__global">
            <div className="container">
              <div className="flex-container">
                <div className="brand">
                  <Link className="brand__logo" title="Home">
                    <img src={logo} alt="Starbucks Developer Portal" />
                  </Link>
                  <span className="brand__line"></span>
                  <span className="brand__slogan">
                    Starbucks Developer Portal - Dev
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="navbar__collapse">
        <div className="mr-auto Main-Navigation">
          <div className="navigation">
            <nav className="navbar navbar-expand-lg justify-content-between navbar- sticky-top">
              <div className="container">
                <div className="collapse navbar-collapse">
                  <div className="contextual-region block block--starbucks-main-menu">
                    <ul className="nav navbar-nav">
                      <li className="nav-item dropdown">
                        <Link className="nav-link">My Apps</Link>
                      </li>
                      <li className="nav-item active dropdown">
                        <Link to="/" className="nav-link">
                          My Appgroups
                        </Link>
                      </li>
                      <li className="nav-item dropdown">
                        <Link className="nav-link">API Catalog</Link>
                      </li>
                      <li className="nav-item dropdown">
                        <Link className="nav-link dropdown-toggle">
                          Get Started
                        </Link>
                      </li>
                      <li className="nav-item dropdown">
                        <Link className="nav-link">App Dashboard</Link>
                      </li>
                      <li className="nav-item dropdown">
                        <Link className="nav-link">User Mgmt</Link>
                      </li>
                      <li className="nav-item dropdown">
                        <Link title="Self-Service Utility" className="nav-link">
                          Self-Service Utility
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
