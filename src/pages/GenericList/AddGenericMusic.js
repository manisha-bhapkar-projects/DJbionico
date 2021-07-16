import React, { useState, useEffect } from "react";
import TextFieldComponent from "../../components/TextFieldComponent/TextFieldComponent";
import { callAddGenericApi, callEditGenericApi } from '../../actions/GenericAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from "react-router-dom";
import constants from "../../utils/constants";
import { CustomeNotification } from "../../components/CustomeNotification/CustomeNotification";

const AddGenericMusic = (props) => {
    const [name, setSongname] = useState('');
    const [songErr, setSongErr] = useState('');
    const [radioNew, setRadioNew] = useState('0');
    const [radioErr, setRadioErr] = useState("");

    const id = props.match.params.id;
    useEffect(() => {
    }, []);


    const reqParam = {
        name: name.trim(),
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            name.trim() === ""
            // file === ""
        ) {
            if (name.trim() === "") {
                setSongErr("Enter Generic Name");
            }
            return null;
        }

        props.callAddGenericApiAction({ 
            name,
            genric_type: radioNew
         })
            .then((response) => {
                console.log('Add Generic', response);
                if (response.data.status) {
                    CustomeNotification(
                        "success", 
                        "Generic Music Added Successfully", 
                        "Success", 
                         2000);
                    props.history.push(constants.ROUTE.SIDEBAR.GENERIC_LIST);
                    }

            }).catch((err) => {
                console.log(err.response);
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
                    setSongErr(result.name.message);
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


        // props.callEditGenericApiAction(id, name )
        // .then((response) => {
        //     console.log('Edit Generic', response);
        // }).catch((err) => {
        // console.log(err);

        // });

    }
    const handleChangeSongName = (e) => {
        setSongErr("");
        setSongname(e.target.value);
    };
    const handleChangeRadioButton = (e) => {
        console.log('radionew', e.target.value);
        setRadioNew(e.target.value)
    };


    // const handleChange = event => {
    //     const fileUploaded = event.target.files[0].name;
    //     setFile(fileUploaded);
    //     setFileErr('');
    // };

    // const handleClick = event => {
    //     hiddenFileInput.current.click();
    // };

    return (


        <div>
            <nav className="page-breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                    <Link to={constants.ROUTE.SIDEBAR.GENERIC_LIST}>Generic List</Link>
                        </li>
                    <li className="breadcrumb-item active" aria-current="page">Add Generic</li>
                </ol>
            </nav>
            <div className="row">
                <div className="col-md-12 stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h6 className="card-title">Add New Generic</h6>
                            <div className="cmxform"
                                id="signupForm"
                                method="get"
                                action="#"
                                noValidate="novalidate">
                                <fieldset>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <TextFieldComponent
                                                    type="text"
                                                    className=""
                                                    id="name"
                                                    label="Name Of Generic"
                                                    labelClassName=""
                                                    inputClassName=""
                                                    error={songErr ? true : false}
                                                    helperText={songErr}
                                                    helperTextClassName="errormsg"
                                                    isDisable={false}
                                                    placeholder="Enter Generic Name"
                                                    onChange={handleChangeSongName}
                                                    value={name}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <label htmlFor="name">
                                                    Select Option
                                                    </label><br />
                                                <div className="form-check form-check-inline">
                                                    <label className="form-check-label">
                                                        <input
                                                            type="radio"
                                                            className="form-check-input"
                                                            name="radioNew"
                                                            id="optionsRadios"
                                                            value='1'
                                                            checked={radioNew == "1"}
                                                            defaultValue="option5"
                                                            onChange={handleChangeRadioButton}
                                                        />
                                                            DJ Song
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
                                                              Generic Song
                                                        <i className="input-frame" />
                                                    </label>
                                                </div>
                                                <div className="errormsg">
                                                    {radioErr ? "Please Select Option" : null}
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <input
                                        className="btn btn-primary"
                                        type="submit"
                                        defaultValue="Submit"
                                        onClick={handleSubmit} />
                                </fieldset>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>



    );
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            callAddGenericApiAction: callAddGenericApi,
            callEditGenericApiAction: callEditGenericApi,
        },
        dispatch,
    );

export default connect(null, mapDispatchToProps)(AddGenericMusic);