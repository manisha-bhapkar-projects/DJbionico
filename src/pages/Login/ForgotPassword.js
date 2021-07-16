import React, { useState } from "react";
import constants from "../../utils/constants";
import { useHistory } from "react-router-dom";
import TextFieldComponent from "../../components/TextFieldComponent/TextFieldComponent";
import { CustomeNotification } from "../../components/CustomeNotification/CustomeNotification";
import { validateEmail } from "../../utils/validation";
import { callForgotPasswordApi } from "../../actions/AuthAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import messages from "../../utils/messages";

const ForgotPassword = (props) => {
  const [isEmailError, setEmailError] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();

  const handleSetEmail = (e) => {
    setEmail(e.target.value);
    if (!validateEmail(e.target.value) && e.target.value !== "") {
      setEmailError(messages.LOGIN.ERR_USERNAME_INVALID);
    } else if (e.target.value === "") {
      setEmailError(messages.LOGIN.ERR_USERNAME_MANDATORY);
    } else {
      setEmailError("");
    }
  };

  const handelSendMail = (e) => {
    e.preventDefault();
    if (!validateEmail(email) && email !== "") {
      setEmailError(messages.LOGIN.ERR_USERNAME_INVALID);
      CustomeNotification(
        "error",
        messages.LOGIN.ERR_USERNAME_INVALID,
        "Error",
        2000
      );
    } else if (email === "") {
      setEmailError(messages.LOGIN.ERR_USERNAME_MANDATORY);
      CustomeNotification(
        "error",
        messages.LOGIN.ERR_USERNAME_MANDATORY,
        "Error",
        2000
      );
    }

    props
      .callForgotPasswordApiAction({ email })
      .then((response) => {
        if (response.data.status) {
          CustomeNotification(
            "success",
            response.data.message,
            "Success",
            2000
          );
          history.push(constants.ROUTE.LOGIN.CHANGE_PASSWORD);
        } else {
          CustomeNotification("error", response.data.message, "Error", 2000);
        }
      })
      .catch((err) => {
        if (err.response.status === 500) {
          setEmailError(err.response.data.message);
        }
        CustomeNotification("error", err.response.data.message, "Error", 2000);
      });
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
                    <a href="#" className="noble-ui-logo d-block mb-2">
                      DJ Bionico <span>Mix</span>
                    </a>
                    <div className="forms-sample">
                      <h4 className="my-3">Forgot Password</h4>
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
                          onChange={handleSetEmail}
                          value={email}
                        />
                      </div>
                      <div>
                        <small>(Verification Code Send To Your Email)</small>
                      </div>
                      <div className="mt-3">
                        <button
                          onClick={handelSendMail}
                          type="submit"
                          className="btn btn-primary mr-2 mb-2 mb-md-0"
                        >
                          Submit
                        </button>
                      </div>
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
      callForgotPasswordApiAction: callForgotPasswordApi,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(ForgotPassword);
