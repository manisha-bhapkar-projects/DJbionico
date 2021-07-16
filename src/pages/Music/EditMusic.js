import React, { useState, useEffect } from "react";
import TextFieldComponent from "../../components/TextFieldComponent/TextFieldComponent";
import { CustomeNotification } from "../../components/CustomeNotification/CustomeNotification";
import { validationNameWithRegex } from "../../utils/validation";
import { useHistory, Link } from "react-router-dom";
import constants from "../../utils/constants";
import {
  callUploadSong,
  callAddMusicApi,
  callEditMusicApi,
  callMusicDetailsAPI,
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

const EditMusic = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [selectvalue, setSelectValue] = useState(0);
  const [selectAlbum, setSelectAlbum] = useState(0);
  const [song, setFile] = useState("");
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
  const [albumData, setAlbumData] = useState([]);
  const [genericData, setGenericData] = useState([]);
  const [genericFill, setGenericFill] = useState([]);
  const [newSongFill, setNewSongFill] = useState([]);
  const [fileName, setFileName] = useState("");
  const history = useHistory();
  const id = props.match.params.id;
  const [isEdit, setIsEdit] = useState(false);
  const [DJData, setDJData] = useState([]);
  const [uploadPercentage, setUploadPercentage] = useState(0);

  useEffect(() => {
    getMusicDetails(id);
    getAlbumList();
    getDJList();
  }, []);
  const getDJList = () => {
    props
      .callDJMusicApiAction(radio)
      .then((response) => {
        setDJData(response.data.result.finalres);
        console.log("djlist", response.data.result.finalres);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getMusicDetails = (id) => {
    // console.log('idddd', id);
    props
      .callMusicDetailsAPIAction(id)
      .then((res) => {
        console.log("music details", res);
        setUserData(res.data.result);
        console.log("fill", res.data.result.genric_data_album_ids);
        setRadio(res.data.result.is_premium);
        setGenericFill(res.data.result.genric_details);
        setSelectValue(
          res.data.result.genric_details &&
            res.data.result.genric_details[0] &&
            res.data.result.genric_details[0].genric__id
        );
        setRadioNew(res.data.result.new_song);
        // setAlbumData()
        // alert('dddddd',res.data.result);

        setSelectAlbum(res.data.result && res.data.result.id);
      })
      .catch((error) => {
        console.log(error);
        alert("error");
      });
  };

  const getAlbumList = () => {
    props
      .callAddAlbumListAPIAction()
      .then((response) => {
        console.log("album List", response);
        // console.log('album', response.data.result.finalres);

        setAlbumData(response.data.result.finalres);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getGenericList = () => {
    props
      .callGenericListAPIAction()
      .then((response) => {
        console.log("Generic List", response);
        setGenericData(response.data.result.finalres);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleSubmit = (e) => {
    const request = {
      name: usersData.song_name,
      url: usersData.song_url,
      author_name: usersData.author_name,
      new_song: radioNew,
      is_premium: radio,
    };
    // if()
    if (radioNew == "0") {
      request.genric_id = selectvalue;
    } else {
      request.album_id = selectAlbum;
    }
    e.preventDefault();
    props
      .callEditMusicApiAction(id, request)
      .then((response) => {
        if (response.data.status) {
          CustomeNotification(
            "success",
            "Updated Successfully",
            "Success",
            2000
          );
        }
        props.history.push(constants.ROUTE.SIDEBAR.MUSIC);
        console.log("Edit Music", response);
      })
      .catch((err) => {
        console.log(err);
        console.log("===>", err.response);
        if (err.response.status === 400) {
          let result = err.response.data.result;
          if ("name" in result) {
            CustomeNotification("error", result.name.message, "Error", 2000);
            setNameErr(result.name.message);
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
          if ("url" in result) {
            CustomeNotification("error", result.url.message, "Error", 2000);
            setFileErr(result.url.message);
          }
          if ("is_premium" in result) {
            CustomeNotification(
              "error",
              result.is_premium.message,
              "Error",
              2000
            );
          }
          if ("genric_id" in result) {
            CustomeNotification(
              "error",
              "Generic id is required",
              "Error",
              2000
            );
          }
          if ("album_id" in result) {
            CustomeNotification(
              "error",
              "Album id is required",
              "Error",
              2000
            );
          }
        } else if (err.response.status === 401) {
          CustomeNotification(
            "error",
            err.response.data.message,
            "Error",
            2000
          );
        }
      });
    // name: {message: "name cannot be an empty field", context: "name", type: "string.empty"}
    // author_name: {message: "author name cannot be an empty field", context: "author_name", type: "string.empty"}
    // url: {message: "url cannot be an empty field", context: "url", type: "string.empty"}
    // is_premium: {message: "is_premium cannot be an empty field", context: "is_premium", type: "string.empty"}
    // genric_id:
  };
  const handleChangeName = (e) => {
    setNameErr("");
    setName(e.target.value);
    setIsEdit(true);
    const data = { ...usersData };
    if (usersData) {
      data.song_name = e.target.value;
    }
    setUserData(data);
  };
  const handleChangeSingerName = (e) => {
    setSingerErr("");
    setSingername(e.target.value);
    setIsEdit(true);
    const data = { ...usersData };
    if (usersData) {
      data.author_name = e.target.value;
    }
    setUserData(data);
  };
  const handleChangeSelectValue = (e) => {
    // alert('click')
    // console.log(e.target);
 
    setSelectValue(e.target.value);
    // setSelectErr("");
    setIsEdit(true);
    const data = { ...genericFill };
    if (genericFill) {
      data.genric_name = e.target.value;
      console.log("generic", data.genric_name);
    }
    setGenericFill(data);
    // debugger;
    console.log("dropdown", e.target.value);
  };

  // useEffect(() => {
  //     getDJList();
  //  }, [usersData.is_premium]);
  // const handleChangeAlbum = (e) => {
  //     // alert('click')
  //     // console.log(e.target);
  //     setSelectAlbum(e.target.value);

  //     setIsEdit(true);
  //     const data = { ...usersData };
  //     if (usersData) {
  //         data.title = e.target.value;
  //     }
  //     setUserData(data);
  //     // setAlbumErr("");
  //     console.log('dropdown1', e.target.value);
  // };

  const handleChangeAlbum = (e) => {
    // debugger;
    setAlbumErr("");
    setSelectAlbum(e.target.value);
    console.log("dropdown1", e.target.value);
    // setSelectErr("");
    setIsEdit(true);
    const data = { ...usersData };
    if (usersData) {
      data.name = e.target.value;
    }
    setUserData(data);
  };

  const handleChangeRadio = (e) => {
    setSelectValue("");
    console.log("radio", e.target.value);
    setRadioErr("");
    setRadio(e.target.value);
    // getDJList();
    setIsEdit(true);
    const data = { ...usersData };
    if (usersData) {
      data.is_premium = e.target.value;
      console.log("data", data.is_premium);
    }
    setUserData(data);
    // console.log('radio',radio);
  };
  useEffect(() => {
    getDJList();
  }, [radio]);

  const handleChangeRadioButton = (e) => {
    console.log("radionew", e.target.value);
    setSelectValue("");
    setSelectAlbum("");
    setRadioNew(e.target.value);
    setIsEdit(true);
    const data = { ...usersData };
    if (usersData) {
      data.new_song = e.target.value;
      //   console.log('jjj',data.genric_id);
    }
    setUserData(data);
  };

  const handleChange = (event) => {
    const data = new FormData();
    data.append("song", event.target.files[0]);
    setFileName(event.target.files[0].name);
    setFileErr("");
    setIsLoading(true);

  
    props
      .callUploadSongAction(data)
      .then((res) => {
        console.log("upload song", res.data.result);
        setFile(res.data.result.length ? res.data.result : "");
        setIsLoading(false);
        setIsEdit(true);
        const data = { ...usersData };
        if (usersData) {
          data.song_url = event.target.value;
        }
        setUserData(data);

      })
      .catch((error) => {
        console.log(error);
      });
  };
  function GetFilename(song) {
    if (song) {
      var m = song.toString().match(/.*\/(.+?)\./);
      if (m && m.length > 1) {
        return m[1];
      }
    }
    return "";
  }

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
            Edit Music
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
                          value={usersData.song_name}
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
                          value={usersData.author_name}
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
                            // value={usersData.song_url}
                            // value={usersData.song_url}
                            value={GetFilename(usersData.song_url)}
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
                              checked={usersData.new_song == "1"}
                              defaultValue="option5"
                              onChange={handleChangeRadioButton}
                            />
                            New Music
                            <i className="input-frame" />
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <label className="form-check-label">
                            <input
                              type="radio"
                              className="form-check-input"
                              name="radioNew"
                              defaultChecked
                              checked={usersData.new_song == "0"}
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
                    {usersData.new_song == "0" ? (
                      <>
                        {usersData.is_premium == "1" ? (
                          <div className="col-sm-2">
                            <div className="form-group">
                              <label htmlFor="name">DJ List</label>
                              <select
                                className="form-control 
                                                             edit-music-dropdown-custome"
                                onChange={handleChangeSelectValue}
                                value={selectvalue}
                                style={{ color: "#464545" }}
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
                        ) : (
                          <div className="col-sm-2">
                            <div className="form-group">
                              <label htmlFor="name">Genric List</label>
                              {/* {console.log(DJData)} */}
                              <select
                                className="form-control edit-music-dropdown-custome"
                                style={{ color: "#464545" }}
                                onChange={handleChangeSelectValue}
                                value={selectvalue}
                              >
                                <option>Select Categories</option>
                                {DJData &&
                                  DJData.map((item, i) => (
                                    <option
                                      key={i}
                                      value={item.genric_id}
                                      className="option-edit-custome"
                                    >
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
                                  name="radio"
                                  id="optionsRadios5"
                                  value="1"
                                  checked={usersData.is_premium == "1"}
                                  // checked={usersData.is_premium ?
                                  //     radio == usersData.is_premium : radio }
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
                                  checked={usersData.is_premium == "0"}
                                  // checked={usersData.is_premium ?
                                  //  radioNew == usersData.is_premium : radioNew }
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
                              {/* {radioErr ? "Please Select Option" : null} */}
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
                            style={{ color: "#464545" }}

                          >
                            <option>Select Album</option>
                            {albumData &&
                              albumData.map(
                                (item, i) => (
                                  console.log("albumdata", item),
                                  (
                                    <option
                                      key={i}
                                      value={item.id}
                                    >
                                      {item.name}
                                    </option>
                                  )
                                )
                              )}
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
      callEditMusicApiAction: callEditMusicApi,
      callMusicDetailsAPIAction: callMusicDetailsAPI,
      callDJMusicApiAction: callDJMusicApi,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(EditMusic);


