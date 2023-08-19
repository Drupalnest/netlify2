// import React from "react";
// import { useSelector } from "react-redux";
// import { Link } from "gatsby";

// const TeamApps = () => {
//   const teamDetails = useSelector((state) => state.teamDetails);
//   const teamName = useSelector((state) => state.teamDetails.name);
//   console.log(teamName);

//   // Check if teamDetails is null or undefined before accessing its properties
//   // if (!teamDetails || !teamDetails.apps) {
//   //   return <div>Loading...</div>;
//   // }

//   // Function to handle the click on the "Add team app" link
//   const handleClickTeam = () => {
//     console.log("Clicked on teamname", teamName);
//     // You can now do something with the teamName, like passing it to another component or a Redux action.
//   };

//   // Function to handle the click on a particular app
//   const handleAppClick = (appName) => {
//     console.log("Clicked on app with appname:", appName);
//   };

//   return (
//     <div>
//       <div className="page__tasks">
//         <div className="container">
//           <div className="contextual-region block block--starbucks-actions">
//             <div className="my-4">
//               <Link
//                 to="/AddApps"
//                 onClick={handleClickTeam}
//                 className="button button-action btn btn-sm btn-primary"
//               >
//                 Add team app
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="container py-5">
//         <div className="row">
//           <div className="page__content col-md">
//             <div className="hidden" />

//             <table className="table--app-list responsive-enabled table">
//               <thead>
//                 <tr>
//                   <th
//                     specifier="displayName"
//                     aria-sort="ascending"
//                     className="is-active"
//                   >
//                     <Link to="">Team app name</Link>
//                   </th>
//                   <th>Operations</th>
//                 </tr>
//               </thead>
//               {/* Render tbody only if teamDetails.apps is available */}
//               <tbody>
//                 {teamDetails.apps.map((appName, index) => (
//                   <tr key={appName.id}>
//                     <td>
//                       <Link
//                         to="/appdetails"
//                         onClick={() => handleAppClick(appName)}
//                       >
//                         {appName}{" "}
//                         {/* Assuming the 'app' object has a 'name' property */}
//                       </Link>
//                     </td>
//                     <td>
//                       <div className="dropbutton-wrapper">
//                         <div className="dropbutton-widget">
//                           <ul className="dropbutton">
//                             <li>
//                               <Link to="/EditApps">Edit</Link>
//                             </li>
//                             <li>
//                               <Link to="/DeleteApps">Delete</Link>
//                             </li>
//                             <li>
//                               <Link to="/AppAnalytics">Analytics</Link>
//                             </li>
//                           </ul>
//                         </div>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TeamApps;

// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "gatsby";
// import axios from "axios"; // Import Axios for making HTTP requests

// const TeamApps = () => {
//   const teamDetails = useSelector((state) => state.teamDetails);
//   const teamName = useSelector((state) => state.teamDetails.name);
//   console.log(teamName);

//   // Define a state to hold the app details
//   const [appDetails, setAppDetails] = useState(null);

//   // Function to handle the click on the "Add team app" link
//   const handleClickTeam = () => {
//     console.log("Clicked on teamname", teamName);
//     // You can now do something with the teamName, like passing it to another component or a Redux action.
//   };

//   // Function to handle the click on a particular app
//   const handleAppClick = async (appName) => {
//     console.log("Clicked on app with appname:", appName);

//     // Make the API call to fetch the app details
//     try {
//       const token = process.env.YOUR_BEARER_TOKEN; // Replace with your actual bearer token
//       const response = await axios.get(
//         `https://api.enterprise.apigee.com/v1/organizations/kenpatolia-a7241f81-eval/companies/${teamName}/apps/${appName}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       const data = response.data;
//       console.log("App details:", data);

//       // Update the state with the fetched app details
//       setAppDetails(data);
//     } catch (error) {
//       console.error("Error fetching app details:", error);
//       // Handle the error here
//     }
//   };

//   if (!teamDetails || !teamDetails.apps) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <div className="page__tasks">
//         <div className="container">
//           <div className="contextual-region block block--starbucks-actions">
//             <div className="my-4">
//               <Link
//                 to="/AddApps"
//                 onClick={handleClickTeam}
//                 className="button button-action btn btn-sm btn-primary"
//               >
//                 Add team app
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="container py-5">
//         <div className="row">
//           <div className="page__content col-md">
//             <div className="hidden" />

//             <table className="table--app-list responsive-enabled table">
//               <thead>
//                 <tr>
//                   <th
//                     specifier="displayName"
//                     aria-sort="ascending"
//                     className="is-active"
//                   >
//                     <Link to="">Team app name</Link>
//                   </th>
//                   <th>Operations</th>
//                 </tr>
//               </thead>
//               {/* Render tbody only if teamDetails.apps is available */}
//               <tbody>
//                 {teamDetails.apps.map((appName, index) => (
//                   <tr key={appName.id}>
//                     <td>
//                       <Link to="/appdetails" onClick={() => handleAppClick(appName)}>
//                         {appName} {/* Assuming the 'app' object has a 'name' property */}
//                       </Link>
//                     </td>
//                     <td>
//                       <div className="dropbutton-wrapper">
//                         <div className="dropbutton-widget">
//                           <ul className="dropbutton">
//                             <li>
//                               <Link to="/EditApps">Edit</Link>
//                             </li>
//                             <li>
//                               <Link to="/DeleteApps">Delete</Link>
//                             </li>
//                             <li>
//                               <Link to="/AppAnalytics">Analytics</Link>
//                             </li>
//                           </ul>
//                         </div>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TeamApps;

// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Link } from "gatsby";
// import axios from "axios";

// // Import the Redux action to update app details
// import { updateAppDetails } from "../../redux/store"; // Replace "./path/to/actions" with the actual path to your action file

// const TeamApps = () => {
//   const teamDetails = useSelector((state) => state.teamDetails);
//   const teamName = useSelector((state) => state.teamDetails.name);

//   // Define a state to hold the app details
//   const [appDetails, setAppDetails] = useState(null);

//   // Get the dispatch function from the Redux store
//   const dispatch = useDispatch();

//   // Function to handle the click on the "Add team app" link
//   const handleClickTeam = () => {
//     console.log("Clicked on teamname", teamName);
//     // You can now do something with the teamName, like passing it to another component or a Redux action.
//   };

//   // Function to handle the click on a particular app
//   const handleAppClick = async (appName) => {
//     console.log("Clicked on app with appname:", appName);

//     // Make the API call to fetch the app details
//     try {
//       const token = process.env.BEARER_TOKEN; // Replace with your actual bearer token
//       const response = await axios.get(
//         `https://api.enterprise.apigee.com/v1/organizations/kenpatolia-a7241f81-eval/companies/${teamName}/apps/${appName}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       const data = response.data;
//       console.log("App details:", data);

//       // Dispatch the action to update the Redux store with the app details
//       dispatch(updateAppDetails(data));

//       // Update the local state with the fetched app details
//       setAppDetails(data);
//     } catch (error) {
//       console.error("Error fetching app details:", error);
//       // Handle the error here
//     }
//   };

//   if (!teamDetails || !teamDetails.apps) {
//     return <div>Loading...</div>;
//   }

//   return (
//        <div>
//       <div className="page__tasks">
//         <div className="container">
//           <div className="contextual-region block block--starbucks-actions">
//             <div className="my-4">
//               <Link
//                 to="/AddApps"
//                 onClick={handleClickTeam}
//                 className="button button-action btn btn-sm btn-primary"
//               >
//                 Add team app
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="container py-5">
//         <div className="row">
//           <div className="page__content col-md">
//             <div className="hidden" />

//             <table className="table--app-list responsive-enabled table">
//               <thead>
//                 <tr>
//                   <th
//                     specifier="displayName"
//                     aria-sort="ascending"
//                     className="is-active"
//                   >
//                     <Link to="">Team app name</Link>
//                   </th>
//                   <th>Operations</th>
//                 </tr>
//               </thead>
//               {/* Render tbody only if teamDetails.apps is available */}
//               <tbody>
//                 {teamDetails.apps.map((appName, index) => (
//                   <tr key={appName.id}>
//                     <td>
//                       <Link to="" onClick={() => handleAppClick(appName)}>
//                         {appName} {/* Assuming the 'app' object has a 'name' property */}
//                       </Link>
//                     </td>
//                     <td>
//                       <div className="dropbutton-wrapper">
//                         <div className="dropbutton-widget">
//                           <ul className="dropbutton">
//                             <li>
//                               <Link to="/EditApps">Edit</Link>
//                             </li>
//                             <li>
//                               <Link to="/DeleteApps">Delete</Link>
//                             </li>
//                             <li>
//                               <Link to="/AppAnalytics">Analytics</Link>
//                             </li>
//                           </ul>
//                         </div>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TeamApps;

// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Link } from "gatsby";
// import axios from "axios";

// // Import the Redux action to update app details
// import { updateAppDetails, fetchTeamDetails } from "../../redux/store"; // Replace "./path/to/actions" with the actual path to your action file
// import Layout from "../Layout";
// import AppsButton from "./AppsButton";

// const TeamApps = () => {
//   const teamDetails = useSelector((state) => state.teamDetails);
//   const teamName = useSelector((state) => state.teamDetails.name);
//   const team = teamDetails.name;
//   console.log("team", team);
//   // Define a state to hold the app details
//   const [appDetails, setAppDetails] = useState(null);

//   // Get the dispatch function from the Redux store
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchTeamDetails(team));
//   }, [dispatch]);

//   // Function to handle the click on the "Add team app" link
//   const handleClickTeam = () => {
//     // console.log("Clicked on teamname", teamName);
//     // You can now do something with the teamName, like passing it to another component or a Redux action.
//   };

//   // Function to handle the click on a particular app
//   const handleAppClick = async (appName) => {
//     // console.log("Clicked on app with appname:", appName);

//     // Make the API call to fetch the app details
//     try {
//       const token = process.env.BEARER_TOKEN; // Replace with your actual bearer token
//       const response = await axios.get(
//         `https://api.enterprise.apigee.com/v1/organizations/kenpatolia-a7241f81-eval/companies/${teamName}/apps/${appName}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       const data = response.data;

//       // Dispatch the action to update the Redux store with the app details
//       dispatch(updateAppDetails(data));

//       // Update the local state with the fetched app details
//       setAppDetails(data);
//     } catch (error) {
//       console.error("Error fetching app details:", error);
//       // Handle the error here
//     }
//   };

//   if (!teamDetails || !teamDetails.apps) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <Layout>
//       <AppsButton />
//       <div>
//         <div className="dialog-off-canvas-main-canvas toolbar-icon-9 adminimal-admin-toolbar toolbar-tray-open toolbar-horizontal toolbar-fixed toolbar-loading fontyourface path--entity-team-collection user-logged-in path-teams">
//           <div className="page">
//             <div className="page__tasks">
//               <div className="container">
//                 <div className="contextual-region block block--starbucks-actions">
//                   <div className="my-4">
//                     <Link
//                       to="/add-apps"
//                       onClick={handleClickTeam}
//                       className="button button-action btn btn-sm btn-primary"
//                     >
//                       Add team app
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
//                     <h1 className="js-quickedit-page-title page__title mb-0">
//                       Team Apps
//                     </h1>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="container py-5">
//               <div className="row">
//                 <div className="page__content col-md">
//                   <div className="hidden" />

//                   <table className="table--app-list responsive-enabled table">
//                     <thead>
//                       <tr>
//                         <th
//                           specifier="displayName"
//                           aria-sort="ascending"
//                           className="is-active"
//                         >
//                           <Link to="">Team app name</Link>
//                         </th>

//                       </tr>
//                     </thead>

//                     <tbody>
//                       {teamDetails.apps.map((appName, index) => (
//                         <tr key={appName.id}>
//                           <td>
//                             <Link
//                               to="/view-app"
//                               onClick={() => handleAppClick(appName)}
//                             >
//                               {appName}{" "}
//                               {/* Assuming the 'app' object has a 'name' property */}
//                             </Link>
//                           </td>
//                           <td>
//                             <div className="dropbutton-wrapper">
//                               <div className="dropbutton-widget"  style={{ width: "150px" }}>
//                                 <ul className="dropbutton">
//                                   <li style={{ listStyle: "none" }}>
//                                     <Link
//                                       to="/edit-app"
//                                       onClick={() => handleAppClick(appName)}
//                                     >
//                                       Edit
//                                     </Link>
//                                   </li>
//                                   <li style={{
//                                           listStyle: "none",
//                                           marginTop: "7px",
//                                         }}>
//                                     <Link
//                                       to="/delete-app"
//                                       onClick={() => handleAppClick(appName)}
//                                     >
//                                       Delete
//                                     </Link>
//                                   </li>
//                                   {/* <li>
//                                 <Link
//                                   to="/AppsButton"
//                                   onClick={() => handleAppClick(appName)}
//                                 >
//                                   Analytics
//                                 </Link>
//                               </li> */}
//                                 </ul>
//                               </div>
//                             </div>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default TeamApps;

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "gatsby";
// import axios from "axios";

// Import the Redux action to update app details
import { fetchAppDetails, fetchTeamDetails } from "../../redux/store"; // Replace "./path/to/actions" with the actual path to your action file
import Layout from "../Layout";
import AppsButton from "./AppsButton";

const TeamApps = () => {
  // const teamDetails = useSelector((state) => state.teamDetails);
  // const teamName = useSelector((state) => state.teamDetails.name);
  // console.log("teamNameData", teamName);

  const apps = useSelector((state) => state.appsData.appsData);
  console.log("apps", apps);

  const appsName = apps.appGroupApps;
  console.log("appsName", appsName);

  // Define a state to hold the app details
  const [appDetails, setAppDetails] = useState(null);

  // Get the dispatch function from the Redux store
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchTeamDetails(teamName));
  // }, [dispatch]);

  const handleAppClick = (appName) => {
    // dispatch(fetchAppDetails(teamName, appName));
  };

  if (!apps || !appsName) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <AppsButton />
      <div>
        <div className="dialog-off-canvas-main-canvas toolbar-icon-9 adminimal-admin-toolbar toolbar-tray-open toolbar-horizontal toolbar-fixed toolbar-loading fontyourface path--entity-team-collection user-logged-in path-teams">
          <div className="page">
            <div className="page__tasks">
              <div className="container">
                <div className="contextual-region block block--starbucks-actions">
                  <div className="my-4">
                    <Link
                      to="/add-apps"
                      className="button button-action btn btn-sm btn-primary"
                    >
                      Add appgroups app
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="page__content-above">
              <div className="container-fluid px-0">
                <div className="contextual-region block block--pagetitle bg-lighter py-4">
                  <div></div>

                  <div className="container">
                    <h1 className="js-quickedit-page-title page__title mb-0">
                      Appgroups Apps
                    </h1>
                  </div>
                </div>
              </div>
            </div>

            <div className="container py-5">
              <div className="row">
                <div className="page__content col-md">
                  <div className="hidden" />

                  <table className="table--app-list responsive-enabled table">
                    <thead>
                      <tr>
                        <th
                          specifier="displayName"
                          aria-sort="ascending"
                          className="is-active"
                        >
                          <Link to="">Appgroups app name</Link>
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {appsName.length === 0 ? ( // Check if the array is empty
                        <tr>
                          <td colSpan="2">No apps found</td>
                        </tr>
                      ) : (
                        appsName.map((appName, index) => (
                          <tr key={appName.id}>
                            <td>
                              <Link
                                to="/view-app"
                                onClick={() => handleAppClick(appName)}
                              >
                                {appName.name}
                                {/* Assuming the 'app' object has a 'name' property */}
                              </Link>
                            </td>
                            <td>
                              <div className="dropbutton-wrapper">
                                <div
                                  className="dropbutton-widget"
                                  style={{ width: "150px" }}
                                >
                                  <ul className="dropbutton">
                                    <li style={{ listStyle: "none" }}>
                                      <Link
                                        to="/edit-app"
                                        onClick={() => handleAppClick(appName)}
                                      >
                                        Edit
                                      </Link>
                                    </li>
                                    <li
                                      style={{
                                        listStyle: "none",
                                        marginTop: "7px",
                                      }}
                                    >
                                      <Link
                                        to="/delete-app"
                                        onClick={() => handleAppClick(appName)}
                                      >
                                        Delete
                                      </Link>
                                    </li>
                                    {/* <li>
                  <Link
                    to="/AppsButton"
                    onClick={() => handleAppClick(appName)}
                  >
                    Analytics
                  </Link>
                </li> */}
                                  </ul>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TeamApps;
