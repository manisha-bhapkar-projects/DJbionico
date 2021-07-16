import React from 'react';

const Modal = ({ isOpen, onCancelClickListner}) => {
    return isOpen ? (

<div    
        className={`modal ${isOpen ? "modal-open" : ""}`}
    //    className="modal" 
     id="myModalDelete">
       <div className="modal-dialog">
    <div className="modal-content">
      {/* Modal Header */}
      <div className="modal-header ">
        <h4 className="modal-title">Delete Event</h4>
        <button type="button"
         onClick={() => onCancelClickListner()}
         className="close" 
         data-dismiss="modal">×</button>
      </div>
      {/* Modal body */}
      <div className="modal-body">
        <p>Do you want to delete the record?</p>
      </div>
      {/* Modal footer */}
      <div className="modal-footer">
        <button 
        type="button" 
        className="btn btn-primary"
        data-dismiss="modal">Yes</button>
        <button type="button" 
        className="btn btn-secondary" 
        onClick={() => onCancelClickListner()}
        data-dismiss="modal">No</button>
      </div>
    </div>
  </div>
</div>

    ): (<></>);
};

export default Modal;