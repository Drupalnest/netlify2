
// import React, { useState } from "react";
// import View from "../Teams/View";
// import EditTeam from "../Teams/EditTeam";
// import TeamMembers from "../TeamMembers/TeamMembers";
// import TeamApps from "../TeamApps/TeamApps";
// import DeleteTeam from "../Teams/DeleteTeam";

// const Buttons = () => {
//   const [currentPage, setCurrentPage] = useState("view");

//   return (
//     <div style={{ marginTop: "20px" }}>
//       <ul
//         className="tabs nav-tabs nav-tabs--primary clearfix"
//         style={{ marginLeft: "150px" }}
//       >
//         <li className="nav-item tabs__tab">
//           <button
//             onClick={() => setCurrentPage("view")}
//             className={`nav-link ${currentPage === "view" ? "active" : ""}`}
//           >
//             View
//           </button>
//         </li>
//         <li className="nav-item tabs__tab">
//           <button
//             onClick={() => setCurrentPage("edit")}
//             className={`nav-link ${currentPage === "edit" ? "active" : ""}`}
//           >
//             Edit
//           </button>
//         </li>
//         <li className="nav-item tabs__tab">
//           <button
//             onClick={() => setCurrentPage("delete")}
//             className={`nav-link ${currentPage === "delete" ? "active" : ""}`}
//           >
//             Delete
//           </button>
//         </li>
//         <li className="nav-item tabs__tab">
//           <button
//             onClick={() => setCurrentPage("members")}
//             className={`nav-link ${currentPage === "members" ? "active" : ""}`}
//           >
//             Members
//           </button>
//         </li>
//         <li className="nav-item tabs__tab">
//           <button
//             onClick={() => setCurrentPage("apps")}
//             className={`nav-link ${currentPage === "apps" ? "active" : ""}`}
//           >
//             Team Apps
//           </button>
//         </li>
//       </ul>
     
//       {currentPage === "view" && "./view"}
//       {currentPage === "edit" && "./edit"}
//       {currentPage === "delete" && "./delete"}
//       {currentPage === "members" && "./members"}
//       {currentPage === "apps" && "./apps"}
//     </div>
//   );
// };

// export default Buttons;



// import { Link } from "gatsby";
// import React from "react";



// const Buttons = () => {
  
//   return (
//     <div style={{ marginTop: "20px" }}>
//       <ul
//         className="tabs nav-tabs nav-tabs--primary clearfix"
//         style={{ marginLeft: "150px" }}
//       >
//         <li className="nav-item tabs__tab">
//           <Link className="nav-link" to="">View</Link>
//         </li>
//         <li className="nav-item tabs__tab">
//           <Link className="nav-link" to="/edit">Edit</Link>
//         </li>
//         <li className="nav-item tabs__tab">
//           <Link className="nav-link" to="/delete">Delete</Link>
//         </li>
//         <li className="nav-item tabs__tab">
//           <Link className="nav-link active" to="">Members</Link>
//         </li>
//         <li className="nav-item tabs__tab">
//           <Link className="nav-link" to="/apps">Team Apps</Link>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Buttons;


// import { Link } from "gatsby";
// import React, { useState } from "react";

// const Buttons = () => {
  
//   const [currentPage, setCurrentPage] = useState("");

//   return (
//     <div style={{ marginTop: "20px" }}>
//       <ul
//         className="tabs nav-tabs nav-tabs--primary clearfix"
//         style={{ marginLeft: "150px" }}
//       >
//         <li className="nav-item tabs__tab">
//           <Link className={`nav-link ${currentPage === "" ? "active" : ""}`} to="/view">
//             View
//           </Link>
//         </li>
//         <li className="nav-item tabs__tab">
//           <Link className={`nav-link ${currentPage === "/edit" ? "active" : ""}`} to="/edit">
//             Edit
//           </Link>
//         </li>
//         <li className="nav-item tabs__tab">
//           <Link className={`nav-link ${currentPage === "/delete" ? "active" : ""}`} to="/delete">
//             Delete
//           </Link>
//         </li>
//         {/* <li className="nav-item tabs__tab">
//           <Link className={`nav-link ${currentPage === "/members" ? "active" : ""}`} to="/members">
//             Members
//           </Link>
//         </li> */}
//         <li className="nav-item tabs__tab">
//           <Link className={`nav-link ${currentPage === "/apps" ? "active" : ""}`} to="/apps">
//             Team Apps
//           </Link>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Buttons;



import { Link } from "gatsby";
import React, { useEffect, useState } from "react";
import { selectTeam, fetchApps,fetchTeams } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";

const Buttons = () => {
  const [currentPage, setCurrentPage] = useState("");

  const dispatch = useDispatch();
  
  const selectedTeam = useSelector((state) => state.selectedTeam);
  console.log("selected team",selectedTeam)

  const handleClickTeam = (team) => {
    // Dispatch an action to store the selected team's data in Redux
    dispatch(selectTeam(team));

    // Navigate to the "team-details" page
    // navigate("/team-details");
  };

  useEffect(() => {
    dispatch(fetchTeams());
  }, [dispatch]);

  const handleFetchApps = (selectedTeam) => {
    dispatch(fetchApps(selectedTeam)); // Use the parameter appGroup
  };


  return (
    <div style={{ marginTop: "20px" }}>
      <ul
        className="tabs nav-tabs nav-tabs--primary clearfix"
        style={{ marginLeft: "150px" }}
      >
        <li className="nav-item tabs__tab">
          <Link
            className={`nav-link ${currentPage === "/view" ? "active" : ""}`}
            to="/view"
            onClick={() => setCurrentPage("/view")}
          >
            View
          </Link>
        </li>
        <li className="nav-item tabs__tab">
          <Link
            className={`nav-link ${currentPage === "/edit" ? "active" : ""}`}
            to="/edit"
            onClick={() => setCurrentPage("/edit")}
          >
            Edit
          </Link>
        </li>
        <li className="nav-item tabs__tab">
          <Link
            className={`nav-link ${currentPage === "/team-details/delete" ? "active" : ""}`}
            to="/team-details/delete"
            onClick={() => setCurrentPage("/team-details/delete")}
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
        <li className="nav-item tabs__tab">
          <Link
            className={`nav-link ${currentPage === "/apps" ? "active" : ""}`}
            to="/apps"
            // onClick={() => setCurrentPage("/apps")
            // }
            onClick={() => {
            setCurrentPage('/apps');
            handleFetchApps(selectedTeam.selectedTeam);
          }}
          >
            Team Apps
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Buttons;
