import React, { useState } from "react";
import constants from "../../utils/constants";
import { useHistory, Link } from "react-router-dom";
import {
  storeAuthToken,
  storeRefreshToken,
  storeAdminData,
} from "../../utils/storage/index";
import { CustomeNotification } from "../../components/CustomeNotification/CustomeNotification";
import TextFieldComponent from "../../components/TextFieldComponent/TextFieldComponent";
import { callLoginApi } from "../../actions/AuthAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const Login = (props) => {
  const history = useHistory();
  const [isEmailError, setEmailError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  // const [isError, setIsError] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    props
      .callLoginApiAction({ email, password })
      .then((response) => {
        if (response.data.status) {
          storeAuthToken(response.data.result.token);
          storeRefreshToken(response.data.result.refresh_token);
          storeAdminData(response.data.result);
          props.history.push(constants.ROUTE.SIDEBAR.DASHBOARD);
          CustomeNotification(
            "success",
            response.data.message,
            "Success",
            2000
          );
        } else {
          CustomeNotification("error", response.data.message, "Error", 2000);
        }
      })
      .catch((err) => {
        if (err.response && err.response.status && err.response.status === 400) {
          let result = err.response.data ? err.response.data.result ? err.response.data.result : "" :"";
          if ("email" in result) {
            setEmailError(result.email.message);
          }
          if ("password" in result) {
            setPasswordErr(result.password.message);
          }
        }
        // if(err.response.status === 401){
        CustomeNotification("error",  err.response.data.message, "Error", 2000);
        // }
      });
  };

  const handleChangeEmail = (e) => {
    setEmailError("");
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPasswordErr("");
    setPassword(e.target.value);
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
                    <a className="noble-ui-logo d-block mb-2">
                      DJ Bionico <span>Mix</span>
                    </a>
                    <div className="forms-sample">
                      <div className="form-group">
                        <TextFieldComponent
                          className=""
                          id="name"
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
                      <div className="form-group col-13 pass-login">
                        <TextFieldComponent
                          type={showPassword ? "text" : "password"}
                          className=""
                          id="PASS"
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
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <i className="nav-link-icon fa fa-eye mt-2 cursor-pointer" />
                        </div>
                      </div>
                      <div className="mt-3">
                        <button
                          type="submit"
                          className="btn btn-primary mr-2 mb-2 mb-md-0"
                          onClick={handleSubmit}
                        >
                          Login
                        </button>
                      </div>
                      <Link
                        onClick={() =>
                          history.push(constants.ROUTE.LOGIN.FORGOT_PASSWORD)
                        }
                        className="d-block mt-3 text-muted"
                      >
                        Forgot Password
                      </Link>
                    </div>
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

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      callLoginApiAction: callLoginApi,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Login);
