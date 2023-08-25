import React from "react";
import Layout from "../Layout";
import { Link } from "gatsby";

const EditMember = () => {
  return (
    <Layout>
      <div className="dialog-off-canvas-main-canvas">
        <div className="page">
          <div className="page__content-above">
            <div className="container-fluid px-0">
              <div className="contextual-region block block--pagetitle bg-lighter py-4">
                <div className="container">
                  <h1 className="js-quickedit-page-title page__title mb-0">
                    Edit member
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
                    <div className="hidden" />

                    <form className="apigee-edge-teams-edit-team-member-form team-member-form">
                      <fieldset className="fieldgroup form-composite js-form-item form-item js-form-wrapper form-wrapper border mb-3">
                        <legend className="float-left py-2 px-4 mb-0 border-bottom">
                          <span className="fieldset-legend"> Roles </span>
                          <button className="btn-link">
                            <i className="fas fa-chevron-down d-md-none" />
                          </button>
                        </legend>
                        <div className="p-4 fieldset-wrapper">
                          <div id="edit-team-roles" className="form-checkboxes">
                            <small className="form-text">
                              Modify roles of
                              <em className="placeholder">
                                kpatel@starbucks.com
                              </em>
                              in the
                              <em className="placeholder">ken-june15-1</em>
                              team.
                            </small>
                            <div className="js-form-item form-item js-form-type-checkbox form-item-team-roles-admin js-form-item-team-roles-admin form-check">
                              <input
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
                                disabled="disabled"
                                type="checkbox"
                                name="team_roles[member]"
                                defaultValue="member"
                                defaultChecked="checked"
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

                      <div className="form-actions js-form-wrapper form-wrapper">
                        <button className="js-form-submit-modal-init button button--primary js-form-submit form-submit btn btn-primary">
                          Update Member
                        </button>

                        <Link
                          to="/members"
                          className="btn js-form-submit btn-outline-primary"
                        >
                          Cancel
                        </Link>
                      </div>
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

export default EditMember;
