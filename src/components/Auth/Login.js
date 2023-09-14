// import React from "react";
// import Header from "../components/Header/Header";
// import { useStaticQuery, graphql } from "gatsby";

// const login = () => {
//   return (
//     <div>
//       <Header />

//       <div className="dialog-off-canvas-main-canvas">
//         <div className="page">
//           <div className="page__content-above">
//             <div className="container-fluid px-0">
//               <div className="block block--pagetitle bg-lighter py-4">
//                 <div className="container">
//                   <h1 className="page__title mb-0">Log in</h1>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <main className="main" role="main">
//             <a id="main-content" tabIndex={-1} />
//             <div className="page-layout-sidebar-default">
//               <div className="container py-5">
//                 <div className="row">
//                   <div className="page__content col-md">
//                     <div data-drupal-messages-fallback="" className="hidden" />
//                     <form
//                       className="user-login-form"
//                       data-drupal-selector="user-login-form"
//                       action="/user/login"
//                       method="post"
//                       id="user-login-form"
//                       acceptCharset="UTF-8"
//                     >
//                       <div className="js-form-item form-item js-form-type-textfield form-type-textfield form-item-name js-form-item-name form-group">
//                         <label
//                           htmlFor="edit-name"
//                           className="js-form-required form-required"
//                         >
//                           Username
//                           <i className="fas fa-asterisk text-danger form-required__indicator" />
//                         </label>
//                         <input
//                           autoCorrect="none"
//                           autoCapitalize="none"
//                           spellCheck="false"
//                           autofocus="autofocus"
//                           data-drupal-selector="edit-name"
//                           aria-describedby="edit-name--description"
//                           type="text"
//                           id="edit-name"
//                           name="name"
//                           defaultValue=""
//                           size={60}
//                           maxLength={60}
//                           className="required form-control"
//                           required="required"
//                           aria-required="true"
//                         />
//                         <small
//                           id="edit-name--description"
//                           className="description form-text text-muted"
//                         >
//                           Enter your Starbucks Developer Portal username.
//                         </small>
//                       </div>
//                       <div className="js-form-item form-item js-form-type-password form-type-password form-item-pass js-form-item-pass form-group">
//                         <label
//                           htmlFor="edit-pass"
//                           className="js-form-required form-required"
//                         >
//                           Password
//                           <i className="fas fa-asterisk text-danger form-required__indicator" />
//                         </label>
//                         <input
//                           data-drupal-selector="edit-pass"
//                           aria-describedby="edit-pass--description"
//                           type="password"
//                           id="edit-pass"
//                           name="pass"
//                           size={60}
//                           maxLength={128}
//                           className="required form-control"
//                           required="required"
//                           aria-required="true"
//                         />
//                         <small
//                           id="edit-pass--description"
//                           className="description form-text text-muted"
//                         >
//                           Enter the password that accompanies your username.
//                         </small>
//                       </div>
//                       <input
//                         autoComplete="off"
//                         data-drupal-selector="form-4kfs62kargpfb4y1bv-azisyq5dffikecmjbamux5ji"
//                         type="hidden"
//                         name="form_build_id"
//                         defaultValue="form-4kfs62KarGpfB4Y1Bv_AzISYQ5DfFiKECMJBaMuX5jI"
//                         className="form-control"
//                       />
//                       <input
//                         data-drupal-selector="edit-user-login-form"
//                         type="hidden"
//                         name="form_id"
//                         defaultValue="user_login_form"
//                         className="form-control"
//                       />
//                       <div
//                         data-drupal-selector="edit-actions"
//                         className="form-actions js-form-wrapper form-wrapper"
//                         id="edit-actions"
//                       >
//                         <button
//                           data-drupal-selector="edit-submit"
//                           type="submit"
//                           id="edit-submit"
//                           name="op"
//                           defaultValue="Log in"
//                           className="button js-form-submit form-submit btn btn-primary"
//                         >
//                           LOG IN
//                         </button>
//                       </div>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </main>
//           <footer className="footer footer-fixed-bottom">
//             <div className="container">
//               <div className="footer__wrapper">
//                 <div className="footer__links">
//                   <ul className="footer__links-list">
//                     <li>
//                       <a href="/terms-use">Terms of Use</a>
//                     </li>
//                     <li>
//                       <a href="mailto:APIGatewaySupport@starbucks.com">
//                         Contact Us
//                       </a>
//                     </li>
//                   </ul>
//                 </div>
//                 <div className="footer__copyright">
//                   <span className="copyright">
//                     © 2023 Starbucks Corporation. All rights reserved
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </footer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default login;

import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Header from "../Header/Header";

const Login = () => {
  const data = useStaticQuery(graphql`
    query {
      allUserUser {
        nodes {
          display_name
          id
        }
      }
      allGroupRoleGroupRole {
        nodes {
          label
          permissions
          drupal_internal__id
        }
      }
    }
  `);

  const displayNames = data.allUserUser.nodes.map((node) => node.display_name);
  const displayRoles = data.allGroupRoleGroupRole.nodes.map(
    (node) => node.label
  );

  return (
    <div>
      <Header />

      {/* <div>
        {displayNames.map((displayName, index) => (
          <div key={index}>{displayName}</div>
        ))}
      </div> */}

      <div>
        {displayRoles.map((label, index) => (
          <div key={index}>{label}</div>
        ))}
      </div>

      <div className="dialog-off-canvas-main-canvas">
        <div className="page">
          <div className="page__content-above">
            <div className="container-fluid px-0">
              <div className="block block--pagetitle bg-lighter py-4">
                <div className="container">
                  <h1 className="page__title mb-0">Log in</h1>
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
                      className="user-login-form"
                      data-drupal-selector="user-login-form"
                      action="/user/login"
                      method="post"
                      id="user-login-form"
                      acceptCharset="UTF-8"
                    >
                      <div className="js-form-item form-item js-form-type-textfield form-type-textfield form-item-name js-form-item-name form-group">
                        <label
                          htmlFor="edit-name"
                          className="js-form-required form-required"
                        >
                          Username
                          <i className="fas fa-asterisk text-danger form-required__indicator" />
                        </label>
                        <input
                          autoCorrect="none"
                          autoCapitalize="none"
                          spellCheck="false"
                          autofocus="autofocus"
                          data-drupal-selector="edit-name"
                          aria-describedby="edit-name--description"
                          type="text"
                          id="edit-name"
                          name="name"
                          defaultValue=""
                          size={60}
                          maxLength={60}
                          className="required form-control"
                          required="required"
                          aria-required="true"
                        />
                        <small
                          id="edit-name--description"
                          className="description form-text text-muted"
                        >
                          Enter your Starbucks Developer Portal username.
                        </small>
                      </div>
                      <div className="js-form-item form-item js-form-type-password form-type-password form-item-pass js-form-item-pass form-group">
                        <label
                          htmlFor="edit-pass"
                          className="js-form-required form-required"
                        >
                          Password
                          <i className="fas fa-asterisk text-danger form-required__indicator" />
                        </label>
                        <input
                          data-drupal-selector="edit-pass"
                          aria-describedby="edit-pass--description"
                          type="password"
                          id="edit-pass"
                          name="pass"
                          size={60}
                          maxLength={128}
                          className="required form-control"
                          required="required"
                          aria-required="true"
                        />
                        <small
                          id="edit-pass--description"
                          className="description form-text text-muted"
                        >
                          Enter the password that accompanies your username.
                        </small>
                      </div>
                      <input
                        autoComplete="off"
                        data-drupal-selector="form-4kfs62kargpfb4y1bv-azisyq5dffikecmjbamux5ji"
                        type="hidden"
                        name="form_build_id"
                        defaultValue="form-4kfs62KarGpfB4Y1Bv_AzISYQ5DfFiKECMJBaMuX5jI"
                        className="form-control"
                      />
                      <input
                        data-drupal-selector="edit-user-login-form"
                        type="hidden"
                        name="form_id"
                        defaultValue="user_login_form"
                        className="form-control"
                      />
                      <div
                        data-drupal-selector="edit-actions"
                        className="form-actions js-form-wrapper form-wrapper"
                        id="edit-actions"
                      >
                        <button
                          data-drupal-selector="edit-submit"
                          type="submit"
                          id="edit-submit"
                          name="op"
                          defaultValue="Log in"
                          className="button js-form-submit form-submit btn btn-primary"
                        >
                          LOG IN
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <footer className="footer footer-fixed-bottom">
            <div className="container">
              <div className="footer__wrapper">
                <div className="footer__links">
                  <ul className="footer__links-list">
                    <li>
                      <a href="/terms-use">Terms of Use</a>
                    </li>
                    <li>
                      <a href="mailto:APIGatewaySupport@starbucks.com">
                        Contact Us
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="footer__copyright">
                  <span className="copyright">
                    © 2023 Starbucks Corporation. All rights reserved
                  </span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Login;
