import React, { useState } from "react";
import { sidebar } from "../../utils/routes/index";
import { useHistory } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { NavLink, Link } from 'react-router-dom';
const Sidebar = ({ onSidebarClick }) => {
    const [isSidebar, setIsSidebar] = useState(false);
    const [isClick, setIsClick] = useState(false);


    const history = useHistory();

    const handleCollapse = (e) => {
        setIsSidebar(!isSidebar);
    };
    const handleNavClick = (e) => {
        setIsClick(!isClick);
    };



    return (

        <nav className="sidebar">
            <div className="sidebar-header">
                <a href="#" className="sidebar-brand">
                    DJ Bionico <span>Mix</span>
                </a>
            </div>
            <div className="sidebar-body">
                <ul className="nav">

                    {sidebar.map((item, index) => {
                        return item.sidebar ? (
                            <NavLink to={item.path} className={item.cName} key={index} >

                                <NavLink
                                    to={item.path}
                                    className="nav-link" style={{position:"relative"}} >
                                    <i
                                        className={item.icon}
                                        style={{position:"absolute"}} />
                                    <span
                                        className="link-title">
                                        {item.title}
                                    </span>
                                </NavLink>
                            </NavLink>
                        ) : null
                    })}


                    {/* {sidebar.map((item, index) => {
                        return (
                            <li className={item.cName} onClick={() => handleClick(index)}>
                                {history.location.pathname.includes(item.path) ?
                                    <a className="nav-link">
                                        <i className="link-icon" data-feather={item.icon} />
                                        <span className="link-title">{item.title}</span>
                                    </a> :
                                    <a className="nav-link">
                                        <i className="link-icon" data-feather={item.icon} />
                                        <span className="link-title">{item.title}</span>
                                    </a>
                                }
                            </li>
                        )
                    })} */}




                    {/* <li className="nav-item active">
                            <a  className="nav-link">
                                <i className="link-icon" data-feather="box" />
                                <span className="link-title">Dashboard</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="user.html">
                                <i className="link-icon" data-feather="user" />
                                <span className="link-title">User</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="collapse" href="#emails" role="button" aria-expanded="false" aria-controls="emails">
                                <i className="link-icon" data-feather="calendar" />
                                <span className="link-title">Events</span>
                                <i className="link-arrow" data-feather="chevron-down" />
                            </a>
                            <div className="collapse" id="emails">
                                <ul className="nav sub-menu">
                                    <li className="nav-item">
                                        <a href="event-list.html" className="nav-link">Event List</a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="event-add.html" className="nav-link">Add Event</a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="collapse" href="#music" role="button" aria-expanded="false" aria-controls="emails">
                                <i className="link-icon" data-feather="music" />
                                <span className="link-title">Music</span>
                                <i className="link-arrow" data-feather="chevron-down" />
                            </a>
                            <div className="collapse" id="music">
                                <ul className="nav sub-menu">
                                    <li className="nav-item">
                                        <a href="music-list.html" className="nav-link">Music List</a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="music-add.html" className="nav-link">Add Music</a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-item"> */}
                    {/* <a className="nav-link" href="inquery-list.html">
                                <i className="link-icon" data-feather="info" />
                                <span className="link-title">Inquiry</span>
                            </a>
                        </li> */}
                </ul>
            </div>
        </nav>

    );
};


// export default withRouter(Sidebar);
export default Sidebar;


