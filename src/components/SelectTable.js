import React, { useState } from 'react';
import PropTypes from 'prop-types';
import UserList from "../components/DummyTable/DummyTable";

const SelectTable = props => {
    const [limit, setlimit] = useState(10);

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="form-group d-flex align-items-center  col-sm-4 ">
                    <label>Show</label>
                    <select
                        name="name"
                        value={limit}
                        className="form-control mb-3 mr-3 ml-3 "
                        onChange={(e) => { setlimit(e.target.value) }}
                        >
                        <option value="1" selected>1</option>
                        <option value="3">2</option>
                        <option value="5">5</option>
                        <option value={UserList.UserList.length}>All</option>

                    </select>
                    <span className="form-group d-flex align-items-center">entries</span>
                </div>
                <div className="form-group">
                    <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Search" />
                </div>
            </div>
        </div>
    );
};

SelectTable.propTypes = {

};

export default SelectTable;