import React, { useState, useEffect } from "react";
import TextFieldComponent from "../../components/TextFieldComponent/TextFieldComponent";
import { callUploadImage, callAddEventApi } from "../../actions/EventAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
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
import "react-sweet-progress/lib/style.css";
import { Progress } from 'react-sweet-progress';
import Loader from "react-loader-spinner";

const AddEvents = (props) => {
  const [isNameError, setNameError] = useState("");
  const [name, setName] = useState("");
  const [profile, setFile] = useState("");
  const [date, setDate] = useState(null);
  // const [date, setDate] = useState("");
  const [isOpenDate, setIsOpenDate] = useState(false);
  const [isOpenTime, setIsOpenTime] = useState(false);
  const [time, setTime] = useState(null);
  // const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [isAddressError, setAddressError] = useState("");
  const [isDateError, setDateError] = useState("");
  const [isTimeError, setTimeError] = useState("");
  const [isDescriptionError, setDescriptionError] = useState("");
  const [isFileError, setFileError] = useState("");
  const [lengthError, setLengthError] = useState("");
  const [file, setisfile] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const hiddenFileInput = React.useRef(null);

  useEffect(() => {
    console.log("ppp", file);
  }, []);
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      name.trim() === "" ||
      // !validateName(name) ||
      address.trim() === "" ||
      profile === "" ||
      date === null ||
      time === null ||
      description.trim() === ""
      // name.trim().length < 6
    ) {
      if (name.trim() === "") {
        setNameError("Enter Event Name");
      }
      // else if (name.trim().length < 6) {
      //     setLengthError("Name Should Have Min 6 Character");
      // }
      // else if (!validateName(name)) {
      //     setNameError("Accept Alphabets Only");
      // }
      if (address.trim() === "") {
        setAddressError("Enter Event Address");
      }
      if (profile.trim() === "") {
        setFileError("Please Select File");
      }
      if (date === null) {
        setDateError("Enter Event Date");
      }
      if (time === null) {
        setTimeError("Enter Event Time");
      }
      if (description.trim() === "") {
        setDescriptionError("Enter Event Description");
      }
      return null;
    }

    props
      .callAddEventApiAction({
        title: name,
        description,
        address,
        event_date: date,
        time,
        image: profile,
      })
      .then((response) => {
        console.log("Add Event", response);
        if (response.data.status) {
          CustomeNotification(
            "success",
            "Event Added Successfully",
            "Success",
            2000
          );
          
        }
        props.history.push(constants.ROUTE.SIDEBAR.EVENTS);
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
    setLengthError("");
    setName(e.target.value);
  };
  const handleChangeAddress = (e) => {
    setAddressError("");
    setAddress(e.target.value);
  };
  const handleChangeDate = (date) => {
    
    setDateError("");
    setDate(date);
    console.log('date',date);

    setIsOpenDate(false);
  };
  const handleChangeTime = (date) => {
    setTimeError("");
    setTime(date);
    // setIsOpenTime(false);
  };

  const handleChangeDescription = (e) => {
    setDescriptionError("");
    setDescription(e.target.value);
  };

  const handleChange = (event) => {
    let file = event.target.files[0].name;
    console.log("gggg", file);
    setisfile(file);
    setFileError("");
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
            Add Event
          </li>
        </ol>
      </nav>
      <div className="row">
        <div className="col-md-12 stretch-card">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title">Add New Event</h6>
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
                          value={name}
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
                          placeholder="Enter Event Address"
                          value={address}
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
                              value={date}
                              // value={
                              //   date
                              //     ? moment(date).format('dd/MM/yyyy')
                              //     : ""
                              // }
                              // value={
                              //   date
                              //     ? Moment(date).format('dd/MM/yyyy')
                              //     : ""
                              // }
                              // Moment(date).format("DD-MM-YYYY")
                              // formatDate={(date) => moment(date).format('DD-MM-YYYY')}
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
                              // value={time}
                              value={
                                date
                                  ? moment(time)
                                  : ""
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
                        <label>Event Banner Upload</label>
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
                              type="button"
                            >
                              Upload
                            </button>
                          </span>
                        </div>
                        <div className="errormsg">
                          {isFileError ? isFileError : null}
                        </div>
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
                          value={description}
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
      callAddEventApiAction: callAddEventApi,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(AddEvents);
