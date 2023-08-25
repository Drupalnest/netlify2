import React, { useState } from "react";
import Layout from "../Layout";
import Buttons from "../Buttons/Buttons";
import { useStaticQuery, graphql, Link } from "gatsby";

const AddMembers = () => {
  const data = useStaticQuery(graphql`
    query MyQuery {
      allUserUser {
        edges {
          node {
            display_name
            drupal_id
            id
          }
        }
      }
    }
  `);

  const [username, setUsername] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (event) => {
    const input = event.target.value;
    setUsername(input);

    // Filter suggestions based on input
    const filteredSuggestions = data.allUserUser.edges
      .map((edge) => edge.node)
      .filter((user) => user.display_name.includes(input));
    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (suggestion) => {
    setUsername(suggestion.display_name);
    setSuggestions([]); // Clear suggestions after selecting one
  };
  return (
    <Layout>
      
      <div
        id="toolbar-administration"
        role="group"
        aria-label="Site administration toolbar"
        className="toolbar"
      />
      <div
        className="dialog-off-canvas-main-canvas"
        data-off-canvas-main-canvas=""
      >
        <div className="page">
          <header className="page__header">
            <span data-big-pipe-placeholder-id="callback=Drupal%5Cblock%5CBlockViewBuilder%3A%3AlazyBuilder&args%5B0%5D=starbucks_tabs&args%5B1%5D=full&args%5B2%5D&token=MEkI12DtyJlNIxuOGvgD3VFvH_cZWONfyjuDDe873eY" />
          </header>
          <div className="page__content-above">
            <div className="container-fluid px-0">
              <div className="contextual-region block block--pagetitle bg-lighter py-4">
                <div
                  data-contextual-id="block:block=pagetitle:langcode=en"
                  data-contextual-token="JWbfFvQC8xC4unlMvQKgq1Qc29aLahBItOfax5aiGxo"
                />
                <div className="container">
                  <h1 className="js-quickedit-page-title page__title mb-0">
                    Add Member
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <main className="main" role="main">
            <a id="main-content" tabIndex={-1} />
            <div className="page-layout-sidebar-default">
              <div className="container py-5">
                <div className="row">
                  <div className="page__content col-md">
                    <div data-drupal-messages-fallback="" className="hidden" />
                    
                    <form
                      className="apigee-edge-teams-add-team-member-form team-member-form"
                      data-drupal-selector="apigee-edge-teams-add-team-member-form"
                      action="/teams/ken-june15-1/add-members"
                      method="post"
                      id="apigee-edge-teams-add-team-member-form"
                      acceptCharset="UTF-8"
                    >
                      <fieldset
                        data-drupal-selector="edit-team-roles"
                        id="edit-team-roles--wrapper"
                        className="fieldgroup form-composite js-form-item form-item js-form-wrapper form-wrapper border mb-3"
                      >
                        <legend className="float-left py-2 px-4 mb-0 border-bottom">
                          <span className="fieldset-legend"> Roles </span>
                          <button className="btn-link">
                            <i className="fas fa-chevron-down d-md-none" />
                          </button>
                        </legend>
                        <div className="p-4 fieldset-wrapper">
                          <div id="edit-team-roles" className="form-checkboxes">
                            <small className="form-text">
                              Assign one or more roles to
                              <em>all developers</em> that you selected in
                              <em className="placeholder">ken-june15-1</em>
                              team.
                            </small>
                            <div className="js-form-item form-item js-form-type-checkbox form-item-team-roles-admin js-form-item-team-roles-admin form-check">
                              <input
                                data-drupal-selector="edit-team-roles-admin"
                                type="checkbox"
                               
                                name="team_roles[admin]"
                                defaultValue="admin"
                                className="form-checkbox form-check-input"
                              />
                              <i className="fas fa-check-square" />
                              <i className="far fa-square" />
                              <label
                                className="form-check-label option"
                                htmlFor="edit-team-roles-admin"
                              >
                                Administrator
                              </label>
                            </div>
                            <div className="js-form-item form-item js-form-type-checkbox form-item-team-roles-member js-form-item-team-roles-member form-disabled form-check">
                              <input
                                data-drupal-selector="edit-team-roles-member"
                                // disabled="disabled"
                                type="checkbox"
                                id="edit-team-roles-member"
                                name="team_roles[member]"
                                defaultValue="member"
                                // defaultChecked="checked"
                                className="form-checkbox form-check-input"
                              />
                              <i className="fas fa-check-square" />
                              <i className="far fa-square" />
                              <label
                                className="form-check-label option"
                                htmlFor="edit-team-roles-member"
                              >
                                Member
                              </label>
                            </div>
                          </div>
                        </div>
                      </fieldset>
                      <div className="js-form-item form-item js-form-type-entity-autocomplete form-type-entity-autocomplete form-item-username js-form-item-username form-group">
                        <label
                          htmlFor="edit-username"
                          className="js-form-required form-required"
                        >
                          Username
                          <i className="fas fa-asterisk text-danger form-required__indicator" />
                        </label>
                       

                        <input
                          data-drupal-selector="edit-username"
                          className="form-autocomplete required form-control"
                          type="text"
                          id="edit-username"
                          name="username"
                          value={username}
                          onChange={handleInputChange}
                        />

                        {/* Render suggestions dropdown */}
                        {username && suggestions.length > 0 && (
                          <div className="suggestions-dropdown">
                            {suggestions.map((user) => (
                              <div
                                key={user.id}
                                onClick={() => handleSuggestionClick(user)}
                                className="suggestion-item"
                                style={{
                                  padding: "8px",
                                  cursor: "pointer",
                                  transition: "background-color 0.3s ease",
                                  backgroundColor: "white",
                                }}
                                onMouseEnter={(e) => {
                                  e.target.style.backgroundColor = "green";
                                  e.target.style.color = "white";
                                }}
                                onMouseLeave={(e) => {
                                  e.target.style.backgroundColor = "white";
                                  e.target.style.color = "black";
                                }}
                              >
                                {user.display_name}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <button className="js-form-submit-modal-init button button--primary js-form-submit form-submit btn btn-primary">
                        Add Member
                      </button>

                      <Link
                        to="/members"
                        className="button js-form-submit btn btn-primary"
                        style={{ marginLeft: "20px" }}
                      >
                        Cancel
                      </Link>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default AddMembers;
