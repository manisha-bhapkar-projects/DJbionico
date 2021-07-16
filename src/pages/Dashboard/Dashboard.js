import React,{useEffect, useState} from "react";
import Card from "./Card";
import { Link } from "react-router-dom";
import constants from "../../utils/constants";
import { callDashboardApi } from '../../actions/DashboardAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
const Dashboard = (props) => {
    const [data, setData] = useState("");


    useEffect(() => {
        props.callDashboardApiAction()
        .then((response) => {
         console.log('DASHBOARD', response);
         setData(response.data.result)
       }).catch((err) => {
           console.log(err);
       });
    
      }, []);
    
    return (
        <>
            <div className="d-flex justify-content-between align-items-center flex-wrap grid-margin">
                <div>
                    <h4 className="mb-3 mb-md-0">Welcome to Dashboard</h4>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-xl-12 stretch-card">
                    <div className="row flex-grow">
                     <Card 
                     title='Users' 
                     pathRoute={constants.ROUTE.SIDEBAR.USER}
                     count={data.usersCount}
                     />
                     <Card 
                     title='Events' 
                     pathRoute={constants.ROUTE.SIDEBAR.EVENTS}
                     count={data.eventcount} 
                     />
                     <Card 
                     title='Music' 
                     pathRoute={constants.ROUTE.SIDEBAR.MUSIC}
                     count={data.songcount} 
                     />
                    </div>
                </div>
            </div>

        </>


    );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
        callDashboardApiAction: callDashboardApi,
    },
    dispatch,
  );

export default connect(null, mapDispatchToProps)(Dashboard);

