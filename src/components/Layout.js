import React from "react";
import Header from "./Header/Header";
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'; 

const Layout = ({ children }) => {
  return (
    <div style={{fontFamily:"Sodo Sans, sans-serif"}}>
      <Header />
      {/* <ToastContainer /> */}
      {children}
    </div>
  );
};

export default Layout;
