import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTeam } from "../../redux/store";
import { Link, navigate } from "gatsby";
import Layout from "../Layout";
import Buttons from "../Buttons/Buttons";

const DeleteTeam = () => {
  const [appGroupName, setappGroupName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  
  const selectedTeam = useSelector((state) => state.selectedTeam);
  console.log("selected team",selectedTeam)

  // console.log("appGroupName",appGroupView.name)

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!appGroupName) {
      setErrorMessage("Company name is required");
      return;
    }

    try {
      await dispatch(deleteTeam(appGroupName));

      setappGroupName("");
      setErrorMessage("");
      alert("Appgroup deleted successfully");
      navigate("/");
    } catch (error) {
      setErrorMessage(`Error deleting appgroup: ${error.message}`);
    }
  };

  return (
    <Layout>
    <div>
    <Buttons/>
      <div className="page">
        <div className="page__content-above">
          <div className="container-fluid px-0">
            <div className="contextual-region block block--pagetitle bg-lighter py-4">
              <div className="container">
                <h1 className="js-quickedit-page-title page__title mb-0">
                  Are you sure you want to delete the
                  <em className="placeholder">{selectedTeam.name}</em> appgroup?
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="dialog-off-canvas-main-canvas">
          <div className="container">
            <form
              className="team-delete-form team-confirm-form confirmation"
              onSubmit={handleFormSubmit}
            >
              <strong>
                All appgroup, credentials, and appgroup membership information will be
                deleted.
              </strong>
              This action cannot be undone.
              <div className="js-form-item form-item js-form-type-textfield form-type-textfield form-item-verification-code js-form-item-verification-code form-group">
                <label className="js-form-required form-required">
                  Type "<em className="placeholder">{selectedTeam.name}</em>" to
                  proceed
                  <i className="fas fa-asterisk text-danger form-required__indicator" />
                </label>
                <input
                  type="text"
                  size={60}
                  maxLength={128}
                  className="required form-control"
                  required="required"
                  aria-required="true"
                  id="companyName"
                  value={appGroupName}
                  onChange={(e) => setappGroupName(e.target.value)}
                />
              </div>
              <div className="form-actions js-form-wrapper form-wrapper">
                <button
                  type="submit"
                  className="button button--primary js-form-submit form-submit btn btn-primary"
                >
                  Delete Appgroup
                </button>
                <Link to="/" className="button">
                  Cancel
                </Link>
              </div>
            </form>
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default DeleteTeam;
