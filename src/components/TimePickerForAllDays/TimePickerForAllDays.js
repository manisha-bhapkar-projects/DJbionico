import React from "react";
import PropTypes from "prop-types";
// import "./TimePickerForAllDays.css";
import moment from "moment";

import TimePicker from "rc-time-picker";
import Checkbox from "../Checkbox/Checkbox";

const format = "hh:mm a";

const TimePickerForAllDays = ({
  id,
  label,
  className,
  labelClassName,
  inputClassName,
  error,
  helperText,
  helperTextClassName,
  isDisable,
  shopTime,
  handleEndTime,
  handleStartTime,
  handleCheck,
  ...rest
}) => {
  return (
    <div className={`time-field-component ${className}`}>
      {label ? (
        <label
          htmlFor={id}
          className={
            !error
              ? `input-label ${labelClassName}`
              : `input-label  error ${labelClassName}`
          }
        >
          {label}
        </label>
      ) : (
        ""
      )}
      <div
        id={id}
        className={
          !error
            ? `form-controls  ${inputClassName}`
            : `form-controls  error ${inputClassName}`
        }
        disabled={isDisable}
        autoComplete="off"
        {...rest}
      >
        {shopTime.length ? (
          shopTime.map((x) => {
            return (
              <div className="my-2 row" key={x.id}>
                <div className="time-day align-self-center ml-5">
                  <div className="custom-row">
                    <Checkbox
                      id="pre-requisite-check"
                      checked={x.select}
                      onClick={() => handleCheck(x.id)}
                      disabled={isDisable}
                    />
                    <div className="heading ml-2 mt-1">{x.day}</div>
                  </div>
                </div>
                <div className="start-time align-self-center">
                  <TimePicker
                    showSecond={false}
                    defaultValue={moment("12:00 a", format)}
                    className=""
                    name="start"
                    value={
                      x.start_time !== "Closed"
                        ? moment(x.start_time, format)
                        : moment("12:00 a", format)
                    }
                    onChange={(e) => handleStartTime(e, x.id)}
                    format={format}
                    use12Hours
                    inputReadOnly
                    disabled={isDisable ? isDisable : !x.select}
                  />
                </div>
                <div className="time-to align-self-center">TO</div>
                <div className="end-time align-self-center">
                  <TimePicker
                    showSecond={false}
                    // this.state.userdetail.farm.time
                    //   ? this.state.userdetail.farm.time.from
                    //   : "12:00 a",
                    defaultValue={moment("12:00 a", format)}
                    className=""
                    name="start"
                    value={
                      x.end_time !== "Closed"
                        ? moment(x.end_time, format)
                        : moment("12:00 a", format)
                    }
                    onChange={(e) => handleEndTime(e, x.id)}
                    format={format}
                    use12Hours
                    inputReadOnly
                    disabled={isDisable ? isDisable : !x.select}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <h1>Not Found</h1>
        )}
      </div>
      {helperText && error ? (
        <small
          className={
            !error
              ? `${helperTextClassName} helper-text`
              : `${helperTextClassName} helper-text error`
          }
        >
          {helperText}
        </small>
      ) : (
        ""
      )}
    </div>
  );
};

TimePickerForAllDays.propTypes = {
  shopTime: PropTypes.instanceOf(Array),
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  inputClassName: PropTypes.string,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  helperTextClassName: PropTypes.string,
  isDisable: PropTypes.bool,
  handleEndTime: PropTypes.func,
  handleStartTime: PropTypes.func,
  handleCheck: PropTypes.func,
};

TimePickerForAllDays.defaultProps = {
  shopTime: [],
  className: "",
  label: "",
  labelClassName: "",
  inputClassName: "",
  error: false,
  helperText: "",
  helperTextClassName: "",
  isDisable: false,
  handleEndTime: () => {},
  handleStartTime: () => {},
  handleCheck: () => {},
};

export default TimePickerForAllDays;
