import React, { useState, useEffect } from "react";
import CardListTable from "../../components/CardListTable/CardListTable";
import UserList from "../../components/DummyTable/DummyTable";
import constants from "../../utils/constants";
import { useHistory } from 'react-router-dom';
import { Trash } from 'react-feather';
import { Edit3 } from 'react-feather';
import SelectTable from "../../components/SelectTable";
import { Link } from "@material-ui/core";
import Modal from "../../components/Modal/Modal";
import { callUserListAPI, callUserStatusChangeAPI } from '../../actions/UserAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TableHeader from "../../components/TableHeader/TableHeader";

const Users = (props) => {
  const [count, setCount] = useState(0);
  const [limit, setlimit] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [usersData, setUserData] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isUserSearch, setUserSearch] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setloading] = useState(false);
  const history = useHistory();

  const openModal = (e) => {
    setShowModal(true);
  };
  useEffect(() => {
    getUser(pageNumber, limit, search);
  }, []);

  const UpdateStatus = (id, is_approve) => {
    props.callUserStatusChangeAPIAction(id, is_approve)
      .then((res) => {
        console.log("status update", res);
        getUser(pageNumber, limit, search);
      })
      .catch((error) => {
        console.log(error);
      });

  };


  const getUser = (page = 1, limit = 10, search = "") => {
    setloading(true);
    props
      .callUserListAPIAction(page, limit, search)
      .then((response) => {
        setCount(response.data.result.count);
        console.log('user List', response);
        setUserData(response.data.result.finalres);
        setloading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handelSerach = (e) => {
    setSearch(e.target.value);
    setPageNumber(1);
    getUser(1, limit, e.target.value);
  };

  const handlePageChange = (perPage, page) => {
    setPageNumber(perPage);
    getUser(perPage, limit, search);
  };
  const handleDropdownChange = (e) => {
    setlimit(e.target.value)
    setPageNumber(1);
    getUser(1, e.target.value, search);
  };
  const Usercolumns = [
    {
      name: "NO.",
      selector: "id",
      // sortable: true,
      grow: "1",
      cell: (row) => {
        return <div className="custome-row-style">{row.id}</div>;
      },
    },
    {
      name: "FIRST NAME",
      selector: "fname",
      //   sortable: true,
      grow: "3",
    },
    {
      name: "LAST NAME",
      selector: "lname",
      //   sortable: true,
      grow: "3",
    },
    {
      name: "EMAIL",
      selector: "email",
      //   sortable: true,
      grow: "4",
    },

    {
      name: "STATUS",
      selector: "",
      // sortable: true,
      right: false,
      grow: "3",
      cell: (row) => {

        return (
          <>
            <label class="switch">
              <input type="checkbox"
                checked={row.is_approve === 1 ? true : false}
                onChange={(key) => UpdateStatus(row.id, row.is_approve)}
                value={row.is_approve}
              />
              <span class="slider round"></span>

            </label>
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
              <h6 className="card-title mb-0">User List</h6>
            </div>
            {/* <SelectTable limit={limit} /> */}
            <div className="d-flex justify-content-between align-items-center">
              <div className="form-group d-flex align-items-center  col-sm-4 ">
                <label>Show</label>
                <select
                  name="name"
                  value={limit}
                  className="form-control  mr-3 ml-3 "
                  onChange={handleDropdownChange}
                // onChange={(e) => { setlimit(e.target.value) }}
                >
                  <option value="10" selected>10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value={count}>All</option>
                </select>
                <span className="form-group d-flex align-items-center">entries</span>
              </div>
              <div className="form-group">
                <TableHeader
                  search={search}
                  placeholder="Search By Name"
                  handelSearch={handelSerach}
                />
              </div>
            </div>
            <div className="table-responsive">
              <CardListTable
                columns={Usercolumns}
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
                paginationRowsPerPageOptions={[1, 3, 5, 10, 15, 20, 25, 30]}
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

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      callUserListAPIAction: callUserListAPI,
      callUserStatusChangeAPIAction: callUserStatusChangeAPI,
    },
    dispatch,
  );

export default connect(null, mapDispatchToProps)(Users);



