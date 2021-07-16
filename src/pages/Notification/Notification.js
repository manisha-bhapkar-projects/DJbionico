import React, { useState, useEffect } from "react";
import constants from "../../utils/constants";
import { useHistory, Link } from "react-router-dom";
import CardListTable from "../../components/CardListTable/CardListTable";
import { Trash } from "react-feather";
import Modal from "../../components/Modal/Modal";
import { Edit3 } from "react-feather";
import { callNotificationListAPI, callDeleteNotificationApi } from "../../actions/NotificationAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import TableHeader from "../../components/TableHeader/TableHeader";
import { CustomeNotification } from "../../components/CustomeNotification/CustomeNotification";

const Notification = (props) => {
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

  const openModal = (e) => {
    setShowModal(true);
  };

  useEffect(() => {
    getNotificationList(pageNumber, limit, search);
  }, []);


  const getNotificationList = (page = 1, limit = 10, search = "") => {
    setloading(true);
    props
      .callNotificationListAPIAction(page, limit, search)
      .then((response) => {
        console.log("Notification List", response);
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
    getNotificationList(1, limit, e.target.value);
  };

  const handlePageChange = (perPage, page) => {
    setPageNumber(perPage);
    getNotificationList(perPage, limit, search);
  };
  const handleDropdownChange = (e) => {
    setlimit(e.target.value);
    setPageNumber(1);
    getNotificationList(1, e.target.value, search);
  };

  const DeleteNotification = (id) => {
    props.callDeleteNotificationApiAction(id)
    .then((response) => {
      console.log("Delete notification", response);
      if (response.data.status) {
        CustomeNotification(
          "error", 
          "Notification Deleted ",
         "Error", 2000);
      }
      getNotificationList(pageNumber, limit, search);
    });
  };
  //   id: 1
  //   title: "hey"
  //   msg: "Helllo"
  //   notification_image: "/api/v1/images/"
  const Musiccolumns = [
    {
      name: "No.",
      selector: "id",
      grow: "1",
    },
    {
      name: "NOTIFICATION TITLE",
      selector: "title",
      grow: "4",
    },
    {
      name: "MESSAGE",
      selector: "msg",
      grow: "3",
    },
    {
      name: "IMAGE",
      selector: "",
      right: false,
      grow: "7",
      cell: (row) => {
        console.log(row);
        
        return (
          <>
            <img
              className={`img-thumbnail`}
              src={row.notification_image}
              alt="img"
            />
          </>
        );
      },
    },
    {
      name: "ACTION",
      selector: "",
      right: false,
      grow: "2",
      cell: (row) => {
        return (
          <>
            <Link class="trash-custom-icon">
              <Trash onClick={(key) => DeleteNotification(row.id)} />
            </Link>
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
              <h6 className="card-title mb-0">Notification List</h6>
              <button
                className="btn btn-primary btn-icon-text mb-2 mb-md-0"
                onClick={() => {
                  history.push(constants.ROUTE.NOTIFICATION.ADD_NOTIFICATION);
                }}
              >
                Add Notification
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
                  <option value="10" selected>
                    10
                  </option>
                  <option value="20">
                    20</option>
                  <option value="30">
                    30</option>
                  <option value={count}>All</option>
                </select>
                <span className="form-group d-flex align-items-center">
                  entries
                </span>
              </div>
              <div className="form-group">
                <TableHeader
                  search={search}
                  placeholder="Search By Title"
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
      callNotificationListAPIAction: callNotificationListAPI,
      callDeleteNotificationApiAction: callDeleteNotificationApi,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Notification);


