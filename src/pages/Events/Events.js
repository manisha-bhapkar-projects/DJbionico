import React, { useState, useEffect } from "react";
import constants from "../../utils/constants";
import { useHistory, Link } from "react-router-dom";
import CardListTable from "../../components/CardListTable/CardListTable";
import EventsList from "../../components/DummyTable/DummyTable";
import { Trash } from "react-feather";
import { Edit3 } from "react-feather";
import Modal from "../../components/Modal/Modal";
import {
  callEventListAPI,
  callDeleteEventApi,
} from "../../actions/EventAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import TableHeader from "../../components/TableHeader/TableHeader";
import moment from "moment";
import Moment from "react-moment";
import "moment-timezone";
import Item from "antd/lib/list/Item";
import { CustomeNotification } from "../../components/CustomeNotification/CustomeNotification";

const Events = (props) => {
  const history = useHistory();
  const [count, setCount] = useState(0);
  const [limit, setlimit] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [usersData, setUserData] = useState([]);
  const [loading, setloading] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isUserSearch, setUserSearch] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [images, setImages] = useState([]);

  useEffect(() => {
    getEventList(pageNumber, limit, search);
  }, []);

  const getEventList = (page = 1, limit = 10, search = "") => {
    setloading(true);
    props
      .callEventListAPIAction(page, limit, search)
      .then((response) => {
        // alert('hi');
        console.log("event  list", response);
        setCount(response.data.result.count);
        setUserData(response.data.result.finalres);
        setImages(response.data.result.finalres[0].event_image[0].event_image);
        setloading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const DeleteEvent = (id) => {
    props
      .callDeleteEventApiAction(id)
      .then((response) => {
        console.log("Delete Event", response);
        if (response.data.status) {
          CustomeNotification("error", "Event Deleted ", "Error", 2000);
        }
        getEventList(pageNumber, limit, search);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handelSerach = (e) => {
    setSearch(e.target.value);
    setPageNumber(1);
    getEventList(1, limit, e.target.value);
  };

  const handlePageChange = (perPage, page) => {
    setPageNumber(perPage);
    console.log("ppp", perPage);
    console.log("pageno", pageNumber);
    
    getEventList(perPage, limit, search);
  };

  const openModal = (e) => {
    setShowModal(true);
  };
  const handleDropdownChange = (e) => {
    setlimit(e.target.value);
    setPageNumber(1);
    getEventList(1, e.target.value, search);
  };

  const start = moment().add(-12, "m");

  const Eventcolumns = [
    {
      name: "NO.",
      selector: "id",
      grow: "0.1",
      cell: (row) => {
        return <div className="custome-row-style">
          {row.id}
          </div>;
      },
    },
    {
      name: "EVENT NAME",
      selector: "title",
      grow: "4",
    },
    {
      name: "ADDRESS",
      selector: "address",
      grow: "4",
      cell: (row) => {
        return <div className="d-ellipsis d-row-ellipsis ">
          {row.address}
          </div>;
      },
    },
    {
      name: "DATE",
      selector: "date",
      right: false,
      grow: "4",
      cell: (row) => {
        return (
          <>
            {row.event_date
              ? moment(row.event_date).format("DD-MM-YYYY")
              : row.event_date}
          </>
        );
      },
    },

    {
      name: "TIME",
      selector: "time",
      // sortable: true,
      right: false,
      grow: "1",
      className: "custometime",
      cell: (row) => {
        return <>{row.time ? moment(row.time).format("HH:mm") : row.time}</>;
      },
    },

    {
      name: "BANNER OF EVENT",
      selector: "",
      right: false,
      grow: "7",
      cell: (row) => {
        return (
          <>
            <img
              className={`img-thumbnail`}
              src={row.event_image[0].event_image}
              alt="img"
            />
          </>
        );
      },
    },
    {
      name: "EVENT DESCRIPTION",
      selector: "description",
      grow: "5",
      cell: (row) => {
        return (
          <div className="d-ellipsis d-row-ellipsis">
            {row.description}
            </div>
        );
      },
    },
    {
      name: "ACTION",
      selector: "",
      right: false,
      grow: "1",
      cell: (row) => {
        console.log('row',row.id);
        return (
          <>
            <Link class="trash-custom-icon">
              <Trash onClick={(key) => DeleteEvent(row.id)} />
            </Link>
            <Link
              class="edit-custom-icon"
              onClick={() => {
                history.push(`${constants.ROUTE.EVENTS.EDIT_EVENTS}${row.id}`);
              }}
            >
              <Edit3 />
            </Link>
          </>
        );
      },
    },
  ];

  return (
    <div className="row">
      <div className="col-md-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="card-title mb-0">Event List</h6>
              <button
                className="btn btn-primary btn-icon-text mb-2 mb-md-0"
                onClick={() => {
                  history.push(constants.ROUTE.EVENTS.ADD_EVENTS);
                }}
              >
                Add Event
              </button>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <div className="form-group d-flex align-items-center  col-sm-4 ">
                <label>Show</label>
                <select
                  name="name"
                  value={limit}
                  className="form-control mr-3 ml-3 "
                  onChange={handleDropdownChange}
                >
                  <option value="10" selected>
                    10
                  </option>
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
                  placeholder="Search By Event Name"
                  handelSearch={handelSerach}
                />
              </div>
            </div>
            <div className="table-responsive">
              <CardListTable
                columns={Eventcolumns}
                data={usersData}
                pending={loading}
                pagination={false}
                custompagination
                paginationServer={false}
                noDataString={"No data found"}
                totalListCount={count}
                paginationTotalRows={count}
                paginationPerPage={limit}
                onPageChangedCalled={handlePageChange}
                inputClassName="mt-3"
                pageNumber={pageNumber}

                // sortFunction={customSort}
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
      callEventListAPIAction: callEventListAPI,
      callDeleteEventApiAction: callDeleteEventApi,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Events);

// {viewLogs && viewLogs.result &&
//   viewLogs.result.map((item) => (
//     <>
//       {item.revision_logs.map((details) =>
//         <div className="row revision-details">
//           <div className="col-md-4 mb-2">
//             <h3>Date : {details.date}</h3>
//             {details.logs.map((logs) =>
//               <h2>{logs.task_data_type_display_name_2}</h2>
//             )}
//           </div>
//         </div>

//       )}
//     </>
//   ))}

{
  /*             
             <img className={`img-thumbnail`}
              src= {row.event_image ?
                `${constants.API.BASEURL.URL}images/${row.event_image.event_image}` 
              : null}
              alt="img"
            /> 


               {/* <img
             
              src={
                row.image
                  ? `${constants.BASE_URL.API}/images/${row.image}`
                  : Placeholder
              }
              alt="service"
            /> */
}
{
  /* `${constants.BASE_URL.API}/images/${row.image}` */
}
{
  /* 'https://api.opendota.com/'+{props.img} */
}
{
  /* <img
              alt="img"
              className="img-thumbnail" */
}
{
  /* // src={require("../../assets/images/preview_page_1.jpg")}
              // src={row.event_image}
            // src={require(`/api/v1/images/${row.event_image}`)} */
}
{
  /* />
            {/* /api/v1/images/1602763105604_photo-1474959783111-a0f551bdad25.jpeg" */
}
{
  /* <img className={`img-thumbnail`}
              src={row.event_image
                  ? `(/api/v1/images/{row.event_image})`
                  : null
              }
              alt="img"
            /> */
}
{
  /* {viewLogs && viewLogs.result &&
            viewLogs.result.map((item) => (
              <>
                {item.revision_logs.map((details) =>
                  <div className="row revision-details">
                    <div className="col-md-4 mb-2">
                      <h3>Date : {details.date}</h3>
                      {details.logs.map((logs) =>
                        <h2>{logs.task_data_type_display_name_2}</h2>
                      )}
                    </div>
                  </div>

                )}
              </>
            ))} */
}
