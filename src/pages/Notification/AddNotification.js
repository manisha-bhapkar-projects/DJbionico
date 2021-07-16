import React, { useState, useEffect } from "react";
import TextFieldComponent from "../../components/TextFieldComponent/TextFieldComponent";
import { callAddNotificationApi } from "../../actions/NotificationAction";
import { callUploadImage } from "../../actions/CommonUploadAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import constants from "../../utils/constants";
import { Line } from 'rc-progress';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import { CustomeNotification } from "../../components/CustomeNotification/CustomeNotification";
import Loader from "react-loader-spinner";

const AddNotification = (props) => {
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
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [radioNew, setRadioNew] = useState('0');
  const hiddenFileInput = React.useRef(null);
  const [style, setStyle] = React.useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      name.trim() === "" ||
      profile.trim() === "" ||
      message.trim() === ""
    ) {
      if (name.trim() === "") {
        setNameError("Enter Notification Title");
      }
      if (profile.trim() === "") {
        setFileError("Please Upload Image");
      }
      if (message.trim() === "") {
        setMessageError("Enter Notification Message");
      }
      return null;
    }

    props
      .callAddNotificationApiAction({
        title: name,
        message,
        user_type: radioNew,
        image: profile

      })
      .then((response) => {
        console.log("Add Notification", response);
        if (response.data.status) {
          CustomeNotification(
            "success",
            "Added Successfully",
            "Success",
            2000
          );
        }
        props.history.push(constants.ROUTE.SIDEBAR.NOTIFICATION);
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.status === 400) {
          let result = err.response.data.result;
          if ("title" in result) {
            CustomeNotification(
              "error",
              result.title.message,
              "Error",
              2000
            );
            setNameError(result.title.message);
          }
          if ("message" in result) {
            CustomeNotification(
              "error",
              result.message.message,
              "Error", 2000
            );
            setMessageError(result.message.message);
          }
          if ("user_type" in result) {
            CustomeNotification(
              "error",
              result.user_type.message,
              "Error", 2000
            );
          }
          if ("image" in result) {
            CustomeNotification(
              "error",
              result.image.message,
              "Error", 2000
            );
            setFileError(result.image.message);
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
  };


  const handleChangeMessage = (e) => {
    setMessageError("");
    setMessage(e.target.value);
  };

  const handleChange = (event) => {
    let file = event.target.files[0].name;
    console.log("gggg", file);
    setisfile(file);
    setFileError("")
    setIsLoading(true);
    
    const data = new FormData();
    data.append("profile", event.target.files[0]);
    props
      .callUploadImageAction(data)
      .then((res) => {
        console.log("upload image", res);
        setFile(res.data.result.length ? res.data.result : "");
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setUploadPercentage(0);

      });
  };

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleChangeRadioButton = (e) => {
    console.log(e.target.value);
    // setRadioErr("");
    setRadioNew(e.target.value)
    // console.log('radio',radio);


  };

  return (
    <div>
      <nav className="page-breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={constants.ROUTE.SIDEBAR.EVENTS}>
              Notification
              </Link>
          </li>
          <li className="breadcrumb-item active" 
          aria-current="page">
            Add Notification
          </li>
        </ol>
      </nav>
      <div className="row">
        <div className="col-md-12 stretch-card">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title">
                Add Notification
                </h6>
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
                          label="Notification Title"
                          labelClassName=""
                          inputClassName=""
                          error={isNameError ? true : false}
                          helperText={isNameError}
                          helperTextClassName="errormsg"
                          isDisable={false}
                          placeholder="Enter Notification Title"
                          onChange={handleChangeName}
                          value={name} />
                        <div className="errormsg">
                          {lengthError ? lengthError : null}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Image Upload</label>
                        <input
                          type="file"
                          name="img[]"
                          className="file-upload-default"
                          accept=".jpg, .jpeg, .png"
                          ref={hiddenFileInput}
                          onChange={handleChange}
                          style={{ display: "none" }}
                        />
                        <div className="input-group col-xs-12">
                          <input
                            type="text"
                            className="form-control file-upload-info"
                            disabled
                            value={file}
                            placeholder="Upload Image" />
                          <span className="input-group-append">
                            <button
                              onClick={handleClick}
                              className="file-upload-browse btn btn-primary"
                              type="button">
                              Upload
                            </button>
                          </span>
                        </div>
                        <div className="errormsg">
                          {isFileError ? isFileError : null}
                        </div>
                        <div className="mt-2 ml-2">
                          {isLoading ? (
                            <Loader
                              type="Oval"
                              color="#727cf5"
                              height={30}
                              width={30}
                              timeout={3000000} //3 secs
                            />
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label htmlFor="name">Select Category</label><br />
                        <div className="form-check form-check-inline">
                          <label className="form-check-label">
                            <input
                              type="radio"
                              className="form-check-input"
                              name="radioNew"
                              id="optionsRadios"
                              // checked="true"
                              // checked={radio === "1" ? true : false}
                              value='1'
                              checked={radioNew == "1"}
                              defaultValue="option5"
                              onChange={handleChangeRadioButton}
                            // onClick={() => handleChangeRadio('1')}
                            />
                             New
                            <i className="input-frame" />
                          </label>
                        </div>
                        <div className="form-check form-check-inline ">
                          <label className="form-check-label">
                            <input
                              type="radio"
                              className="form-check-input"
                              name="radioNew"
                              defaultChecked
                              checked={radioNew == "0"}
                              id="optionsRadios"
                              defaultValue="option5"
                              value='0'
                              onClick={handleChangeRadioButton}
                            />
                            Old
                              <i className="input-frame" />
                          </label>
                        </div>
                        <div className="errormsg">
                          {/* {radioErr ? "Please Select Option" : null} */}
                        </div>

                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-12">
                      <div className="form-group">
                        <label htmlFor="email">Notification Message</label>
                        <textarea
                          name="eventdescription"
                          id="eventdescription"
                          rows={5}
                          className="form-control"
                          placeholder="Enter Notification Message"
                          defaultValue={""}
                          value={message}
                          onChange={handleChangeMessage}
                        />
                        <div className="errormsg">
                          {isMessageError ? isMessageError : null}
                        </div>
                      </div>
                    </div>
                  </div>
                  <input
                    className="btn btn-primary"
                    type="submit"
                    defaultValue="Submit"
                    onClick={handleSubmit}
                    disabled={uploadPercentage !== 0} 
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
      callUploadImageAction: callUploadImage,
      callAddNotificationApiAction: callAddNotificationApi,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(AddNotification);
