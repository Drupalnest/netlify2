// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchTeams } from "../../redux/store";
// import { Link, navigate } from "gatsby";
// import Layout from "../../components/Layout";
// import { fetchApps, fetchTeamDetails } from "../../redux/store";
// import { useLocation } from "@reach/router";

// const TeamList = () => {
//   const dispatch = useDispatch();
//   const location = useLocation();

//   // const teamsData = pageContext.teamsData;
//   // console.log("teamsData",teamsData)

//   const teams = useSelector((state) => state.teams.data);
//   console.log("teams", teams);
//   const isFetching = teams ? teams.isFetching : false; // Check if teams is defined

//   const appgroups = teams ? teams.appGroups : []; // Check if teams is defined
//   console.log("appgroups", appgroups);

//   const handleClickTeam = (appGroup) => {
//     dispatch(fetchTeamDetails(appGroup));
//   };

//   useEffect(() => {
//     dispatch(fetchTeams());
//   }, [dispatch]);

//   const handleFetchApps = (appGroup) => {
//     dispatch(fetchApps(appGroup)); // Use the parameter appGroup
//   };

//   const Admin_Name = "kpatolia@starbucks.com";

//   // Assuming `teams` is an array of objects
//   const filteredTeams = appgroups.map(team => {
//     if (team.attributes) {
//         const developerDetailsAttr = team.attributes.find(attr => attr.name === "__apigee_reserved__developer_details");
//         if (developerDetailsAttr) {
//             const developerDetails = JSON.parse(developerDetailsAttr.value);
//             return developerDetails.some(detail => detail.developer === Admin_Name) ? team : null;
//         }
//     }
//     return null; // Handle the case where attribute is not found or attributes is undefined
// }).filter(Boolean); // Remove null values from the resulting array
// console.log("filteredTeams", filteredTeams);

  
//   // `filteredTeams` now contains only the teams where `Admin_Name` is a developer
  

//   // const handleViewClick = () => {
//   //   navigate(`/${teamName}`);
//   //   setCurrentPage(`/${teamName}`);
//   // };

//   // const handleEditClick = () => {
//   //   navigate(`/${teamName}/edit`);
   
//   // };

//   // const handleDeleteClick = () => {
    
//   //   navigate(`/${teamName}/delete`);
   
//   // };

//   // const handleMemberClick = () => {
    
//   //   navigate(`/${teamName}/members`);
    
//   // };
//   // const handleAppsClick = () => {
    
//   //   navigate(`/${teamName}/apps`);
    
//   // };


//   if (!isFetching && teams.length === 0) {
//     return (
//       <p
//         style={{
//           margin: "auto",
//           textAlign: "center",
//           marginTop: "50vh",
//           transform: "translateY(-50%)",
//         }}
//       >
//         Loading appgroups...
//       </p>
//     );
//   }

//   return (
//     <Layout>
//       <div>
//         <div className="dialog-off-canvas-main-canvas toolbar-icon-9 adminimal-admin-toolbar toolbar-tray-open toolbar-horizontal toolbar-fixed toolbar-loading fontyourface path--entity-team-collection user-logged-in path-teams">
//           <div className="page">
//             <div className="page__tasks">
//               <div className="container">
//                 <div className="contextual-region block block--starbucks-actions">
//                   <div className="my-4">
//                     <Link
//                       to="/add-team"
//                       className="button button-action btn btn-sm btn-primary"
//                       // style={{
//                       //   cursor: "pointer",
//                       //   fontWeight: 400,
//                       //   fontSize: "14px",
//                       //   fontFamily: "Sodo Sans, sans-serif",
//                       // }}
//                     >
//                       Add Appgroup
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="page__content-above">
//               <div className="container-fluid px-0">
//                 <div className="contextual-region block block--pagetitle bg-lighter py-4">
//                   <div></div>

//                   <div className="container">
//                     <h1
//                       className="js-quickedit-page-title page__title mb-0"
//                       // style={{
//                       //   fontSize: "24px",
//                       //   fontStyle: "normal",
//                       //   fontWeight: "600",
//                       //   fontFamily: "Sodo Sans, sans-serif",
//                       // }}
//                     >
//                       AppGroups
//                     </h1>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <main className="main" role="main">
//               <div className="page-layout-sidebar-default">
//                 <div className="container py-5">
//                   <div className="row">
//                     <div className="page__content col-md">
//                       <table className="responsive-enabled table">
//                         <tbody>
//                           {filteredTeams.length > 0 ? (
//                             filteredTeams.map((appGroup, index) => (
//                               <tr
//                                 key={appGroup.name}
//                                 className={index % 2 === 0 ? "even" : "odd"}
//                               >
//                                 <td>
//                                   <button
//                                     onClick={() =>
//                                       handleClickTeam(appGroup.name)
//                                     }
//                                     style={{
//                                       background: "none",
//                                       border: "none",
//                                       cursor: "pointer",
//                                       fontWeight: 500,
//                                       fontSize: "14px",
//                                       fontFamily: "Sodo Sans", // Adding the font family
//                                     }}
//                                   >
//                                     {/* <Link to="/team-details">
//                                       {appGroup.name}
//                                     </Link>
//                                      */}
//                                     <Link to={`/${appGroup.name}/view`}>
//                                       {appGroup.name}
//                                     </Link>
//                                   </button>
//                                 </td>
//                                 <td>
//                                   <div className="dropbutton-wrapper">
//                                     <div
//                                       className="dropbutton-widget"
//                                       style={{ width: "150px" }}
//                                     >
//                                       <ul className="dropbutton">
//                                         <li
//                                           style={{
//                                             listStyle: "none",
//                                             cursor: "pointer",
//                                             fontWeight: 500,
//                                             fontSize: "12.25px",
//                                             fontFamily: "Sodo Sans",
//                                           }}
//                                         >
//                                           <Link
//                                             to={`/${appGroup.name}/apps`}
//                                             onClick={() => {
//                                               handleFetchApps(appGroup.name);
//                                               handleClickTeam(appGroup.name);
//                                             }}
//                                           >
//                                             Appgroup Apps
//                                           </Link>
//                                         </li>
//                                         <li
//                                           style={{
//                                             listStyle: "none",
//                                             marginTop: "7px",
//                                             fontWeight: 500,
//                                             fontSize: "12.25px",
//                                             fontFamily: "Sodo Sans",
//                                           }}
//                                         >
//                                           <Link
//                                            to={`/${appGroup.name}/members`}
//                                             onClick={() =>
//                                               handleClickTeam(appGroup.name)
//                                             }
//                                           >
//                                             Members
//                                           </Link>
//                                         </li>
//                                         <li
//                                           style={{
//                                             listStyle: "none",
//                                             marginTop: "7px",
//                                             fontWeight: 500,
//                                             fontSize: "12.25px",
//                                             fontFamily: "Sodo Sans",
//                                           }}
//                                         >
//                                           <Link
//                                            to={`/${appGroup.name}/edit`}
//                                             onClick={() =>
//                                               handleClickTeam(appGroup.name)
//                                             }
//                                           >
//                                             Edit
//                                           </Link>
//                                         </li>
//                                         <li
//                                           style={{
//                                             listStyle: "none",
//                                             marginTop: "7px",
//                                             fontWeight: 500,
//                                             fontSize: "12.25px",
//                                             fontFamily: "Sodo Sans",
//                                           }}
//                                         >
//                                           <Link
//                                             to={`/${appGroup.name}/delete`}
//                                             onClick={() =>
//                                               handleClickTeam(appGroup.name)
//                                             }
//                                           >
//                                             Delete
//                                           </Link>
//                                         </li>
//                                       </ul>
//                                     </div>
//                                   </div>
//                                 </td>
//                               </tr>
//                             ))
//                           ) : (
//                             <tr>
//                               <td colSpan="2">No app groups found.</td>
//                             </tr>
//                           )}
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </main>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default TeamList;





import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeams } from "../../redux/store";
import { Link, navigate } from "gatsby";
import Layout from "../../components/Layout";
import { fetchApps, fetchTeamDetails } from "../../redux/store";
import { useLocation } from "@reach/router";
import { useParams } from "react-router-dom";

const TeamList = () => {
 
  const dispatch = useDispatch();
  const location = useLocation();

  // const teamsData = pageContext.teamsData;
  // console.log("teamsData",teamsData)

  const teams = useSelector((state) => state.teams.data);
  console.log("teams", teams);
  const isFetching = teams ? teams.isFetching : false; // Check if teams is defined

  const appgroups = teams ? teams.appGroups : []; // Check if teams is defined
  console.log("appgroups", appgroups);

  const handleClickTeam = (appGroup) => {
    dispatch(fetchTeamDetails(appGroup));
  };

  useEffect(() => {
    dispatch(fetchTeams());
  }, [dispatch]);

  const handleFetchApps = (appGroup) => {
    dispatch(fetchApps(appGroup)); // Use the parameter appGroup
  };

  // const Admin_Name = "chayden@starbucks.com";
  const Admin_Name = "kpatolia@starbucks.com";
  const filteredTeams = appgroups
  ? appgroups
      .map((team) => {
        if (team.attributes) {
          const developerDetailsAttr = team.attributes.find(
            (attr) => attr.name === "__apigee_reserved__developer_details"
          );
          if (developerDetailsAttr) {
            const developerDetails = JSON.parse(developerDetailsAttr.value);
            return developerDetails.some(
              (detail) => detail.developer === Admin_Name
            )
              ? team
              : null;
          }
        }
        return null; // Handle the case where attribute is not found or attributes is undefined
      })
      .filter(Boolean)
  : []; // Return an empty array if appgroups is undefined

console.log("filteredTeams", filteredTeams);



  
  // `filteredTeams` now contains only the teams where `Admin_Name` is a developer
  

  // const handleViewClick = () => {
  //   navigate(`/${teamName}`);
  //   setCurrentPage(`/${teamName}`);
  // };

  // const handleEditClick = () => {
  //   navigate(`/${teamName}/edit`);
   
  // };

  // const handleDeleteClick = () => {
    
  //   navigate(`/${teamName}/delete`);
   
  // };

  // const handleMemberClick = () => {
    
  //   navigate(`/${teamName}/members`);
    
  // };
  // const handleAppsClick = () => {
    
  //   navigate(`/${teamName}/apps`);
    
  // };


  if (!isFetching && teams.length === 0) {
    return (
      <p
        style={{
          margin: "auto",
          textAlign: "center",
          marginTop: "50vh",
          transform: "translateY(-50%)",
        }}
      >
        Loading appgroups...
      </p>
    );
  }

  return (
    <Layout>
      <div>
        <div className="dialog-off-canvas-main-canvas toolbar-icon-9 adminimal-admin-toolbar toolbar-tray-open toolbar-horizontal toolbar-fixed toolbar-loading fontyourface path--entity-team-collection user-logged-in path-teams">
          <div className="page">
            <div className="page__tasks">
              <div className="container">
                <div className="contextual-region block block--starbucks-actions">
                  <div className="my-4">
                    <Link
                      to="/add-team"
                      className="button button-action btn btn-sm btn-primary"
                      // style={{
                      //   cursor: "pointer",
                      //   fontWeight: 400,
                      //   fontSize: "14px",
                      //   fontFamily: "Sodo Sans, sans-serif",
                      // }}
                    >
                      Add Appgroup
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <Link to="/login">Login</Link>

            <div className="page__content-above">
              <div className="container-fluid px-0">
                <div className="contextual-region block block--pagetitle bg-lighter py-4">
                  <div></div>

                  <div className="container">
                    <h1
                      className="js-quickedit-page-title page__title mb-0"
                      // style={{
                      //   fontSize: "24px",
                      //   fontStyle: "normal",
                      //   fontWeight: "600",
                      //   fontFamily: "Sodo Sans, sans-serif",
                      // }}
                    >
                      AppGroups
                    </h1>
                  </div>
                </div>
              </div>
            </div>

            <main className="main" role="main">
              <div className="page-layout-sidebar-default">
                <div className="container py-5">
                  <div className="row">
                    <div className="page__content col-md">
                      <table className="responsive-enabled table">
                        <tbody>
                          {filteredTeams.length > 0 ? (
                            filteredTeams.map((appGroup, index) => (
                              <tr
                                key={appGroup.name}
                                className={index % 2 === 0 ? "even" : "odd"}
                              >
                                <td>
                                  <button
                                    onClick={() =>
                                      handleClickTeam(appGroup.name)
                                    }
                                    style={{
                                      background: "none",
                                      border: "none",
                                      cursor: "pointer",
                                      fontWeight: 500,
                                      fontSize: "14px",
                                      fontFamily: "Sodo Sans", // Adding the font family
                                    }}
                                  >
                                    {/* <Link to="/team-details">
                                      {appGroup.name}
                                    </Link>
                                     */}
                                    <Link to={`/${appGroup.name}/view`}>
                                      {appGroup.name}
                                    </Link>
                                  </button>
                                </td>
                                <td>
                                  <div className="dropbutton-wrapper">
                                    <div
                                      className="dropbutton-widget"
                                      style={{ width: "150px" }}
                                    >
                                      <ul className="dropbutton">
                                        <li
                                          style={{
                                            listStyle: "none",
                                            cursor: "pointer",
                                            fontWeight: 500,
                                            fontSize: "12.25px",
                                            fontFamily: "Sodo Sans",
                                          }}
                                        >
                                          <Link
                                            to={`/${appGroup.name}/apps`}
                                            onClick={() => {
                                              handleFetchApps(appGroup.name);
                                              handleClickTeam(appGroup.name);
                                            }}
                                          >
                                            Appgroup Apps
                                          </Link>
                                        </li>
                                        <li
                                          style={{
                                            listStyle: "none",
                                            marginTop: "7px",
                                            fontWeight: 500,
                                            fontSize: "12.25px",
                                            fontFamily: "Sodo Sans",
                                          }}
                                        >
                                          <Link
                                           to={`/${appGroup.name}/members`}
                                            onClick={() =>
                                              handleClickTeam(appGroup.name)
                                            }
                                          >
                                            Members
                                          </Link>
                                        </li>
                                        <li
                                          style={{
                                            listStyle: "none",
                                            marginTop: "7px",
                                            fontWeight: 500,
                                            fontSize: "12.25px",
                                            fontFamily: "Sodo Sans",
                                          }}
                                        >
                                          <Link
                                           to={`/${appGroup.name}/edit`}
                                            onClick={() =>
                                              handleClickTeam(appGroup.name)
                                            }
                                          >
                                            Edit
                                          </Link>
                                        </li>
                                        <li
                                          style={{
                                            listStyle: "none",
                                            marginTop: "7px",
                                            fontWeight: 500,
                                            fontSize: "12.25px",
                                            fontFamily: "Sodo Sans",
                                          }}
                                        >
                                          <Link
                                            to={`/${appGroup.name}/delete`}
                                            onClick={() =>
                                              handleClickTeam(appGroup.name)
                                            }
                                          >
                                            Delete
                                          </Link>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="2">No app groups found.</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TeamList;






















// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchTeams } from "../../redux/store";
// import { Link, navigate } from "gatsby";
// import Layout from "../Layout";
// import { fetchApps, fetchTeamDetails } from "../../redux/store";
// import { useLocation, useParams } from "@reach/router";

// const TeamList = () => {
//   const dispatch = useDispatch();
//   const { appGroup: appGroupName } = useParams();
//   const location = useLocation();

//   const teams = useSelector((state) => state.teams.data);
//   const isFetching = teams.isFetching;

//   const appgroups = teams.appGroups;

//   const handleClickTeam = (appGroup) => {
//     dispatch(fetchTeamDetails(appGroup));
//   };

//   useEffect(() => {
//     dispatch(fetchTeams());
//   }, [dispatch]);

//   useEffect(() => {
//     if (appGroupName) {
//       // Fetch teams using the appGroup name
//       dispatch(fetchTeams(appGroupName));
//     }
//   }, [dispatch, appGroupName]);

//   const handleFetchApps = (appGroup) => {
//     dispatch(fetchApps(appGroup));
//     handleClickTeam(appGroup);
//   };

//   if (!isFetching && teams.length === 0) {
//     return (
//       <p
//         style={{
//           margin: "auto",
//           textAlign: "center",
//           marginTop: "50vh",
//           transform: "translateY(-50%)",
//         }}
//       >
//         Loading appgroups...
//       </p>
//     );
//   }

//   const selectedAppGroup = appgroups.find(
//     (appGroup) => appGroup.name === appGroupName
//   );

//   return (
//     <Layout>
//       <div>
//         {/* ... rest of your code ... */}
//         <table className="responsive-enabled table">
//           <tbody>
//             {appgroups.length > 0 ? (
//               appgroups.map((appGroup, index) => (
//                 <tr
//                   key={appGroup.name}
//                   className={index % 2 === 0 ? "even" : "odd"}
//                 >
//                   <td>
//                     <button
//                       onClick={() => handleClickTeam(appGroup.name)}
//                       style={{
//                         background: "none",
//                         border: "none",
//                         cursor: "pointer",
//                       }}
//                     >
//                       <Link to={`/${appGroup.name}`}>{appGroup.name}</Link>
//                     </button>
//                   </td>
//                   {/* ... rest of your code ... */}
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="2">No app groups found.</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//         {/* ... rest of your code ... */}
//       </div>
//     </Layout>
//   );
// };

// export default TeamList;

// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, navigate } from "gatsby";
// import Layout from "../Layout";
// import { selectTeam } from "../../redux/store"; // Import the action creator

// const TeamList = () => {
//   const dispatch = useDispatch();
//   const teams = useSelector((state) => state.teams);
//   console.log("teams", teams);

//   const handleClickTeam = (team) => {
//     // Dispatch an action to store the selected team's data in Redux
//     dispatch(selectTeam(team));

//     // Navigate to the "team-details" page
//     navigate("/team-details");
//   };

//   return (
//     <Layout>
//       {/* ... (existing JSX) */}
//       <main className="main" role="main">
//         <div className="page-layout-sidebar-default">
//           <div className="container py-5">
//             <div className="row">
//               <div className="page__content col-md">
//                 <table className="responsive-enabled table">
//                   <tbody>
//                     {teams.appGroups.map((team, index) => (
//                       <tr
//                         key={team.name}
//                         className={index % 2 === 0 ? "even" : "odd"}
//                       >
//                         <td>
//                           <button
//                             onClick={() => handleClickTeam(team)}
//                             style={{
//                               background: "none",
//                               border: "none",
//                               cursor: "pointer",
//                             }}
//                           >
//                             {/* Pass the team details as state */}
//                             <Link
//                               to="/team-details"
//                             >
//                               {team.name}
//                             </Link>
//                           </button>
//                         </td>
//                         {/* ... (rest of the code) */}
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//       {/* ... (rest of the JSX) */}
//     </Layout>
//   );
// };

// export default TeamList;
