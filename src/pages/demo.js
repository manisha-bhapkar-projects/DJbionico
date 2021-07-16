import React, { useState } from "react";
import TextFieldComponent from "../../components/TextFieldComponent/TextFieldComponent";



const AddEvents = (props) => {
    const [isNameError, setNameError] = useState("");
    const [name, setName] = useState("");
    const [file, setFile] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [isAddressError, setAddressError] = useState("");
    const [isDateError, setDateError] = useState("");
    const [isTimeError, setTimeError] = useState("");
    const [isDescriptionError, setDescriptionError] = useState("");
    const [isFileError, setFileError] = useState("");

    const reqParam = {
        name: name.trim(),
        time: time.trim(),
        address: address.trim(),
        file: file.trim(),
        date: date.trim(),
        description: description.trim(),
     };


    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            name.trim() === "" ||
            address.trim() === "" ||
            file.time() === "" ||
            date.time() === "" ||
            time.time() === "" ||
            description.trim() === ""

        ) {
            if (name.trim() === "") {
                setNameError("* Field is Mandatory");
            }

            if (address.trim() === "") {
                setAddressError("* Field is Mandatory");
            }
            if (file.trim() === "") {
                setFileError("* Field is Mandatory");
            }
            if (date.trim() === "") {
                setDateError("* Field is Mandatory");
            }
            if (time.trim() === "") {
                setTimeError("* Field is Mandatory");
            }
            if (description.trim() === "") {
                setDescriptionError("* Field is Mandatory");
            }

            return null;
        }

    }
    const handleChangeName = (e) => {
        setNameError("");
        setName(e.target.value);
    };
    const handleChangeAddress = (e) => {
        setAddressError("");
        setAddress(e.target.value);
    };
    const handleChangeDate = (e) => {
        setDateError("");
        setDate(e.target.value);
    };
    const handleChangeTime = (e) => {
        setTimeError("");
        setTime(e.target.value);
    };
    const handleChangeFile = (e) => {
        setFileError("");
        setFile(e.target.value);
    };
    const handleChangeDescription = (e) => {
        setDescriptionError("");
        setDescription(e.target.value);
    };
    const hiddenFileInput = React.useRef(null);

    const handleChange = event => {
        const fileUploaded = event.target.files[0];
        setFile(fileUploaded);
        // fileErr.empty = "";
        // props.handleFile(fileUploaded);
    };


    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    return (

        <div>
            <nav className="page-breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="event-list.html">Event List</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Add Event</li>
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
                                noValidate="novalidate">
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
                                                    value={address}
                                                    onChange={handleChangeAddress}

                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <TextFieldComponent
                                                    type="date"
                                                    className=""
                                                    id="date"
                                                    label="Event Date"
                                                    labelClassName=""
                                                    inputClassName=""
                                                    error={isDateError ? true : false}
                                                    helperText={isDateError}
                                                    helperTextClassName="errormsg"
                                                    isDisable={false}
                                                    placeholder="Enter Date"
                                                    onChange={handleChangeDate}
                                                    value={date}

                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                {/* <label htmlFor="name">Event Time</label> */}
                                                {/* <input
                                                    id="eventDate"
                                                    className="form-control"
                                                    name="eventDate"
                                                    type="time"
                                                    placeholder="Enter Event Name" /> */}
                                                <TextFieldComponent
                                                    type="time"
                                                    className=""
                                                    id="time"
                                                    label="Event Time"
                                                    labelClassName=""
                                                    inputClassName=""
                                                    error={isTimeError ? true : false}
                                                    helperText={isTimeError}
                                                    helperTextClassName="errormsg"
                                                    isDisable={false}
                                                    placeholder="Enter Place Event"
                                                    onChange={handleChangeTime}
                                                    value={time}

                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <label>Event Banner upload</label>
                                                <input
                                                    type="file"
                                                    name="img[]"
                                                    className="file-upload-default"
                                                    accept=".mp3"
                                                    ref={hiddenFileInput}
                                                    onChange={handleChange}
                                                    style={{ display: 'none' }} />
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
                                                            type="button">Upload</button>
                                                    </span>
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
                                                    value={description}
                                                    onChange={handleChangeDescription}

                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <input
                                        className="btn btn-primary"
                                        type="submit"
                                        defaultValue="Submit"
                                        onClick={handleSubmit} />
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
};


export default AddEvents;







// import React, { useState, useEffect } from "react";
// import TextFieldComponent from "../../components/TextFieldComponent/TextFieldComponent";
// import { CustomeNotification } from "../../components/CustomeNotification/CustomeNotification";
// import { validationNameWithRegex } from "../../utils/validation";
// import { useHistory, Link } from "react-router-dom";
// import constants from "../../utils/constants";
// import { callUploadSong, callAddMusicApi, callDJMusicApi } from '../../actions/MusicAction';
// import { callGenericListAPI } from '../../actions/GenericAction';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { generic_id, generic_id_Items } from '../../utils/switch';
// import CustomeDropDown from "../../components/CustomeDropDown/CustomeDropDown";
// import { callAddAlbumListAPI } from "../../actions/AlbumAction";


// const AddMusic = (props) => {
//     const [name, setName] = useState('');
//     const [selectvalue, setSelectValue] = useState([]);
//     const [selectAlbum, setSelectAlbum] = useState([]);
//     const [song, setFile] = useState('');
//     const [singername, setSingername] = useState('');
//     const [radioErr, setRadioErr] = useState("");
//     const [singerErr, setSingerErr] = useState("");
//     const [nameErr, setNameErr] = useState("");
//     const [fileErr, setFileErr] = useState("");
//     const [selectErr, setSelectErr] = useState("");
//     const [albumErr, setAlbumErr] = useState("");
//     const [radio, setRadio] = useState('0');
//     const [radioNew, setRadioNew] = useState('0');
//     const hiddenFileInput = React.useRef(null);
//     const [usersData, setUserData] = useState([]);
//     const [usersData1, setUserData1] = useState([]);

//     const [albumData, setAlbumData] = useState([]);

//     const history = useHistory();

//     // const [radio, setRadio] = useState({
//     //     yes:"",
//     //     no: ""
//     // });

//     useEffect(() => {
//         getGenericList();
//         getAlbumList();
//         getDJList();
//     }, []);
//     const getGenericList = () => {
//         props
//             .callGenericListAPIAction()
//             .then((response) => {
//                 console.log('Generic List', response);
//                 setUserData(response.data.result.finalres);
//             })
//             .catch((error) => {
//                 console.log(error);
//             });
//     }

//     // const dj = {
//     //     genric_type,
//     // };
//     // if (radio == '1') {
//     //     dj.genric_type = '1'
//     // }

//     const getDJList = () => {
//         // if(radio == '1'){

//         // }
//         // alert("radio", radio)
//         props
//             .callDJMusicApiAction(radio)
//             .then((response) => {
//                 console.log('DJ List', response);
//                 setUserData1(response.data.result.finalres);
//             })
//             .catch((error) => {
//                 console.log(error);
//             });
//     }

//     const getAlbumList = () => {
//         props
//             .callAddAlbumListAPIAction()
//             .then((response) => {
//                 console.log("album List", response);
//                 setAlbumData(response.data.result.finalres);
//             })
//             .catch((error) => {
//                 console.log(error);
//             });
//     };
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // debugger;
//         if (
//             name.trim() === "" ||
//             singername.trim() === "" ||
//             song === "" ||
//             // selectvalue == "" ||
//             // selectvalue === 'Select Categories' ||
//             // selectAlbum == "" ||
//             // selectAlbum === 'Select Categories' ||
//             radio === ""

//         ) {
//             if (name.trim() === "") {
//                 setNameErr("Song Name is Required");
//             }
//             if (singername.trim() === "") {
//                 setSingerErr("Singer Name is Required");
//             }
//             if (song.trim() === "") {
//                 setFileErr("Upload Song is Required");
//             }
//             if (radio === '') {
//                 setRadioErr("Please Select Option");
//             }

//             if (radioNew == '0' && (selectvalue == "" || selectvalue === 'Select Categories')) {
//                 setSelectErr("Please Select Option");
//             }
//             else if (selectAlbum == "" || selectAlbum === 'Select Categories') {
//                 setAlbumErr("Please Select Option");
//             }

//             return null;
//         }

//         const request = {
//             name,
//             url: song,
//             author_name: singername,
//             new_song: radioNew,
//             is_premium: radio,
//         };
//         if (radioNew == '0') {
//             request.genric_id = selectvalue
//         }
//         else {
//             request.album_id = selectAlbum
//         }
//         // if (radio == '1') {
//         //     request.genric_type = '1'
//         // } 
//         // else {
//         // //     request.genric_type = ''
//         // // }
//         props.callAddMusicApiAction(request)
//             .then((response) => {
//                 console.log('Add Music', response);
//                 if (response.data.status) {
//                     CustomeNotification("success", "Song Added Successfully", "Success", 2000);
//                     history.push(constants.ROUTE.SIDEBAR.MUSIC);
//                 }
//             }).catch((err) => {
//                 console.log(err);
//                 if (err.response && err.response.status === 400) {
//                     let result = err.response.data.result;
//                     if ("name" in result) {
//                         CustomeNotification(
//                             "error",
//                             result.name.message,
//                             "Error",
//                             2000
//                         );
//                     }
//                     if ("url" in result) {
//                         CustomeNotification(
//                             "error",
//                             result.url.message,
//                             "Error", 2000
//                         );
//                     }
//                     if ("author_name" in result) {
//                         CustomeNotification(
//                             "error",
//                             result.author_name.message,
//                             "Error", 2000
//                         );
//                     }
//                     if ("new_song" in result) {
//                         CustomeNotification(
//                             "error",
//                             result.new_song.message,
//                             "Error", 2000
//                         );
//                     }
//                     if ("is_premium" in result) {
//                         CustomeNotification(
//                             "error",
//                             result.is_premium.message,
//                             "Error", 2000
//                         );
//                     }
//                 }
//                 else if (err.response && err.response.status === 401) {
//                     CustomeNotification(
//                         "error",
//                         err.response.data.message,
//                         "Error",
//                         2000
//                     );
//                 }
//             });

//     }
//     const handleChangeName = (e) => {
//         setNameErr("");
//         setName(e.target.value);
//     };
//     const handleChangeSingerName = (e) => {
//         setSingerErr("");
//         setSingername(e.target.value);
//     };
//     const handleChangeSelectValue = (e) => {
//         setSelectValue(e.target.value);
//         if (radioNew == '0') {
//             setSelectErr("Please Select Option");
//         }
//         setSelectErr("");
//         console.log('dropdown', e.target.value);
//     };
//     const handleChangeAlbum = (e) => {
//         setSelectAlbum(e.target.value);
//         console.log('dropdown1', e.target.value);
//     };

//     const handleChangeRadio = (e) => {
//         console.log('radio', e.target.value);
//         setRadioErr("");
//         setRadio(e.target.value)
//         getDJList();
//         // getGenericList();

//     };
//     const handleChangeRadioButton = (e) => {
//         console.log('radionew', e.target.value);
//         setRadioNew(e.target.value)
//     };

//     const handleChange = event => {
//         const data = new FormData();
//         data.append("song", event.target.files[0]);
//         setFile(event.target.files[0].name)
//         props.callUploadSongAction(data)
//             .then(res => {
//                 console.log("upload song", res.data.result);
//                 // setFile(res.data.result.length ? res.data.result : '');
//                 setFileErr("");
//             })
//             .catch((error) => {
//                 console.log(error);
//             });
//     };
//     const handleClick = event => {
//         hiddenFileInput.current.click();
//     };
//     return (
//         <div>
//             <nav className="page-breadcrumb">
//                 <ol className="breadcrumb">
//                     <li className="breadcrumb-item">
//                         <Link
//                             to={constants.ROUTE.SIDEBAR.MUSIC}>
//                             Music List
//                         </Link>
//                     </li>
//                     <li
//                         className="breadcrumb-item active"
//                         aria-current="page">
//                         Add Music
//                         </li>
//                 </ol>
//             </nav>
//             <div className="row">
//                 <div className="col-md-12 stretch-card">
//                     <div className="card">
//                         <div className="card-body">
//                             <h6 className="card-title">
//                                 Add New Music
//                                 </h6>
//                             <div
//                                 className="cmxform"
//                                 id="signupForm"
//                                 method="get"
//                                 noValidate="novalidate">
//                                 <fieldset>
//                                     <div className="row">
//                                         <div className="col-sm-6">
//                                             <div className="form-group">
//                                                 <TextFieldComponent
//                                                     type="text"
//                                                     className=""
//                                                     id="name"
//                                                     label="Name Of Song"
//                                                     labelClassName=""
//                                                     inputClassName=""
//                                                     error={nameErr ? true : false}
//                                                     helperText={nameErr}
//                                                     helperTextClassName="errormsg"
//                                                     isDisable={false}
//                                                     placeholder="Enter Song Name"
//                                                     onChange={handleChangeName}
//                                                     value={name}
//                                                 />
//                                             </div>
//                                         </div>
//                                         <div className="col-sm-6">
//                                             <div className="form-group">
//                                                 <TextFieldComponent
//                                                     type="text"
//                                                     className=""
//                                                     id="singername"
//                                                     label="Singer Name"
//                                                     labelClassName=""
//                                                     inputClassName=""
//                                                     error={singerErr ? true : false}
//                                                     helperText={singerErr}
//                                                     helperTextClassName="errormsg"
//                                                     isDisable={false}
//                                                     placeholder="Enter Singer Name"
//                                                     onChange={handleChangeSingerName}
//                                                     value={singername}
//                                                 />
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="row">
//                                         <div className="col-sm-4">
//                                             <div className="form-group">
//                                                 <label htmlFor="name">Upload Song
//                                                 <small>(only .mp3*)</small></label>
//                                                 <input
//                                                     type="file"
//                                                     name="img[]"
//                                                     className="file-upload-default"
//                                                     accept=".mp3"
//                                                     ref={hiddenFileInput}
//                                                     onChange={handleChange}
//                                                     style={{ display: 'none' }}
//                                                 />
//                                                 <div className="input-group col-xs-12">
//                                                     <input
//                                                         type="text"
//                                                         className="form-control file-upload-info"
//                                                         placeholder="Upload Song"
//                                                         value={song}
//                                                     />
//                                                     <span className="input-group-append">
//                                                         <button
//                                                             onClick={handleClick}
//                                                             className="file-upload-browse btn btn-primary"
//                                                             type="button">Upload</button>
//                                                     </span>
//                                                 </div>
//                                                 <div className="errormsg">
//                                                     {fileErr ? fileErr : null}
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className="col-sm-4 custom-sm-4">
//                                             <div className="form-group">
//                                                 <label htmlFor="name">
//                                                     Select Option
//                                                     </label><br />
//                                                 <div className="form-check form-check-inline">
//                                                     <label className="form-check-label">
//                                                         <input
//                                                             type="radio"
//                                                             className="form-check-input"
//                                                             name="radioNew"
//                                                             id="optionsRadios"
//                                                             value='1'
//                                                             checked={radioNew == "1"}
//                                                             defaultValue="option5"
//                                                             onChange={handleChangeRadioButton}
//                                                         />
//                                                           New Music
//                                                         <i className="input-frame" />
//                                                     </label>
//                                                 </div>
//                                                 <div className="form-check form-check-inline ">
//                                                     <label className="form-check-label">
//                                                         <input
//                                                             type="radio"
//                                                             className="form-check-input"
//                                                             name="radioNew"
//                                                             defaultChecked
//                                                             checked={radioNew == "0"}
//                                                             id="optionsRadios"
//                                                             defaultValue="option5"
//                                                             value='0'
//                                                             onClick={handleChangeRadioButton}
//                                                         />
//                                                               Generic Song
//                                                         <i className="input-frame" />
//                                                     </label>
//                                                 </div>
//                                                 <div className="errormsg">
//                                                     {radioErr ? "Please Select Option" : null}
//                                                 </div>

//                                             </div>
//                                         </div>
//                                         {radioNew == '0' ?
//                                             <>
//                                                 {radio == '1' ?
//                                                     <div className="col-sm-2">
//                                                         <div className="form-group">
//                                                             <label htmlFor="name">DJ List</label>
//                                                             <select className="form-control"
//                                                                 onChange={handleChangeSelectValue}
//                                                                 value={selectvalue} >
//                                                                 <option>Select Categories</option>
//                                                                 {
//                                                                     usersData1 &&
//                                                                     usersData1.map((item, i) =>
//                                                                         (<option
//                                                                             key={i}
//                                                                             value={item.genric_id}>
//                                                                             {item.name}</option>))
//                                                                 }
//                                                             </select>
//                                                             <div className="errormsg">
//                                                                 {selectErr ? selectErr : null}

//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                     :

//                                                     <div className="col-sm-2">
//                                                         <div className="form-group">
//                                                             <label htmlFor="name">Genric List</label>
//                                                             <select className="form-control"
//                                                                 onChange={handleChangeSelectValue}
//                                                                 value={selectvalue} >
//                                                                 <option>Select Categories</option>
//                                                                 {
//                                                                     usersData &&
//                                                                     usersData.map((item, i) =>
//                                                                         (<option
//                                                                             key={i}
//                                                                             value={item.genric_id}>
//                                                                             {item.name}</option>))
//                                                                 }
//                                                             </select>
//                                                             <div className="errormsg">
//                                                                 {selectErr ? selectErr : null}

//                                                             </div>
//                                                         </div>
//                                                     </div>}
//                                                 <div className="col-sm-2">
//                                                     <div className="form-group">
//                                                         <label htmlFor="name">Is Prime</label><br />
//                                                         <div className="form-check form-check-inline">
//                                                             <label className="form-check-label">
//                                                                 <input
//                                                                     type="radio"
//                                                                     className="form-check-input"
//                                                                     name="radio"
//                                                                     id="optionsRadios5"
//                                                                     value='1'
//                                                                     checked={radio === "1"}
//                                                                     defaultValue="option5"
//                                                                     onChange={handleChangeRadio}

//                                                                 />
//                                                                   Yes
//                                                           <i className="input-frame" />
//                                                             </label>
//                                                         </div>
//                                                         <div className="form-check form-check-inline ">
//                                                             <label className="form-check-label">
//                                                                 <input
//                                                                     type="radio"
//                                                                     className="form-check-input"
//                                                                     name="radio"
//                                                                     defaultChecked
//                                                                     checked={radio === "0"}
//                                                                     id="optionsRadios5"
//                                                                     defaultValue="option5"
//                                                                     value='0'
//                                                                     onClick={handleChangeRadio}
//                                                                 />
//                                                                   No
//                                                           <i className="input-frame" />
//                                                             </label>
//                                                         </div>

//                                                         <div className="errormsg">
//                                                             {radioErr ? "Please Select Option" : null}
//                                                         </div>

//                                                     </div>
//                                                 </div>
//                                             </>
//                                             :
//                                             <div className="col-sm-3">
//                                                 <div className="form-group">
//                                                     <label htmlFor="name">Album List</label>
//                                                     <select className="form-control"
//                                                         onChange={handleChangeAlbum}
//                                                         value={selectAlbum}>
//                                                         <option>Select Album</option>
//                                                         {
//                                                             albumData &&
//                                                             albumData.map((item, i) =>
//                                                                 (<option
//                                                                     key={i}
//                                                                     value={item.id}>
//                                                                     {item.name}</option>))
//                                                         }
//                                                     </select>
//                                                     <div className="errormsg">
//                                                         {albumErr ? albumErr : null}
//                                                     </div>
//                                                 </div>
//                                             </div>

//                                         }
//                                     </div>
//                                     <input
//                                         className="btn btn-primary"
//                                         type="submit"
//                                         defaultValue="Submit"
//                                         onClick={handleSubmit} />
//                                 </fieldset>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// const mapDispatchToProps = dispatch =>
//     bindActionCreators(
//         {
//             callUploadSongAction: callUploadSong,
//             callAddMusicApiAction: callAddMusicApi,
//             callGenericListAPIAction: callGenericListAPI,
//             callAddAlbumListAPIAction: callAddAlbumListAPI,
//             callDJMusicApiAction: callDJMusicApi
//         },
//         dispatch,
//     );

// export default connect(null, mapDispatchToProps)(AddMusic);





// import React, { useState, useEffect } from "react";
// import TextFieldComponent from "../../components/TextFieldComponent/TextFieldComponent";
// import { CustomeNotification } from "../../components/CustomeNotification/CustomeNotification";
// import { validationNameWithRegex } from "../../utils/validation";
// import { useHistory, Link } from "react-router-dom";
// import constants from "../../utils/constants";
// import { callUploadSong, callAddMusicApi, callMusicDetailsAPI ,callEditMusicApi} from '../../actions/MusicAction';
// import { callGenericListAPI } from '../../actions/GenericAction';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { GENERIC_ID , generic_id_Items} from '../../utils/switch';
// import CustomeDropDown from "../../components/CustomeDropDown/CustomeDropDown";

// const AddMusic = (props) => {
//     const [name, setName] = useState('');
//     const [selectvalue, setSelectValue] = useState('');
//     const [song, setFile] = useState('');
//     const [singername, setSingername] = useState('');
//     const [radioButtonYes, setradioButtonYes] = useState(false);
//     const [radioYesErr, setRadioYesErr] = useState("");
//     const [radioButtonNo, setradioButtonNo] = useState(false);
//     const [radioNoErr, setRadioNoErr] = useState("");
//     const [radioErr, setRadioErr] = useState("");
//     const [singerErr, setSingerErr] = useState("");
//     const [nameErr, setNameErr] = useState("");
//     const [fileErr, setFileErr] = useState("");
//     const [selectErr, setSelectErr] = useState("");
//     const [radio, setRadio] = useState("");
//     const hiddenFileInput = React.useRef(null);
//     const [usersData, setUserData] = useState([]);
//     const [genericData, setGenericData] = useState([]);
//     const [images, setImages] = useState([]);

//     const id = props.match.params.id;
//     const [isEdit, setIsEdit] = useState(false);


//     useEffect(() => {
//         getMusicDetails(id);
//         getGenericList();
//     }, []);


//     const getMusicDetails = (id) => {
//         console.log('idddd', id);
//         props
//             .callMusicDetailsAPIAction(id)
//             .then((res) => {
//                 console.log('music details', res);
//                 setUserData(res.data.result);
//                 // setFile(res.data.result.event_image[id].event_image)

//                 // setImages(res.data.result.event_image)

//             })
//             .catch((error) => {
//                 console.log(error);
//             });
//     }


//     const getGenericList = () => {
//         props
//             .callGenericListAPIAction()
//             .then((response) => {
//                 console.log('Generic List', response);
//                 setGenericData(response.data.result.finalres);
//             })
//             .catch((error) => {
//                 console.log(error);
//             });
//     }
//     const handleSubmit = (e) => {
//         e.preventDefault();

//         // if (
//         //     name.trim() === "" ||
//         //     singername.trim() === "" ||
//         //     song === "" ||
//         //     selectvalue === "" ||
//         //     radio === ""
//         // ) {
//         //     if (name.trim() === "") {
//         //         setNameErr("Song Name is Required");
//         //     }
//         //     if (singername.trim() === "") {
//         //         setSingerErr("Singer Name is Required");
//         //     }
//         //     if (song.trim() === "") {
//         //         setFileErr("Upload Song is Required");
//         //     }
//         //     if (selectvalue.trim() === "" || selectvalue === 'Select Categories') {
//         //         setSelectErr("Please Select Option");
//         //     }
//         //     if (radio === '') {
//         //         setRadioErr("Please Select Option");
//         //     }

//         //     return null;
//         // }
//         props.callEditMusicApiAction(id,{ 
//             name, url: 
//             song, author_name: 
//             singername, 
//             is_premium: radio,  
//             genric_id: selectvalue})
//         .then((response) => {
//             if (response.data.status) {
//                 CustomeNotification("success", "Updated Successfully", "Success", 2000);
//                 }
//                 props.history.push(constants.ROUTE.SIDEBAR.MUSIC);

//                 console.log('Edit Music', response);
//             }).catch((err) => {
//                 // console.log(err);
//                 // console.log("===>",err.response);
//                 if(err.response.status === 400){
//                     let result = err.response.data.result;
//                     if('name' in result){
//                         CustomeNotification("error", result.name.message, "Error", 2000)
//                     }
//                     if('author_name' in result){
//                         CustomeNotification("error", result.author_name.message, "Error", 2000)
//                     }
//                     if('url' in result){
//                         CustomeNotification("error", result.url.message, "Error", 2000)
//                     }
//                     if('is_premium' in result){
//                         CustomeNotification("error", result.is_premium.message, "Error", 2000)
//                     }
//                     if('genric_id' in result){
//                         CustomeNotification("error", result.genric_id.message, "Error", 2000)
//                     }
//                   }else if(err.response.status === 401){
//                     CustomeNotification("error", err.response.data.message, "Error", 2000)
//                   }


//             });
//             // name: {message: "name cannot be an empty field", context: "name", type: "string.empty"}
//             // author_name: {message: "author name cannot be an empty field", context: "author_name", type: "string.empty"}
//             // url: {message: "url cannot be an empty field", context: "url", type: "string.empty"}
//             // is_premium: {message: "is_premium cannot be an empty field", context: "is_premium", type: "string.empty"}
//             // genric_id: 
//     }
//     const handleChangeName = (e) => {
//         setName(e.target.value);
//         setIsEdit(true);
//         const data = { ...usersData };
//         if (usersData) {
//           data.song_name = e.target.value;
//         }
//         setUserData(data);
//         setNameErr("");
//     };
//     const handleChangeSingerName = (e) => {

//         setSingername(e.target.value);
//         setIsEdit(true);
//         const data = { ...usersData };
//         if (usersData) {
//           data.author_name = e.target.value;
//         }
//         setUserData(data);
//         setSingerErr("");
//     };
//     const handleChangeSelectValue = (e) => {
//     //    console.log(e.target.value);

//         setSelectValue(e.target.value);
//         setIsEdit(true);
//         const data = { ...usersData };
//         if (usersData) {
//           data.genric_name = e.target.value;
//          console.log('ffdfds',data.genric_name);

//         }
//         setUserData(data);

//         setSelectErr("");

//     };
//     const handleChangeRadio = (e) => {
//         setRadio(e.target.value);
//         console.log(e.target.value);
//         setIsEdit(true);
//         const data = { ...usersData };
//         if (usersData) {
//           data.is_premium = e.target.value;
//         }
//         setUserData(data);
//         setRadioErr("");

//     };

//     const handleChange = event => {
//         const data = new FormData();
//         data.append("song", event.target.files[0]);
//         props.callUploadSongAction(data)
//             .then(res => {
//                 console.log("upload song", res);
//                 setFile(res.data.result.length ? res.data.result : '');
//                 setFileErr("");
//                 const data = { ...usersData };
//                 if (images) {
//                     data.song_url = event.target.value;
//                 }
//                 setFile(data);
//             })
//             .catch((error) => {
//                 console.log(error);
//             });

//     };

//     const handleClick = event => {
//         hiddenFileInput.current.click();
//     };

//     return (
//         <div>
//             <nav className="page-breadcrumb">
//                 <ol className="breadcrumb">
//                     <li className="breadcrumb-item">
//                         <Link to={constants.ROUTE.SIDEBAR.MUSIC}>Music List</Link>
//                         </li>
//                     <li className="breadcrumb-item active" aria-current="page">Edit Music</li>
//                 </ol>
//             </nav>
//             <div className="row">
//                 <div className="col-md-12 stretch-card">
//                     <div className="card">
//                         <div className="card-body">
//                             <h6 className="card-title">Edit Music</h6>
//                             <div
//                                 className="cmxform"
//                                 id="signupForm"
//                                 method="get" noValidate="novalidate">
//                                 <fieldset>
//                                     <div className="row">
//                                         <div className="col-sm-6">
//                                             <div className="form-group">
//                                                 <TextFieldComponent
//                                                     type="text"
//                                                     className=""
//                                                     id="name"
//                                                     label="Name Of Song"
//                                                     labelClassName=""
//                                                     inputClassName=""
//                                                     error={nameErr ? true : false}
//                                                     helperText={nameErr}
//                                                     helperTextClassName="errormsg"
//                                                     isDisable={false}
//                                                     placeholder="Enter Song Name"
//                                                     onChange={handleChangeName}
//                                                     value={usersData.song_name}
//                                                 />
//                                             </div>
//                                         </div>
//                                         <div className="col-sm-6">
//                                             <div className="form-group">
//                                                 <TextFieldComponent
//                                                     type="text"
//                                                     className=""
//                                                     id="singername"
//                                                     label="Singer Name"
//                                                     labelClassName=""
//                                                     inputClassName=""
//                                                     error={singerErr ? true : false}
//                                                     helperText={singerErr}
//                                                     helperTextClassName="errormsg"
//                                                     isDisable={false}
//                                                     placeholder="Enter Singer Name"
//                                                     onChange={handleChangeSingerName}
//                                                     value={usersData.author_name}
//                                                 />
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="row">
//                                         <div className="col-sm-4">
//                                             <div className="form-group">
//                                                 <label htmlFor="name">Upload Song <small>(only .mp3*)</small></label>
//                                                 <input
//                                                     type="file"
//                                                     name="img[]"
//                                                     className="file-upload-default"
//                                                     accept=".mp3"
//                                                     ref={hiddenFileInput}
//                                                     onChange={handleChange}
//                                                     style={{ display: 'none' }}
//                                                 />
//                                                 <div className="input-group col-xs-12">
//                                                     <input
//                                                         type="text"
//                                                         className="form-control file-upload-info"
//                                                         placeholder="Upload Song"
//                                                         value={usersData.song_url}
//                                                     />
//                                                     <span className="input-group-append">
//                                                         <button
//                                                             onClick={handleClick}
//                                                             className="file-upload-browse btn btn-primary"
//                                                             type="button">Upload</button>
//                                                     </span>
//                                                 </div>
//                                                 <div className="errormsg">
//                                                     {fileErr ? fileErr : null}
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         <div className="col-sm-4">
//                                             <div className="form-group">
//                                             <label htmlFor="name">Genric List</label>
//                                                 <select className="form-control" 
//                                                 onChange={handleChangeSelectValue}
//                                                 // defaultInputValue={usersData.genric_name}

//                                                 // value={usersData.genric_name}
//                                                 >
//                                                     <option>Select Categories</option>
//                                                     {
//                                                         genericData &&
//                                                         genericData.map((item, i) =>
//                                                             (<option
//                                                                 key={i}
//                                                                 value={item.genric_id}
//                                                                 // onClick={()=>handleChangeSelectValue(item)}
//                                                                 // onSelect={()=>alert('click')}
//                                                                 >
//                                                                 {item.name}</option>))
//                                                     }
//                                                 </select>
//                                                 <div className="errormsg">
//                                                     {selectErr ? selectErr : null}
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className="col-sm-4">
//                                             <div className="form-group">
//                                                 <label htmlFor="name">Is Prime</label><br />
//                                                 <div className="form-check form-check-inline">
//                                                     <label className="form-check-label">
//                                                         <input
//                                                             type="radio"
//                                                             className="form-check-input"
//                                                             name="radio"
//                                                             id="optionsRadios5"
//                                                             // checked="false"
//                                                             // checked={radio === "1" ? true : null}
//                                                             value='1'
//                                                             defaultValue="option5"
//                                                             onChange={handleChangeRadio}
//                                                         />
//                                                             Yes
//                                                         <i className="input-frame" />
//                                                     </label>
//                                                 </div>
//                                                 <div className="form-check form-check-inline ">
//                                                     <label className="form-check-label">
//                                                         <input
//                                                             type="radio"
//                                                             className="form-check-input"
//                                                             name="radio"
//                                                             checked="true"
//                                                             // checked={radio === "0" ? true : null}
//                                                             id="optionsRadios5"
//                                                             defaultValue="option5"
//                                                             value='0'
//                                                             onChange={handleChangeRadio}
//                                                         />
//                                                               No
//                                                         <i className="input-frame" />
//                                                     </label>
//                                                 </div>
//                                                 <div className="errormsg">
//                                                     {radioErr ? radioErr : null}
//                                                 </div>

//                                             </div>
//                                         </div>
//                                     </div>
//                                     <input
//                                         className="btn btn-primary"
//                                         type="submit"
//                                         defaultValue="Submit"
//                                         onClick={handleSubmit} />
//                                 </fieldset>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>



//     );
// };

// const mapDispatchToProps = dispatch =>
//     bindActionCreators(
//         {
//             callUploadSongAction: callUploadSong,
//             callAddMusicApiAction: callAddMusicApi,
//             callGenericListAPIAction: callGenericListAPI,
//             callMusicDetailsAPIAction: callMusicDetailsAPI,
//             callEditMusicApiAction: callEditMusicApi

//         },
//         dispatch,
//     );

// export default connect(null, mapDispatchToProps)(AddMusic);















