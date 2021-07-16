import React,{useState} from "react";
import { Icon, InlineIcon } from '@iconify/react';
import logOut from '@iconify/icons-feather/log-out';
import constants from "../../utils/constants";
import { callLogoutApi } from '../../actions/AuthAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    storeAuthToken,
    storeRefreshToken,
    storeAdminData,
  } from "../../utils/storage/index";
  import { useHistory, Link } from "react-router-dom";
  import Modal from "../../components/Modal/Modal";

const Header = (props) => {
    const history = useHistory();
    const [showModal, setShowModal] = useState(false);

    const openModal = (e) => {
      setShowModal(true);
    };
    const LogoutApi = () => {
      setShowModal(true);
        props
          .callLogoutApiAction()
          .then((response) => {
            if (response.data.status) {
              storeAuthToken();
              storeRefreshToken();
              storeAdminData();
              history.push(constants.ROUTE.LOGIN.LOGIN);
            } else {
              console.log(response);
            }
          })
          .catch((error) => console.log(error));
      };
    
    return (
        <nav className="navbar">
            <a href="#" className="sidebar-toggler">
                <i data-feather="menu" />
            </a>
            <div className="navbar-content">
                <ul className="navbar-nav">
                    <li className="nav-item dropdown nav-profile">
                        <Link className="nav-link dropdown-toggle"
                        to={constants.ROUTE.LOGIN.LOGIN}
                         aria-haspopup="true" 
                         onClick={LogoutApi}
                        >
                      <Icon icon={logOut} onClick={openModal}/>
                        </Link>

                    </li>
                </ul>
            </div>
            <Modal
        isOpen={showModal}
        onCancelClickListner={() => setShowModal(false)}
      />
        </nav>

    );
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            callLogoutApiAction: callLogoutApi,
        },
        dispatch,
    );

export default connect(null, mapDispatchToProps)(Header);

