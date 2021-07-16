import React, {useEffect, useState} from 'react';
import CardListTable from "../../components/CardListTable/CardListTable";
import { callGenericDetailsAPI } from '../../actions/GenericAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
const GenericDetails = (props) => {
    const id = props.match.params.id;
    const [usersData, setUserData] = useState([]);
    const [count, setCount] = useState();


    useEffect(() => {
        getGenericDetails(id);
     }, []);

     const getGenericDetails = (id) => {
        props
          .callGenericDetailsAPIAction(id)
          .then((response) => {
            // setCount(response.data.result.count);
            console.log('generic details', response);
            setUserData(response.data.result.song);
          })
          .catch((error) => {
            console.log(error);
          });
      }


    //   const handlePageChange = (perPage, page) => {
    //     setPageNumber(perPage);
    //     getGenericList(perPage, limit, search);
    // };
    //   song_id: "3"
    //   song_name: "test34"
    //   author_name: "demo43"
    //   song_url: "/api/v1/song/demo1.mp3"
    //   favriout_id: "0"
    const Genericcolumns = [
        {
            name: "NO.",
            selector: "song_id",
            // sortable: true,
            grow: "1",

        },
        {
            name: "SONG NAME",
            selector: "song_name",
            //   sortable: true,
            grow: "2",
        },
        {
            name: "SINGER NAME",
            selector: "author_name",
            //   sortable: true,
            grow: "2",
        },
        // {
        //     name: "FAVOURITE",
        //     selector: "favriout_id",
        //     //   sortable: true,
        //     grow: "2",
        // },
        {
            name: "SONG",
            selector: "song_url",
            // sortable: true,
            right: false,
            grow: "5",
            cell: (row) => {
              return (
      
                <audio className="audio"
                  preload="none" controls controlsList="nodownload">
                  <source type="audio/mpeg"
                    codecs="mp3"
                    // src="https://geekanddummy.com/wp-content/uploads/2014/01/Spiral-Tension.mp3"
                    src={row.song_url}
                  >
      
                  </source>
                </audio>
              );
            },
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
                                Generic Details
                                </h6>
                        </div>
                     
                        <div className="table-responsive">
                            <CardListTable
                                columns={Genericcolumns}
                                data={usersData}
                                pending={false}
                                // pagination={false}
                                // custompagination
                                // paginationServer={false}
                                // noDataString={"No data found"}
                                // totalListCount={count}
                                // paginationTotalRows={count}
                                // paginationPerPage={limit}
                                // onPageChangedCalled={handlePageChange}
                                // inputClassName="mt-3"
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
            callGenericDetailsAPIAction: callGenericDetailsAPI,
          
        },
        dispatch,
    );

export default connect(null, mapDispatchToProps)(GenericDetails);