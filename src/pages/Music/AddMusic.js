import React, { useState, useEffect } from "react";
import TextFieldComponent from "../../components/TextFieldComponent/TextFieldComponent";
import { CustomeNotification } from "../../components/CustomeNotification/CustomeNotification";
import { validationNameWithRegex } from "../../utils/validation";
import { useHistory, Link } from "react-router-dom";
import constants from "../../utils/constants";
import {
  callUploadSong,
  callAddMusicApi,
  callDJMusicApi,
} from "../../actions/MusicAction";
import { callGenericListAPI } from "../../actions/GenericAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { generic_id, generic_id_Items } from "../../utils/switch";
import CustomeDropDown from "../../components/CustomeDropDown/CustomeDropDown";
import { callAddAlbumListAPI } from "../../actions/AlbumAction";
import "react-sweet-progress/lib/style.css";
import { Progress } from "react-sweet-progress";
import Loader from "react-loader-spinner";

const AddMusic = (props) => {
  const [name, setName] = useState("");
  const [selectvalue, setSelectValue] = useState("");
  const [selectDJ, setDJList] = useState("");
  const [selectAlbum, setSelectAlbum] = useState([]);
  const [song, setFile] = useState("");
  const [filename, setFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [singername, setSingername] = useState("");
  const [radioErr, setRadioErr] = useState("");
  const [singerErr, setSingerErr] = useState("");
  const [nameErr, setNameErr] = useState("");
  const [fileErr, setFileErr] = useState("");
  const [selectErr, setSelectErr] = useState("");
  const [albumErr, setAlbumErr] = useState("");
  const [radio, setRadio] = useState("0");
  const [radioNew, setRadioNew] = useState("0");
  const hiddenFileInput = React.useRef(null);
  const [usersData, setUserData] = useState([]);
  const [DJData, setDJData] = useState([]);
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const [albumData, setAlbumData] = useState([]);
  const history = useHistory();
  useEffect(() => {
    // getGenericList();
    getAlbumList();
    getDJList();
  }, []);

  const getGenericList = () => {
    props
      .callGenericListAPIAction()
      .then((response) => {
        console.log("Generic List", response);
        setUserData(response.data.result.finalres);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const dj = {
  //     genric_type,
  // };
  // if (radio == '1') {
  //     dj.genric_type = '1'
  // }

  const getDJList = () => {
    // if(radio == '1'){

    // }
    // alert("radio", radio)
    props
      .callDJMusicApiAction(radio)
      .then((response) => {
        setDJData(response.data.result.finalres);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAlbumList = () => {
    props
      .callAddAlbumListAPIAction()
      .then((response) => {
        console.log("album List", response);
        setAlbumData(response.data.result.finalres);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // debugger;
    if (
      name.trim() === "" ||
      singername.trim() === "" ||
      filename === "" ||
      radio === "" ||
      (radioNew == "0" && selectvalue == "") ||
      (radioNew == "0" && selectvalue === "Select Categories")
    ) {
      if (name.trim() === "") {
        setNameErr("Song Name is Required");
      }
      if (singername.trim() === "") {
        setSingerErr("Singer Name is Required");
      }
      if (filename === "") {
        setFileErr("Upload Song is Required");
      }
      if (radio === "") {
        setRadioErr("Please Select Option");
      }
      if (
        radioNew == "0" &&
        (selectvalue == "" || selectvalue === "Select Categories")
      ) {
        setSelectErr("Please Select Option");
      }


      else if (selectDJ == "" || selectDJ === "Select Categories") {
        setAlbumErr("Please Select Option");
      }
      
       else if (selectAlbum == "" || selectAlbum === "Select Categories") {
        setAlbumErr("Please Select Option");
      }
      

      return null;
    }

    const request = {
      name,
      url: song,
      author_name: singername,
      new_song: radioNew,
      // filename,
      is_premium: radio,
    };
    if (radioNew == "0") {
      request.genric_id = selectvalue;
    } 
    else if (radioNew == "1") {
      request.genric_id = selectAlbum;
    }
    // else {
    //   request.album_id = selectAlbum;
    // }

    props
      .callAddMusicApiAction(request)
      .then((response) => {
        console.log("Add Music", response);
        if (response.data.status) {
          CustomeNotification(
            "success",
            "Song Added Successfully",
            "Success",
            2000
          );
          history.push(constants.ROUTE.SIDEBAR.MUSIC);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.status === 400) {
          let result = err.response.data.result;
          if ("name" in result) {
            CustomeNotification("error", result.name.message, "Error", 2000);
            setNameErr(result.name.message);
          }
          if ("url" in result) {
            CustomeNotification("error", result.url.message, "Error", 2000);
            setFileErr(result.url.message);
          }
          if ("author_name" in result) {
            CustomeNotification(
              "error",
              result.author_name.message,
              "Error",
              2000
            );
            setSingerErr(result.author_name.message);
          }
          if ("new_song" in result) {
            CustomeNotification(
              "error",
              result.new_song.message,
              "Error",
              2000
            );
          }
          if ("is_premium" in result) {
            CustomeNotification(
              "error",
              result.is_premium.message,
              "Error",
              2000
            );
          }
        } else if (err.response && err.response.status === 401) {
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
    setNameErr("");
    setName(e.target.value);
  };
  const handleChangeSingerName = (e) => {
    setSingerErr("");
    setSingername(e.target.value);
  };
  const handleChangeSelectValue = (e) => {
    setSelectValue(e.target.value);
    setDJList(e.target.value);
    if (radioNew == "0") {
      setSelectErr("Please Select Option");
    }
    setSelectErr("");
    console.log("dropdown", e.target.value);
  };
  const handleChangeAlbum = (e) => {
    setAlbumErr("");
    setSelectAlbum(e.target.value);
    console.log("dropdown1", e.target.value);
  };

  const handleChangeRadio = (e) => {
    // e.preventDefault();
    // console.log('radio', e.target.value);
    setRadioErr("");
    setRadio(e.target.value);
  };

  useEffect(() => {
    getDJList();
  }, [radio]);

  const handleChangeRadioButton = (e) => {
    console.log("radionew", e.target.value);
    setRadioNew(e.target.value);
  };

  const handleChange = (event) => {
    setFileErr("");
    const data = new FormData();
    data.append("song", event.target.files[0]);
    setFileName(event.target.files[0].name);
    setIsLoading(true);
    props
      .callUploadSongAction(data)
      .then((res) => {
        console.log("upload song", res.data.result);
        setFile(res.data.result.length ? res.data.result : "");
        // setFileErr("");
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
  return (
    <div>
      <nav className="page-breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={constants.ROUTE.SIDEBAR.MUSIC}>Music List</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Music
          </li>
        </ol>
      </nav>
      <div className="row">
        <div className="col-md-12 stretch-card">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title">Add New Music</h6>
              <div
                className="cmxform"
                id="signupForm"
                method="get"
                noValidate="novalidate"
              >
                <fieldset>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <TextFieldComponent
                          type="text"
                          className=""
                          id="name"
                          label="Name Of Song"
                          labelClassName=""
                          inputClassName=""
                          error={nameErr ? true : false}
                          helperText={nameErr}
                          helperTextClassName="errormsg"
                          isDisable={false}
                          placeholder="Enter Song Name"
                          onChange={handleChangeName}
                          value={name}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <TextFieldComponent
                          type="text"
                          className=""
                          id="singername"
                          label="Singer Name"
                          labelClassName=""
                          inputClassName=""
                          error={singerErr ? true : false}
                          helperText={singerErr}
                          helperTextClassName="errormsg"
                          isDisable={false}
                          placeholder="Enter Singer Name"
                          onChange={handleChangeSingerName}
                          value={singername}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label htmlFor="name">
                          Upload Song
                          <small>(only .mp3*)</small>
                        </label>
                        <input
                          type="file"
                          name="img[]"
                          className="file-upload-default"
                          accept=".mp3"
                          ref={hiddenFileInput}
                          onChange={handleChange}
                          style={{ display: "none" }}
                        />
                        <div className="input-group col-xs-12">
                          <input
                            type="text"
                            className="form-control file-upload-info"
                            placeholder="Upload Song"
                            value={song}
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
                          {fileErr ? fileErr : null}
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
                    <div className="col-sm-4 custom-sm-4">
                      <div className="form-group">
                        <label htmlFor="name">Select Option</label>
                        <br />
                        <div className="form-check form-check-inline">
                          <label className="form-check-label">
                            <input
                              type="radio"
                              className="form-check-input"
                              name="radioNew"
                              id="optionsRadios"
                              value="1"
                              checked={radioNew == "1"}
                              defaultValue="option5"
                              onChange={handleChangeRadioButton}
                            />
                            New Music
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
                              value="0"
                              onClick={handleChangeRadioButton}
                            />
                            Generic Song
                            <i className="input-frame" />
                          </label>
                        </div>
                        <div className="errormsg">
                          {radioErr ? "Please Select Option" : null}
                        </div>
                      </div>
                    </div>
                    {radioNew == "0" ? (
                      <>
                        {radio == "1" ? (
                          <div className="col-sm-2">
                            <div className="form-group">
                              <label htmlFor="name">DJ List</label>
                              <select
                                className="form-control"
                                onChange={handleChangeSelectValue}
                                value={selectDJ}
                              >
                                <option>Select Categories</option>
                                {DJData &&
                                  DJData.map(
                                    (item, i) => (
                                      console.log("djItemaddmusic", item),
                                      (
                                        <option key={i} value={item.genric_id}>
                                          {item.name}
                                        </option>
                                      )
                                    )
                                  )}
                              </select>
                              <div className="errormsg">
                                {selectErr ? selectErr : null}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="col-sm-2">
                            <div className="form-group">
                              <label htmlFor="name">Genric List</label>
                              {/* {console.log(DJData)} */}
                              <select
                                className="form-control"
                                onChange={handleChangeSelectValue}
                                value={selectvalue}
                              >
                                <option>Select Categories</option>
                                {DJData &&
                                  DJData.map((item, i) => (
                                    <option key={i} value={item.genric_id}>
                                      {item.name}
                                    </option>
                                  ))}
                              </select>
                              <div className="errormsg">
                                {selectErr ? selectErr : null}
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="col-sm-2">
                          <div className="form-group">
                            <label htmlFor="name">Is Prime</label>
                            <br />
                            <div className="form-check form-check-inline">
                              <label className="form-check-label">
                                <input
                                  type="radio"
                                  className="form-check-input"
                                  name="radio1"
                                  id="optionsRadios5"
                                  value="1"
                                  checked={radio === "1"}
                                  defaultValue="option5"
                                  onChange={handleChangeRadio}
                                />
                                Yes
                                <i className="input-frame" />
                              </label>
                            </div>
                            <div className="form-check form-check-inline ">
                              <label className="form-check-label">
                                <input
                                  type="radio"
                                  className="form-check-input"
                                  name="radio"
                                  defaultChecked
                                  checked={radio === "0"}
                                  id="optionsRadios5"
                                  defaultValue="option5"
                                  value="0"
                                  onClick={handleChangeRadio}
                                />
                                No
                                <i className="input-frame" />
                              </label>
                            </div>

                            <div className="errormsg">
                              {radioErr ? "Please Select Option" : null}
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="col-sm-3">
                        <div className="form-group">
                          <label htmlFor="name">Album List</label>
                          <select
                            className="form-control"
                            onChange={handleChangeAlbum}
                            value={selectAlbum}
                          >
                            <option>Select Album</option>
                            {albumData &&
                              albumData.map((item, i) => (
                                <option key={i} value={item.id}>
                                  {item.name}
                                </option>
                              ))}
                          </select>
                          <div className="errormsg">
                            {albumErr ? albumErr : null}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <input
                    className="btn btn-primary"
                    type="submit"
                    defaultValue="Submit"
                    onClick={handleSubmit}
                    disabled={uploadPercentage !== 0}
                  />
                </fieldset>
              </div>
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
      callUploadSongAction: callUploadSong,
      callAddMusicApiAction: callAddMusicApi,
      callGenericListAPIAction: callGenericListAPI,
      callAddAlbumListAPIAction: callAddAlbumListAPI,
      callDJMusicApiAction: callDJMusicApi,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(AddMusic);


