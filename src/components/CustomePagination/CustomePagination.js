import React, { useState, useEffect } from "react";
import "./CustomePagination.css";
import PropTypes from "prop-types";
import _ from "lodash";
import { connect } from "react-redux";
// import labels from '../../utils/Locales/labels';
// import Arrow from '../../images/Pagination/Arrow.png';

function CustomePagination({ totalLength, onPageChangedCalled, limit,pageNumber }) {
  const [pageNo, setPageNo] = useState(1);
  const countTotalPage = totalLength / limit;
  // countTotalPage -= (totalLength % labels.WORKFLOWS.LIST.PAGINATION_LIMIT) / 10;
  // countTotalPage += totalLength % labels.WORKFLOWS.LIST.PAGINATION_LIMIT;
  // eslint-disable-next-line radix
  useEffect(() => {
    // if (searchtext) {
      if(pageNumber===1){

        setPageNo(1);
      }
    // console.log('page', paginationRowsPerPageOptions);

    // }
  }, [totalLength,pageNumber]);
  const TotalPages = Math.ceil(countTotalPage);
  const NextPage = () => {
    if (TotalPages !== pageNo) {
      window.scrollTo(0, 0);
      const page = pageNo + 1;

      setPageNo(page);
      onPageChangedCalled(page);
    }
  };
  const PreviousPage = () => {
    if (pageNo !== 1) {
      window.scrollTo(0, 0);
      const page = pageNo - 1;
      setPageNo(page);
      onPageChangedCalled(page);
    }
  };

  const getPageNumbers = (totalPages) => {
    const arr = [];
    for (let i = 1; i <= totalPages; i += 1) {
      arr.push(i);
    }
    return arr;
  };

  const selectPageNumber = (_pageNo) => {
    window.scrollTo(0, 0);
    setPageNo(_pageNo);
    onPageChangedCalled(_pageNo);
  };


  return (



    <div className="custome-pagination">
      <div className="pagination pagination-home pagination-section">
        {/* {TotalPages === 1 ?
           <p>Showing  {((pageNo * limit) + 1) - limit} to  {totalLength} of {totalLength} entries</p> :
             pageNo === TotalPages ?
            <p>Showing {((pageNo * limit) + 1) - limit} to {totalLength} of {totalLength} entries</p>
            :
            <p>Showing {((pageNo * limit) + 1) - limit} to {pageNo * limit} of {totalLength} entries</p>
        } */}
         {TotalPages === pageNo ?
           <p>Showing  {((pageNo * limit) + 1) - limit} to  {totalLength} of {totalLength} entries</p> :
           <p>Showing {((pageNo * limit) + 1) - limit} to {pageNo * limit} of {totalLength} entries</p>
        }

        <ul className="pagination pagination-home pagination-section">
          <div className="d-flex">
            <li
              className={`paginate_button page-item previous ${
                pageNo === 1 ? "disabled" : ""
                }`}
            >
              {/* disabled */}
              <div
                className="pagination-number page-link "
                onKeyDown={PreviousPage}
                onClick={PreviousPage}
                tabIndex="0"
                role="button"
              >
                <a>Prev</a>
              </div>
            </li>

            {getPageNumbers(TotalPages).map((_page) => {
              if (
                (_page >= pageNo - 1 && _page <= pageNo + 1) ||
                _page === TotalPages ||
                _page === 1
              ) {
                if (_page === pageNo) {
                  return (
                    <li className="active">
                      <div className="pagination-number page-item">{_page}</div>
                    </li>
                  );
                }
                return (
                  <li
                    className=""
                    onClick={() => {
                      selectPageNumber(_page);
                    }}
                    onKeyDown={() => {
                      selectPageNumber(_page);
                    }}
                    tabIndex="0"
                    role="button"
                  >
                    <div className="pagination-number">{_page}</div>
                  </li>
                );
              }
              if (_page > pageNo - 4 && _page < pageNo + 4) {
                return <div className="pagination-dot">.</div>;
              }
              return <></>;
            })}

            <li
              className={`paginate_button page-item next ${
                getPageNumbers(TotalPages).length === pageNo ? "disabled" : ""
                }`}
            >
              <div
                className="pagination-number page-link"
                onKeyDown={NextPage}
                onClick={NextPage}
                tabIndex="0"
                role="button"
              >
                <a>Next</a>
              </div>
            </li>
          </div>
        </ul>
      </div>

    </div>
  );
}

CustomePagination.propTypes = {
  totalLength: PropTypes.number.isRequired,
  onPageChangedCalled: PropTypes.func.isRequired,
  limit: PropTypes.number.isRequired,
};
const mapStateToProps = () => ({});

export default connect(mapStateToProps, null)(CustomePagination);







