import React, { useState, useEffect } from "react";
import CardListTable from "../../components/CardListTable/CardListTable";
import InquiryList from "../../components/DummyTable/DummyTable";
import { callInquiryListAPI } from '../../actions/InquiryAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TableHeader from "../../components/TableHeader/TableHeader";

const Inquiry = (props) => {
  const [count, setCount] = useState(2);
  const [limit, setlimit] = useState(10);
  const [usersData, setUserData] = useState([]);
  const [loading, setloading] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isUserSearch, setUserSearch] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    getInquiryList(pageNumber, limit, search);

  }, []);

  const getInquiryList = (page = 1, limit = 10, search = "") => {
    setloading(true);
    props
      .callInquiryListAPIAction(page, limit, search)
      .then((response) => {
        setCount(response.data.result.count);
        console.log('Inquiry List', response);
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
    getInquiryList(1, limit, e.target.value);
  };

  const handlePageChange = (perPage, page) => {
    console.log("perPage", perPage);
    
    setPageNumber(perPage);
    console.log("pageno", pageNumber);
    
    getInquiryList(perPage, limit, search);
  };
  const handleDropdownChange = (e) => {
    setlimit(e.target.value)
    setPageNumber(1);
    getInquiryList(1, e.target.value, search);
  };

//   id: 1
// name: "ashruti"
// email: "ashruti.qrioustech@gmail.com"
// mobile: "7383416022"
// comment: "Nice work"
  const InquiryColumn = [
    {
      name: "No.",
      selector: "id",
      // sortable: true,
      grow: "1",
     
    },
    {
      name: "NAME",
      selector: "name",
      //   sortable: true,
      grow: "1",
    },
    {
      name: "MOBILE",
      selector: "mobile",
      //   sortable: true,
      grow: "2",
    },

    {
      name: "EMAIL",
      selector: "email",
      //   sortable: true,
      grow: "4",
    },

    {
      name: "COMMENTS",
      selector: "comment",
      //   sortable: true,
      grow: "4",
    },



  ];
  return (

    <div className="row">
      <div className="col-md-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="card-title mb-0">Inquery List</h6>
           
              {/* <TableHeader
                  search={search}
                  handelSearch={handelSerach}
                /> */}
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <div className="form-group d-flex align-items-center  col-sm-4 ">
                <label>Show</label>
                <select
                  name="name"
                  value={limit}
                  className="form-control mr-3 ml-3 "
                  onChange={handleDropdownChange}>
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
                  handelSearch={handelSerach}/>
              </div>
            </div>
            <div className="table-responsive">
              <CardListTable
                columns={InquiryColumn}
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
    </div>


  );
};
const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            callInquiryListAPIAction: callInquiryListAPI,
        },
        dispatch,
    );

export default connect(null, mapDispatchToProps)(Inquiry);


