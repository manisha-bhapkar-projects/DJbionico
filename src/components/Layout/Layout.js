import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";



const Layout = ({ children,  parentCallback}) => {
  return (
  <>
  <Sidebar  onSidebarClick={parentCallback}/>
  <div className="page-wrapper">
      <Header/>
       <div className="page-content">
          {children}
         </div>
         <Footer/> 

      </div>
     
  </>          
                    
  );
};


export default Layout;

