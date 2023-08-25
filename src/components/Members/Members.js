import { Link } from "gatsby";
import React from "react";
import Layout from "../Layout";
import Buttons from "../Buttons/Buttons";

const Members = () => {
  return (
    <Layout>
      <Buttons />
      <div>
        <div className="dialog-off-canvas-main-canvas toolbar-icon-9 adminimal-admin-toolbar toolbar-tray-open toolbar-horizontal toolbar-fixed toolbar-loading fontyourface path--entity-team-collection user-logged-in path-teams">
          <div className="page">
            <div className="page__tasks">
              <div className="container">
                <div className="contextual-region block block--starbucks-actions">
                  <div className="my-4">
                    <Link
                      to="/add-member"
                      className="button button-action btn btn-sm btn-primary"
                    >
                      Add Members
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="page__content-above">
              <div className="container-fluid px-0">
                <div className="contextual-region block block--pagetitle bg-lighter py-4">
                  <div />
                  <div className="container">
                    <h1 className="js-quickedit-page-title page__title mb-0">
                      Team Members
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

                      <table className="responsive-enabled table">
                        <thead>
                          <tr>
                            <th>Member</th>
                            <th>Roles</th>
                            <th>Operations</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr id="kpatelstarbuckscom" className="odd">
                            <td>
                              <Link to="">kpatel@starbucks.com</Link>
                            </td>
                            <td>
                              <ul>
                                <li>Member</li>
                              </ul>
                            </td>
                            <td>
                              <div className="dropbutton-wrapper">
                                <div className="dropbutton-widget">
                                  <ul className="dropbutton">
                                    <li>
                                      <Link to="/edit-member">Edit</Link>
                                    </li>
                                    <li>
                                      <Link to="/delete-member">Remove</Link>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </td>
                          </tr>
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

export default Members;
