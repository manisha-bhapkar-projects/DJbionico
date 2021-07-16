import React, { useState, useEffect } from "react";
import CardListTable from "../../components/CardListTable/CardListTable";
import GeneList from "../../components/DummyTable/DummyTable";
import constants from "../../utils/constants";
import { useHistory, Link } from 'react-router-dom';
import { Trash } from 'react-feather';
import { Edit3 } from 'react-feather';
import Modal from "../../components/Modal/Modal";
import { callGenericListAPI, callEditGenericApi, callDeleteGenericApi } from '../../actions/GenericAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TableHeader from "../../components/TableHeader/TableHeader";
import { CustomeNotification } from "../../components/CustomeNotification/CustomeNotification";

const GenericList = (props) => {
    const [count, setCount] = useState(2);
    const [limit, setlimit] = useState(10);
    const [showModal, setShowModal] = useState(false);
    const [usersData, setUserData] = useState([]);
    const [loading, setloading] = useState(false);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [genric_type, setGenric_type] = useState("");

    const [isUserSearch, setUserSearch] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const history = useHistory();

    useEffect(() => {
        getGenericList(pageNumber, limit, search, );
    }, []);

    const getGenericList = (page = 1, limit = 10, search = "", ) => {
        setloading(true);
        props
            .callGenericListAPIAction(page, limit, search, )
            .then((response) => {
                setCount(response.data.result.count);
                console.log('Generic List', response);
                setUserData(response.data.result.finalres);
                // console.log(response.data.result.finalres[0].genric_type);
                // setGenric_type(response.data.result.finalres[0].genric_type)
                setloading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const handelSerach = (e) => {
        setSearch(e.target.value);
        setPageNumber(1);
        getGenericList(1, limit, e.target.value);
    };

    const handlePageChange = (perPage, page) => {
        setPageNumber(perPage);
        getGenericList(perPage, limit, search);
    };
    const handleDropdownChange = (e) => {
        setlimit(e.target.value)
        setPageNumber(1);
        getGenericList(1, e.target.value, search);
    };

    // const EditGeneric = ({ id, name }) => {
    //     props.callEditGenericApiAction({ id, name })
    //         .then((response) => {
    //             console.log('Edit Generic', response);
    //             //   setSongname(response)
    //         }).catch((err) => {

    //         });
    // };


    const DeleteGeneric = (id) => {
        props.callDeleteGenericApiAction(id)
            .then((response) => {
                console.log('Delete Generic', response);
                getGenericList(pageNumber, limit, search);
                if (response.data.status) {
                    CustomeNotification("error", "Generic Deleted ", "Error", 2000);
                }
            }).catch((err) => {

            });
    };
    const openModal = (e) => {
        setShowModal(true);
    };

    const Genericcolumns = [
        {
            name: "NO.",
            selector: "genric_id",
            // sortable: true,
            grow: "1",

        },
        {
            name: "GENERIC NAME",
            selector: "name",
            //   sortable: true,
            grow: "2",
        },

        {
            name: "SONG COUNT",
            selector: "song_count",
            // sortable: true,
            right: false,
            grow: "2",
            cell: (row) => {
                return (
                    <>
                        {row.song_count === null ? 0 : row.song_count}
                    </>
                );
            },
        },
        {
            name: "GENERIC TYPE",
            selector: "genric_type",
            // sortable: true,
            right: false,
            grow: "2",
            cell: (row) => {
                // console.log('rrrr', row);
                
                return (
                    <>
                        {row.genric_type == 0 ? "Generic" : "DJ Song"}
                    </>
                );
            },
        },
        {
            name: "ACTION",
            selector: "",
            // sortable: true,
            right: false,
            grow: "2",
            cell: (row) => {
                return (
                    <>
                        <Link class="trash-custom-icon" >
                            <Trash
                                onClick={(key) => DeleteGeneric(row.genric_id)} />
                        </Link>
                        <Edit3
                            onClick={() => {
                                history.push(`${constants.ROUTE.GENERIC_LIST.EDIT_MUSIC}${row.genric_id}`);
                            }}
                            className="edit-custom-icon" />
                    </>
                );
            },
        },
        {
            name: "",
            selector: "",
            // sortable: true,
            right: false,
            grow: "2",
            cell: (row) => {
                return (
                    <>
                        <button className="btn btn-primary"
                            onClick={() => {
                                history.push(`${constants.ROUTE.GENERIC_LIST.VIEW}${row.genric_id}`);
                            }}
                        >View</button>
                    </>
                );
            },
        },

    ];
    return (
        <div className="row">
            <div className="col-md-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h6 className="card-title mb-0">
                                Generic List
                                </h6>
                            <button
                                className="btn btn-primary btn-icon-text mb-2 mb-md-0"
                                onClick={() => {
                                    history.push(constants.ROUTE.GENERIC_LIST.ADD_MUSIC)
                                }} >Add Generic</button>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="form-group d-flex align-items-center  col-sm-4 ">
                                <label>Show</label>
                                <select
                                    name="name"
                                    value={limit}
                                    className="form-control mr-3 ml-3 "
                                    onChange={handleDropdownChange}>
                                    <option value="10" selected>10</option>
                                    <option value="20">20</option>
                                    <option value="30">30</option>
                                    <option value={count}>All</option>
                                </select>
                                <span
                                    className="form-group d-flex align-items-center">
                                    entries
                                </span>
                            </div>
                            <div className="form-group">
                                <TableHeader
                                    search={search}
                                    placeholder="Search By Generic Name"
                                    handelSearch={handelSerach}
                                />
                            </div>
                        </div>
                        <div className="table-responsive">
                            <CardListTable
                                columns={Genericcolumns}
                                data={usersData}
                                pending={loading}
                                pagination={false}
                                custompagination
                                paginationServer={false}
                                noDataString={"No data found"}
                                totalListCount={count}
                                // paginationTotalRows={count}
                                paginationPerPage={limit}
                                onPageChangedCalled={handlePageChange}
                                inputClassName="mt-3"
                                pageNumber={pageNumber}

                            />


                        </div>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={showModal}
                onCancelClickListner={() => setShowModal(false)}
            />
        </div>


    );
};
const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            callGenericListAPIAction: callGenericListAPI,
            callEditGenericApiAction: callEditGenericApi,
            callDeleteGenericApiAction: callDeleteGenericApi
        },
        dispatch,
    );

export default connect(null, mapDispatchToProps)(GenericList);
















// import React, { useState, useEffect } from "react";
// import TextFieldComponent from "../../components/TextFieldComponent/TextFieldComponent";
// import { callAddGenericApi, callEditGenericApi } from '../../actions/GenericAction';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { validationNameWithRegex } from "../../utils/validation";
// import { useHistory } from "react-router-dom";
// import constants from "../../utils/constants";
// import { CustomeNotification } from "../../components/CustomeNotification/CustomeNotification";

// const AddGenericMusic = (props) => {
//     const history = useHistory();
//     const [isError, setIsError] = useState({});
//     const [isFocus, setIsFocus] = useState({});
//     const [name, setStaff] = useState({
//         fname: "",

//     });
//     const handleAddGenericMusic = (e) => {
//         setIsFocus({
//             fname: true,
//         });
//         e.preventDefault();
//         props
//             .callAddGenericApiAction(name)
//             .then((_res) => {
//                 if (_res.data.status) {
//                     history.push(constants.ROUTE.SIDEBAR.DASHBORD);
//                     CustomeNotification("success", _res.data.message, "Success", 2000);
//                 } else {
//                     CustomeNotification("error", _res.data.message, "Error", 2000);
//                 }
//             })
//             .catch((error) => {
//                 let errors = {};
//                 if (error.response.status === 400) {
//                     let result = error.response.data.result;
//                     if ("fname" in result) {
//                         errors.fname = result.fname.message;
//                     }
//                 }
//                 setIsError(errors);
//                 CustomeNotification(
//                     "error",
//                     error.response.data.message,
//                     "Error",
//                     2000
//                 );
//                 Object.values(error.response.data.result).map((x) => {
//                     return CustomeNotification(
//                         "error",
//                         x.message,
//                         "Validation Error",
//                         2000
//                     );
//                 });
//             });
//     };
//     const validate = (values) => {
//         let errors = {};

//         if (!values.fname.trim()) {
//             errors.fname = "First name is Required";
//         }
//         return errors;
//     };

//     const handleFocus = (e) => {
//         const validation = validate(name);
//         setIsError(validation);
//         setIsFocus({ ...isFocus, [e.target.name]: true });
//     };
//     const handleChangeValue = (e) => {
//         if (e.target.name === "phoneno") {
//             if (
//                 validationNameWithRegex(
//                     e.target.value,
//                     constants.REGEX_PATTERN.NUMBER
//                 ) ||
//                 e.target.value === ""
//             ) {
//                 setStaff({
//                     ...name,
//                     [e.target.name]: e.target.value,
//                 });
//             }
//         } else {
//             setStaff({
//                 ...name,
//                 [e.target.name]: e.target.value,
//             });
//         }
//         setIsError({ ...isError, [e.target.name]: "" });
//     };

//     const handleChangeValueBlur = (e) => {
//         if (e.target.name === "password") {
//             if (
//                 validationNameWithRegex(
//                     e.target.value,
//                     constants.REGEX_PATTERN.NUMBER
//                 ) ||
//                 e.target.value === ""
//             ) {
//                 setStaff({
//                     ...name,
//                     [e.target.name]: e.target.value,
//                 });
//             }
//         } else {
//             setStaff({
//                 ...name,
//                 [e.target.name]: e.target.value.trim(),
//             });
//         }
//         setIsError({ ...isError, [e.target.name]: "" });
//     };

    // const [name, setSongname] = useState('');
    // const [songErr, setSongErr] = useState('');
    // const id = props.match.params.id;
    // useEffect(() => {

    // }, []);


    // const reqParam = {
    //     name: name.trim(),
    // };
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (
    //         name.trim() === ""
    //         // file === ""
    //     ) {
    //         if (name.trim() === "") {
    //             setSongErr("Enter Song Name");
    //         }
    //         return null;
    //     }

    //     props.callAddGenericApiAction({ name })
    //         .then((response) => {
    //             console.log('Add Generic', response);
    //         }).catch((err) => {
    //             console.log(err);

    //    });


    // props.callEditGenericApiAction(id, name )
    // .then((response) => {
    //     console.log('Edit Generic', response);
    // }).catch((err) => {

    // });

    // }
    //     const handleChangeSongName = (e) => {
    //         setSongErr("");
    //         setSongname(e.target.value);
    //     };


    // const handleChange = event => {
    //     const fileUploaded = event.target.files[0].name;
    //     setFile(fileUploaded);
    //     setFileErr('');
    // };

    // const handleClick = event => {
    //     hiddenFileInput.current.click();
    // };

//     return (


//         <div>
//             <nav className="page-breadcrumb">
//                 <ol className="breadcrumb">
//                     <li className="breadcrumb-item"><a href="generic-list.html">Generic List</a></li>
//                     <li className="breadcrumb-item active" aria-current="page">Add Music</li>
//                 </ol>
//             </nav>
//             <div className="row">
//                 <div className="col-md-12 stretch-card">
//                     <div className="card">
//                         <div className="card-body">
//                             <h6 className="card-title">Add New Music</h6>
//                             <div className="cmxform"
//                                 id="signupForm"
//                                 method="get"
//                                 action="#"
//                                 noValidate="novalidate">
//                                 <fieldset>
//                                     <div className="row">
//                                         <div className="col-sm-6">
//                                             <div className="form-group">
//                                                 {/* <TextFieldComponent
//                                                     type="text"
//                                                     className=""
//                                                     id="name"
//                                                     label="Name Of Song"
//                                                     labelClassName=""
//                                                     inputClassName=""
//                                                     error={songErr ? true : false}
//                                                     helperText={songErr}
//                                                     helperTextClassName="errormsg"
//                                                     isDisable={false}
//                                                     placeholder="Enter Song Name"
//                                                     onChange={handleChangeSongName}
//                                                     value={name}
//                                                 /> */}
//                                                 <TextFieldComponent
//                                                     type="text"
//                                                     name="fname"
//                                                     id="fname"
//                                                     placeholder="User Name"
//                                                     label="Name Of Song"
//                                                     value={name.fname}
//                                                     // onBlur={handleFocus}
//                                                     onChange={handleChangeValue}
//                                                     onBlur={(e) => {
//                                                         handleChangeValueBlur(e);
//                                                         handleFocus(e);
//                                                     }}
//                                                     error={isError.fname && isFocus.fname ? true : false}
//                                                     helperText={isError.fname}
//                                                 />
//                                             </div>
//                                         </div>
//                                         {/* <div className="col-sm-6">
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
//                                                         value={file}
//                                                     />
//                                                     <span className="input-group-append">
//                                                         <button
//                                                             onClick={handleClick}
//                                                             className="file-upload-browse btn btn-primary"
//                                                             type="button"
//                                                         >Upload</button>
//                                                     </span>

//                                                 </div>
//                                                 <div className="errormsg">{fileErr ? fileErr : null}</div>
//                                             </div>
//                                         </div> */}
//                                     </div>

//                                     <input
//                                         className="btn btn-primary"
//                                         type="submit"
//                                         defaultValue="Submit"
//                                         onClick={handleAddGenericMusic} />
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
//             callAddGenericApiAction: callAddGenericApi,
//             callEditGenericApiAction: callEditGenericApi,
//         },
//         dispatch,
//     );

// export default connect(null, mapDispatchToProps)(AddGenericMusic);