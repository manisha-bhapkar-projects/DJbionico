import React, { useState, useEffect } from "react";
import TextFieldComponent from "../../components/TextFieldComponent/TextFieldComponent";
import { callEditGenericApi, callGenericDetailsAPI } from '../../actions/GenericAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from "react-router-dom";
import constants from "../../utils/constants";
import { CustomeNotification } from "../../components/CustomeNotification/CustomeNotification";


const EditMusic = (props) => {
    const [name, setSongname] = useState('');
    const [nameErr, setNameErr] = useState('');

    const [songErr, setSongErr] = useState('');
    const id = props.match.params.id;
    const [usersData, setUserData] = useState([]);
    const [radioNew, setRadioNew] = useState('0');
    const [radioErr, setRadioErr] = useState("");
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        getGenericDetails(id);
    }, []);


    const getGenericDetails = (id) => {
        // console.log('idddd', id);
        props
            .callGenericDetailsAPIAction(id)
            .then((res) => {
                console.log('generic details', res);
                setUserData(res.data.result);
                console.log('generic',res.data.result);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // if (
        //     name.trim() === ""
        // ) {
        //     if (name.trim() === "") {
        //         setSongErr("Enter Song Name");
        //     }
        //     return null;
        // }

        props.callEditGenericApiAction(id, { 
            name: usersData.name,
            genric_type: radioNew
         })
            .then((response) => {
                // console.log('Edit Generic', response);
                if (response.data.status) {
                    CustomeNotification("success", "Updated Successfully", "Success", 2000);
                    }
                    props.history.push(constants.ROUTE.SIDEBAR.GENERIC_LIST);
            }).catch((err) => {
                console.log('err',err.response);
                if(err.response.status === 400){
                    let result = err.response.data.result;
                    if('name' in result){
                        CustomeNotification(
                            "error", 
                      result.name.message,
                            "Error", 
                            2000)
                            setNameErr(result.name.message)
                    }
                  }else if(err.response.status === 401){
                    CustomeNotification("error", err.response.data.message, "Error", 2000)
                  }

            });

    }
    const handleChangeSongName = (e) => {
        setNameErr("");
        setSongname(e.target.value);
        setIsEdit(true);
        const data = { ...usersData };
        if (usersData) {
          data.name = e.target.value;
        }
        setUserData(data);
    };
    const handleChangeRadioButton = (e) => {
        console.log('radionewin edit generic ', e.target.value);
        setRadioNew(e.target.value)
        setIsEdit(true);
        const data = { ...usersData };
        if (usersData) {
          data.genric_type = e.target.value;
        //   console.log('jjj',data.genric_id);
        }
        setUserData(data);
    };
    // const handleChangeRadio = (e) => {
    //     console.log('radio', e.target.value);
    //     setRadioErr("");
    //     // setRadio(e.target.value)
    //     // getDJList();
    //     setIsEdit(true);
    //     const data = { ...usersData };
    //     if (usersData) {
    //       data.is_premium = e.target.value;
    //       console.log('data',data.is_premium);
    //     }
    //     setUserData(data);
    //     // console.log('radio',radio);
    // };
    return (


        <div>
            <nav className="page-breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                    <Link 
                    to={constants.ROUTE.SIDEBAR.GENERIC_LIST}>
                        Generic List
                        </Link>
                    </li>
                    <li 
                    className="breadcrumb-item active" 
                    aria-current="page">
                        Edit Generic
                        </li>
                </ol>
            </nav>
            <div className="row">
                <div className="col-md-12 stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h6 className="card-title">Edit Generic</h6>
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
                                                    label="Name Of Song"
                                                    labelClassName=""
                                                    inputClassName=""
                                                    error={nameErr ? true : false}
                                                    helperText={nameErr}
                                                    helperTextClassName="errormsg"
                                                    isDisable={false}
                                                    placeholder="Enter Song Name"
                                                    onChange={handleChangeSongName}
                                                    value={usersData.name}
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
                                                            // checked={radioNew == "1"}
                                                            checked={usersData.genric_type == "1"}
                                                            defaultValue="option5"
                                                            onChange={handleChangeRadioButton}
                                                        />
                                                         {/* <input
                                                                    type="radio"
                                                                    className="form-check-input"
                                                                    name="radio"
                                                                    id="optionsRadios5"
                                                                    value='1'
                                                                    checked={usersData.is_premium == "1"}
                                                                    // checked={usersData.is_premium ? 
                                                                    //     radio == usersData.is_premium : radio }
                                                                    defaultValue="option5"
                                                                    onChange={handleChangeRadio}
                                                                /> */}
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
                                                            // checked={radioNew == "0"}
                                                            checked={usersData.genric_type == "0"}
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
            callEditGenericApiAction: callEditGenericApi,
            callGenericDetailsAPIAction: callGenericDetailsAPI
        },
        dispatch,
    );

export default connect(null, mapDispatchToProps)(EditMusic);