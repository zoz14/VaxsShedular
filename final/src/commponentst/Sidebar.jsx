import React, { useState } from 'react';
import'./Sidebar.css';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
    FaShoppingBag,
    FaThList
}from "react-icons/fa";
import { NavLink } from 'react-router-dom';


const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
  const menuItem = [
    {
      path: "/Mv",
      name: "Manage vaccination",
    },
    {
      path: "/MVC",
      name: "Manage vaccination center",
    },
    {
      path: "/User",
      name: "Manage User",
    },
  ];

  return (
<>

    <div className="container">
       <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
           <div className="top_section">
               <h1 style={{display: isOpen ? "block" : "none"}} className="logo">CVS</h1>
               <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                   <FaBars onClick={toggle}/>
               </div>
           </div>
           {
               menuItem.map((item, index)=>(
                   <NavLink to={item.path} key={index} className="link" activeclassName="active">
                       <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                   </NavLink>
               ))
           }
       </div>
       <main>{children}</main>
    </div>
    </>
);
};
export default Sidebar;