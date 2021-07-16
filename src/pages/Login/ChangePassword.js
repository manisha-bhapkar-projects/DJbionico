import React, { useState } from "react";
import constants from "../../utils/constants";
import { useHistory, Link } from "react-router-dom";
import TextFieldComponent from "../../components/TextFieldComponent/TextFieldComponent";
import { CustomeNotification } from "../../components/CustomeNotification/CustomeNotification";
import { validateEmail } from "../../utils/validation";
import { callChangePasswordApi } from '../../actions/AuthAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { validateNo } from "../../utils/validation";


const ChangePassword = (props) => {
    const [isEmailError, setEmailError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordErr, setPasswordErr] = useState("");
    const [confirmPswdErr, setconfirmPswdErr] = useState("");
    const [confirmPswd, setconfirmPswd] = useState("");
    const [pswdNotMatchErr, setpswdNotMatchErr] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [otp, setotp] = useState("");
    const [otpErr, setotpErr] = useState("");
    const history = useHistory();
   

    const handleSubmit = (e) => {
        e.preventDefault();
        props.callChangePasswordApiAction({ email, otp, password })
        .then((response) => {
            console.log('change pass', response);
            if (response.data.status) {
                CustomeNotification("success", response.data.message, "Success", 2000);
                history.push(constants.ROUTE.LOGIN.LOGIN);
            } else {
                CustomeNotification("error", response.data.message, "Error", 2000);
            }
        }).catch((err) => {
            console.log(err);
            if(err.response.status === 400){
                let result = err.response.data.result;
                if('email' in result){
                  setEmailError(result.email.message)
                }
                if('password' in result){
                  setPasswordErr(result.password.message)
                }
                if('otp' in result){
                    setotpErr(result.otp.message)
                  }
              }else {
                  console.log('eoor', err.response);
                  
                CustomeNotification("error", err.response.data.message, "Error", 2000)
              }
        });
        if (
            // email.trim() === "" ||
            // password.trim() === "" ||
            // !validateEmail(email) ||
            // email != "djbionico.qrioustech@gmail.com" ||
            confirmPswd.trim() === "" ||
            password.trim() !== confirmPswd.trim() ||
            // otp.trim() === "" ||
            !validateNo(otp)
        ) {

            // if (email.trim() === "") {
            //     setEmailError("Enter Email");
            // }

            // else if (!validateEmail(email)) {
            //     setEmailError("Enter Valid Email");
            // }
            // else if (email != "djbionico.qrioustech@gmail.com") {
            //     setEmailError("Enter Registered Email");
            //   }

            // if (password.trim() === "") {
            //     setPasswordErr("Enter Password");
            // }
            if (confirmPswd.trim() === "") {
                setconfirmPswdErr("Enter Confirm Password");
            }
            else if (password.trim() !== confirmPswd.trim()) {
                setpswdNotMatchErr("Password Doesn't Match");
            }
            // if (otp.trim() === "") {
            //     setotpErr("Enter Verification Code");
            // }
            if (!validateNo(otp)) {
                setotpErr("Verification Code Must Be Number");
            }

            return null;
        }

    }

    const handleChangeEmail = (e) => {
        setEmailError("");
        setEmail(e.target.value);
    };
    const handleChangePassword = (e) => {
        setPasswordErr("");
        setPassword(e.target.value);
    };
    const handleChangeConfirmPassword = (e) => {
        setconfirmPswdErr("");
        setpswdNotMatchErr("");
        setconfirmPswd(e.target.value);
    };
    const handleVerificationCode = (e) => {
        setotpErr("");
        setotp(e.target.value);
    };

    return (
        <div className="page-wrapper full-page">
            <div className="page-content d-flex align-items-center justify-content-center">
                <div className="row w-100 mx-0 auth-page">
                    <div className="col-md-6 col-xl-5 mx-auto">
                        <div className="card">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="auth-form-wrapper  px-5 py-5">
                                        <a href="#" className="noble-ui-logo d-block mb-2">DJ Bionico <span>Mix</span></a>
                                        <form className="forms-sample">
                                            <h4 className="my-3">Change Password</h4>
                                            <div className="form-group">
                                                <TextFieldComponent
                                                    className=""
                                                    id="eventname"
                                                    label="Email address"
                                                    labelClassName=""
                                                    inputClassName=""
                                                    error={isEmailError ? true : false}
                                                    helperText={isEmailError}
                                                    helperTextClassName="errormsg"
                                                    isDisable={false}
                                                    placeholder="Email"
                                                    onChange={handleChangeEmail}
                                                    value={email}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <TextFieldComponent
                                                    type="text"
                                                    className=""
                                                    id="otp"
                                                    label="Verification Code"
                                                    labelClassName=""
                                                    inputClassName=""
                                                    error={otpErr ? true : false}
                                                    helperText={otpErr}
                                                    helperTextClassName="errormsg"
                                                    isDisable={false}
                                                    placeholder="Verification Code"
                                                    onChange={handleVerificationCode}
                                                    value={otp}
                                                />
                                            </div>
                                            <div className="form-group col-13 pass-login">
                                                <TextFieldComponent
                                                    type={showPassword ? "text" : "password"}
                                                    className=""
                                                    id="eventname"
                                                    label="Password"
                                                    labelClassName=""
                                                    inputClassName=""
                                                    error={passwordErr ? true : false}
                                                    helperText={passwordErr}
                                                    helperTextClassName="errormsg"
                                                    isDisable={false}
                                                    placeholder="Password"
                                                    onChange={handleChangePassword}
                                                    value={password}
                                                />
                                                <div
                                                    className="show-password"
                                                    onClick={() => setShowPassword(!showPassword)}>
                                                    <i className="nav-link-icon fa fa-eye"> </i>
                                                </div>
                                            </div>
                                            <div className="form-group col-13 pass-login">

                                                <TextFieldComponent
                                                    type={showPassword ? "text" : "password"}
                                                    className=""
                                                    id="eventname"
                                                    label="Confirm Password"
                                                    labelClassName=""
                                                    inputClassName=""
                                                    error={confirmPswdErr ? true : false}
                                                    helperText={confirmPswdErr}
                                                    helperTextClassName="errormsg"
                                                    isDisable={false}
                                                    placeholder="Confirm Password"
                                                    onChange={handleChangeConfirmPassword}
                                                    value={confirmPswd}
                                                />
                                                <div
                                                    className="show-password"
                                                    onClick={() => setShowPassword(!showPassword)}>
                                                    <i className="nav-link-icon fa fa-eye"> </i>

                                                </div>
                                                <div className="errormsg">
                                                    {pswdNotMatchErr ? pswdNotMatchErr : null}
                                                </div>
                                            </div>
                                            <div className="mt-3">
                                                <button
                                                    onClick={handleSubmit}
                                                    type="submit"
                                                    className="btn btn-primary mr-2 mb-2 mb-md-0">Submit</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
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
            callChangePasswordApiAction: callChangePasswordApi,
        },
        dispatch,
    );

export default connect(null, mapDispatchToProps)(ChangePassword);


