import React, { useState, useEffect } from "react";
import TextFieldComponent from "../../components/TextFieldComponent/TextFieldComponent";
import { callEditAlbumApi, callAlbumDetailsAPI } from "../../actions/AlbumAction";
import { callUploadImage } from "../../actions/CommonUploadAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import constants from "../../utils/constants";
import { CustomeNotification } from "../../components/CustomeNotification/CustomeNotification";

const EditAlbum = (props) => {
  const [isNameError, setNameError] = useState("");
  const [name, setName] = useState("");
  const [profile, setFile] = useState("");
  const [date, setDate] = useState(null);
  const [isOpenDate, setIsOpenDate] = useState(false);
  const [isOpenTime, setIsOpenTime] = useState(false);
  const [time, setTime] = useState(null);
  const [message, setMessage] = useState("");
  const [address, setAddress] = useState("");
  const [isMessageError, setMessageError] = useState("");
  const [isFileError, setFileError] = useState("");
  const [lengthError, setLengthError] = useState("");
  const [file, setisfile] = useState("");
  const[usersData, setUserData]= useState([]);
  const[isEdit , setIsEdit]= useState(false);
  const id = props.match.params.id;

  const hiddenFileInput = React.useRef(null);

  useEffect(() => {
    getAlbumDetails(id);
  }, []);

  const getAlbumDetails = (id) => {
    props
      .callAlbumDetailsAPIAction(id)
      .then((res) => {
        console.log("album details", res);
        setUserData(res.data.result);
       
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // if (
    //   name.trim() === "" 
    // ) {
    //   if (name.trim() === "") {
    //     setNameError("Enter Album Name");
    //   }
    //   return null;
    // }

    props
      .callEditAlbumApiAction(id, {name: usersData.name})
      .then((response) => {
        console.log("Edit album", response);
        if (response.data.status) {
          CustomeNotification(
            "success",
            "Updated Successfully",
            "Success",
            2000
          );
        }
        props.history.push(constants.ROUTE.SIDEBAR.ALBUM);
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.status === 400) {
          let result = err.response.data.result;
          if ("name" in result) {
            CustomeNotification(
              "error",
              result.name.message,
              "Error",
              2000
            );
            setNameError(result.name.message);
          }
        } 
        else if (err.response && err.response.status === 401) {
          CustomeNotification(
            "error",
            err.response.data.message,
            "Error",
            2000
          );
        }
      
      });
  };
  const handleChangeName = (e) => {
    setNameError("");
    setLengthError("");
    setName(e.target.value);
    setIsEdit(true);
    const data = {...usersData};
    if(usersData){
      data.name = e.target.value
    }
    setUserData(data);
  };


  const handleChangeMessage = (e) => {
    setMessageError("");
    setMessage(e.target.value);
  };

  const handleChange = (event) => {
    let file = event.target.files[0].name;
    console.log("gggg", file);
    setisfile(file);
    const data = new FormData();
    data.append("profile", event.target.files[0]);
    props
      .callUploadImageAction(data)
      .then((res) => {
        console.log("upload image", res);
        // setFile(res.data.result.length ? res.data.result : "");
        // setFileError("");
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.status === 400) {
          let result = err.response.data.result;
          if ("name" in result) {
            CustomeNotification(
              "error",
              result.name.message,
              "Error",
              2000
            );
            setNameError(result.name.message);
          }
        } 
        else if (err.response && err.response.status === 401) {
          CustomeNotification(
            "error",
            err.response.data.message,
            "Error",
            2000
          );
        }
      });
  };

  return (
    <div>
      <nav className="page-breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={constants.ROUTE.SIDEBAR.EVENTS}>New Music</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Music
          </li>
        </ol>
      </nav>
      <div className="row">
        <div className="col-md-12 stretch-card">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title">Edit Music</h6>
              <form
                className="cmxform"
                id="signupForm"
                method="get"
                action="#"
                noValidate="novalidate">
                <fieldset>
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="form-group">
                        <TextFieldComponent
                          className=""
                          id="eventname"
                          label="Music Name"
                          labelClassName=""
                          inputClassName=""
                          error={isNameError ? true : false}
                          helperText={isNameError}
                          helperTextClassName="errormsg"
                          isDisable={false}
                          placeholder="Enter Music Name"
                          onChange={handleChangeName}
                          value={usersData.name}/>
                        <div className="errormsg">
                          {/* {lengthError ? lengthError : null} */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <input
                    className="btn btn-primary"
                    type="submit"
                    defaultValue="Submit"
                    onClick={handleSubmit}
                  />
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    // callUploadImageAction: callUploadImage,
    callEditAlbumApiAction: callEditAlbumApi,
    callAlbumDetailsAPIAction: callAlbumDetailsAPI
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(EditAlbum);
