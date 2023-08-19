// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";

// const View = () => {
//   const teamDetails = useSelector((state) => state.teamDetails);
//   // console.log("wouiefvre", teamDetails);
//   const [name, setName] = useState(teamDetails.name);
//   useEffect(() => {}, []);

//   return (
//     <div>
//       <div class="page__content-above">
//         <div class="container-fluid px-0">
//           <div class="contextual-region block block--pagetitle bg-lighter py-4">
//             <div class="container">
//               <h1 class="js-quickedit-page-title page__title mb-0">
//                 <div
//                   data-quickedit-field-id="team/zuf6/displayName/und/full"
//                   class="field field--inline d-sm-flex align-items-sm-center team__displayname"
//                 >
//                   <div class="field__label">Team name</div>
//                   <div class="field__item">{name}</div>
//                 </div>
//               </h1>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default View;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Layout from "../Layout";
import Buttons from "../Buttons/Buttons";

const View = () => {
  const selectedTeam = useSelector((state) => state.selectedTeam);
  console.log("selected team",selectedTeam)


  return (
    <Layout>
      <div>
        <Buttons />
        <div className="page__content-above">
          <div className="container-fluid px-0">
            <div className="contextual-region block block--pagetitle bg-lighter py-4">
              <div className="container">
                <h1 className="js-quickedit-page-title page__title mb-0">
                  <div
                    data-quickedit-field-id="team/zuf6/displayName/und/full"
                    className="field field--inline d-sm-flex align-items-sm-center team__displayname"
                  >
                    <div className="field__label">Appgroup name</div>
                    <div className="field__item">{selectedTeam.name}</div>
                  </div>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default View;
