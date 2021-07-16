import React, {useEffect, useState} from 'react';
import CardListTable from "../../components/CardListTable/CardListTable";
import { callAlbumDetailsAPI } from '../../actions/AlbumAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
const AlbumDetails = (props) => {
    const id = props.match.params.id;
    const [usersData, setUserData] = useState([]);
    const [count, setCount] = useState();


    useEffect(() => {
        getAlbumDetails(id);
      }, []);
    
      const getAlbumDetails = (id) => {
        props
          .callAlbumDetailsAPIAction(id)
          .then((res) => {
            console.log("album details", res);
            setUserData(res.data.result.song);
           
          })
          .catch((error) => {
            console.log(error);
          });
      };

    //   id: 1
    //   name: "Magic of Love"
    //   song: Array(2)
    //   0:
    //   song_id: "21"
    //   song_name: "Love Me Like You Do"
    //   author_name: "Ellie Goulding"
    //   song_url: ""
    //   __proto__: Object
    //   1:
    //   song_id: "25"
    //   song_name: "Hotline Bling"
    //   author_name: "Drake"
    //   song_url: ""
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
                                Music Details
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
            callAlbumDetailsAPIAction: callAlbumDetailsAPI

          
        },
        dispatch,
    );

export default connect(null, mapDispatchToProps)(AlbumDetails);