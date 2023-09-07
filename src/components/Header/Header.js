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
                  <span className="brand__slogan" style={{fontSize:"18px",fontFamily:"Sodo Sans ,sans-serif",fontWeight: "normal" }}>
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
                        <Link
                          className="nav-link"
                          style={{
                            fontSize: "12.25px",
                            fontColor:"#939393",
                             fontWeight: "600",
                            fontFamily: "SoDo Sans, sans-serif",
                          }}
                        >
                          My Apps
                        </Link>
                      </li>
                      <li className="nav-item active dropdown">
                        <Link
                          to="/"
                          className="nav-link"
                          style={{
                            fontSize: "12.25px",
                            
                            fontWeight: "600",
                            fontFamily: "Sodo Sans, sans-serif",
                          }}
                        >
                          My Appgroups
                        </Link>
                      </li>
                      <li className="nav-item dropdown">
                        <Link
                          className="nav-link"
                          style={{
                            fontSize: "12.25px",
                            
                            fontWeight: "600",
                            fontFamily: "Sodo Sans, sans-serif",
                          }}
                        >
                          API Catalog
                        </Link>
                      </li>
                      <li className="nav-item dropdown">
                        <Link
                          className="nav-link dropdown-toggle"
                          style={{
                            fontSize: "12.25px",
                            
                            fontWeight: "600",
                            fontFamily: "Sodo Sans, sans-serif",
                          }}
                        >
                          Get Started
                        </Link>
                      </li>
                      <li className="nav-item dropdown">
                        <Link
                          className="nav-link"
                          style={{
                            fontSize: "12.25px",
                          
                            fontWeight: "600",
                            fontFamily: "Sodo Sans, sans-serif",
                          }}
                        >
                          App Dashboard
                        </Link>
                      </li>
                      <li className="nav-item dropdown">
                        <Link
                          className="nav-link"
                          style={{
                            fontSize: "12.25px",
                           
                            fontWeight: "600",
                            fontFamily: "Sodo Sans, sans-serif",
                          }}
                        >
                          User Mgmt
                        </Link>
                      </li>
                      <li className="nav-item dropdown">
                        <Link
                          title="Self-Service Utility"
                          className="nav-link"
                          style={{
                            fontSize: "12.25px",
                            fontColor:"#B8B8B8",
                            fontWeight: "600",
                            fontFamily: "Sodo Sans, sans-serif",
                          }}
                        >
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
