import React from "react";
import PropTypes from "prop-types";

function TableHeader({
  title,
  isOpen,
  search,
  handelSearch,
  handleSearchClose,
  placeholder
}) {
  return (
    <div className="row d-flex align-items-center justify-content-between">
      <div className="col-md-6">
        <div className="row align-items-center ml-0 mr-0">
          <h5 className="card-title mb-0">{title}</h5>
        </div>
      </div>
      <div>
        <div>
          <div className="input-holder">
            <input
              type="text"
              className="form-control"
              placeholder={placeholder}
              value={search}
              onChange={handelSearch}
            />
            {/* <button className="search-icon" onClick={handleSearchClose}>
              <span />
            </button> */}
          </div>
          <button className="close" onClick={handleSearchClose} />
        </div>
      </div>
    </div>
  );
}

TableHeader.propTypes = {
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  search: PropTypes.string,
  handelSearch: PropTypes.func,
  handleSearchClose: PropTypes.func,
  placeholder:PropTypes.string,

};

TableHeader.defaultProps = {
  title: "",
  isOpen: false,
  search: "",
  placeholder:'',
  handelSearch: () => {},
  handleSearchClose: () => {},
};

export default TableHeader;
