import React from "react";
import Layout from "../Layout";
import { Link } from "gatsby";

const DeleteMember = () => {
  return (
    <Layout>
      <div className="dialog-off-canvas-main-canvas">
        <div className="page">
          <header className="page__header"></header>
          <div className="page__content-above">
            <div className="container-fluid px-0">
              <div className="contextual-region block block--pagetitle bg-lighter py-4">
                <div className="container">
                  <h1 className="js-quickedit-page-title page__title mb-0">
                    Are you sure that you would like to remove
                    <em className="placeholder">kpatel@starbucks.com</em> from
                    the team?
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
                    <form className="apigee-edge-teams-remove-team-member-form confirmation team-member-form">
                      This action cannot be undone.
                      <div className="form-actions js-form-wrapper form-wrapper">
                        <button
                          type="submit"
                          name="op"
                          defaultValue="Confirm"
                          className="button button--primary js-form-submit form-submit btn btn-primary"
                        >
                          Remove
                        </button>
                        <Link
                          to="/members"
                          className="button btn btn-outline-primary"
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

export default DeleteMember;
