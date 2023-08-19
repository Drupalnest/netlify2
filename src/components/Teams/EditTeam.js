// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, navigate } from "gatsby";

// const UpdateCompanyName = () => {
//   const [companyName, setCompanyName] = useState("");
//   const [description, setDescription] = useState("");
//   const [attributes, setAttributes] = useState([]);
//   const [selectedAttributes, setSelectedAttributes] = useState([]);
//   const [message, setMessage] = useState("");
//   const [isSuccessAlert, setIsSuccessAlert] = useState(false);

//   const dispatch = useDispatch();
//   const teamDetails = useSelector((state) => state.teamDetails);
//   const teamName = teamDetails.name;

//   useEffect(() => {
//     setCompanyName(teamDetails.displayName);
//     setDescription(
//       teamDetails.attributes.find((attr) => attr.name === "description")?.value
//     );
//     setAttributes(
//       teamDetails.attributes.find((attr) => attr.name === "api_product")?.value
//     );
//   }, [teamDetails]);

//   const serializedData = teamDetails.attributes;

//   const unserializeData = (serializedData) => {
//     // Check if serializedData is available and not empty
//     if (!serializedData || serializedData.length === 0) {
//       return [];
//     }

//     const regex = /s:\d+:\\\"(.*?)\\\"/g;
//     let match;
//     const unserializedArray = [];

//     while ((match = regex.exec(serializedData[0].value)) !== null) {
//       const value = match[1].replace(/\\\\/g, "\\"); // The serialized value
//       if (!unserializedArray.includes(value)) {
//         unserializedArray.push(value);
//       }
//     }

//     return unserializedArray;
//   };

//   const unserializedData = unserializeData(serializedData);

//   const descriptionValue = teamDetails.attributes.find(
//     (attr) => attr.name === "description"
//   )?.value;

//   const handleCompanyNameChange = (e) => {
//     setCompanyName(e.target.value);
//   };

//   const handleDescriptionChange = (e) => {
//     setDescription(e.target.value);
//   };

//   const handleUpdateCompany = async (e) => {
//     e.preventDefault();
//    alert(attributes)

//     if (!companyName.trim()) {
//       setMessage("Please provide a valid company name.");
//       return;
//     }

//     try {
//       const response = await fetch(
//         `https://api.enterprise.apigee.com/v1/organizations/kenpatolia-a7241f81-eval/companies/${teamName}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
//           },
//           body: JSON.stringify({
//             displayName: companyName,
//             attributes: [
//               {
//                 name: "api_product",
//                 value: attributes,
//               },
//               {
//                 name: "description",
//                 value: description,
//               },
//             ],
//           }),
//         }
//       );

//       if (response.ok) {
//         setIsSuccessAlert(true);
//         setMessage("Display name and description updated successfully!");
//         // navigate("/");
//       } else {
//         setMessage("Failed to update company details.");
//       }
//     } catch (error) {
//       setMessage("An error occurred while updating company details.");
//     }
//   };

//   const handleAttributeChange = (value) => {
//     setSelectedAttributes((prevAttributes) =>
//       prevAttributes.includes(value)
//         ? prevAttributes.filter((attribute) => attribute !== value)
//         : [...prevAttributes, value]
//     );
//   };

//   return (
//     <div>
//       <div className="dialog-off-canvas-main-canvas">
//         <div className="page">
//           <header className="page__header"></header>
//           <div className="page__content-above">
//             <div className="container-fluid px-0">
//               <div className="contextual-region block block--pagetitle bg-lighter py-4">
//                 <div />
//                 <div className="container">
//                   <h1 className="js-quickedit-page-title page__title mb-0">
//                     Edit <em className="placeholder">{teamDetails.name}</em>
//                     &nbsp; team
//                   </h1>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <main className="main">
//             <div className="page-layout-sidebar-default">
//               <div className="container py-5">
//                 <div className="row">
//                   <div className="page__content col-md">
//                     <div className="hidden" />
//                     <form className="team-form" onSubmit={handleUpdateCompany}>
//                       <div className="field--type-string field--name-displayname field--widget-string-textfield js-form-wrapper form-wrapper">
//                         <div className="js-form-item form-item js-form-type-textfield form-type-textfield form-item-displayname-0-value js-form-item-displayname-0-value form-group">
//                           <label className="js-form-required form-required">
//                             Team name
//                             <i className="fas fa-asterisk text-danger form-required__indicator" />
//                           </label>
//                           <input
//                             className="js-text-full text-full required form-control"
//                             type="text"
//                             value={companyName}
//                             onChange={handleCompanyNameChange}
//                             size={60}
//                             maxLength={255}
//                             placeholder={teamDetails.displayName}
//                             required="required"
//                             aria-required="true"
//                           />
//                           <span className="field-suffix">
//                             <small>&nbsp;</small>
//                           </span>
//                           <small className="description form-text text-muted">
//                             Only lowercase alphanumeric and dashes are allowed.
//                           </small>
//                         </div>
//                       </div>
//                       <div className="field--type-string-long field--name-field-description field--widget-string-textarea js-form-wrapper form-wrapper">
//                         <div className="js-form-item form-item js-form-type-textarea form-type-textarea form-item-field-description-0-value js-form-item-field-description-0-value form-group">
//                           <label htmlFor="edit-field-description-0-value">
//                             Description
//                           </label>
//                           <textarea
//                             className="js-text-full text-full form-textarea form-control"
//                             rows={5}
//                             cols={60}
//                             value={description}
//                             placeholder={descriptionValue}
//                             onChange={handleDescriptionChange}
//                           />
//                         </div>
//                       </div>
//                       <div className="js-form-item form-item js-form-type-machine-name form-type-machine-name form-item-name js-form-item-name form-disabled form-group">
//                         <label className="js-form-required form-required">
//                           Internal name
//                           <i className="fas fa-asterisk text-danger form-required__indicator" />
//                         </label>

//                         <input
//                           disabled="disabled"
//                           dir="ltr"
//                           type="text"
//                           name="name"
//                           value={teamDetails.name}
//                           size={60}
//                           maxLength={64}
//                           className="required form-control"
//                           required="required"
//                           aria-required="true"
//                         />
//                         <small className="description form-text text-muted">
//                           A unique machine-readable name. Only lowercase
//                           alphanumeric and dashes are allowed
//                         </small>
//                       </div>

//                       <div className="field--type-productapi field--name-field-api-product field--widget-productapi js-form-wrapper form-wrapper">
//                         <fieldset className="fieldgroup form-composite js-form-item form-item js-form-wrapper form-wrapper border mb-3">
//                           <legend className="float-left py-2 px-4 mb-0 border-bottom">
//                             <span className="fieldset-legend">
//                               Team product
//                             </span>
//                             <button className="btn-link">
//                               <i className="fas fa-chevron-down d-md-none" />
//                             </button>
//                           </legend>

//                           {serializedData && serializedData.length > 0 && (
//                             <div className="p-4 fieldset-wrapper">
//                               <div className="form-checkboxes">
//                                 {unserializedData.map((val, valIndex) => (
//                                   <div
//                                     key={valIndex}
//                                     className="js-form-item form-item js-form-type-checkbox form-item-field-api-product-0-value-corp-iag-code-token js-form-item-field-api-product-0-value-corp-iag-code-token form-check"
//                                   >
//                                     <ul style={{ padding: 0, margin: 0 }}>
//                                       <li
//                                         key={valIndex}
//                                         style={{ listStyle: "none" }}
//                                       >
//                                         <input
//                                           type="checkbox"
//                                           value={val}
//                                           style={{ marginRight: "0.5em" }}
//                                           checked={selectedAttributes.includes(
//                                             val
//                                           )}
//                                           onChange={() =>
//                                             handleAttributeChange(val)
//                                           }
//                                         />
//                                         {val}
//                                       </li>
//                                     </ul>
//                                   </div>
//                                 ))}
//                               </div>
//                             </div>
//                           )}
//                         </fieldset>

//                         <div className="form-actions js-form-wrapper form-wrapper">
//                           <button
//                             className="js-form-submit-modal-init button button--primary js-form-submit form-submit btn btn-primary"
//                             onClick={handleUpdateCompany}
//                           >
//                             Update Team
//                           </button>

//                           <Link to="/" className="btn btn-outline-primary">
//                             Cancel
//                           </Link>
//                         </div>
//                       </div>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </main>
//         </div>
//       </div>
//       {isSuccessAlert && alert(message)}
//     </div>
//   );
// };

// export default UpdateCompanyName;

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, navigate } from "gatsby";

// const UpdateCompanyName = () => {
//   const [companyName, setCompanyName] = useState("");
//   const [description, setDescription] = useState("");
//   const [attributes, setAttributes] = useState([]);
//   const [selectedAttributes, setSelectedAttributes] = useState([]);
//   const [message, setMessage] = useState("");
//   const [isSuccessAlert, setIsSuccessAlert] = useState(false);

//   const dispatch = useDispatch();
//   const teamDetails = useSelector((state) => state.teamDetails);
//   const teamName = teamDetails.name;

//   useEffect(() => {
//     setCompanyName(teamDetails.displayName);
//     setDescription(
//       teamDetails.attributes.find((attr) => attr.name === "description")?.value
//     );
//     setAttributes(
//       teamDetails.attributes.find((attr) => attr.name === "api_product")?.value
//     );
//   }, [teamDetails]);

//   const serializedData = teamDetails.attributes;

//   const unserializeData = (serializedData) => {
//     // Check if serializedData is available and not empty
//     if (!serializedData || serializedData.length === 0) {
//       return [];
//     }

//     const regex = /s:\d+:\\\"(.*?)\\\"/g;
//     let match;
//     const unserializedArray = [];

//     while ((match = regex.exec(serializedData[0].value)) !== null) {
//       const value = match[1].replace(/\\\\/g, "\\"); // The serialized value
//       if (!unserializedArray.includes(value)) {
//         unserializedArray.push(value);
//       }
//     }

//     return unserializedArray;
//   };

//   const unserializedData = unserializeData(serializedData);

//   const descriptionValue = teamDetails.attributes.find(
//     (attr) => attr.name === "description"
//   )?.value;

//   const handleCompanyNameChange = (e) => {
//     setCompanyName(e.target.value);
//   };

//   const handleDescriptionChange = (e) => {
//     setDescription(e.target.value);
//   };

//   const handleUpdateCompany = async (e) => {
//     e.preventDefault();

//     if (!companyName.trim()) {
//       setMessage("Please provide a valid company name.");
//       return;
//     }

//     try {
//       const response = await fetch(
//         `https://api.enterprise.apigee.com/v1/organizations/kenpatolia-a7241f81-eval/companies/${teamName}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
//           },
//           body: JSON.stringify({
//             displayName: companyName,
//             attributes: [
//               {
//                 name: "api_product",
//                 value: attributes,
//               },
//               {
//                 name: "description",
//                 value: description,
//               },
//             ],
//           }),
//         }
//       );

//       if (response.ok) {
//         setIsSuccessAlert(true);
//         setMessage("Display name and description updated successfully!");
//         navigate("/");
//       } else {
//         setMessage("Failed to update company details.");
//       }
//     } catch (error) {
//       setMessage("An error occurred while updating company details.");
//     }
//   };

//   const handleAttributeChange = (value) => {
//     setSelectedAttributes((prevAttributes) =>
//       prevAttributes.includes(value)
//         ? prevAttributes.filter((attribute) => attribute !== value)
//         : [...prevAttributes, value]
//     );
//   };

//   return (
//     <div>
//       <div className="dialog-off-canvas-main-canvas">
//         <div className="page">
//           <header className="page__header"></header>
//           <div className="page__content-above">
//             <div className="container-fluid px-0">
//               <div className="contextual-region block block--pagetitle bg-lighter py-4">
//                 <div />
//                 <div className="container">
//                   <h1 className="js-quickedit-page-title page__title mb-0">
//                     Edit <em className="placeholder">{teamDetails.name}</em>
//                     &nbsp; team
//                   </h1>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <main className="main">
//             <div className="page-layout-sidebar-default">
//               <div className="container py-5">
//                 <div className="row">
//                   <div className="page__content col-md">
//                     <div className="hidden" />
//                     <form className="team-form" onSubmit={handleUpdateCompany}>
//                       <div className="field--type-string field--name-displayname field--widget-string-textfield js-form-wrapper form-wrapper">
//                         <div className="js-form-item form-item js-form-type-textfield form-type-textfield form-item-displayname-0-value js-form-item-displayname-0-value form-group">
//                           <label className="js-form-required form-required">
//                             Team name
//                             <i className="fas fa-asterisk text-danger form-required__indicator" />
//                           </label>
//                           <input
//                             className="js-text-full text-full required form-control"
//                             type="text"
//                             value={companyName}
//                             onChange={handleCompanyNameChange}
//                             size={60}
//                             maxLength={255}
//                             placeholder={teamDetails.displayName}
//                             required="required"
//                             aria-required="true"
//                           />
//                           <span className="field-suffix">
//                             <small>&nbsp;</small>
//                           </span>
//                           <small className="description form-text text-muted">
//                             Only lowercase alphanumeric and dashes are allowed.
//                           </small>
//                         </div>
//                       </div>
//                       <div className="field--type-string-long field--name-field-description field--widget-string-textarea js-form-wrapper form-wrapper">
//                         <div className="js-form-item form-item js-form-type-textarea form-type-textarea form-item-field-description-0-value js-form-item-field-description-0-value form-group">
//                           <label htmlFor="edit-field-description-0-value">
//                             Description
//                           </label>
//                           <textarea
//                             className="js-text-full text-full form-textarea form-control"
//                             rows={5}
//                             cols={60}
//                             value={description}
//                             placeholder={descriptionValue}
//                             onChange={handleDescriptionChange}
//                           />
//                         </div>
//                       </div>
//                       <div className="js-form-item form-item js-form-type-machine-name form-type-machine-name form-item-name js-form-item-name form-disabled form-group">
//                         <label className="js-form-required form-required">
//                           Internal name
//                           <i className="fas fa-asterisk text-danger form-required__indicator" />
//                         </label>

//                         <input
//                           disabled="disabled"
//                           dir="ltr"
//                           type="text"
//                           name="name"
//                           value={teamDetails.name}
//                           size={60}
//                           maxLength={64}
//                           className="required form-control"
//                           required="required"
//                           aria-required="true"
//                         />
//                         <small className="description form-text text-muted">
//                           A unique machine-readable name. Only lowercase
//                           alphanumeric and dashes are allowed
//                         </small>
//                       </div>

//                       <div className="field--type-productapi field--name-field-api-product field--widget-productapi js-form-wrapper form-wrapper">
//                         <fieldset className="fieldgroup form-composite js-form-item form-item js-form-wrapper form-wrapper border mb-3">
//                           <legend className="float-left py-2 px-4 mb-0 border-bottom">
//                             <span className="fieldset-legend">
//                               Team product
//                             </span>
//                             <button className="btn-link">
//                               <i className="fas fa-chevron-down d-md-none" />
//                             </button>
//                           </legend>

//                           {serializedData && serializedData.length > 0 && (
//                             <div className="p-4 fieldset-wrapper">
//                               <div className="form-checkboxes">
//                                 {unserializedData.map((val, valIndex) => (
//                                   <div
//                                     key={valIndex}
//                                     className="js-form-item form-item js-form-type-checkbox form-item-field-api-product-0-value-corp-iag-code-token js-form-item-field-api-product-0-value-corp-iag-code-token form-check"
//                                   >
//                                     <ul style={{ padding: 0, margin: 0 }}>
//                                       <li
//                                         key={valIndex}
//                                         style={{ listStyle: "none" }}
//                                       >
//                                         <input
//                                           type="checkbox"
//                                           value={val}
//                                           style={{ marginRight: "0.5em" }}
//                                           checked={selectedAttributes.includes(
//                                             val
//                                           )}
//                                           onChange={() =>
//                                             handleAttributeChange(val)
//                                           }
//                                         />
//                                         {val}
//                                       </li>
//                                     </ul>
//                                   </div>
//                                 ))}
//                               </div>
//                             </div>
//                           )}
//                         </fieldset>

//                         <div className="form-actions js-form-wrapper form-wrapper">
//                           <button
//                             className="js-form-submit-modal-init button button--primary js-form-submit form-submit btn btn-primary"
//                             onClick={handleUpdateCompany}
//                           >
//                             Update Team
//                           </button>

//                           <Link to="/" className="btn btn-outline-primary">
//                             Cancel
//                           </Link>
//                         </div>
//                       </div>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </main>
//         </div>
//       </div>
//       {isSuccessAlert && alert(message)}
//     </div>
//   );
// };

// export default UpdateCompanyName;

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, navigate } from "gatsby";

// const UpdateCompanyName = () => {
//   const [companyName, setCompanyName] = useState("");
//   const [description, setDescription] = useState("");
//   const [attribute, setAttribute] = useState("");
//   const [selectedAttributes, setSelectedAttributes] = useState([])
//   const [message, setMessage] = useState("");
//   const [isSuccessAlert, setIsSuccessAlert] = useState(false);

//   const dispatch = useDispatch();
//   const teamDetails = useSelector((state) => state.teamDetails);

//   const descriptionValue = teamDetails.attributes.find(
//     (attr) => attr.name === "description"
//   )?.value;

//   useEffect(() => {
//     setCompanyName(teamDetails.displayName);
//     setDescription(
//       teamDetails.attributes.find((attr) => attr.name === "description")
//         ?.value || ""
//     );
//     const storedSelectedAttributes = JSON.parse(localStorage.getItem(`selectedAttributes_${teamDetails.name}`)) || [];
//     setSelectedAttributes(storedSelectedAttributes);
//   }, [teamDetails]);

//   const storedSerializedData =
//     JSON.parse(localStorage.getItem("serializedData")) || [];

//   const unserializedData = storedSerializedData
//     .map((item) => {
//       const regex = /s:\d+:\\\"(.*?)\\\"/g;
//       const matches = item.value.match(regex);
//       if (matches) {
//         return matches.map((match) =>
//           match.replace(/\\\\/g, "\\").replace(/s:\d+:\\\"(.*?)\\\"/, "$1")
//         );
//       }
//       return [];
//     })
//     .flat();

//   const handleCompanyNameChange = (e) => {
//     setCompanyName(e.target.value);
//   };

//   const handleDescriptionChange = (e) => {
//     setDescription(e.target.value);
//   };

//   // const handleAttributeChange = (e) => {
//   //   setAttribute(e.target.value);
//   // };
//   const handleAttributeChange = (e) => {
//     const attributeValue = e.target.value;
//     setSelectedAttributes((prevSelectedAttributes) => {
//       if (prevSelectedAttributes.includes(attributeValue)) {
//         return prevSelectedAttributes.filter((attr) => attr !== attributeValue);
//       } else {
//         return [...prevSelectedAttributes, attributeValue];
//       }
//     });

//     // Update localStorage with the updated selectedAttributes for the current team
//     localStorage.setItem(`selectedAttributes_${teamDetails.name}`, JSON.stringify(selectedAttributes));
//   };
//   const handleUpdateCompany = async (e) => {
//     e.preventDefault();

//     if (!companyName.trim()) {
//       setMessage("Please provide a valid company name.");
//       return;
//     }

//     try {
//       const response = await fetch(
//         `https://api.enterprise.apigee.com/v1/organizations/kenpatolia-a7241f81-eval/companies/${teamDetails.name}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
//           },
//           body: JSON.stringify({
//             displayName: companyName,
//             attributes: [
//               {
//                 name: "api_product",
//                 value: attribute,
//               },
//               {
//                 name: "description",
//                 value: description,
//               },
//             ],
//           }),
//         }
//       );

//       if (response.ok) {
//         setIsSuccessAlert(true);
//         setMessage("Display name and description updated successfully!");
//         navigate("/");
//       } else {
//         setMessage("Failed to update company details.");
//       }
//     } catch (error) {
//       setMessage("An error occurred while updating company details.");
//     }
//   };

//   return (
//     <div>
//       <div className="dialog-off-canvas-main-canvas">
//         <div className="page">
//           <header className="page__header"></header>
//           <div className="page__content-above">
//             <div className="container-fluid px-0">
//               <div className="contextual-region block block--pagetitle bg-lighter py-4">
//                 <div />
//                 <div className="container">
//                   <h1 className="js-quickedit-page-title page__title mb-0">
//                     Edit <em className="placeholder">{teamDetails.name}</em>
//                     &nbsp; team
//                   </h1>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <main className="main">
//             <div className="page-layout-sidebar-default">
//               <div className="container py-5">
//                 <div className="row">
//                   <div className="page__content col-md">
//                     <div className="hidden" />
//                     <form className="team-form" onSubmit={handleUpdateCompany}>
//                       <div className="field--type-string field--name-displayname field--widget-string-textfield js-form-wrapper form-wrapper">
//                         <div className="js-form-item form-item js-form-type-textfield form-type-textfield form-item-displayname-0-value js-form-item-displayname-0-value form-group">
//                           <label className="js-form-required form-required">
//                             Team name
//                             <i className="fas fa-asterisk text-danger form-required__indicator" />
//                           </label>
//                           <input
//                             className="js-text-full text-full required form-control"
//                             type="text"
//                             value={companyName}
//                             onChange={handleCompanyNameChange}
//                             size={60}
//                             maxLength={255}
//                             placeholder={teamDetails.displayName}
//                             required="required"
//                             aria-required="true"
//                           />
//                           <span className="field-suffix">
//                             <small>&nbsp;</small>
//                           </span>
//                           <small className="description form-text text-muted">
//                             Only lowercase alphanumeric and dashes are allowed.
//                           </small>
//                         </div>
//                       </div>
//                       <div className="field--type-string-long field--name-field-description field--widget-string-textarea js-form-wrapper form-wrapper">
//                         <div className="js-form-item form-item js-form-type-textarea form-type-textarea form-item-field-description-0-value js-form-item-field-description-0-value form-group">
//                           <label htmlFor="edit-field-description-0-value">
//                             Description
//                           </label>
//                           <textarea
//                             className="js-text-full text-full form-textarea form-control"
//                             rows={5}
//                             cols={60}
//                             value={description}
//                             placeholder={descriptionValue}
//                             onChange={handleDescriptionChange}
//                           />
//                         </div>
//                       </div>
//                       <div className="js-form-item form-item js-form-type-machine-name form-type-machine-name form-item-name js-form-item-name form-disabled form-group">
//                         <label className="js-form-required form-required">
//                           Internal name
//                           <i className="fas fa-asterisk text-danger form-required__indicator" />
//                         </label>

//                         <input
//                           disabled="disabled"
//                           dir="ltr"
//                           type="text"
//                           name="name"
//                           value={teamDetails.name}
//                           size={60}
//                           maxLength={64}
//                           className="required form-control"
//                           required="required"
//                           aria-required="true"
//                         />
//                         <small className="description form-text text-muted">
//                           A unique machine-readable name. Only lowercase
//                           alphanumeric and dashes are allowed
//                         </small>
//                       </div>

//                       <div className="field--type-productapi field--name-field-api-product field--widget-productapi js-form-wrapper form-wrapper">
//                         <fieldset className="fieldgroup form-composite js-form-item form-item js-form-wrapper form-wrapper border mb-3">
//                           <legend className="float-left py-2 px-4 mb-0 border-bottom">
//                             <span className="fieldset-legend">
//                               Team product
//                             </span>
//                             <button className="btn-link">
//                               <i className="fas fa-chevron-down d-md-none" />
//                             </button>
//                           </legend>

//                           {storedSerializedData &&
//                             storedSerializedData.length > 0 && (
//                               <div className="p-4 fieldset-wrapper">

//                                 <div className="form-checkboxes">
//                                   {unserializedData.map((val, valIndex) => (
//                                     <div
//                                       key={valIndex}
//                                       className="js-form-item form-item js-form-type-checkbox form-item-field-api-product-0-value-corp-iag-code-token js-form-item-field-api-product-0-value-corp-iag-code-token form-check"
//                                     >
//                                       <ul style={{ padding: 0, margin: 0 }}>
//                                         <li
//                                           key={valIndex}
//                                           style={{ listStyle: "none" }}
//                                         >
//                                           <input
//                                             type="checkbox"
//                                             value={val}
//                                             style={{ marginRight: "0.5em" }}
//                                             onClick={handleAttributeChange}
//                                           />
//                                           {val}
//                                         </li>
//                                       </ul>
//                                     </div>
//                                   ))}
//                                 </div>
//                               </div>
//                             )}
//                         </fieldset>

//                         <div className="form-actions js-form-wrapper form-wrapper">
//                           <button
//                             className="js-form-submit-modal-init button button--primary js-form-submit form-submit btn btn-primary"
//                             onClick={handleUpdateCompany}
//                           >
//                             Update Team
//                           </button>

//                           <Link to="/" className="btn btn-outline-primary">
//                             Cancel
//                           </Link>
//                         </div>
//                       </div>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </main>
//         </div>
//       </div>
//       {isSuccessAlert && alert(message)}
//     </div>
//   );
// };

// export default UpdateCompanyName;

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, navigate } from "gatsby";

// const UpdateCompanyName = () => {
//   const [companyName, setCompanyName] = useState("");
//   const [description, setDescription] = useState("");
//   const [attributes, setAttributes] = useState([]);
//   const [selectedAttributes, setSelectedAttributes] = useState([]);
//   const [message, setMessage] = useState("");
//   const [isSuccessAlert, setIsSuccessAlert] = useState(false);

//   const teamDetails = useSelector((state) => state.teamDetails);
//   console.log("teamDetails",teamDetails)

//   const descriptionValue = teamDetails.attributes.find(
//     (attr) => attr.name === "description"
//   )?.value;

//   const attributeApiValue = teamDetails.attributes.find(
//     (attr) => attr.name === "api_product"
//   )?.value;

//    console.log("attributeApiValue:", attributeApiValue);

//    const serializedData = teamDetails.attributes;

//   localStorage.setItem("serializedData", JSON.stringify(serializedData));

//   const unserializedData = serializedData
//   .map((item) => {
//     const regex = /s:\d+:\\\"(.*?)\\\"/g;
//     const matches = item.value.match(regex);
//     if (matches) {
//       return matches.map((match) =>
//         match.replace(/\\\\/g, "\\").replace(/s:\d+:\\\"(.*?)\\\"/, "$1")
//       );
//     }
//     return [];
//   })
//   .flat();

// const uniqueAttributes = Array.from(new Set(unserializedData));

//   useEffect(() => {
//     setCompanyName(teamDetails.displayName);
//     setDescription(descriptionValue || "");
//     const storedSelectedAttributes =
//       JSON.parse(
//         localStorage.getItem(`selectedAttributes_${teamDetails.name}`)
//       ) || [];
//     setSelectedAttributes(storedSelectedAttributes);
//         setAttributes(teamDetails.attributes.find((attr) => attr.name === "api_product")?.value)
//   }, [teamDetails, descriptionValue]);

//   const handleCompanyNameChange = (e) => {
//     setCompanyName(e.target.value);
//   };

//   const handleDescriptionChange = (e) => {
//     setDescription(e.target.value);
//   };

//   const updateSelectedAttributes = (updatedAttributes) => {
//     setSelectedAttributes(updatedAttributes);
//     localStorage.setItem(
//       `selectedAttributes_${teamDetails.name}`,
//       JSON.stringify(updatedAttributes)
//     );
//   };

//   const handleAttributeChange = (e) => {
//     const attributeValue = e.target.value;
//     const updatedAttributes = selectedAttributes.includes(attributeValue)
//       ? selectedAttributes.filter((attr) => attr !== attributeValue)
//       : [...selectedAttributes, attributeValue];

//     updateSelectedAttributes(updatedAttributes);
//   };

//   const handleUpdateCompany = async (e) => {

//     e.preventDefault();

//     if (!companyName.trim()) {
//       setMessage("Please provide a valid company name.");
//       return;
//     }

//     try {
//       const response = await fetch(
//         `https://api.enterprise.apigee.com/v1/organizations/kenpatolia-a7241f81-eval/companies/${teamDetails.name}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
//           },
//           body: JSON.stringify({
//             displayName: companyName,
//             attributes: [
//               {
//                 name: "api_product",
//                 value: attributes,
//               },

//               {
//                 name: "selected_products",
//                 value: selectedAttributes,
//               },
//               {
//                 name: "description",
//                 value: description,
//               },
//             ],
//           }),
//         }
//       );

//       if (response.ok) {
//         setIsSuccessAlert(true);
//         setMessage("Display name and description updated successfully!");
//        navigate("/")
//       } else {
//         setMessage("Failed to update company details.");
//       }
//     } catch (error) {
//       setMessage("An error occurred while updating company details.");
//     }
//   };

//   return (
//     <div>
//       <div className="dialog-off-canvas-main-canvas">
//         <div className="page">
//           <header className="page__header"></header>
//           <div className="page__content-above">
//             <div className="container-fluid px-0">
//               <div className="contextual-region block block--pagetitle bg-lighter py-4">
//                 <div />
//                 <div className="container">
//                   <h1 className="js-quickedit-page-title page__title mb-0">
//                     Edit <em className="placeholder">{teamDetails.name}</em>
//                     &nbsp; team
//                   </h1>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <main className="main">
//             <div className="page-layout-sidebar-default">
//               <div className="container py-5">
//                 <div className="row">
//                   <div className="page__content col-md">
//                     <div className="hidden" />
//                     <form className="team-form" onSubmit={handleUpdateCompany}>
//                       <div className="field--type-string field--name-displayname field--widget-string-textfield js-form-wrapper form-wrapper">
//                         <div className="js-form-item form-item js-form-type-textfield form-type-textfield form-item-displayname-0-value js-form-item-displayname-0-value form-group">
//                           <label className="js-form-required form-required">
//                             Team name
//                             <i className="fas fa-asterisk text-danger form-required__indicator" />
//                           </label>
//                           <input
//                             className="js-text-full text-full required form-control"
//                             type="text"
//                             value={companyName}
//                             onChange={handleCompanyNameChange}
//                             size={60}
//                             maxLength={255}
//                             placeholder={teamDetails.displayName}
//                             required="required"
//                             aria-required="true"
//                           />
//                           <span className="field-suffix">
//                             <small>&nbsp;</small>
//                           </span>
//                           <small className="description form-text text-muted">
//                             Only lowercase alphanumeric and dashes are allowed.
//                           </small>
//                         </div>
//                       </div>
//                       <div className="field--type-string-long field--name-field-description field--widget-string-textarea js-form-wrapper form-wrapper">
//                         <div className="js-form-item form-item js-form-type-textarea form-type-textarea form-item-field-description-0-value js-form-item-field-description-0-value form-group">
//                           <label htmlFor="edit-field-description-0-value">
//                             Description
//                           </label>
//                           <textarea
//                             className="js-text-full text-full form-textarea form-control"
//                             rows={5}
//                             cols={60}
//                             value={description}
//                             placeholder={descriptionValue}
//                             onChange={handleDescriptionChange}
//                           />
//                         </div>
//                       </div>
//                       <div className="js-form-item form-item js-form-type-machine-name form-type-machine-name form-item-name js-form-item-name form-disabled form-group">
//                         <label className="js-form-required form-required">
//                           Internal name
//                           <i className="fas fa-asterisk text-danger form-required__indicator" />
//                         </label>

//                         <input
//                           disabled="disabled"
//                           dir="ltr"
//                           type="text"
//                           name="name"
//                           value={teamDetails.name}
//                           size={60}
//                           maxLength={64}
//                           className="required form-control"
//                           required="required"
//                           aria-required="true"
//                         />
//                         <small className="description form-text text-muted">
//                           A unique machine-readable name. Only lowercase
//                           alphanumeric and dashes are allowed
//                         </small>
//                       </div>

//                       <div className="field--type-productapi field--name-field-api-product field--widget-productapi js-form-wrapper form-wrapper">
//                         <fieldset className="fieldgroup form-composite js-form-item form-item js-form-wrapper form-wrapper border mb-3">
//                           <legend className="float-left py-2 px-4 mb-0 border-bottom">
//                             <span className="fieldset-legend">
//                               Team product
//                             </span>
//                             <button className="btn-link">
//                               <i className="fas fa-chevron-down d-md-none" />
//                             </button>
//                           </legend>

//                           {serializedData &&
//                             serializedData.length > 0 && (
//                               <div className="p-4 fieldset-wrapper">
//                                 <div className="form-checkboxes">
//                                   {uniqueAttributes.map((val, valIndex) => (
//                                     <div
//                                       key={valIndex}
//                                       className="js-form-item form-item js-form-type-checkbox form-item-field-api-product-0-value-corp-iag-code-token js-form-item-field-api-product-0-value-corp-iag-code-token form-check"
//                                     >
//                                       <ul style={{ padding: 0, margin: 0 }}>
//                                         <li
//                                           key={valIndex}
//                                           style={{ listStyle: "none" }}
//                                         >
//                                           <input
//                                             type="checkbox"
//                                             value={val}
//                                             style={{ marginRight: "0.5em" }}
//                                             checked={selectedAttributes.includes(
//                                               val
//                                             )}
//                                             onChange={handleAttributeChange}
//                                           />
//                                           {val}
//                                         </li>
//                                       </ul>
//                                     </div>
//                                   ))}
//                                 </div>
//                               </div>
//                             )}
//                         </fieldset>

//                         <div className="form-actions js-form-wrapper form-wrapper">
//                           <button
//                             className="js-form-submit-modal-init button button--primary js-form-submit form-submit btn btn-primary"
//                             onClick={handleUpdateCompany}
//                           >
//                             Update Team
//                           </button>

//                           <Link to="/" className="btn btn-outline-primary">
//                             Cancel
//                           </Link>
//                         </div>
//                       </div>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </main>
//         </div>
//       </div>
//       {isSuccessAlert && alert(message)}
//     </div>
//   );
// };

// export default UpdateCompanyName;

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, navigate } from "gatsby";

// const UpdateCompanyName = () => {
//   const [companyName, setCompanyName] = useState("");
//   const [description, setDescription] = useState("");
//   const [selectedAttributes, setSelectedAttributes] = useState([]);
//   const [message, setMessage] = useState("");
//   const [isSuccessAlert, setIsSuccessAlert] = useState(false);

//   const teamDetails = useSelector((state) => state.teamDetails);

//   const descriptionValue = teamDetails.attributes.find(
//     (attr) => attr.name === "description"
//   )?.value;

//   useEffect(() => {
//     setCompanyName(teamDetails.displayName);
//     setDescription(descriptionValue || "");
//   }, [teamDetails, descriptionValue]);

//   const attributes = teamDetails.attributes.find(
//     (attr) => attr.name === "api_product"
//   )?.value;
//   console.log("sdfvbdf", attributes);

//   const unserializedData = Array.isArray(attributes)
//   ? attributes
//       .map((item) => {
//         console.log("item.value:", item.value);
//         const regex = /s:\d+:\\\"(.*?)\\\"/g;
//         const matches = item.value.match(regex);
//         if (matches) {
//           const unserializedMatches = matches.map((match) =>
//             match.replace(/\\\\/g, "\\").replace(/s:\d+:\\\"(.*?)\\\"/, "$1")
//           );
//           console.log("unserializedMatches:", unserializedMatches);
//           return unserializedMatches;
//         }
//         return [];
//       })
//       .flat()
//   : [];

// console.log("unserializedData:", unserializedData);

// // Set uniqueAttributes using unserializedData
// const uniqueAttributes = Array.from(new Set(unserializedData));
// console.log("uniqueAttributes", uniqueAttributes);

//   const handleCompanyNameChange = (e) => {
//     setCompanyName(e.target.value);
//   };

//   const handleDescriptionChange = (e) => {
//     setDescription(e.target.value);
//   };

//   const handleUpdateCompany = async (e) => {
//     e.preventDefault();

//     if (!companyName.trim()) {
//       setMessage("Please provide a valid company name.");
//       return;
//     }

//     try {
//       const response = await fetch(
//         `https://api.enterprise.apigee.com/v1/organizations/kenpatolia-a7241f81-eval/companies/${teamDetails.name}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
//           },
//           body: JSON.stringify({
//             displayName: companyName,
//             attributes: [
//               {
//                 name: "api_product",
//                 value: selectedAttributes,
//               },
//               {
//                 name: "description",
//                 value: description,
//               },
//             ],
//           }),
//         }
//       );

//       if (response.ok) {
//         setIsSuccessAlert(true);
//         setMessage("Display name and description updated successfully!");
//         navigate("/");
//       } else {
//         setMessage("Failed to update company details.");
//       }
//     } catch (error) {
//       setMessage("An error occurred while updating company details.");
//     }
//   };

//   return (
//     <div>
//       <div className="dialog-off-canvas-main-canvas">
//         <div className="page">
//           <header className="page__header"></header>
//           <div className="page__content-above">
//             <div className="container-fluid px-0">
//               <div className="contextual-region block block--pagetitle bg-lighter py-4">
//                 <div />
//                 <div className="container">
//                   <h1 className="js-quickedit-page-title page__title mb-0">
//                     Edit <em className="placeholder">{teamDetails.name}</em>
//                     &nbsp; team
//                   </h1>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <main className="main">
//             <div className="page-layout-sidebar-default">
//               <div className="container py-5">
//                 <div className="row">
//                   <div className="page__content col-md">
//                     <div className="hidden" />
//                     <form className="team-form" onSubmit={handleUpdateCompany}>
//                       <div className="field--type-string field--name-displayname field--widget-string-textfield js-form-wrapper form-wrapper">
//                         <div className="js-form-item form-item js-form-type-textfield form-type-textfield form-item-displayname-0-value js-form-item-displayname-0-value form-group">
//                           <label className="js-form-required form-required">
//                             Team name
//                             <i className="fas fa-asterisk text-danger form-required__indicator" />
//                           </label>
//                           <input
//                             className="js-text-full text-full required form-control"
//                             type="text"
//                             value={companyName}
//                             onChange={handleCompanyNameChange}
//                             size={60}
//                             maxLength={255}
//                             placeholder={teamDetails.displayName}
//                             required="required"
//                             aria-required="true"
//                           />
//                           <span className="field-suffix">
//                             <small>&nbsp;</small>
//                           </span>
//                           <small className="description form-text text-muted">
//                             Only lowercase alphanumeric and dashes are allowed.
//                           </small>
//                         </div>
//                       </div>
//                       <div className="field--type-string-long field--name-field-description field--widget-string-textarea js-form-wrapper form-wrapper">
//                         <div className="js-form-item form-item js-form-type-textarea form-type-textarea form-item-field-description-0-value js-form-item-field-description-0-value form-group">
//                           <label htmlFor="edit-field-description-0-value">
//                             Description
//                           </label>
//                           <textarea
//                             className="js-text-full text-full form-textarea form-control"
//                             rows={5}
//                             cols={60}
//                             value={description}
//                             placeholder={descriptionValue}
//                             onChange={handleDescriptionChange}
//                           />
//                         </div>
//                       </div>
//                       <div className="js-form-item form-item js-form-type-machine-name form-type-machine-name form-item-name js-form-item-name form-disabled form-group">
//                         <label className="js-form-required form-required">
//                           Internal name
//                           <i className="fas fa-asterisk text-danger form-required__indicator" />
//                         </label>

//                         <input
//                           disabled="disabled"
//                           dir="ltr"
//                           type="text"
//                           name="name"
//                           value={teamDetails.name}
//                           size={60}
//                           maxLength={64}
//                           className="required form-control"
//                           required="required"
//                           aria-required="true"
//                         />
//                         <small className="description form-text text-muted">
//                           A unique machine-readable name. Only lowercase
//                           alphanumeric and dashes are allowed
//                         </small>
//                       </div>

//                       <div className="field--type-productapi field--name-field-api-product field--widget-productapi js-form-wrapper form-wrapper">
//                         <fieldset className="fieldgroup form-composite js-form-item form-item js-form-wrapper form-wrapper border mb-3">
//                           <legend className="float-left py-2 px-4 mb-0 border-bottom">
//                             <span className="fieldset-legend">
//                               Team product
//                             </span>
//                             <button className="btn-link">
//                               <i className="fas fa-chevron-down d-md-none" />
//                             </button>
//                           </legend>

//                           {attributes && attributes.length > 0 && (
//                             <div className="p-4 fieldset-wrapper">
//                               <div className="form-checkboxes">
//                                 {uniqueAttributes.map((val, valIndex) => (
//                                   <div
//                                     key={valIndex}
//                                     className="js-form-item form-item js-form-type-checkbox form-item-field-api-product-0-value-corp-iag-code-token js-form-item-field-api-product-0-value-corp-iag-code-token form-check"
//                                   >
//                                     <ul style={{ padding: 0, margin: 0 }}>
//                                       <li
//                                         key={valIndex}
//                                         style={{ listStyle: "none" }}
//                                       >
//                                         <input
//                                           type="checkbox"
//                                           value={val}
//                                           style={{ marginRight: "0.5em" }}
//                                           checked={selectedAttributes.includes(
//                                             val
//                                           )}
//                                         />
//                                         {val}
//                                       </li>
//                                     </ul>
//                                   </div>
//                                 ))}
//                               </div>
//                             </div>
//                           )}
//                         </fieldset>

//                         <div className="form-actions js-form-wrapper form-wrapper">
//                           <button
//                             className="js-form-submit-modal-init button button--primary js-form-submit form-submit btn btn-primary"
//                             onClick={handleUpdateCompany}
//                           >
//                             Update Team
//                           </button>

//                           <Link to="/" className="btn btn-outline-primary">
//                             Cancel
//                           </Link>
//                         </div>
//                       </div>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </main>
//         </div>
//       </div>
//       {isSuccessAlert && alert(message)}
//     </div>
//   );
// };

// export default UpdateCompanyName;

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, navigate } from "gatsby";

// const UpdateCompanyName = () => {
//   const [companyName, setCompanyName] = useState("");
//   const [description, setDescription] = useState("");
//   const [attributes, setAttributes] = useState([]);
//   const [selectedAttributes, setSelectedAttributes] = useState({});
//   const [message, setMessage] = useState("");
//   const [isSuccessAlert, setIsSuccessAlert] = useState(false);

//   const teamDetails = useSelector((state) => state.teamDetails);

//   const descriptionValue = teamDetails.attributes.find(
//     (attr) => attr.name === "description"
//   )?.value;

//   const attributeApiValue = teamDetails.attributes.find(
//     (attr) => attr.name === "api_product"
//   )?.value;

//   const serializedData = teamDetails.attributes;

//   localStorage.setItem("serializedData", JSON.stringify(serializedData));

//   const unserializedData = serializedData
//     .map((item) => {
//       const regex = /s:\d+:\\\"(.*?)\\\"/g;
//       const matches = item.value.match(regex);
//       if (matches) {
//         return matches.map((match) =>
//           match.replace(/\\\\/g, "\\").replace(/s:\d+:\\\"(.*?)\\\"/, "$1")
//         );
//       }
//       return [];
//     })
//     .flat();

//   const uniqueAttributes = Array.from(new Set(unserializedData));

//   useEffect(() => {
//     setCompanyName(teamDetails.displayName);
//     setDescription(descriptionValue || "");
//     const storedSelectedAttributes =
//       JSON.parse(
//         localStorage.getItem(`selectedAttributes_${teamDetails.name}`)
//       ) || {};
//     setSelectedAttributes(storedSelectedAttributes);
//     setAttributes(
//       teamDetails.attributes.find((attr) => attr.name === "api_product")?.value
//     );
//   }, [teamDetails, descriptionValue]);

//   const handleCompanyNameChange = (e) => {
//     setCompanyName(e.target.value);
//   };

//   const handleDescriptionChange = (e) => {
//     setDescription(e.target.value);
//   };

//   const updateSelectedAttributes = (updatedAttributes) => {
//     setSelectedAttributes(updatedAttributes);

//     localStorage.setItem(
//       `selectedAttributes_${teamDetails.name}`,
//       JSON.stringify(updatedAttributes)
//     );
//   };

//   // const handleAttributeChange = (e) => {
//   //   const attributeValue = e.target.value;
//   //   const updatedAttributes =  {...selectedAttributes} ;
//   //   console.log("svsv",updatedAttributes)

//   //   if (updatedAttributes[attributeValue]) {
//   //     delete updatedAttributes[attributeValue];
//   //   } else {
//   //     updatedAttributes[attributeValue] = attributeValue; // Corrected line
//   //   }

//   //   updateSelectedAttributes(updatedAttributes);
//   // };

//   const handleAttributeChange = (value) => {
//     setSelectedAttributes((prevAttributes) =>
//       prevAttributes.includes(value)
//         ? prevAttributes.filter((attribute) => attribute !== value)
//         : [...prevAttributes, value]
//     );
//   };

//   const handleUpdateCompany = async (e) => {
//     e.preventDefault();
//     alert(selectedAttributes)

//     if (!companyName.trim()) {
//       setMessage("Please provide a valid company name.");
//       return;
//     }

//     try {
//       const response = await fetch(
//         `https://api.enterprise.apigee.com/v1/organizations/kenpatolia-a7241f81-eval/companies/${teamDetails.name}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
//           },
//           body: JSON.stringify({
//             displayName: companyName,
//             attributes: [
//               {
//                 name: "api_product",
//                 value: attributes,
//               },
//               {
//                 name: "selected_products",
//                 value: selectedAttributes,
//               },
//               {
//                 name: "description",
//                 value: description,
//               },
//             ],
//           }),
//         }
//       );

//       if (response.ok) {
//         setIsSuccessAlert(true);
//         setMessage("Display name and description updated successfully!");
//         navigate("/");
//       } else {
//         setMessage("Failed to update company details.");
//       }
//     } catch (error) {
//       setMessage("An error occurred while updating company details.");
//     }
//   };

//   return (
//     <div>
//       <div className="dialog-off-canvas-main-canvas">
//         <div className="page">
//           <header className="page__header"></header>
//           <div className="page__content-above">
//             <div className="container-fluid px-0">
//               <div className="contextual-region block block--pagetitle bg-lighter py-4">
//                 <div />
//                 <div className="container">
//                   <h1 className="js-quickedit-page-title page__title mb-0">
//                     Edit <em className="placeholder">{teamDetails.name}</em>
//                     &nbsp; team
//                   </h1>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <main className="main">
//             <div className="page-layout-sidebar-default">
//               <div className="container py-5">
//                 <div className="row">
//                   <div className="page__content col-md">
//                     <div className="hidden" />
//                     <form className="team-form" onSubmit={handleUpdateCompany}>
//                       <div className="field--type-string field--name-displayname field--widget-string-textfield js-form-wrapper form-wrapper">
//                         <div className="js-form-item form-item js-form-type-textfield form-type-textfield form-item-displayname-0-value js-form-item-displayname-0-value form-group">
//                           <label className="js-form-required form-required">
//                             Team name
//                             <i className="fas fa-asterisk text-danger form-required__indicator" />
//                           </label>
//                           <input
//                             className="js-text-full text-full required form-control"
//                             type="text"
//                             value={companyName}
//                             onChange={handleCompanyNameChange}
//                             size={60}
//                             maxLength={255}
//                             placeholder={teamDetails.displayName}
//                             required="required"
//                             aria-required="true"
//                           />
//                           <span className="field-suffix">
//                             <small>&nbsp;</small>
//                           </span>
//                           <small className="description form-text text-muted">
//                             Only lowercase alphanumeric and dashes are allowed.
//                           </small>
//                         </div>
//                       </div>
//                       <div className="field--type-string-long field--name-field-description field--widget-string-textarea js-form-wrapper form-wrapper">
//                         <div className="js-form-item form-item js-form-type-textarea form-type-textarea form-item-field-description-0-value js-form-item-field-description-0-value form-group">
//                           <label htmlFor="edit-field-description-0-value">
//                             Description
//                           </label>
//                           <textarea
//                             className="js-text-full text-full form-textarea form-control"
//                             rows={5}
//                             cols={60}
//                             value={description}
//                             placeholder={descriptionValue}
//                             onChange={handleDescriptionChange}
//                           />
//                         </div>
//                       </div>
//                       <div className="js-form-item form-item js-form-type-machine-name form-type-machine-name form-item-name js-form-item-name form-disabled form-group">
//                         <label className="js-form-required form-required">
//                           Internal name
//                           <i className="fas fa-asterisk text-danger form-required__indicator" />
//                         </label>

//                         <input
//                           disabled="disabled"
//                           dir="ltr"
//                           type="text"
//                           name="name"
//                           value={teamDetails.name}
//                           size={60}
//                           maxLength={64}
//                           className="required form-control"
//                           required="required"
//                           aria-required="true"
//                         />
//                         <small className="description form-text text-muted">
//                           A unique machine-readable name. Only lowercase
//                           alphanumeric and dashes are allowed
//                         </small>
//                       </div>

//                       <div className="field--type-productapi field--name-field-api-product field--widget-productapi js-form-wrapper form-wrapper">
//                         <fieldset className="fieldgroup form-composite js-form-item form-item js-form-wrapper form-wrapper border mb-3">
//                           <legend className="float-left py-2 px-4 mb-0 border-bottom">
//                             <span className="fieldset-legend">
//                               Team product
//                             </span>
//                             <button className="btn-link">
//                               <i className="fas fa-chevron-down d-md-none" />
//                             </button>
//                           </legend>

//                           {serializedData && serializedData.length > 0 && (
//                             <div className="p-4 fieldset-wrapper">
//                               <div className="form-checkboxes">
//                                 {uniqueAttributes.map((val, valIndex) => (
//                                   <div
//                                     key={valIndex}
//                                     className="js-form-item form-item js-form-type-checkbox form-item-field-api-product-0-value-corp-iag-code-token js-form-item-field-api-product-0-value-corp-iag-code-token form-check"
//                                   >
//                                     <ul style={{ padding: 0, margin: 0 }}>
//                         <li key={valIndex} style={{ listStyle: "none" }}>
//                           <input
//                             type="checkbox"
//                             value={val}
//                             style={{ marginRight: "0.5em" }}
//                             checked={selectedAttributes.includes(val)}
//                             onChange={() => handleAttributeChange(val)}
//                           />
//                           {val}
//                         </li>
//                       </ul>
//                                   </div>
//                                 ))}
//                               </div>
//                             </div>
//                           )}
//                         </fieldset>

//                         <div className="form-actions js-form-wrapper form-wrapper">
//                           <button
//                             className="js-form-submit-modal-init button button--primary js-form-submit form-submit btn btn-primary"
//                             onClick={handleUpdateCompany}
//                           >
//                             Update Team
//                           </button>

//                           <Link to="/" className="btn btn-outline-primary">
//                             Cancel
//                           </Link>
//                         </div>
//                       </div>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </main>
//         </div>
//       </div>
//       {isSuccessAlert && alert(message)}
//     </div>
//   );
// };

// export default UpdateCompanyName;

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, navigate } from "gatsby";

// const UpdateCompanyName = () => {
//   const [companyName, setCompanyName] = useState("");
//   const [description, setDescription] = useState("");
//   const [attributes, setAttributes] = useState([]);
//   const [selectedAttributes, setSelectedAttributes] = useState([]);
//   const [message, setMessage] = useState("");
//   const [isSuccessAlert, setIsSuccessAlert] = useState(false);

//   const teamDetails = useSelector((state) => state.teamDetails);
//   console.log("teamDetails", teamDetails);

//   const serializedData = teamDetails.attributes;

//   localStorage.setItem("serializedData", JSON.stringify(serializedData));

//   const descriptionValue = teamDetails.attributes.find(
//     (attr) => attr.name === "description"
//   )?.value;

//   const attributeApiValue = teamDetails.attributes.find(
//     (attr) => attr.name === "api_product"
//   )?.value;

//   console.log("attributeApiValue:", attributeApiValue);

//   // const data=JSON.parse(attributeApiValue)
//   // console.log("data",data)

//   console.log("serializedData", serializedData);

//   const unserializedData = serializedData
//     .map((item) => {
//       const regex = /s:\d+:\\\"(.*?)\\\"/g;
//       const matches = item.value.match(regex);
//       if (matches) {
//         return matches.map((match) =>
//           match.replace(/\\\\/g, "\\").replace(/s:\d+:\\\"(.*?)\\\"/, "$1")
//         );
//       }
//       return [];
//     })
//     .flat();
//   console.log("unserializedData", unserializedData);
//   const uniqueAttributes = Array.from(new Set(unserializedData));
//   console.log("uniqueAttributes", uniqueAttributes);

//   useEffect(() => {
//     setCompanyName(teamDetails.displayName);
//     setDescription(descriptionValue || "");
//     const storedSelectedAttributes =
//       JSON.parse(
//         localStorage.getItem(`selectedAttributes_${teamDetails.name}`)
//       ) || [];
//     setSelectedAttributes(storedSelectedAttributes);

//     setAttributes(
//       teamDetails.attributes.find((attr) => attr.name === "api_product")?.value
//     );
//   }, [teamDetails, descriptionValue]);

//   const handleCompanyNameChange = (e) => {
//     setCompanyName(e.target.value);
//   };

//   const handleDescriptionChange = (e) => {
//     setDescription(e.target.value);
//   };
//   const updateSelectedAttributes = (updatedAttributes) => {
//     setSelectedAttributes(updatedAttributes);
//     localStorage.setItem(
//       `selectedAttributes_${teamDetails.name}`,
//       JSON.stringify(updatedAttributes)
//     );
//   };

//   const handleAttributeChange = (attributeValue) => {
//     setSelectedAttributes((prevAttributes) => {
//       const existingIndex = prevAttributes.findIndex(
//         (attr) => attr[attributeValue]
//       );

//       if (existingIndex !== -1) {
//         const updatedAttributes = [...prevAttributes];
//         updatedAttributes.splice(existingIndex, 1); // Remove the existing attribute
//         updateSelectedAttributes(updatedAttributes); // Update selected attributes
//         return updatedAttributes;
//       } else {
//         const newAttribute = { [attributeValue]: attributeValue };
//         const updatedAttributes = [...prevAttributes, newAttribute]; // Add new attribute
//         updateSelectedAttributes(updatedAttributes); // Update selected attributes
//         return updatedAttributes;
//       }
//     });
//   };

//   useEffect(() => {
//     localStorage.setItem(
//       `selectedAttributes_${teamDetails.name}`,
//       JSON.stringify(selectedAttributes)
//     );
//   }, [selectedAttributes, teamDetails]);

//   const handleUpdateCompany = async (e) => {
//     e.preventDefault();

//     if (!companyName.trim()) {
//       setMessage("Please provide a valid company name.");
//       return;
//     }

//     try {
//       const response = await fetch(
//         `https://api.enterprise.apigee.com/v1/organizations/kenpatolia-a7241f81-eval/companies/${teamDetails.name}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
//           },
//           body: JSON.stringify({
//             displayName: companyName,
//             attributes: [
//               {
//                 name: "api_product",
//                 value: attributes,
//               },

//               {
//                 name: "selected_products",
//                 value: JSON.stringify(selectedAttributes),
//               },
//               {
//                 name: "description",
//                 value: description,
//               },
//             ],
//           }),
//         }
//       );

//       if (response.ok) {
//         setIsSuccessAlert(true);
//         setMessage("Display name and description updated successfully!");
//         navigate("/");
//       } else {
//         setMessage("Failed to update company details.");
//       }
//     } catch (error) {
//       setMessage("An error occurred while updating company details.");
//     }
//   };

//   return (
//     <div>
//       <div className="dialog-off-canvas-main-canvas">
//         <div className="page">
//           <header className="page__header"></header>
//           <div className="page__content-above">
//             <div className="container-fluid px-0">
//               <div className="contextual-region block block--pagetitle bg-lighter py-4">
//                 <div />
//                 <div className="container">
//                   <h1 className="js-quickedit-page-title page__title mb-0">
//                     Edit <em className="placeholder">{teamDetails.name}</em>
//                     &nbsp; team
//                   </h1>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <main className="main">
//             <div className="page-layout-sidebar-default">
//               <div className="container py-5">
//                 <div className="row">
//                   <div className="page__content col-md">
//                     <div className="hidden" />
//                     <form className="team-form" onSubmit={handleUpdateCompany}>
//                       <div className="field--type-string field--name-displayname field--widget-string-textfield js-form-wrapper form-wrapper">
//                         <div className="js-form-item form-item js-form-type-textfield form-type-textfield form-item-displayname-0-value js-form-item-displayname-0-value form-group">
//                           <label className="js-form-required form-required">
//                             Team name
//                             <i className="fas fa-asterisk text-danger form-required__indicator" />
//                           </label>
//                           <input
//                             className="js-text-full text-full required form-control"
//                             type="text"
//                             value={companyName}
//                             onChange={handleCompanyNameChange}
//                             size={60}
//                             maxLength={255}
//                             placeholder={teamDetails.displayName}
//                             required="required"
//                             aria-required="true"
//                           />
//                           <span className="field-suffix">
//                             <small>&nbsp;</small>
//                           </span>
//                           <small className="description form-text text-muted">
//                             Only lowercase alphanumeric and dashes are allowed.
//                           </small>
//                         </div>
//                       </div>
//                       <div className="field--type-string-long field--name-field-description field--widget-string-textarea js-form-wrapper form-wrapper">
//                         <div className="js-form-item form-item js-form-type-textarea form-type-textarea form-item-field-description-0-value js-form-item-field-description-0-value form-group">
//                           <label htmlFor="edit-field-description-0-value">
//                             Description
//                           </label>
//                           <textarea
//                             className="js-text-full text-full form-textarea form-control"
//                             rows={5}
//                             cols={60}
//                             value={description}
//                             placeholder={descriptionValue}
//                             onChange={handleDescriptionChange}
//                           />
//                         </div>
//                       </div>
//                       <div className="js-form-item form-item js-form-type-machine-name form-type-machine-name form-item-name js-form-item-name form-disabled form-group">
//                         <label className="js-form-required form-required">
//                           Internal name
//                           <i className="fas fa-asterisk text-danger form-required__indicator" />
//                         </label>

//                         <input
//                           disabled="disabled"
//                           dir="ltr"
//                           type="text"
//                           name="name"
//                           value={teamDetails.name}
//                           size={60}
//                           maxLength={64}
//                           className="required form-control"
//                           required="required"
//                           aria-required="true"
//                         />
//                         <small className="description form-text text-muted">
//                           A unique machine-readable name. Only lowercase
//                           alphanumeric and dashes are allowed
//                         </small>
//                       </div>

//                       <div className="field--type-productapi field--name-field-api-product field--widget-productapi js-form-wrapper form-wrapper">
//                         <fieldset className="fieldgroup form-composite js-form-item form-item js-form-wrapper form-wrapper border mb-3">
//                           <legend className="float-left py-2 px-4 mb-0 border-bottom">
//                             <span className="fieldset-legend">
//                               Team product
//                             </span>
//                             <button className="btn-link">
//                               <i className="fas fa-chevron-down d-md-none" />
//                             </button>
//                           </legend>

//                           {serializedData && serializedData.length > 0 && (
//                             <div className="p-4 fieldset-wrapper">
//                               <div className="form-checkboxes">
//                                 {uniqueAttributes.map((val, valIndex) => (
//                                   <div
//                                     key={valIndex}
//                                     className="js-form-item form-item js-form-type-checkbox form-item-field-api-product-0-value-corp-iag-code-token js-form-item-field-api-product-0-value-corp-iag-code-token form-check"
//                                   >
//                                     <ul style={{ padding: 0, margin: 0 }}>
//                                       <li
//                                         key={valIndex}
//                                         style={{ listStyle: "none" }}
//                                       >
//                                         <input
//                                           type="checkbox"
//                                           value={val}
//                                           style={{ marginRight: "0.5em" }}
//                                           checked={selectedAttributes.some(
//                                             (attr) => attr[val]
//                                           )}
//                                           onChange={() =>
//                                             handleAttributeChange(val)
//                                           }
//                                         />
//                                         {val}
//                                       </li>
//                                     </ul>
//                                   </div>
//                                 ))}
//                               </div>
//                             </div>
//                           )}
//                         </fieldset>

//                         <div className="form-actions js-form-wrapper form-wrapper">
//                           <button
//                             className="js-form-submit-modal-init button button--primary js-form-submit form-submit btn btn-primary"
//                             onClick={handleUpdateCompany}
//                           >
//                             Update Team
//                           </button>

//                           <Link to="/" className="btn btn-outline-primary">
//                             Cancel
//                           </Link>
//                         </div>
//                       </div>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </main>
//         </div>
//       </div>
//       {isSuccessAlert && alert(message)}
//     </div>
//   );
// };

// export default UpdateCompanyName;

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, navigate } from "gatsby";
// import { fetchTeams, fetchTeamDetails } from "../../redux/store";

// const UpdateCompanyName = () => {
//   const [companyName, setCompanyName] = useState("");
//   const [description, setDescription] = useState("");
//   const [attributes, setAttributes] = useState([]);
//   const [selectedAttributes, setSelectedAttributes] = useState([]);
//   const [message, setMessage] = useState("");
//   const [isSuccessAlert, setIsSuccessAlert] = useState(false);

//   const teamDetails = useSelector((state) => state.teamDetails);
//   console.log("teamDetails", teamDetails);

//   useEffect(() => {
//     handleUpdateCompany()
//   }, [teamDetails]);

//   const serializedData = teamDetails.attributes;

//   localStorage.setItem("serializedData", JSON.stringify(serializedData));

//   const descriptionValue = teamDetails.attributes.find(
//     (attr) => attr.name === "description"
//   )?.value;

//   const attributeApiValue = teamDetails.attributes.find(
//     (attr) => attr.name === "api_product"
//   )?.value;

//   console.log("attributeApiValue:", attributeApiValue);

//   // const data=JSON.parse(attributeApiValue)
//   // console.log("data",data)

//   console.log("serializedData", serializedData);

//   const unserializedData = serializedData
//     .map((item) => {
//       const regex = /s:\d+:\\\"(.*?)\\\"/g;
//       const matches = item.value.match(regex);
//       if (matches) {
//         return matches.map((match) =>
//           match.replace(/\\\\/g, "\\").replace(/s:\d+:\\\"(.*?)\\\"/, "$1")
//         );
//       }
//       return [];
//     })
//     .flat();
//   console.log("unserializedData", unserializedData);
//   const uniqueAttributes = Array.from(new Set(unserializedData));
//   console.log("uniqueAttributes", uniqueAttributes);

//   useEffect(() => {
//     setCompanyName(teamDetails.displayName);
//     setDescription(descriptionValue || "");
//     const storedSelectedAttributes =
//       JSON.parse(
//         localStorage.getItem(`selectedAttributes_${teamDetails.name}`)
//       ) || [];
//     setSelectedAttributes(storedSelectedAttributes);

//     setAttributes(
//       teamDetails.attributes.find((attr) => attr.name === "api_product")?.value
//     );
//   }, [teamDetails, descriptionValue]);

//   const handleCompanyNameChange = (e) => {
//     setCompanyName(e.target.value);
//   };

//   const handleDescriptionChange = (e) => {
//     setDescription(e.target.value);
//   };
//   const updateSelectedAttributes = (updatedAttributes) => {
//     setSelectedAttributes(updatedAttributes);
//     localStorage.setItem(
//       `selectedAttributes_${teamDetails.name}`,
//       JSON.stringify(updatedAttributes)
//     );
//   };

//   const handleAttributeChange = (attributeValue) => {
//     setSelectedAttributes((prevAttributes) => {
//       const existingIndex = prevAttributes.findIndex(
//         (attr) => attr[attributeValue]
//       );

//       if (existingIndex !== -1) {
//         const updatedAttributes = [...prevAttributes];
//         updatedAttributes.splice(existingIndex, 1); // Remove the existing attribute
//         updateSelectedAttributes(updatedAttributes); // Update selected attributes
//         return updatedAttributes;
//       } else {
//         const newAttribute = { [attributeValue]: attributeValue };
//         const updatedAttributes = [...prevAttributes, newAttribute]; // Add new attribute
//         updateSelectedAttributes(updatedAttributes); // Update selected attributes
//         return updatedAttributes;
//       }
//     });
//   };

//   useEffect(() => {
//     localStorage.setItem(
//       `selectedAttributes_${teamDetails.name}`,
//       JSON.stringify(selectedAttributes)
//     );
//   }, [selectedAttributes, teamDetails]);

//   const handleUpdateCompany = async (e) => {
//     e.preventDefault();

//     if (!companyName.trim()) {
//       setMessage("Please provide a valid company name.");
//       return;
//     }

//     try {
//       const response = await fetch(
//         `https://api.enterprise.apigee.com/v1/organizations/kenpatolia-a7241f81-eval/companies/${teamDetails.name}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
//           },
//           body: JSON.stringify({
//             displayName: companyName,
//             attributes: [
//               {
//                 name: "api_product",
//                 value: attributes,
//               },

//               {
//                 name: "selected_products",
//                 value: JSON.stringify(selectedAttributes),
//               },
//               {
//                 name: "description",
//                 value: description,
//               },
//             ],
//           }),
//         }
//       );

//       if (response.ok) {
//         setIsSuccessAlert(true);
//         setMessage("Display name and description updated successfully!");
//         // navigate("/");
//       } else {
//         setMessage("Failed to update company details.");
//       }
//     } catch (error) {
//       setMessage("An error occurred while updating company details.");
//     }
//   };

//   return (
//     <div>
//       <div className="dialog-off-canvas-main-canvas">
//         <div className="page">
//           <header className="page__header"></header>
//           <div className="page__content-above">
//             <div className="container-fluid px-0">
//               <div className="contextual-region block block--pagetitle bg-lighter py-4">
//                 <div />
//                 <div className="container">
//                   <h1 className="js-quickedit-page-title page__title mb-0">
//                     Edit <em className="placeholder">{teamDetails.name}</em>
//                     &nbsp; team
//                   </h1>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <main className="main">
//             <div className="page-layout-sidebar-default">
//               <div className="container py-5">
//                 <div className="row">
//                   <div className="page__content col-md">
//                     <div className="hidden" />
//                     <form className="team-form" onSubmit={handleUpdateCompany}>
//                       <div className="field--type-string field--name-displayname field--widget-string-textfield js-form-wrapper form-wrapper">
//                         <div className="js-form-item form-item js-form-type-textfield form-type-textfield form-item-displayname-0-value js-form-item-displayname-0-value form-group">
//                           <label className="js-form-required form-required">
//                             Team name
//                             <i className="fas fa-asterisk text-danger form-required__indicator" />
//                           </label>
//                           <input
//                             className="js-text-full text-full required form-control"
//                             type="text"
//                             value={companyName}
//                             onChange={handleCompanyNameChange}
//                             size={60}
//                             maxLength={255}
//                             placeholder={teamDetails.displayName}
//                             required="required"
//                             aria-required="true"
//                           />
//                           <span className="field-suffix">
//                             <small>&nbsp;</small>
//                           </span>
//                           <small className="description form-text text-muted">
//                             Only lowercase alphanumeric and dashes are allowed.
//                           </small>
//                         </div>
//                       </div>
//                       <div className="field--type-string-long field--name-field-description field--widget-string-textarea js-form-wrapper form-wrapper">
//                         <div className="js-form-item form-item js-form-type-textarea form-type-textarea form-item-field-description-0-value js-form-item-field-description-0-value form-group">
//                           <label htmlFor="edit-field-description-0-value">
//                             Description
//                           </label>
//                           <textarea
//                             className="js-text-full text-full form-textarea form-control"
//                             rows={5}
//                             cols={60}
//                             value={description}
//                             placeholder={descriptionValue}
//                             onChange={handleDescriptionChange}
//                           />
//                         </div>
//                       </div>
//                       <div className="js-form-item form-item js-form-type-machine-name form-type-machine-name form-item-name js-form-item-name form-disabled form-group">
//                         <label className="js-form-required form-required">
//                           Internal name
//                           <i className="fas fa-asterisk text-danger form-required__indicator" />
//                         </label>

//                         <input
//                           disabled="disabled"
//                           dir="ltr"
//                           type="text"
//                           name="name"
//                           value={teamDetails.name}
//                           size={60}
//                           maxLength={64}
//                           className="required form-control"
//                           required="required"
//                           aria-required="true"
//                         />
//                         <small className="description form-text text-muted">
//                           A unique machine-readable name. Only lowercase
//                           alphanumeric and dashes are allowed
//                         </small>
//                       </div>

//                       <div className="field--type-productapi field--name-field-api-product field--widget-productapi js-form-wrapper form-wrapper">
//                         <fieldset className="fieldgroup form-composite js-form-item form-item js-form-wrapper form-wrapper border mb-3">
//                           <legend className="float-left py-2 px-4 mb-0 border-bottom">
//                             <span className="fieldset-legend">
//                               Team product
//                             </span>
//                             <button className="btn-link">
//                               <i className="fas fa-chevron-down d-md-none" />
//                             </button>
//                           </legend>

//                           {serializedData && serializedData.length > 0 && (
//                             <div className="p-4 fieldset-wrapper">
//                               <div className="form-checkboxes">
//                                 {uniqueAttributes.map((val, valIndex) => (
//                                   <div
//                                     key={valIndex}
//                                     className="js-form-item form-item js-form-type-checkbox form-item-field-api-product-0-value-corp-iag-code-token js-form-item-field-api-product-0-value-corp-iag-code-token form-check"
//                                   >
//                                     <ul style={{ padding: 0, margin: 0 }}>
//                                       <li
//                                         key={valIndex}
//                                         style={{ listStyle: "none" }}
//                                       >
//                                         <input
//                                           type="checkbox"
//                                           value={val}
//                                           style={{ marginRight: "0.5em" }}
//                                           checked={selectedAttributes.some(
//                                             (attr) => attr[val]
//                                           )}
//                                           onChange={() =>
//                                             handleAttributeChange(val)
//                                           }
//                                         />
//                                         {val}
//                                       </li>
//                                     </ul>
//                                   </div>
//                                 ))}
//                               </div>
//                             </div>
//                           )}
//                         </fieldset>

//                         <div className="form-actions js-form-wrapper form-wrapper">
//                           <button
//                             className="js-form-submit-modal-init button button--primary js-form-submit form-submit btn btn-primary"
//                             onClick={handleUpdateCompany}
//                           >
//                             Update Team
//                           </button>

//                           <Link to="/" className="btn btn-outline-primary">
//                             Cancel
//                           </Link>
//                         </div>
//                       </div>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </main>
//         </div>
//       </div>
//       {isSuccessAlert && alert(message)}
//     </div>
//   );
// };

// export default UpdateCompanyName;

// import { Link } from "gatsby";
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchTeams, fetchTeamDetails } from "../../redux/store";

// const UpdateCompanyName = () => {
//   const teamDetails = useSelector((state) => state.teamDetails);
//   const dispatch = useDispatch();
//   // console.log("teamDetails", teamDetails);

//   // const teamName=teamDetails.name
//   // console.log("teamName",teamName)

//   // useEffect((teamName) => {
//   //   dispatch(fetchTeamDetails(teamName));
//   // }, []);

//   const [companyName, setCompanyName] = useState("");
//   const [description, setDescription] = useState("");
//   const [attributes, setAttributes] = useState("");
//   const [selectedAttributes, setSelectedAttributes] = useState([]);
//   const [isSuccessAlert, setIsSuccessAlert] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleCompanyNameChange = (e) => {
//     setCompanyName(e.target.value);
//   };

//   const handleDescriptionChange = (e) => {
//     setDescription(e.target.value);
//   };

//   const handleAttributeChange = (attributeValue) => {
//     setSelectedAttributes((prevAttributes) => {
//       const existingIndex = prevAttributes.findIndex(
//         (attr) => attr[attributeValue]
//       );

//       if (existingIndex !== -1) {
//         const updatedAttributes = [...prevAttributes];
//         updatedAttributes.splice(existingIndex, 1); // Remove the existing attribute
//         return updatedAttributes;
//       } else {
//         const newAttribute = { [attributeValue]: attributeValue };
//         const updatedAttributes = [...prevAttributes, newAttribute]; // Add new attribute
//         return updatedAttributes;
//       }
//     });
//   };

//   const updateSelectedAttributes = (updatedAttributes) => {
//     setSelectedAttributes(updatedAttributes);
//     localStorage.setItem(
//       `selectedAttributes_${teamDetails.name}`,
//       JSON.stringify(updatedAttributes)
//     );
//   };

//   const handleUpdateCompany = async (e) => {
//     e.preventDefault();

//     if (!companyName.trim()) {
//       setMessage("Please provide a valid company name.");
//       return;
//     }

//     try {
//       const response = await fetch(
//         `https://api.enterprise.apigee.com/v1/organizations/kenpatolia-a7241f81-eval/companies/${teamDetails.name}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
//           },
//           body: JSON.stringify({
//             displayName: companyName,
//             attributes: [
//               {
//                 name: "api_product",
//                 value: attributes,
//               },
//               {
//                 name: "selected_products",
//                 value: JSON.stringify(selectedAttributes),
//               },
//               {
//                 name: "description",
//                 value: description,
//               },
//             ],
//           }),
//         }
//       );

//       if (response.ok) {
//         setIsSuccessAlert(true);
//         setMessage("Display name and description updated successfully!");
//       } else {
//         setMessage("Failed to update company details.");
//       }
//     } catch (error) {
//       setMessage("An error occurred while updating company details.");
//     }
//   };

//   useEffect(() => {
//     const storedSelectedAttributes =
//       JSON.parse(
//         localStorage.getItem(`selectedAttributes_${teamDetails.name}`)
//       ) || [];
//     setSelectedAttributes(storedSelectedAttributes);
//     setCompanyName(teamDetails.displayName);
//     setDescription(descriptionValue || "");
//     setAttributes(
//       teamDetails.attributes.find((attr) => attr.name === "api_product")?.value
//     );
//   }, [teamDetails]);

//   useEffect(() => {
//     localStorage.setItem(
//       `selectedAttributes_${teamDetails.name}`,
//       JSON.stringify(selectedAttributes)
//     );
//   }, [selectedAttributes, teamDetails]);

//   const serializedData = teamDetails.attributes;
//   localStorage.setItem("serializedData", JSON.stringify(serializedData));

//   const descriptionValue = teamDetails.attributes.find(
//     (attr) => attr.name === "description"
//   )?.value;

//   const attributeApiValue = teamDetails.attributes.find(
//     (attr) => attr.name === "api_product"
//   )?.value;

//   const unserializedData = serializedData
//     .map((item) => {
//       const regex = /s:\d+:\\\"(.*?)\\\"/g;
//       const matches = item.value.match(regex);
//       if (matches) {
//         return matches.map((match) =>
//           match.replace(/\\\\/g, "\\").replace(/s:\d+:\\\"(.*?)\\\"/, "$1")
//         );
//       }
//       return [];
//     })
//     .flat();
//   const uniqueAttributes = Array.from(new Set(unserializedData));
//   return (
//     <div>
//       <div className="dialog-off-canvas-main-canvas">
//         <div className="page">
//           <header className="page__header"></header>
//           <div className="page__content-above">
//             <div className="container-fluid px-0">
//               <div className="contextual-region block block--pagetitle bg-lighter py-4">
//                 <div />
//                 <div className="container">
//                   <h1 className="js-quickedit-page-title page__title mb-0">
//                     Edit <em className="placeholder">{teamDetails.name}</em>
//                     &nbsp; team
//                   </h1>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <main className="main">
//             <div className="page-layout-sidebar-default">
//               <div className="container py-5">
//                 <div className="row">
//                   <div className="page__content col-md">
//                     <div className="hidden" />
//                     <form className="team-form" onSubmit={handleUpdateCompany}>
//                       <div className="field--type-string field--name-displayname field--widget-string-textfield js-form-wrapper form-wrapper">
//                         <div className="js-form-item form-item js-form-type-textfield form-type-textfield form-item-displayname-0-value js-form-item-displayname-0-value form-group">
//                           <label className="js-form-required form-required">
//                             Team name
//                             <i className="fas fa-asterisk text-danger form-required__indicator" />
//                           </label>
//                           <input
//                             className="js-text-full text-full required form-control"
//                             type="text"
//                             value={companyName}
//                             onChange={handleCompanyNameChange}
//                             size={60}
//                             maxLength={255}
//                             placeholder={teamDetails.displayName}
//                             required="required"
//                             aria-required="true"
//                           />
//                           <span className="field-suffix">
//                             <small>&nbsp;</small>
//                           </span>
//                           <small className="description form-text text-muted">
//                             Only lowercase alphanumeric and dashes are allowed.
//                           </small>
//                         </div>
//                       </div>
//                       <div className="field--type-string-long field--name-field-description field--widget-string-textarea js-form-wrapper form-wrapper">
//                         <div className="js-form-item form-item js-form-type-textarea form-type-textarea form-item-field-description-0-value js-form-item-field-description-0-value form-group">
//                           <label htmlFor="edit-field-description-0-value">
//                             Description
//                           </label>
//                           <textarea
//                             className="js-text-full text-full form-textarea form-control"
//                             rows={5}
//                             cols={60}
//                             value={description}
//                             placeholder={descriptionValue}
//                             onChange={handleDescriptionChange}
//                           />
//                         </div>
//                       </div>
//                       <div className="js-form-item form-item js-form-type-machine-name form-type-machine-name form-item-name js-form-item-name form-disabled form-group">
//                         <label className="js-form-required form-required">
//                           Internal name
//                           <i className="fas fa-asterisk text-danger form-required__indicator" />
//                         </label>

//                         <input
//                           disabled="disabled"
//                           dir="ltr"
//                           type="text"
//                           name="name"
//                           value={teamDetails.name}
//                           size={60}
//                           maxLength={64}
//                           className="required form-control"
//                           required="required"
//                           aria-required="true"
//                         />
//                         <small className="description form-text text-muted">
//                           A unique machine-readable name. Only lowercase
//                           alphanumeric and dashes are allowed
//                         </small>
//                       </div>

//                       <div className="field--type-productapi field--name-field-api-product field--widget-productapi js-form-wrapper form-wrapper">
//                         <fieldset className="fieldgroup form-composite js-form-item form-item js-form-wrapper form-wrapper border mb-3">
//                           <legend className="float-left py-2 px-4 mb-0 border-bottom">
//                             <span className="fieldset-legend">
//                               Team product
//                             </span>
//                             <button className="btn-link">
//                               <i className="fas fa-chevron-down d-md-none" />
//                             </button>
//                           </legend>

//                           {serializedData && serializedData.length > 0 && (
//                             <div className="p-4 fieldset-wrapper">
//                               <div className="form-checkboxes">
//                                 {uniqueAttributes.map((val, valIndex) => (
//                                   <div
//                                     key={valIndex}
//                                     className="js-form-item form-item js-form-type-checkbox form-item-field-api-product-0-value-corp-iag-code-token js-form-item-field-api-product-0-value-corp-iag-code-token form-check"
//                                   >
//                                     <ul style={{ padding: 0, margin: 0 }}>
//                                       <li
//                                         key={valIndex}
//                                         style={{ listStyle: "none" }}
//                                       >
//                                         <input
//                                           type="checkbox"
//                                           value={val}
//                                           style={{ marginRight: "0.5em" }}
//                                           checked={selectedAttributes.some(
//                                             (attr) => attr[val]
//                                           )}
//                                           onChange={() =>
//                                             handleAttributeChange(val)
//                                           }
//                                         />
//                                         {val}
//                                       </li>
//                                     </ul>
//                                   </div>
//                                 ))}
//                               </div>
//                             </div>
//                           )}
//                         </fieldset>

//                         <div className="form-actions js-form-wrapper form-wrapper">
//                           <button
//                             className="js-form-submit-modal-init button button--primary js-form-submit form-submit btn btn-primary"
//                             onClick={handleUpdateCompany}
//                           >
//                             Update Team
//                           </button>

//                           <Link to="/" className="btn btn-outline-primary">
//                             Cancel
//                           </Link>
//                         </div>
//                       </div>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </main>
//         </div>
//       </div>
//       {isSuccessAlert && alert(message)}
//     </div>
//   );
// };

// export default UpdateCompanyName;

// import { Link } from "gatsby";
// import React, { useState, useEffect } from "react";
// import {  useSelector } from "react-redux";
// import Layout from "../Layout";
// import Buttons from "../Buttons/Buttons";
// const axios = require('axios');

// const UpdateCompanyName = () => {
//   const teamDetails = useSelector((state) => state.teamDetails);

//   const [companyName, setCompanyName] = useState("");
//   const [description, setDescription] = useState("");
//   const [apiData, setApiData] = useState([]);
//   const [selectedAttributes, setSelectedAttributes] = useState([]);
//   const [message, setMessage] = useState("");
//   const [checkedAttributes, setCheckedAttributes] = useState([]);

//   const handleCompanyNameChange = (e) => {
//     setCompanyName(e.target.value);
//   };

//   const handleDescriptionChange = (e) => {
//     setDescription(e.target.value);
//   };

//   const handleUpdateCompany = async (e) => {
//     e.preventDefault();

//     if (!companyName.trim()) {
//       alert("Please provide a valid company name.");
//       return;
//     }

//     try {
//       const serializedApiProduct = serializeData.join(",");
//       const response = await fetch(
//         `https://api.enterprise.apigee.com/v1/organizations/kenpatolia-a7241f81-eval/companies/${teamDetails.name}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
//           },
//           body: JSON.stringify({
//             displayName: companyName,
//             attributes: [
//               {
//                 name: "api_product",
//                 value: serializedApiProduct,
//               },

//               {
//                 name: "description",
//                 value: description,
//               },
//             ],
//           }),
//         }
//       );

//       if (response.ok) {

//         alert(serializedApiProduct);
//         alert("Display name and description updated successfully!");
//       } else {
//         alert("Failed to update company details.");
//       }
//     } catch (error) {
//       alert("An error occurred while updating company details.");
//     }
//   };

//   useEffect(() => {
//     fetchApiProducts();
//   }, []);

//   const fetchApiProducts = () => {
//     const apiUrl = `https://api.enterprise.apigee.com/v1/organizations/kenpatolia-a7241f81-eval/apiproducts`;
//     const bearerToken = process.env.BEARER_TOKEN;
//     const headers = {
//       Authorization: `Bearer ${bearerToken}`,
//     };

//     axios
//       .get(apiUrl, { headers })
//       .then((response) => {
//         const apiData = response.data;
//         console.log('apiproducts Response Data:', apiData);

//         setApiData(apiData); // Set API data in state

//       })
//       .catch((error) => {
//         console.error('apiproducts Request Error:', error);
//       });
//   };

//   const handleAttributeChange = (attributeValue) => {
//     setSelectedAttributes((prevAttributes) => {
//       console.log("Updated selectedAttributes:", selectedAttributes);
//       if (prevAttributes.includes(attributeValue)) {
//         return prevAttributes.filter((attr) => attr !== attributeValue);
//       } else {
//         return [...prevAttributes, attributeValue];
//       }
//     });
//   };

//   const updateSelectedAttributes = (updatedAttributes) => {
//     console.log("Updated updatedAttributes:", updatedAttributes);
//     setSelectedAttributes(updatedAttributes);

//     localStorage.setItem(
//       `selectedAttributes_${teamDetails.name}`,
//       JSON.stringify(updatedAttributes)
//     );
//   };

//   const handleCheckboxChange = (attribute) => {
//     setCheckedAttributes((prevChecked) => {
//       if (prevChecked.includes(attribute)) {
//         return prevChecked.filter((attr) => attr !== attribute);
//       } else {
//         return [...prevChecked, attribute];
//       }
//     });
//   };

//   useEffect(() => {
//     // const storedSelectedAttributes =
//     //   JSON.parse(
//     //     localStorage.getItem(`selectedAttributes_${teamDetails.name}`)
//     //   ) || [];
//     // setSelectedAttributes(storedSelectedAttributes);
//     setCompanyName(teamDetails.displayName);
//     setDescription(descriptionValue || "");

//     // Check initial duplicate items in checkboxes
//     const initialCheckedAttributes = uniqueAttributes.filter(attr =>
//       duplicateItems.includes(attr)
//     );
//     setCheckedAttributes(initialCheckedAttributes);

//     // Set selected attributes from local storage
//     const storedSelectedAttributes =
//       JSON.parse(
//         localStorage.getItem(`selectedAttributes_${teamDetails.name}`)
//       ) || [];
//     setSelectedAttributes(storedSelectedAttributes);
//   }, [teamDetails]);

//   const descriptionValue = teamDetails.attributes.find(
//     (attr) => attr.name === "description"
//   )?.value;

//   // const products = teamDetails.attributes.find(
//   //   (attr) => attr.name === "api_product"
//   // )?.value;
//   // console.log("products", products);

//   //set to localstorage
//   // const localStorage_products = products;
//   // localStorage.setItem("localstorage", JSON.stringify(localStorage_products));

//   // const api_product = ["api_product", products];
//   // // console.log("api_product", api_product);

//   // const array1 = [{ products }];
//   // // console.log("array1", array1);

// // //unserializedData Data
// //   const unserializedData = array1
// //     .map((item) => {
// //       const regex = /s:\d+:\\\"(.*?)\\\"/g;
// //       const matches = item.products.match(regex);
// //       if (matches) {
// //         return matches.map((match) =>
// //           match.replace(/\\\\/g, "\\").replace(/s:\d+:\\\"(.*?)\\\"/, "$1")
// //         );
// //       }
// //       return [];
// //     })
// //     .flat();
// //   console.log("unserializedData", unserializedData);

// // console.log("sigucud",apiData)
// //unique in array
// const filteredData = apiData.filter((attr) => attr !== "0");
//   const uniqueAttributes = Array.from(new Set(filteredData));
//   console.log("uniqueAttributes", uniqueAttributes);

//   //find duplicate in array
//   const findDuplicates = (apiData) => {
//     const duplicates = {};
//     const duplicateItems = [];

//     apiData.forEach((item) => {
//       if (!duplicates[item]) {
//         duplicates[item] = 1;
//       } else {
//         duplicates[item]++;
//       }
//     });

//     Object.entries(duplicates).forEach(([item, count]) => {
//       if (count > 1) {
//         duplicateItems.push(item);
//       }
//     });

//     return duplicateItems;
//   };

//   const duplicateItems = findDuplicates(apiData);

//   console.log("Duplicate Items:", duplicateItems);

//   const mergedArray = [...selectedAttributes, ...checkedAttributes];
//   const selected_attribute = Array.from(new Set(mergedArray));

//   console.log("selected_attribute", selected_attribute);

//   const unselected_attributes = uniqueAttributes.filter(
//     (attr) => !selected_attribute.includes(attr)
//   );
//   console.log("Unselected Attributes:", unselected_attributes);

//   const formatted_selected_attribute = selected_attribute.map((attr) => ({
//     [attr]: attr,
//   }));

//   const formatted_unselected_attribute = unselected_attributes.map((attr) => ({
//     [attr]: "0",
//   }));

// console.log(formatted_unselected_attribute);

//   const final_Output = [
//     ...formatted_selected_attribute,
//     ...formatted_unselected_attribute,
//   ];
//   const final_Output1 = JSON.stringify(final_Output, null, 2);
//   console.log("Final Output1:", final_Output1);

//   const parsed_Final_Output1 = JSON.parse(final_Output1);

//   // const serializeData = parsed_Final_Output1.map((item) => {
//   //   const key = Object.keys(item)[0];
//   //   const value = item[key];
//   //   const serializedItem = `s:${key.length}:\\"${key}\\":s:${value.length}:\\"${value}\\"`;
//   //   const serializedValue = serializedItem.replace(/\\/g, '\\');
//   //   return serializedValue.replace(new RegExp(`:${value.length}:"0"`, 'g'), `:${value.length}:"${value}"`);
//   // });
//   const serializeData = parsed_Final_Output1.map((item) => {
//     const key = Object.keys(item)[0];
//     const value = item[key];
//     const serializedKey = `s:${key.length}:\\"${key}\\"`;
//     const serializedValue = `s:${value.length}:\\"${value}\\"`;
//     return `${serializedKey}:${serializedValue}`;
//   });

//   console.log("Serialized Data:", serializeData);

// // const formatted_selected_attribute = selected_attribute.map((attr) => ({
// //   [attr]: attr,
// // }));

// // const formatted_unselected_attribute = unselected_attributes.map((attr) => ({
// //   [attr]: attr,
// // }));

// // const final_Output = [
// //   ...formatted_selected_attribute,
// //   ...formatted_unselected_attribute,
// // ];

// // const serializeData = final_Output.map((item) => {
// //   const key = Object.keys(item)[0];
// //   const serializedKey = `s:${key.length}:"${key}"`;

// //   // If there's a value associated with the key, serialize it
// //   if (item[key]) {
// //     const value = item[key];
// //     const serializedValue = `s:${value.length}:"${value}"`;
// //     return `${serializedKey}:${serializedValue}`;
// //   } else {
// //     return serializedKey;
// //   }
// // });

// // console.log("Serialized Data1:", serializeData);

//   const serializedApiProduct22 = serializeData.join(",");
//   console.log("serializedApiProduct22", serializedApiProduct22);
//   return (
//     <Layout>
//     <div>
//     <Buttons/>
//       <div className="dialog-off-canvas-main-canvas">
//         <div className="page">
//           <header className="page__header"></header>
//           <div className="page__content-above">
//             <div className="container-fluid px-0">
//               <div className="contextual-region block block--pagetitle bg-lighter py-4">
//                 <div />
//                 <div className="container">
//                   <h1 className="js-quickedit-page-title page__title mb-0">
//                     Edit <em className="placeholder">{teamDetails.name}</em>
//                     &nbsp; team
//                   </h1>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <main className="main">
//             <div className="page-layout-sidebar-default">
//               <div className="container py-5">
//                 <div className="row">
//                   <div className="page__content col-md">
//                     <div className="hidden" />
//                     <form className="team-form" onSubmit={handleUpdateCompany}>
//                       <div className="field--type-string field--name-displayname field--widget-string-textfield js-form-wrapper form-wrapper">
//                         <div className="js-form-item form-item js-form-type-textfield form-type-textfield form-item-displayname-0-value js-form-item-displayname-0-value form-group">
//                           <label className="js-form-required form-required">
//                             Team name
//                             <i className="fas fa-asterisk text-danger form-required__indicator" />
//                           </label>
//                           <input
//                             className="js-text-full text-full required form-control"
//                             type="text"
//                             value={companyName}
//                             onChange={handleCompanyNameChange}
//                             size={60}
//                             maxLength={255}
//                             placeholder={teamDetails.displayName}
//                             required="required"
//                             aria-required="true"
//                           />
//                           <span className="field-suffix">
//                             <small>&nbsp;</small>
//                           </span>
//                           <small className="description form-text text-muted">
//                             Only lowercase alphanumeric and dashes are allowed.
//                           </small>
//                         </div>
//                       </div>
//                       <div className="field--type-string-long field--name-field-description field--widget-string-textarea js-form-wrapper form-wrapper">
//                         <div className="js-form-item form-item js-form-type-textarea form-type-textarea form-item-field-description-0-value js-form-item-field-description-0-value form-group">
//                           <label htmlFor="edit-field-description-0-value">
//                             Description
//                           </label>
//                           <textarea
//                             className="js-text-full text-full form-textarea form-control"
//                             rows={5}
//                             cols={60}
//                             value={description}
//                             placeholder={descriptionValue}
//                             onChange={handleDescriptionChange}
//                           />
//                         </div>
//                       </div>
//                       <div className="js-form-item form-item js-form-type-machine-name form-type-machine-name form-item-name js-form-item-name form-disabled form-group">
//                         <label className="js-form-required form-required">
//                           Internal name
//                           <i className="fas fa-asterisk text-danger form-required__indicator" />
//                         </label>

//                         <input
//                           disabled="disabled"
//                           dir="ltr"
//                           type="text"
//                           name="name"
//                           value={teamDetails.name}
//                           size={60}
//                           maxLength={64}
//                           className="required form-control"
//                           required="required"
//                           aria-required="true"
//                         />
//                         <small className="description form-text text-muted">
//                           A unique machine-readable name. Only lowercase
//                           alphanumeric and dashes are allowed
//                         </small>
//                       </div>

//                       <div className="field--type-productapi field--name-field-api-product field--widget-productapi js-form-wrapper form-wrapper">
//                         <fieldset className="fieldgroup form-composite js-form-item form-item js-form-wrapper form-wrapper border mb-3">
//                           <legend className="float-left py-2 px-4 mb-0 border-bottom">
//                             <span className="fieldset-legend">
//                               Team product
//                             </span>
//                             <button className="btn-link">
//                               <i className="fas fa-chevron-down d-md-none" />
//                             </button>
//                           </legend>

//                           {apiData && apiData.length > 0 && (
//                             <div className="p-4 fieldset-wrapper">
//                               <div className="form-checkboxes">
//                                 {uniqueAttributes.map((val, valIndex) => (
//                                   <div
//                                     key={valIndex}
//                                     className="js-form-item form-item js-form-type-checkbox form-item-field-api-product-0-value-corp-iag-code-token js-form-item-field-api-product-0-value-corp-iag-code-token form-check"
//                                   >
//                                     <ul style={{ padding: 0, margin: 0 }}>
//                                       <li
//                                         key={valIndex}
//                                         style={{ listStyle: "none" }}
//                                       >
//                                         <input
//                                           type="checkbox"
//                                           value={val}
//                                           style={{ marginRight: "0.5em" }}
//                                           checked={checkedAttributes.includes(
//                                             val
//                                           )}
//                                           onChange={() =>
//                                             handleCheckboxChange(val)
//                                           }
//                                         />
//                                         {val}
//                                       </li>
//                                     </ul>
//                                   </div>
//                                 ))}
//                               </div>
//                             </div>
//                           )}
//                         </fieldset>

//                         <div className="form-actions js-form-wrapper form-wrapper">
//                           <button
//                             className="js-form-submit-modal-init button button--primary js-form-submit form-submit btn btn-primary"
//                             onClick={handleUpdateCompany}
//                           >
//                             Update Team
//                           </button>

//                           <Link to="/" className="btn btn-outline-primary">
//                             Cancel
//                           </Link>
//                         </div>
//                       </div>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </main>
//         </div>
//       </div>

//     </div>
//     </Layout>
//   );
// };

// export default UpdateCompanyName;

// import { Link } from "gatsby";
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Layout from "../Layout";
// import Buttons from "../Buttons/Buttons";
// import {  fetchTeamDetails } from "../../redux/store";
// const axios = require("axios");

// const UpdateCompanyName = () => {
//   const dispatch = useDispatch();
//   const teamDetails = useSelector((state) => state.teamDetails);
//   const team=teamDetails.name
//   console.log("team",team)

//   useEffect(() => {
//     dispatch(fetchTeamDetails(team));

//   }, [dispatch]);

//   const [companyName, setCompanyName] = useState("");
//   const [description, setDescription] = useState("");
//   const [apiData, setApiData] = useState([]);
//   const [selectedAttributes, setSelectedAttributes] = useState([]);
//   const [message, setMessage] = useState("");
//   const [checkedAttributes, setCheckedAttributes] = useState([]);

//   const handleCompanyNameChange = (e) => {
//     setCompanyName(e.target.value);
//   };

//   const handleDescriptionChange = (e) => {
//     setDescription(e.target.value);
//   };

//   const handleUpdateCompany = async (e) => {
//     e.preventDefault();

//     if (!companyName.trim()) {
//       alert("Please provide a valid company name.");
//       return;
//     }

//     try {
//       const serializedApiProduct = serializeData.join(",");
//       const response = await fetch(
//         `https://api.enterprise.apigee.com/v1/organizations/kenpatolia-a7241f81-eval/companies/${teamDetails.name}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
//           },
//           body: JSON.stringify({
//             displayName: companyName,
//             attributes: [
//               {
//                 name: "api_product",
//                 value: serializedApiProduct,
//               },

//               {
//                 name: "description",
//                 value: description,
//               },
//             ],
//           }),
//         }
//       );

//       if (response.ok) {
//         alert(serializedApiProduct);
//         alert("Display name and description updated successfully!");
//       } else {
//         alert("Failed to update company details.");
//       }
//     } catch (error) {
//       alert("An error occurred while updating company details.");
//     }
//   };

//   const handleAttributeChange = (attributeValue) => {
//     setSelectedAttributes((prevAttributes) => {
//       if (prevAttributes.includes(attributeValue)) {
//         return prevAttributes.filter((attr) => attr !== attributeValue);
//       } else {
//         return [...prevAttributes, attributeValue];
//       }
//     });
//   };

//   const updateSelectedAttributes = (updatedAttributes) => {
//     setSelectedAttributes(updatedAttributes);
//     localStorage.setItem(
//       `selectedAttributes_${teamDetails.name}`,
//       JSON.stringify(updatedAttributes)
//     );
//   };

//   const handleCheckboxChange = (attribute) => {
//     setCheckedAttributes((prevChecked) => {
//       if (prevChecked.includes(attribute)) {
//         return prevChecked.filter((attr) => attr !== attribute);
//       } else {
//         return [...prevChecked, attribute];
//       }
//     });
//   };

//   useEffect(() => {
//     fetchApiProducts();
//   }, []);

//   const fetchApiProducts = () => {
//     const apiUrl = `https://api.enterprise.apigee.com/v1/organizations/kenpatolia-a7241f81-eval/apiproducts`;
//     const bearerToken = process.env.BEARER_TOKEN;
//     const headers = {
//       Authorization: `Bearer ${bearerToken}`,
//     };

//     axios
//       .get(apiUrl, { headers })
//       .then((response) => {
//         const apiData = response.data;
//         setApiData(apiData);
//       })
//       .catch((error) => {
//         console.error("apiproducts Request Error:", error);
//       });
//   };

//   const descriptionValue = teamDetails.attributes.find(
//     (attr) => attr.name === "description"
//   )?.value;

//   const filteredData = apiData.filter((attr) => attr !== "0");
//   const uniqueAttributes = Array.from(new Set(filteredData));
//   console.log("uniqueAttributes", uniqueAttributes);

//     const products = teamDetails.attributes.find(
//     (attr) => attr.name === "api_product"
//   )?.value;
//   console.log("products", products);

//   // //set to localstorage
//   // const localStorage_products = products;
//   // localStorage.setItem("localstorage", JSON.stringify(localStorage_products));

//   const api_product = ["api_product", products];
//   // console.log("api_product", api_product);

//   const array1 = [{ products }];
//   // console.log("array1", array1);

// //unserializedData Data
//   const unserializedData = array1
//     .map((item) => {
//       const regex = /s:\d+:\\\"(.*?)\\\"/g;
//       const matches = item.products.match(regex);
//       if (matches) {
//         return matches.map((match) =>
//           match.replace(/\\\\/g, "\\").replace(/s:\d+:\\\"(.*?)\\\"/, "$1")
//         );
//       }
//       return [];
//     })
//     .flat();
//   console.log("unserializedData", unserializedData)

//   const findDuplicates = (apiData) => {
//     const duplicates = {};
//     const duplicateItems = [];

//     apiData.forEach((item) => {
//       if (!duplicates[item]) {
//         duplicates[item] = 1;
//       } else {
//         duplicates[item]++;
//       }
//     });

//     Object.entries(duplicates).forEach(([item, count]) => {
//       if (count > 1) {
//         duplicateItems.push(item);
//       }
//     });

//     return duplicateItems;
//   };
//   const duplicateItems = findDuplicates(unserializedData);
//   console.log("duplicateItems",duplicateItems)

//   useEffect(() => {
//     const filteredData = apiData.filter((attr) => attr !== "0");
//     const uniqueAttributes = Array.from(new Set(filteredData));

//     const initialCheckedAttributes = uniqueAttributes.filter((attr) =>
//       duplicateItems.includes(attr)
//     );
//     setCheckedAttributes(initialCheckedAttributes);

//     const storedSelectedAttributes =
//       JSON.parse(
//         localStorage.getItem(`selectedAttributes_${teamDetails.name}`)
//       ) || [];
//     setSelectedAttributes(storedSelectedAttributes);
//   }, [teamDetails, apiData]);

//   useEffect(() => {
//     setCompanyName(teamDetails.displayName);

//     const descriptionValue = teamDetails.attributes.find(
//       (attr) => attr.name === "description"
//     )?.value;
//     setDescription(descriptionValue || "");

//     // Rest of your code...
//   }, [teamDetails, apiData]);

//   const mergedArray = [...selectedAttributes, ...checkedAttributes];
//   const selected_attribute = Array.from(new Set(mergedArray));

//   const unselected_attributes = uniqueAttributes.filter(
//     (attr) => !selected_attribute.includes(attr)
//   );
// console.log("unselected_attributes",unselected_attributes)
//   const formatted_selected_attribute = selected_attribute.map((attr) => ({
//     [attr]: attr,
//   }));
// console.log("formatted_selected_attribute",formatted_selected_attribute)
//   const formatted_unselected_attribute = unselected_attributes.map((attr) => ({
//     [attr]: "0",
//   }));
// console.log("formatted_unselected_attribute",formatted_unselected_attribute)
//   const final_Output = [
//     ...formatted_selected_attribute,
//     ...formatted_unselected_attribute,
//   ];

//   const parsed_Final_Output1 = JSON.parse(
//     JSON.stringify(final_Output, null, 2)
//   );

//   const serializeData = parsed_Final_Output1.map((item) => {
//     const key = Object.keys(item)[0];
//     const value = item[key];
//     const serializedKey = `s:${key.length}:\\"${key}\\"`;
//     const serializedValue = `s:${value.length}:\\"${value}\\"`;
//     return `${serializedKey}:${serializedValue}`;
//   });

//   const serializedApiProduct22 = serializeData.join(",");
//   return (
//     <Layout>
//       <div>
//         <Buttons />
//         <div className="dialog-off-canvas-main-canvas">
//           <div className="page">
//             <header className="page__header"></header>
//             <div className="page__content-above">
//               <div className="container-fluid px-0">
//                 <div className="contextual-region block block--pagetitle bg-lighter py-4">
//                   <div />
//                   <div className="container">
//                     <h1 className="js-quickedit-page-title page__title mb-0">
//                       Edit <em className="placeholder">{teamDetails.name}</em>
//                       &nbsp; team
//                     </h1>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <main className="main">
//               <div className="page-layout-sidebar-default">
//                 <div className="container py-5">
//                   <div className="row">
//                     <div className="page__content col-md">
//                       <div className="hidden" />
//                       <form
//                         className="team-form"
//                         onSubmit={handleUpdateCompany}
//                       >
//                         <div className="field--type-string field--name-displayname field--widget-string-textfield js-form-wrapper form-wrapper">
//                           <div className="js-form-item form-item js-form-type-textfield form-type-textfield form-item-displayname-0-value js-form-item-displayname-0-value form-group">
//                             <label className="js-form-required form-required">
//                               Team name
//                               <i className="fas fa-asterisk text-danger form-required__indicator" />
//                             </label>
//                             <input
//                               className="js-text-full text-full required form-control"
//                               type="text"
//                               value={companyName}
//                               onChange={handleCompanyNameChange}
//                               size={60}
//                               maxLength={255}
//                               placeholder={teamDetails.displayName}
//                               required="required"
//                               aria-required="true"
//                             />
//                             <span className="field-suffix">
//                               <small>&nbsp;</small>
//                             </span>
//                             <small className="description form-text text-muted">
//                               Only lowercase alphanumeric and dashes are
//                               allowed.
//                             </small>
//                           </div>
//                         </div>
//                         <div className="field--type-string-long field--name-field-description field--widget-string-textarea js-form-wrapper form-wrapper">
//                           <div className="js-form-item form-item js-form-type-textarea form-type-textarea form-item-field-description-0-value js-form-item-field-description-0-value form-group">
//                             <label htmlFor="edit-field-description-0-value">
//                               Description
//                             </label>
//                             <textarea
//                               className="js-text-full text-full form-textarea form-control"
//                               rows={5}
//                               cols={60}
//                               value={description}
//                               placeholder={descriptionValue}
//                               onChange={handleDescriptionChange}
//                             />
//                           </div>
//                         </div>
//                         <div className="js-form-item form-item js-form-type-machine-name form-type-machine-name form-item-name js-form-item-name form-disabled form-group">
//                           <label className="js-form-required form-required">
//                             Internal name
//                             <i className="fas fa-asterisk text-danger form-required__indicator" />
//                           </label>

//                           <input
//                             disabled="disabled"
//                             dir="ltr"
//                             type="text"
//                             name="name"
//                             value={teamDetails.name}
//                             size={60}
//                             maxLength={64}
//                             className="required form-control"
//                             required="required"
//                             aria-required="true"
//                           />
//                           <small className="description form-text text-muted">
//                             A unique machine-readable name. Only lowercase
//                             alphanumeric and dashes are allowed
//                           </small>
//                         </div>

//                         <div className="field--type-productapi field--name-field-api-product field--widget-productapi js-form-wrapper form-wrapper">
//                           <fieldset className="fieldgroup form-composite js-form-item form-item js-form-wrapper form-wrapper border mb-3">
//                             <legend className="float-left py-2 px-4 mb-0 border-bottom">
//                               <span className="fieldset-legend">
//                                 Team product
//                               </span>
//                               <button className="btn-link">
//                                 <i className="fas fa-chevron-down d-md-none" />
//                               </button>
//                             </legend>

//                             {apiData && apiData.length > 0 && (
//                               <div className="p-4 fieldset-wrapper">
//                                 <div className="form-checkboxes">
//                                   {uniqueAttributes.map((val, valIndex) => (
//                                     <div
//                                       key={valIndex}
//                                       className="js-form-item form-item js-form-type-checkbox form-item-field-api-product-0-value-corp-iag-code-token js-form-item-field-api-product-0-value-corp-iag-code-token form-check"
//                                     >
//                                       <ul style={{ padding: 0, margin: 0 }}>
//                                         <li
//                                           key={valIndex}
//                                           style={{ listStyle: "none" }}
//                                         >
//                                           <input
//                                             type="checkbox"
//                                             value={val}
//                                             style={{ marginRight: "0.5em" }}
//                                             checked={checkedAttributes.includes(
//                                               val
//                                             )}
//                                             onChange={() =>
//                                               handleCheckboxChange(val)
//                                             }
//                                           />
//                                           {val}
//                                         </li>
//                                       </ul>
//                                     </div>
//                                   ))}
//                                 </div>
//                               </div>
//                             )}
//                           </fieldset>

//                           <div className="form-actions js-form-wrapper form-wrapper">
//                             <button
//                               className="js-form-submit-modal-init button button--primary js-form-submit form-submit btn btn-primary"
//                               onClick={handleUpdateCompany}
//                             >
//                               Update Team
//                             </button>

//                             <Link to="/" className="btn btn-outline-primary">
//                               Cancel
//                             </Link>
//                           </div>
//                         </div>
//                       </form>
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

// export default UpdateCompanyName;





























// import { Link } from "gatsby";
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Layout from "../Layout";
// import Buttons from "../Buttons/Buttons";
// import { fetchTeamDetails,apiProducts } from "../../redux/store";


// const UpdateCompanyName = () => {
//   const dispatch = useDispatch();
//   const teamDetails = useSelector((state) => state.teamDetails);
//   console.log("teamDetails",teamDetails)
//   const team = teamDetails.name;
//   console.log("team", team);


//   const apiproducts = useSelector((state) => state.apiProducts);
//   console.log("apiproducts",apiproducts)

//   useEffect(() => {
//     dispatch(apiProducts());
//   }, [dispatch]);


//   useEffect(() => {
//     dispatch(fetchTeamDetails(team));
//   }, [dispatch]);

//   const [companyName, setCompanyName] = useState("");
//   const [description, setDescription] = useState("");
//   const [selectedAttributes, setSelectedAttributes] = useState([]);
//   const [message, setMessage] = useState("");
//   const [checkedAttributes, setCheckedAttributes] = useState([]);
  

//   const handleCompanyNameChange = (e) => {
//     setCompanyName(e.target.value);
//   };

//   const handleDescriptionChange = (e) => {
//     setDescription(e.target.value);
//   };

//   const handleUpdateCompany = async (e) => {
//     e.preventDefault();

//     if (!companyName.trim()) {
//       alert("Please provide a valid company name.");
//       return;
//     }

//     try {
//       const serializedApiProduct = serializeData.join(",");
//       const response = await fetch(
//         `https://apigee.googleapis.com/v1/organizations/sbux-portal-dev/companies/${teamDetails.name}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
//           },
//           body: JSON.stringify({
//             displayName: companyName,
//             attributes: [
//               {
//                 name: "api_product",
//                 value: serializedApiProduct,
//               },

//               {
//                 name: "description",
//                 value: description,
//               },
//             ],
//           }),
//         }
//       );

//       if (response.ok) {
//         // alert(serializedApiProduct);
//         alert("Display name and description updated successfully!");
//       } else {
//         alert("Failed to update company details.");
//       }
//     } catch (error) {
//       alert("An error occurred while updating company details.");
//     }
//   };

//   const handleAttributeChange = (attributeValue) => {
//     setSelectedAttributes((prevAttributes) => {
//       if (prevAttributes.includes(attributeValue)) {
//         return prevAttributes.filter((attr) => attr !== attributeValue);
//       } else {
//         return [...prevAttributes, attributeValue];
//       }
//     });
//   };

//   const updateSelectedAttributes = (updatedAttributes) => {
//     setSelectedAttributes(updatedAttributes);
//     localStorage.setItem(
//       `selectedAttributes_${teamDetails.name}`,
//       JSON.stringify(updatedAttributes)
//     );
//   };

//   const handleCheckboxChange = (attribute) => {
//     setCheckedAttributes((prevChecked) => {
//       if (prevChecked.includes(attribute)) {
//         return prevChecked.filter((attr) => attr !== attribute);
//       } else {
//         return [...prevChecked, attribute];
//       }
//     });
//   };

  



//   const descriptionValue = teamDetails.attributes.find(
//     (attr) => attr.name === "description"
//   )?.value;

//   const filteredData = apiproducts.filter((attr) => attr !== "0");
//   const uniqueAttributes = Array.from(new Set(filteredData));
//   console.log("uniqueAttributes", uniqueAttributes);






//   const products = teamDetails.attributes.find(
//     (attr) => attr.name === "api_product"
//   )?.value;
//   console.log("products", products);

//   // //set to localstorage
//   // const localStorage_products = products;
//   // localStorage.setItem("localstorage", JSON.stringify(localStorage_products));
  

//   const api_product = ["api_product", products];
//   // console.log("api_product", api_product);

//   const array1 = [{ products }];
//   // console.log("array1", array1);

//   //unserializedData Data
//   const unserializedData = array1
//   .map((item) => {
//     if (item && item.products) {
//       const regex = /s:\d+:\\\"(.*?)\\\"/g;
//       const matches = item.products.match(regex);
//       if (matches) {
//         return matches.map((match) =>
//           match.replace(/\\\\/g, "\\").replace(/s:\d+:\\\"(.*?)\\\"/, "$1")
//         );
//       }
//     }
//     return [];
//   })
//   .flat();
// console.log("unserializedData", unserializedData);




  
//   const findDuplicates = (apiproducts) => {
//     const duplicates = {};
//     const duplicateItems = [];

//     apiproducts.forEach((item) => {
//       if (!duplicates[item]) {
//         duplicates[item] = 1;
//       } else {
//         duplicates[item]++;
//       }
//     });

//     Object.entries(duplicates).forEach(([item, count]) => {
//       if (count > 1) {
//         duplicateItems.push(item);
//       }
//     });

//     return duplicateItems;
//   };
  
//   const duplicateItems = findDuplicates(unserializedData);
//   console.log("duplicateItems", duplicateItems);

//   useEffect(() => {
//     const filteredData = apiproducts.filter((attr) => attr !== "0");
//     const uniqueAttributes = Array.from(new Set(filteredData));

//     const initialCheckedAttributes = uniqueAttributes.filter((attr) =>
//       duplicateItems.includes(attr)
//     );
//     setCheckedAttributes(initialCheckedAttributes);

//     const storedSelectedAttributes =
//       JSON.parse(
//         localStorage.getItem(`selectedAttributes_${teamDetails.name}`)
//       ) || [];
//     setSelectedAttributes(storedSelectedAttributes);
//   }, [teamDetails, apiproducts]);

//   useEffect(() => {
//     setCompanyName(teamDetails.displayName);

//     const descriptionValue = teamDetails.attributes.find(
//       (attr) => attr.name === "description"
//     )?.value;
//     setDescription(descriptionValue || "");

//     // Rest of your code...
//   }, [teamDetails, apiproducts]);

//   const mergedArray = [...selectedAttributes, ...checkedAttributes];
//   const selected_attribute = Array.from(new Set(mergedArray));





//   const unselected_attributes = uniqueAttributes.filter(
//     (attr) => !selected_attribute.includes(attr)
//   );
//   console.log("unselected_attributes", unselected_attributes);

  

//   const formatted_selected_attribute = selected_attribute.map((attr) => ({
//     [attr]: attr,
//   }));
//   console.log("formatted_selected_attribute", formatted_selected_attribute);
//   const formatted_unselected_attribute = unselected_attributes.map((attr) => ({
//     [attr]: "0",
//   }));





//   console.log("formatted_unselected_attribute", formatted_unselected_attribute);
//   const final_Output = [
//     ...formatted_selected_attribute,
//     ...formatted_unselected_attribute,
//   ];

//   const parsed_Final_Output1 = JSON.parse(
//     JSON.stringify(final_Output, null, 2)
//   );

//   const serializeData = parsed_Final_Output1.map((item) => {
//     const key = Object.keys(item)[0];
//     const value = item[key];
//     const serializedKey = `s:${key.length}:\\"${key}\\"`;
//     const serializedValue = `s:${value.length}:\\"${value}\\"`;
//     return `${serializedKey}:${serializedValue}`;
//   });
// console.log("serializeData",serializeData)
//   const serializedApiProduct22 = serializeData.join(",");
//   console.log("serializedApiProduct22",serializedApiProduct22)
//   return (
//     <Layout>
//       <div>
//         <Buttons />
//         <div className="dialog-off-canvas-main-canvas">
//           <div className="page">
//             <header className="page__header"></header>
//             <div className="page__content-above">
//               <div className="container-fluid px-0">
//                 <div className="contextual-region block block--pagetitle bg-lighter py-4">
//                   <div />
//                   <div className="container">
//                     <h1 className="js-quickedit-page-title page__title mb-0">
//                       Edit <em className="placeholder">{teamDetails.name}</em>
//                       &nbsp; team
//                     </h1>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <main className="main">
//               <div className="page-layout-sidebar-default">
//                 <div className="container py-5">
//                   <div className="row">
//                     <div className="page__content col-md">
//                       <div className="hidden" />
//                       <form
//                         className="team-form"
//                         onSubmit={handleUpdateCompany}
//                       >
//                         <div className="field--type-string field--name-displayname field--widget-string-textfield js-form-wrapper form-wrapper">
//                           <div className="js-form-item form-item js-form-type-textfield form-type-textfield form-item-displayname-0-value js-form-item-displayname-0-value form-group">
//                             <label className="js-form-required form-required">
//                               Team name
//                               <i className="fas fa-asterisk text-danger form-required__indicator" />
//                             </label>
//                             <input
//                               className="js-text-full text-full required form-control"
//                               type="text"
//                               value={companyName}
//                               onChange={handleCompanyNameChange}
//                               size={60}
//                               maxLength={255}
//                               placeholder={teamDetails.displayName}
//                               required="required"
//                               aria-required="true"
//                             />
//                             <span className="field-suffix">
//                               <small>&nbsp;</small>
//                             </span>
//                             <small className="description form-text text-muted">
//                               Only lowercase alphanumeric and dashes are
//                               allowed.
//                             </small>
//                           </div>
//                         </div>
//                         <div className="field--type-string-long field--name-field-description field--widget-string-textarea js-form-wrapper form-wrapper">
//                           <div className="js-form-item form-item js-form-type-textarea form-type-textarea form-item-field-description-0-value js-form-item-field-description-0-value form-group">
//                             <label htmlFor="edit-field-description-0-value">
//                               Description
//                             </label>
//                             <textarea
//                               className="js-text-full text-full form-textarea form-control"
//                               rows={5}
//                               cols={60}
//                               value={description}
//                               placeholder={descriptionValue}
//                               onChange={handleDescriptionChange}
//                             />
//                           </div>
//                         </div>
//                         <div className="js-form-item form-item js-form-type-machine-name form-type-machine-name form-item-name js-form-item-name form-disabled form-group">
//                           <label className="js-form-required form-required">
//                             Internal name
//                             <i className="fas fa-asterisk text-danger form-required__indicator" />
//                           </label>

//                           <input
//                             disabled="disabled"
//                             dir="ltr"
//                             type="text"
//                             name="name"
//                             value={teamDetails.name}
//                             size={60}
//                             maxLength={64}
//                             className="required form-control"
//                             required="required"
//                             aria-required="true"
//                           />
//                           <small className="description form-text text-muted">
//                             A unique machine-readable name. Only lowercase
//                             alphanumeric and dashes are allowed
//                           </small>
//                         </div>

//                         <div className="field--type-productapi field--name-field-api-product field--widget-productapi js-form-wrapper form-wrapper">
//                           <fieldset className="fieldgroup form-composite js-form-item form-item js-form-wrapper form-wrapper border mb-3">
//                             <legend className="float-left py-2 px-4 mb-0 border-bottom">
//                               <span className="fieldset-legend">
//                                 Team product
//                               </span>
//                               <button className="btn-link">
//                                 <i className="fas fa-chevron-down d-md-none" />
//                               </button>
//                             </legend>

//                             {apiproducts && apiproducts.length > 0 && (
//                               <div className="p-4 fieldset-wrapper">
//                                 <div className="form-checkboxes">
//                                   {uniqueAttributes.map((val, valIndex) => (
//                                     <div
//                                       key={valIndex}
//                                       className="js-form-item form-item js-form-type-checkbox form-item-field-api-product-0-value-corp-iag-code-token js-form-item-field-api-product-0-value-corp-iag-code-token form-check"
//                                     >
//                                       <ul style={{ padding: 0, margin: 0 }}>
//                                         <li
//                                           key={valIndex}
//                                           style={{ listStyle: "none" }}
//                                         >
//                                           <input
//                                             type="checkbox"
//                                             value={val}
//                                             style={{ marginRight: "0.5em" }}
//                                             checked={checkedAttributes.includes(
//                                               val
//                                             )}
//                                             onChange={() =>
//                                               handleCheckboxChange(val)
//                                             }
//                                           />
//                                           {val}
//                                         </li>
//                                       </ul>
//                                     </div>
//                                   ))}
//                                 </div>
//                               </div>
//                             )}
                            
//                           </fieldset>

//                           <div className="form-actions js-form-wrapper form-wrapper">
//                             <button
//                               className="js-form-submit-modal-init button button--primary js-form-submit form-submit btn btn-primary"
//                               onClick={handleUpdateCompany}
//                             >
//                               Update Team
//                             </button>

//                             <Link to="/" className="btn btn-outline-primary">
//                               Cancel
//                             </Link>
//                           </div>
//                         </div>
//                       </form>
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

// export default UpdateCompanyName;








// import { Link } from "gatsby";
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Layout from "../Layout";
// import Buttons from "../Buttons/Buttons";
// import { fetchTeamDetails } from "../../redux/store";
// const axios = require("axios");

// const UpdateCompanyName = () => {
//   const dispatch = useDispatch();
//   const teamDetails = useSelector((state) => state.teamDetails);
//   const team = teamDetails.name;
//   console.log("team", team);

//   useEffect(() => {
//     dispatch(fetchTeamDetails(team));
//   }, [dispatch,team]);

//   const [companyName, setCompanyName] = useState("");
//   const [description, setDescription] = useState("");
//   const [apiData, setApiData] = useState([]);
//   const [selectedAttributes, setSelectedAttributes] = useState([]);
//   const [checkedAttributes, setCheckedAttributes] = useState([]);

//   const handleCompanyNameChange = (e) => {
//     setCompanyName(e.target.value);
//   };

//   const handleDescriptionChange = (e) => {
//     setDescription(e.target.value);
//   };

//   const handleUpdateCompany = async (e) => {
//     e.preventDefault();

//     if (!companyName.trim()) {
//       alert("Please provide a valid company name.");
//       return;
//     }

//     try {
//       const serializedApiProduct = serializeData.join(",");
//       const response = await fetch(
//         `https://api.enterprise.apigee.com/v1/organizations/kenpatolia-a7241f81-eval/companies/${teamDetails.name}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
//           },
//           body: JSON.stringify({
//             displayName: companyName,
//             attributes: [
//               {
//                 name: "api_product",
//                 value: serializedApiProduct,
//               },

//               {
//                 name: "description",
//                 value: description,
//               },
//             ],
//           }),
//         }
//       );

//       if (response.ok) {
//         alert(serializedApiProduct);
//         alert("Display name and description updated successfully!");
//       } else {
//         alert("Failed to update company details.");
//       }
//     } catch (error) {
//       alert("An error occurred while updating company details.");
//     }
//   };

//   // const handleAttributeChange = (attributeValue) => {
//   //   setSelectedAttributes((prevAttributes) => {
//   //     if (prevAttributes.includes(attributeValue)) {
//   //       return prevAttributes.filter((attr) => attr !== attributeValue);
//   //     } else {
//   //       return [...prevAttributes, attributeValue];
//   //     }
//   //   });
//   // };

//   // const updateSelectedAttributes = (updatedAttributes) => {
//   //   setSelectedAttributes(updatedAttributes);
//   //   localStorage.setItem(
//   //     `selectedAttributes_${teamDetails.name}`,
//   //     JSON.stringify(updatedAttributes)
//   //   );
//   // };

//   const handleCheckboxChange = (attribute) => {
//     setCheckedAttributes((prevChecked) => {
//       if (prevChecked.includes(attribute)) {
//         return prevChecked.filter((attr) => attr !== attribute);
//       } else {
//         return [...prevChecked, attribute];
//       }
//     });
//   };

//   useEffect(() => {
//     fetchApiProducts();
//   }, []);

//   const fetchApiProducts = () => {
//     const apiUrl = `https://api.enterprise.apigee.com/v1/organizations/kenpatolia-a7241f81-eval/apiproducts`;
//     const bearerToken = process.env.BEARER_TOKEN;
//     const headers = {
//       Authorization: `Bearer ${bearerToken}`,
//     };

//     axios
//       .get(apiUrl, { headers })
//       .then((response) => {
//         const apiData = response.data;
//         setApiData(apiData);
//       })
//       .catch((error) => {
//         console.error("apiproducts Request Error:", error);
//       });
//   };

//   const descriptionValue = teamDetails.attributes.find(
//     (attr) => attr.name === "description"
//   )?.value;

//   const filteredData = apiData.filter((attr) => attr !== "0");
//   const uniqueAttributes = Array.from(new Set(filteredData));
//   console.log("uniqueAttributes", uniqueAttributes);






//   const products = teamDetails.attributes.find(
//     (attr) => attr.name === "api_product"
//   )?.value;
//   console.log("products", products);

//   // //set to localstorage
//   // const localStorage_products = products;
//   // localStorage.setItem("localstorage", JSON.stringify(localStorage_products));
  

//   // const api_product = ["api_product", products];
//   // console.log("api_product", api_product);

//   const array1 = [{ products }];
//   // console.log("array1", array1);

//   //unserializedData Data
//   const unserializedData = array1
//   .map((item) => {
//     if (item && item.products) {
//       const regex = /s:\d+:\\"(.*?)\\"/g;
//       const matches = item.products.match(regex);
//       if (matches) {
//         return matches.map((match) =>
//           match.replace(/\\\\/g, "\\").replace(/s:\d+:\\"(.*?)\\"/, "$1")
//         );
//       }
//     }
//     return [];
//   })
//   .flat();
// console.log("unserializedData", unserializedData);




  
//   const findDuplicates = (apiData) => {
//     const duplicates = {};
//     const duplicateItems = [];

//     apiData.forEach((item) => {
//       if (!duplicates[item]) {
//         duplicates[item] = 1;
//       } else {
//         duplicates[item]++;
//       }
//     });

//     Object.entries(duplicates).forEach(([item, count]) => {
//       if (count > 1) {
//         duplicateItems.push(item);
//       }
//     });

//     return duplicateItems;
//   };
//   const duplicateItems = findDuplicates(unserializedData);
//   console.log("duplicateItems", duplicateItems);

//   useEffect(() => {
//     const filteredData = apiData.filter((attr) => attr !== "0");
//     const uniqueAttributes = Array.from(new Set(filteredData));

//     const initialCheckedAttributes = uniqueAttributes.filter((attr) =>
//       duplicateItems.includes(attr)
//     );
//     setCheckedAttributes(initialCheckedAttributes);

//     const storedSelectedAttributes =
//       JSON.parse(
//         localStorage.getItem(`selectedAttributes_${teamDetails.name}`)
//       ) || [];
//     setSelectedAttributes(storedSelectedAttributes);
//   }, [teamDetails, apiData,duplicateItems]);

//   useEffect(() => {
//     setCompanyName(teamDetails.displayName);

//     const descriptionValue = teamDetails.attributes.find(
//       (attr) => attr.name === "description"
//     )?.value;
//     setDescription(descriptionValue || "");

//     // Rest of your code...
//   }, [teamDetails, apiData,duplicateItems]);

//   const mergedArray = [...selectedAttributes, ...checkedAttributes];
//   const selected_attribute = Array.from(new Set(mergedArray));





//   const unselected_attributes = uniqueAttributes.filter(
//     (attr) => !selected_attribute.includes(attr)
//   );
//   console.log("unselected_attributes", unselected_attributes);

  

//   const formatted_selected_attribute = selected_attribute.map((attr) => ({
//     [attr]: attr,
//   }));
//   console.log("formatted_selected_attribute", formatted_selected_attribute);
//   const formatted_unselected_attribute = unselected_attributes.map((attr) => ({
//     [attr]: "0",
//   }));





//   console.log("formatted_unselected_attribute", formatted_unselected_attribute);
//   const final_Output = [
//     ...formatted_selected_attribute,
//     ...formatted_unselected_attribute,
//   ];

//   const parsed_Final_Output1 = JSON.parse(
//     JSON.stringify(final_Output, null, 2)
//   );

//   const serializeData = parsed_Final_Output1.map((item) => {
//     const key = Object.keys(item)[0];
//     const value = item[key];
//     const serializedKey = `s:${key.length}:\\"${key}\\"`;
//     const serializedValue = `s:${value.length}:\\"${value}\\"`;
//     return `${serializedKey}:${serializedValue}`;
//   });
// console.log("serializeData",serializeData)
//   const serializedApiProduct22 = serializeData.join(",");
//   console.log("serializedApiProduct22",serializedApiProduct22)
//   return (
//     <Layout>
//       <div>
//         <Buttons />
//         <div className="dialog-off-canvas-main-canvas">
//           <div className="page">
//             <header className="page__header"></header>
//             <div className="page__content-above">
//               <div className="container-fluid px-0">
//                 <div className="contextual-region block block--pagetitle bg-lighter py-4">
//                   <div />
//                   <div className="container">
//                     <h1 className="js-quickedit-page-title page__title mb-0">
//                       Edit <em className="placeholder">{teamDetails.name}</em>
//                       &nbsp; team
//                     </h1>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <main className="main">
//               <div className="page-layout-sidebar-default">
//                 <div className="container py-5">
//                   <div className="row">
//                     <div className="page__content col-md">
//                       <div className="hidden" />
//                       <form
//                         className="team-form"
//                         onSubmit={handleUpdateCompany}
//                       >
//                         <div className="field--type-string field--name-displayname field--widget-string-textfield js-form-wrapper form-wrapper">
//                           <div className="js-form-item form-item js-form-type-textfield form-type-textfield form-item-displayname-0-value js-form-item-displayname-0-value form-group">
//                             <label className="js-form-required form-required">
//                               Team name
//                               <i className="fas fa-asterisk text-danger form-required__indicator" />
//                             </label>
//                             <input
//                               className="js-text-full text-full required form-control"
//                               type="text"
//                               value={companyName}
//                               onChange={handleCompanyNameChange}
//                               size={60}
//                               maxLength={255}
//                               placeholder={teamDetails.displayName}
//                               required="required"
//                               aria-required="true"
//                             />
//                             <span className="field-suffix">
//                               <small>&nbsp;</small>
//                             </span>
//                             <small className="description form-text text-muted">
//                               Only lowercase alphanumeric and dashes are
//                               allowed.
//                             </small>
//                           </div>
//                         </div>
//                         <div className="field--type-string-long field--name-field-description field--widget-string-textarea js-form-wrapper form-wrapper">
//                           <div className="js-form-item form-item js-form-type-textarea form-type-textarea form-item-field-description-0-value js-form-item-field-description-0-value form-group">
//                             <label htmlFor="edit-field-description-0-value">
//                               Description
//                             </label>
//                             <textarea
//                               className="js-text-full text-full form-textarea form-control"
//                               rows={5}
//                               cols={60}
//                               value={description}
//                               placeholder={descriptionValue}
//                               onChange={handleDescriptionChange}
//                             />
//                           </div>
//                         </div>
//                         <div className="js-form-item form-item js-form-type-machine-name form-type-machine-name form-item-name js-form-item-name form-disabled form-group">
//                           <label className="js-form-required form-required">
//                             Internal name
//                             <i className="fas fa-asterisk text-danger form-required__indicator" />
//                           </label>

//                           <input
//                             disabled="disabled"
//                             dir="ltr"
//                             type="text"
//                             name="name"
//                             value={teamDetails.name}
//                             size={60}
//                             maxLength={64}
//                             className="required form-control"
//                             required="required"
//                             aria-required="true"
//                           />
//                           <small className="description form-text text-muted">
//                             A unique machine-readable name. Only lowercase
//                             alphanumeric and dashes are allowed
//                           </small>
//                         </div>

//                         <div className="field--type-productapi field--name-field-api-product field--widget-productapi js-form-wrapper form-wrapper">
//                           <fieldset className="fieldgroup form-composite js-form-item form-item js-form-wrapper form-wrapper border mb-3">
//                             <legend className="float-left py-2 px-4 mb-0 border-bottom">
//                               <span className="fieldset-legend">
//                                 Team product
//                               </span>
//                               <button className="btn-link">
//                                 <i className="fas fa-chevron-down d-md-none" />
//                               </button>
//                             </legend>

//                             {apiData && apiData.length > 0 && (
//                               <div className="p-4 fieldset-wrapper">
//                                 <div className="form-checkboxes">
//                                   {uniqueAttributes.map((val, valIndex) => (
//                                     <div
//                                       key={valIndex}
//                                       className="js-form-item form-item js-form-type-checkbox form-item-field-api-product-0-value-corp-iag-code-token js-form-item-field-api-product-0-value-corp-iag-code-token form-check"
//                                     >
//                                       <ul style={{ padding: 0, margin: 0 }}>
//                                         <li
//                                           key={valIndex}
//                                           style={{ listStyle: "none" }}
//                                         >
//                                           <input
//                                             type="checkbox"
//                                             value={val}
//                                             style={{ marginRight: "0.5em" }}
//                                             checked={checkedAttributes.includes(
//                                               val
//                                             )}
//                                             onChange={() =>
//                                               handleCheckboxChange(val)
//                                             }
//                                           />
//                                           {val}
//                                         </li>
//                                       </ul>
//                                     </div>
//                                   ))}
//                                 </div>
//                               </div>
//                             )}
//                           </fieldset>

//                           <div className="form-actions js-form-wrapper form-wrapper">
//                             <button
//                               className="js-form-submit-modal-init button button--primary js-form-submit form-submit btn btn-primary"
//                               onClick={handleUpdateCompany}
//                             >
//                               Update Team
//                             </button>

//                             <Link to="/" className="btn btn-outline-primary">
//                               Cancel
//                             </Link>
//                           </div>
//                         </div>
//                       </form>
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

// export default UpdateCompanyName;
























import { Link } from "gatsby";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../Layout";
import Buttons from "../Buttons/Buttons";
import { fetchTeamDetails,apiProducts ,fetchTeams,selectTeam} from "../../redux/store";


const UpdateCompanyName = () => {
  const selectedTeam = useSelector((state) => state.selectedTeam);
  console.log("selected team",selectedTeam)
  const dispatch=useDispatch()
  // const apiproducts = useSelector((state) => state.apiProducts);
  // console.log("apiproducts",apiproducts)

  // useEffect(() => {
  //   dispatch(apiProducts());
  // }, [dispatch]);


  // useEffect(() => {
  //   dispatch(fetchTeamDetails(team));
  // }, [dispatch]);

  useEffect(() => {
    dispatch(fetchTeams());
    console.log("Selected Team new:", selectedTeam);
  }, [selectTeam]);
  
  // useEffect(() => {
  //   // Do something with the updated selectedTeam data
  //   console.log("Selected Team:", selectedTeam);
  // }, [selectTeam]);



  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [message, setMessage] = useState("");
  const [checkedAttributes, setCheckedAttributes] = useState([]);
  

  const handleCompanyNameChange = (e) => {
    setCompanyName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleUpdateCompany = async (e) => {
    e.preventDefault();

    if (!companyName.trim()) {
      alert("Please provide a valid company name.");
      return;
    }

    try {
      // const serializedApiProduct = serializeData.join(",");
      const response = await fetch(
        `https://apigee.googleapis.com/v1/organizations/sbux-portal-dev/appgroups/${selectedTeam.name}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
          },
          body: JSON.stringify({
            displayName: companyName,
            attributes: [
              // {
              //   name: "api_product",
              //   value: serializedApiProduct,
              // },

              {
                name: "description",
                value: description,
              },
            ],
          }),
        }
      );

      if (response.ok) {
        // alert(serializedApiProduct);
        alert("Display name and description updated successfully!");
      } else {
        alert("Failed to update appgroup details.");
      }
    } catch (error) {
      alert("An error occurred while updating appgroup details.");
    }
  };

  // const handleAttributeChange = (attributeValue) => {
  //   setSelectedAttributes((prevAttributes) => {
  //     if (prevAttributes.includes(attributeValue)) {
  //       return prevAttributes.filter((attr) => attr !== attributeValue);
  //     } else {
  //       return [...prevAttributes, attributeValue];
  //     }
  //   });
  // };

  // const updateSelectedAttributes = (updatedAttributes) => {
  //   setSelectedAttributes(updatedAttributes);
  //   localStorage.setItem(
  //     `selectedAttributes_${teamDetails.name}`,
  //     JSON.stringify(updatedAttributes)
  //   );
  // };

  // const handleCheckboxChange = (attribute) => {
  //   setCheckedAttributes((prevChecked) => {
  //     if (prevChecked.includes(attribute)) {
  //       return prevChecked.filter((attr) => attr !== attribute);
  //     } else {
  //       return [...prevChecked, attribute];
  //     }
  //   });
  // };

  



  const descriptionValue = selectedTeam.attributes.find(
    (attr) => attr.name === "description"
  )?.value;

  // const filteredData = apiproducts.filter((attr) => attr !== "0");
  // const uniqueAttributes = Array.from(new Set(filteredData));
  // console.log("uniqueAttributes", uniqueAttributes);






  // const products = teamDetails.attributes.find(
  //   (attr) => attr.name === "api_product"
  // )?.value;
  // console.log("products", products);

  // //set to localstorage
  // const localStorage_products = products;
  // localStorage.setItem("localstorage", JSON.stringify(localStorage_products));
  

//   const api_product = ["api_product", products];
//   // console.log("api_product", api_product);

//   const array1 = [{ products }];
//   // console.log("array1", array1);

//   //unserializedData Data
//   const unserializedData = array1
//   .map((item) => {
//     if (item && item.products) {
//       const regex = /s:\d+:\\\"(.*?)\\\"/g;
//       const matches = item.products.match(regex);
//       if (matches) {
//         return matches.map((match) =>
//           match.replace(/\\\\/g, "\\").replace(/s:\d+:\\\"(.*?)\\\"/, "$1")
//         );
//       }
//     }
//     return [];
//   })
//   .flat();
// console.log("unserializedData", unserializedData);




  
//   const findDuplicates = (apiproducts) => {
//     const duplicates = {};
//     const duplicateItems = [];

//     apiproducts.forEach((item) => {
//       if (!duplicates[item]) {
//         duplicates[item] = 1;
//       } else {
//         duplicates[item]++;
//       }
//     });

//     Object.entries(duplicates).forEach(([item, count]) => {
//       if (count > 1) {
//         duplicateItems.push(item);
//       }
//     });

//     return duplicateItems;
//   };
  
//   const duplicateItems = findDuplicates(unserializedData);
//   console.log("duplicateItems", duplicateItems);

//   useEffect(() => {
//     const filteredData = apiproducts.filter((attr) => attr !== "0");
//     const uniqueAttributes = Array.from(new Set(filteredData));

//     const initialCheckedAttributes = uniqueAttributes.filter((attr) =>
//       duplicateItems.includes(attr)
//     );
//     setCheckedAttributes(initialCheckedAttributes);

//     const storedSelectedAttributes =
//       JSON.parse(
//         localStorage.getItem(`selectedAttributes_${teamDetails.name}`)
//       ) || [];
//     setSelectedAttributes(storedSelectedAttributes);
//   }, [teamDetails, apiproducts]);

  useEffect(() => {
    setCompanyName(selectedTeam.displayName);

    const descriptionValue = selectedTeam.attributes.find(
      (attr) => attr.name === "description"
    )?.value;
    setDescription(descriptionValue || "");

    // Rest of your code...
  }, [selectedTeam]);

  // const mergedArray = [...selectedAttributes, ...checkedAttributes];
  // const selected_attribute = Array.from(new Set(mergedArray));





//   const unselected_attributes = uniqueAttributes.filter(
//     (attr) => !selected_attribute.includes(attr)
//   );
//   console.log("unselected_attributes", unselected_attributes);

  

//   const formatted_selected_attribute = selected_attribute.map((attr) => ({
//     [attr]: attr,
//   }));
//   console.log("formatted_selected_attribute", formatted_selected_attribute);
//   const formatted_unselected_attribute = unselected_attributes.map((attr) => ({
//     [attr]: "0",
//   }));





//   console.log("formatted_unselected_attribute", formatted_unselected_attribute);
//   const final_Output = [
//     ...formatted_selected_attribute,
//     ...formatted_unselected_attribute,
//   ];

//   const parsed_Final_Output1 = JSON.parse(
//     JSON.stringify(final_Output, null, 2)
//   );

//   const serializeData = parsed_Final_Output1.map((item) => {
//     const key = Object.keys(item)[0];
//     const value = item[key];
//     const serializedKey = `s:${key.length}:\\"${key}\\"`;
//     const serializedValue = `s:${value.length}:\\"${value}\\"`;
//     return `${serializedKey}:${serializedValue}`;
//   });
// console.log("serializeData",serializeData)
//   const serializedApiProduct22 = serializeData.join(",");
//   console.log("serializedApiProduct22",serializedApiProduct22)
  return (
    <Layout>
      <div>
        <Buttons />
        <div className="dialog-off-canvas-main-canvas">
          <div className="page">
            <header className="page__header"></header>
            <div className="page__content-above">
              <div className="container-fluid px-0">
                <div className="contextual-region block block--pagetitle bg-lighter py-4">
                  <div />
                  <div className="container">
                    <h1 className="js-quickedit-page-title page__title mb-0">
                      Edit <em className="placeholder">{selectedTeam.name}</em>
                      &nbsp; appgroup
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <main className="main">
              <div className="page-layout-sidebar-default">
                <div className="container py-5">
                  <div className="row">
                    <div className="page__content col-md">
                      <div className="hidden" />
                      <form
                        className="team-form"
                        onSubmit={handleUpdateCompany}
                      >
                        <div className="field--type-string field--name-displayname field--widget-string-textfield js-form-wrapper form-wrapper">
                          <div className="js-form-item form-item js-form-type-textfield form-type-textfield form-item-displayname-0-value js-form-item-displayname-0-value form-group">
                            <label className="js-form-required form-required">
                            Appgroup name
                              <i className="fas fa-asterisk text-danger form-required__indicator" />
                            </label>
                            <input
                              className="js-text-full text-full required form-control"
                              type="text"
                              value={companyName}
                              onChange={handleCompanyNameChange}
                              size={60}
                              maxLength={255}
                              placeholder={selectedTeam.displayName}
                              required="required"
                              aria-required="true"
                            />
                            <span className="field-suffix">
                              <small>&nbsp;</small>
                            </span>
                            <small className="description form-text text-muted">
                              Only lowercase alphanumeric and dashes are
                              allowed.
                            </small>
                          </div>
                        </div>
                        <div className="field--type-string-long field--name-field-description field--widget-string-textarea js-form-wrapper form-wrapper">
                          <div className="js-form-item form-item js-form-type-textarea form-type-textarea form-item-field-description-0-value js-form-item-field-description-0-value form-group">
                            <label htmlFor="edit-field-description-0-value">
                              Description
                            </label>
                            <textarea
                              className="js-text-full text-full form-textarea form-control"
                              rows={5}
                              cols={60}
                              value={description}
                              placeholder={descriptionValue}
                              onChange={handleDescriptionChange}
                            />
                          </div>
                        </div>
                        <div className="js-form-item form-item js-form-type-machine-name form-type-machine-name form-item-name js-form-item-name form-disabled form-group">
                          <label className="js-form-required form-required">
                            Internal name
                            <i className="fas fa-asterisk text-danger form-required__indicator" />
                          </label>

                          <input
                            disabled="disabled"
                            dir="ltr"
                            type="text"
                            name="name"
                            value={selectedTeam.name}
                            size={60}
                            maxLength={64}
                            className="required form-control"
                            required="required"
                            aria-required="true"
                          />
                          <small className="description form-text text-muted">
                            A unique machine-readable name. Only lowercase
                            alphanumeric and dashes are allowed
                          </small>
                        </div>

                        <div className="field--type-productapi field--name-field-api-product field--widget-productapi js-form-wrapper form-wrapper">
                          <fieldset className="fieldgroup form-composite js-form-item form-item js-form-wrapper form-wrapper border mb-3">
                            <legend className="float-left py-2 px-4 mb-0 border-bottom">
                              <span className="fieldset-legend">
                              Appgroup product
                              </span>
                              <button className="btn-link">
                                <i className="fas fa-chevron-down d-md-none" />
                              </button>
                            </legend>

                            {/* {apiproducts && apiproducts.length > 0 && (
                              <div className="p-4 fieldset-wrapper">
                                <div className="form-checkboxes">
                                  {uniqueAttributes.map((val, valIndex) => (
                                    <div
                                      key={valIndex}
                                      className="js-form-item form-item js-form-type-checkbox form-item-field-api-product-0-value-corp-iag-code-token js-form-item-field-api-product-0-value-corp-iag-code-token form-check"
                                    >
                                      <ul style={{ padding: 0, margin: 0 }}>
                                        <li
                                          key={valIndex}
                                          style={{ listStyle: "none" }}
                                        >
                                          <input
                                            type="checkbox"
                                            value={val}
                                            style={{ marginRight: "0.5em" }}
                                            checked={checkedAttributes.includes(
                                              val
                                            )}
                                            onChange={() =>
                                              handleCheckboxChange(val)
                                            }
                                          />
                                          {val}
                                        </li>
                                      </ul>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )} */}
                            
                          </fieldset>

                          <div className="form-actions js-form-wrapper form-wrapper">
                            <button
                              className="js-form-submit-modal-init button button--primary js-form-submit form-submit btn btn-primary"
                              onClick={handleUpdateCompany}
                            >
                              Update appgroup
                            </button>

                            <Link to="/" className="btn btn-outline-primary">
                              Cancel
                            </Link>
                          </div>
                        </div>
                      </form>
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

export default UpdateCompanyName;