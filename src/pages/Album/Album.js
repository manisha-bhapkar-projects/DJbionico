import React, { useState, useEffect } from "react";
import constants from "../../utils/constants";
import { useHistory, Link } from "react-router-dom";
import CardListTable from "../../components/CardListTable/CardListTable";
import { Trash } from "react-feather";
import Modal from "../../components/Modal/Modal";
import { Edit3 } from "react-feather";
import { callAddAlbumListAPI, callDeleteAlbumApi } from "../../actions/AlbumAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import TableHeader from "../../components/TableHeader/TableHeader";
import { CustomeNotification } from "../../components/CustomeNotification/CustomeNotification";

const Album = (props) => {
  const history = useHistory();
  const [count, setCount] = useState(2);
  const [limit, setlimit] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [usersData, setUserData] = useState([]);
  const [loading, setloading] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isUserSearch, setUserSearch] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
 
  useEffect(() => {
    getAlbumList(pageNumber, limit, search);
  }, []);

  const getAlbumList = (page = 1, limit = 10, search = "") => {
    setloading(true);
    props
      .callAddAlbumListAPIAction(page, limit, search)
      .then((response) => {
        console.log("album List", response);
        setUserData(response.data.result.finalres);
        setCount(response.data.result.count);
        setloading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handelSerach = (e) => {
    setSearch(e.target.value);
    setPageNumber(1);
    getAlbumList(1, limit, e.target.value);
  };

  const handlePageChange = (perPage, page) => {
    setPageNumber(perPage);
    getAlbumList(perPage, limit, search);
  };
  const handleDropdownChange = (e) => {
    setlimit(e.target.value);
    setPageNumber(1);
    getAlbumList(1, e.target.value, search);
  };

  const DeleteAlbum = (id) => {
    props.callDeleteAlbumApiAction(id)
    .then((response) => {
      console.log("Delete album", response);
      if (response.data.status) {
        CustomeNotification("error", "Music Deleted ", "Error", 2000);
      }
      getAlbumList(pageNumber, limit, search);
    });
  };
//   id: 1
//   name: "Magic of Love"
//   song_count: 2
  const Musiccolumns = [
    {
      name: "No.",
      selector: "id",
      grow: "1",
    },
    {
      name: "MUSIC NAME",
      selector: "name",
      grow: "3",
    },
    // {
    //   name: "SONG COUNT",
    //   selector: "song_count",
    //   grow: "3",
    // },
    {
      name: "SONG COUNT",
      selector: "song_count",
      // sortable: true,
      right: false,
      grow: "2",
      cell: (row) => {
          return (
              <>
                  {row.song_count === null ? 0 : row.song_count}
              </>
          );
      },
  },
    {
      name: "ACTION",
      selector: "",
      right: false,
      grow: "1",
      cell: (row) => {
        return (
          <>
            <Link class="trash-custom-icon">
              <Trash 
              onClick={(key) => DeleteAlbum(row.id)} 
              />
            </Link>
            <Link
              class="edit-custom-icon"
              onClick={() => {
                history.push(
                  `${constants.ROUTE.ALBUM.EDIT_ALBUM}${row.id}`
                );
              }}
            >
              <Edit3 />
            </Link>
          </>
        );
      },
    },
    {
      name: "",
      selector: "",
      // sortable: true,
      right: false,
      grow: "2",
      cell: (row) => {
          return (
              <>
                  <button className="btn btn-primary"
                      onClick={() => {
                          history.push(`${constants.ROUTE.ALBUM.DETAILS}${row.id}`);
                      }}
                  >View</button>
              </>
          );
      },
  },

  ];
  return (
    <div>
      <div className="row"></div>
      <div className="col-md-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="card-title mb-0">Music List</h6>
              <button
                className="btn btn-primary btn-icon-text mb-2 mb-md-0"
                onClick={() => {
                  history.push(constants.ROUTE.ALBUM.ADD_ALBUM);
                }}
              >
                Add New Music
              </button>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <div className="form-group d-flex align-items-center  col-sm-4 ">
                <label>Show</label>
                <select
                  name="name"
                  value={limit}
                  className="form-control mr-3 ml-3 "
                  // onChange={(e) => { setlimit(e.target.value) }}
                  onChange={handleDropdownChange}
                >
                  <option value="10" selected>10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value={count}>All</option>
                </select>
                <span className="form-group d-flex align-items-center">
                  entries
                </span>
              </div>
              <div className="form-group">
                <TableHeader
                  search={search}
                  placeholder="Search By Music Name"
                  handelSearch={handelSerach}
                />
              </div>
            </div>
            <div className="table-responsive">
              <CardListTable
                columns={Musiccolumns}
                data={usersData}
                pending={loading}
                pagination={false}
                custompagination
                paginationServer={false}
                noDataString={"No data found"}
                totalListCount={count}
                // paginationTotalRows={count}
                paginationPerPage={limit}
                onPageChangedCalled={handlePageChange}
                inputClassName="mt-3"
                // sortFunction={customSort}
                pageNumber={pageNumber}

              />
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={showModal}
        onCancelClickListner={() => setShowModal(false)}
      />
    </div>
  );
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        callAddAlbumListAPIAction: callAddAlbumListAPI,
      callDeleteAlbumApiAction: callDeleteAlbumApi,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Album);


