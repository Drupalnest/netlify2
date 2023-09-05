// #00754A
import { Link } from "gatsby";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppDetails, fetchApps } from "../../redux/store";

const AppsButton = () => {
  const [currentPage, setCurrentPage] = useState("");

  return (
    <div style={{ marginTop: "20px" }}>
      <ul
        className="tabs nav-tabs nav-tabs--primary clearfix"
        style={{ marginLeft: "150px" }}
      >
        <li className="nav-item tabs__tab">
          <Link
            className={`nav-link ${
              currentPage === "/view-app" ? "active" : ""
            }`}
            to="/view-app"
            onClick={() => setCurrentPage("/view-app")}
            style={{ fontWeight: "400", fontSize: "14px" }}
          >
            View
          </Link>
        </li>
        <li className="nav-item tabs__tab">
          <Link
            className={`nav-link ${
              currentPage === "/edit-app" ? "active" : ""
            }`}
            to="/edit-app"
            onClick={() => setCurrentPage("/edit-app")}
            style={{ fontWeight: "400", fontSize: "14px" }}
          >
            Edit
          </Link>
        </li>
        <li className="nav-item tabs__tab">
          <Link
            className={`nav-link ${
              currentPage === "/delete-app" ? "active" : ""
            }`}
            to="/delete-app"
            onClick={() => setCurrentPage("/delete-app")}
            style={{ fontWeight: "400", fontSize: "14px" }}
          >
            Delete
          </Link>
        </li>
        <li className="nav-item tabs__tab">
          <Link
            className={`nav-link ${currentPage === "/apps" ? "active" : ""}`}
            to="/apps"
            onClick={() => setCurrentPage("/apps")}
            style={{ fontWeight: "400", fontSize: "14px" }}
          >
            Back to apps
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AppsButton;
