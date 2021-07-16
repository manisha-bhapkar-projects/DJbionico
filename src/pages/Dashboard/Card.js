import React from "react";
import { Users } from 'react-feather';
import { Link } from "react-router-dom";

const Card = (props) => {
    

    return (
        <div className="col-md-4 grid-margin stretch-card">
  
            <div className="card">
                <div className="card-body">
                    <div className="row d-flex align-items-center dashboard_grid">
                        <div className="col-6 col-md-8 col-xl-8">
                        {props.pathRoute ? (
                           <Link to={props.pathRoute} style={{textDecoration:"none"}}>
                            <h6 className="card-title mb-2">{props.title}</h6>
                            </Link>):<></>}

                            <h3 className="mb-">{props.count}</h3>
                        </div>
                          <div className="col-6 col-md-4 col-xl-4">
                            {props.title === 'Users' ?  <Users /> :
                            props.title === 'Events' ? <i className="far fa-calendar-alt" />:
                            <i className="fas fa-music" />}
                           </div>
                          

                    </div>
                </div>
            </div>
        </div>
    );
};


export default Card;

