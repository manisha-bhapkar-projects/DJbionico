import React, { useState, useEffect } from "react";
import TextFieldComponent from "../../components/TextFieldComponent/TextFieldComponent";
import {
  callUploadImage,
  callEventDetailsAPI,
  callEditEventApi,
} from "../../actions/EventAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { validateName } from "../../utils/validation";
import { Link, useHistory } from "react-router-dom";
import constants from "../../utils/constants";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import { CustomeNotification } from "../../components/CustomeNotification/CustomeNotification";
import moment from "moment";
import Loader from "react-loader-spinner";

const EditEvents = (props) => {
  const [isNameError, setNameError] = useState("");
  const [name, setName] = useState("");
  const [profile, setFile] = useState("");
  const [isAddressError, setAddressError] = useState("");
  const [isDateError, setDateError] = useState("");
  const [isTimeError, setTimeError] = useState("");
  const [isDescriptionError, setDescriptionError] = useState("");
  const [isFileError, setFileError] = useState("");
  const [lengthError, setLengthError] = useState("");
  const hiddenFileInput = React.useRef(null);
  const [usersData, setUserData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isOpenDate, setIsOpenDate] = useState(false);
  const [isOpenTime, setIsOpenTime] = useState(false);
  const [images, setImages] = useState("");
  const [file, setisfile] = useState("");
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const id = props.match.params.id;
  useEffect(() => {
    getEventDetails(id);
  }, []);

  const getEventDetails = (id) => {
    console.log("idddd", id);
    props
      .callEventDetailsAPIAction(id)
      .then((res) => {
        console.log("event details", res);
        setUserData(res.data.result);
        setFile(res.data.result.event_image[0].event_image);
        console.log('rrr',res.data.result.event_image);
        // if (res.data.status) {
        //   setFile(
        //     res.data.result.event_image.map((x) => {
        //       return {
        //         event_image: x.event_image,.
        //       };
        //     })
        //   );
        //   setFile(res.data.result.event_image);
        // }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props
      .callEditEventApiAction(id, {
        title: usersData.title,
        description: usersData.description,
        address: usersData.address,
        event_date: usersData.event_date,
        time: usersData.time,
        image: profile || usersData.event_image[0].event_image,
      })
      .then((response) => {
        if (response.data.status) {
          CustomeNotification(
            "success",
            "Updated Successfully",
            "Success",
            2000
          );
          history.push(constants.ROUTE.SIDEBAR.EVENTS);
        }
      })
      .catch((err) => {
        console.log("edit event error",err.response);
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
          if ("address" in result) {
            CustomeNotification(
              "error", 
              result.address.message, 
              "Error", 2000
              );
              setAddressError(result.address.message);
          }
          if ("event_date" in result) {
            CustomeNotification(
              "error", 
              result.event_date.message, 
              "Error", 2000
              );
              setDateError(result.event_date.message);
          }
          if ("time" in result) {
            CustomeNotification(
              "error", 
              result.time.message, 
              "Error", 2000
              );
              setTimeError(result.time.message);
          }
          if ("description" in result) {
            CustomeNotification(
              "error", 
              result.description.message, 
              "Error", 2000
              );
              setDescriptionError(result.description.message);
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
    setName(e.target.value);
    setIsEdit(true);
    const data = { ...usersData };
    if (usersData) {
      data.title = e.target.value;
    }
    setUserData(data);
    setNameError("");
  };
  const handleChangeAddress = (e) => {
    setIsEdit(true);
    const data = { ...usersData };
    if (usersData) {
      data.address = e.target.value;
    }
    setUserData(data);
    setAddressError("");
  };
  const handleChangeDate = (date) => {
    setIsEdit(true);
    const data = { ...usersData };
    if (usersData) {
      data.event_date = date;
    }
    setUserData(data);
    setDateError("");
    setIsOpenDate(false);
  };
  const handleChangeTime = (date) => {
    setIsEdit(true);
    const data = { ...usersData };
    if (usersData) {
      data.time = date;
    }
    setUserData(data);
    setTimeError("");
  };

  const handleChangeDescription = (e) => {
    setIsEdit(true);
    const data = { ...usersData };
    if (usersData) {
      data.description = e.target.value;
    }
    setUserData(data);
    setDescriptionError("");
  };

  const handleChange = (event) => {
    let file = event.target.files[0].name;
    console.log("gggg", file);
    setisfile(file);
    setIsLoading(true);
    const data = new FormData();
    data.append("profile", event.target.files[0]);
    props
      .callUploadImageAction(data)
      .then((res) => {
        console.log("upload image", res.data.result);
        setFile(res.data.result.length ? res.data.result : "");
        setImages(res.data.result)
        setIsLoading(false);
        setIsEdit(true);
        const data = { ...usersData };
        if (usersData) {
          data.image = event.target.value;
        }
        setUserData(data);
        setFileError("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  return (
    <div>
      <nav className="page-breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={constants.ROUTE.SIDEBAR.EVENTS}>Event List</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Event
          </li>
        </ol>
      </nav>
      <div className="row">
        <div className="col-md-12 stretch-card">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title">Edit Event</h6>
              <form
                className="cmxform"
                id="signupForm"
                method="get"
                action="#"
                noValidate="novalidate"
              >
                <fieldset>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <TextFieldComponent
                          className=""
                          id="eventname"
                          label="Name Of Event"
                          labelClassName=""
                          inputClassName=""
                          error={isNameError ? true : false}
                          helperText={isNameError}
                          helperTextClassName="errormsg"
                          isDisable={false}
                          placeholder="Enter Event Name"
                          onChange={handleChangeName}
                          value={usersData.title}
                        />
                        <div className="errormsg">
                          {lengthError ? lengthError : null}
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <TextFieldComponent
                          className=""
                          id="address"
                          label="Address"
                          labelClassName=""
                          inputClassName=""
                          error={isAddressError ? true : false}
                          helperText={isAddressError}
                          helperTextClassName="errormsg"
                          isDisable={false}
                          placeholder="Enter Place Event"
                          value={usersData.address}
                          onChange={handleChangeAddress}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label>Event Date</label>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <Grid container>
                            <KeyboardDatePicker
                              variant="inline"
                              value={
                                usersData.event_date
                                  ? moment(usersData.event_date)
                                  : ""
                              }
                              disablePast
                              helperText={null}
                              format="dd/MM/yyyy"
                              error={isDateError ? true : false}
                              helperText={isDateError}
                              helperTextClassName="errormsg"
                              onChange={handleChangeDate}
                              KeyboardButtonProps={{
                                onFocus: (e) => {
                                  setIsOpenDate(true);
                                },
                              }}
                              PopoverProps={{
                                disableRestoreFocus: true,
                                onClose: () => {
                                  setIsOpenDate(false);
                                },
                              }}
                              InputProps={{
                                onFocus: () => {
                                  setIsOpenDate(true);
                                },
                              }}
                              open={isOpenDate}
                            />
                          </Grid>
                        </MuiPickersUtilsProvider>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label>Event Time</label>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <Grid container>
                            <KeyboardTimePicker
                              variant="inline"
                              value={
                                usersData.time ? moment(usersData.time) : ""
                              }
                              disablePast
                              helperText={null}
                              format="HH:mm a"
                              error={isTimeError ? true : false}
                              helperText={isTimeError}
                              helperTextClassName="errormsg"
                              onChange={handleChangeTime}
                              KeyboardButtonProps={{
                                onFocus: (e) => {
                                  setIsOpenTime(true);
                                },
                              }}
                              PopoverProps={{
                                disableRestoreFocus: true,
                                onClose: () => {
                                  setIsOpenTime(false);
                                },
                              }}
                              InputProps={{
                                onFocus: () => {
                                  setIsOpenTime(true);
                                },
                              }}
                              open={isOpenTime}
                            />
                          </Grid>
                        </MuiPickersUtilsProvider>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label>Event Banner upload</label>
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
                            placeholder="Upload Image"
                          />
                          <span className="input-group-append">
                            <button
                              onClick={handleClick}
                              className="file-upload-browse btn btn-primary"
                              type="button">
                              Upload
                            </button>
                          </span>
                        </div>
                        <div>
                          <img className="img-xs p-1"
                          
                          src={profile}/>

                          {/* src={require("/home/qtech/Manasi/Git/dj-bionico-react-js-admin/src/assets/images/faces/face1.jpg")} */}
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
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="form-group">
                        <label htmlFor="email">Event Description</label>
                        <textarea
                          name="eventdescription"
                          id="eventdescription"
                          rows={5}
                          className="form-control"
                          placeholder="Enter Event Description"
                          defaultValue={""}
                          value={usersData.description}
                          onChange={handleChangeDescription}
                        />
                        <div className="errormsg">
                          {isDescriptionError ? isDescriptionError : null}
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
      callUploadImageAction: callUploadImage,
      callEventDetailsAPIAction: callEventDetailsAPI,
      callEditEventApiAction: callEditEventApi

    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(EditEvents);