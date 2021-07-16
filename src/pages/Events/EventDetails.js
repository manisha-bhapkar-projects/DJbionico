import React, { useEffect, useState } from 'react';
import CardListTable from "../../components/CardListTable/CardListTable";
import { callEventDetailsAPI } from '../../actions/EventAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
const EventDetails = (props) => {
    const id = props.match.params.id;
    const [usersData, setUserData] = useState([]);
    const [count, setCount] = useState();


    useEffect(() => {
        getEventDetails(id);
    }, []);

    const getEventDetails = (id) => {
        props
            .callEventDetailsAPIAction(id)
            .then((response) => {
                // setCount(response.data.result.count);
                console.log('event details', response);
                setUserData(response.data.result);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const columns = [
        {
            name: "NO.",
            selector: "genric_id",
            // sortable: true,
            grow: "1",

        },
        {
            name: "GENERIC NAME",
            selector: "name",
            //   sortable: true,
            grow: "2",
        },
        {
            name: "SONG COUNT",
            selector: "song_count",
            //   sortable: true,
            grow: "2",
        },



    ];
    return (
        <div>
            <div className="row">
                <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h6 className="card-title mb-0">
                                    Event Details
                                </h6>
                            </div>

                            <div className="table-responsive">
                                <CardListTable
                                    columns={columns}
                                    data={usersData}
                                    // pending={false}
                                    // pagination={false}
                                    // custompagination
                                    // paginationServer={false}
                                    // noDataString={"No data found"}
                                    // totalListCount={count}
                                    // paginationTotalRows={count}
                                    // paginationPerPage={limit}
                                    // onPageChangedCalled={handlePageChange}
                                    // inputClassName="mt-3"
                                // sortFunction={customSort}
                                />


                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
};
const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            callEventDetailsAPIAction: callEventDetailsAPI,

        },
        dispatch,
    );

export default connect(null, mapDispatchToProps)(EventDetails);