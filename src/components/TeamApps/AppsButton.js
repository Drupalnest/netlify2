// import React, { useState } from "react";
// import ViewApp from "./ViewApp";
// import AppAnalytics from "./AppAnalytics";
// import EditApps from "./EditApps";
// import DeleteApps from "./DeleteApps";
// import Layout from "../Layout";

// const AppsButton = () => {
//   const [currentPage, setCurrentPage] = useState("view");

//   return (
//     <Layout>
//       <div style={{ marginTop: "20px" }}>
//         <ul
//           className="tabs nav-tabs nav-tabs--primary clearfix"
//           style={{ marginLeft: "150px" }}
//         >
//           <li className="nav-item tabs__tab">
//             <button
//               onClick={() => setCurrentPage("view")}
//               className={`nav-link ${currentPage === "view" ? "active" : ""}`}
//             >
//               View
//             </button>
//           </li>
//           <li className="nav-item tabs__tab">
//             <button
//               onClick={() => setCurrentPage("edit")}
//               className={`nav-link ${currentPage === "edit" ? "active" : ""}`}
//             >
//               Edit
//             </button>
//           </li>
//           <li className="nav-item tabs__tab">
//             <button
//               onClick={() => setCurrentPage("delete")}
//               className={`nav-link ${currentPage === "delete" ? "active" : ""}`}
//             >
//               Delete
//             </button>
//           </li>
//           <li className="nav-item tabs__tab">
//             <button
//               onClick={() => setCurrentPage("analytics")}
//               className={`nav-link ${
//                 currentPage === "analytics" ? "active" : ""
//               }`}
//             >
//               Analytics
//             </button>
//           </li>
//         </ul>

//         {currentPage === "view" && <ViewApp />}
//         {currentPage === "edit" && <EditApps />}
//         {currentPage === "delete" && <DeleteApps />}
//         {currentPage === "analytics" && <AppAnalytics />}
//       </div>
//     </Layout>
//   );
// };

// export default AppsButton;



// import { Link } from "gatsby";
// import React, { useState } from "react";

// const AppsButton = () => {
  
//   const [currentPage, setCurrentPage] = useState("");

//   return (
//     <div style={{ marginTop: "20px" }}>
//       <ul
//         className="tabs nav-tabs nav-tabs--primary clearfix"
//         style={{ marginLeft: "150px" }}
//       >
//         <li className="nav-item tabs__tab">
//           <Link className={`nav-link ${currentPage === "/view-app" ? "active" : ""}`} to="/view-app">
//             View
//           </Link>
//         </li>
//         <li className="nav-item tabs__tab">
//           <Link className={`nav-link ${currentPage === "/edit-app" ? "active" : ""}`} to="/edit-app">
//             Edit
//           </Link>
//         </li>
//         <li className="nav-item tabs__tab">
//           <Link className={`nav-link ${currentPage === "/delete-app" ? "active" : ""}`} to="/delete-app">
//             Delete
//           </Link>
//         </li>
//         {/* <li className="nav-item tabs__tab">
//           <Link className={`nav-link ${currentPage === "/members" ? "active" : ""}`} to="/members">
//             Members
//           </Link>
//         </li> */}
//         {/* <li className="nav-item tabs__tab">
//           <Link className={`nav-link ${currentPage === "/analytics" ? "active" : ""}`} to="/analytics">
//             Team Apps
//           </Link>
//         </li> */}
//       </ul>
//     </div>
//   );
// };

// export default AppsButton;


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
            className={`nav-link ${currentPage === "/view-app"? "active" : ""}`}
            to="/view-app"
            onClick={() => setCurrentPage("/view-app")}
          >
            View
          </Link>
        </li>
        <li className="nav-item tabs__tab">
          <Link
            className={`nav-link ${currentPage === "/edit-app" ? "active" : ""}`}
            to="/edit-app"
            onClick={() => setCurrentPage("/edit-app")}
          >
            Edit
          </Link>
        </li>
        <li className="nav-item tabs__tab">
          <Link
            className={`nav-link ${currentPage === "/delete-app" ? "active" : ""}`}
            to="/delete-app"
            onClick={() => setCurrentPage("/delete-app")}
          >
            Delete
          </Link>
        </li>
        {/* <li className="nav-item tabs__tab">
          <Link
            className={`nav-link ${currentPage === "/members" ? "active" : ""}`}
            to="/members"
            onClick={() => setCurrentPage("/members")}
          >
            Members
          </Link>
        </li> */}
        
      </ul>
    </div>
  );
};

export default AppsButton;
