import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextFieldComponent from "../../components/TextFieldComponent/TextFieldComponent";
// import { Link } from '@material-ui/core';
import { useHistory, Link } from "react-router-dom";

import constants from '../../utils/constants';
import { callAddSliderImageApi } from '../../actions/SliderImagesAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { callUploadImage } from '../../actions/SliderImagesAction';
import { CustomeNotification } from "../../components/CustomeNotification/CustomeNotification";
import "react-sweet-progress/lib/style.css";
import { Progress } from 'react-sweet-progress';
import Loader from "react-loader-spinner";

const AddSliderImages = props => {
  const [isNameError, setNameError] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  const [isFileError, setFileError] = useState("");
  const [fileObj, setFileObj] = useState([]);
  const [fileArr, setFileArr] = useState([]);
  const hiddenFileInput = React.useRef(null);
  // const [sliderImage, setImage] = useState('');
  const [image1, setImage1] = useState("");
  const [image, setImage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      setFileError("Please Select File");
      return true;
    }
    props.callAddSliderImageApiAction({image:file})
      .then(res => {
        console.log("add slider images", res);
        setImage(res.data.image ? res.data.image : '');
        if(res.data.status){
          CustomeNotification(
            "success",
            "Image Uploaded Successfully",
            "Success", 2000);
          props.history.push(constants.ROUTE.SIDEBAR.SILDER_IMAGES);
        }

      })
      .catch((error) => {
        console.log(error);
      });
  }


  const handleClickFile = event => {
    hiddenFileInput.current.click();
    console.log("file");
    
  };
  // const handleChangeImage = event => {
  //     const fileUploaded = event.target.files[0].name;
  //     setImage(fileUploaded);
  // };
  const handleChangeImage = event => {
    const fileUploaded = event.target.files[0].name;
    setImage1(fileUploaded);
    setFileError("");
    setIsLoading(true);

    const data = new FormData();
    data.append("profile", event.target.files[0]);
    props
      .callUploadImageAction(data)
      .then((res) => {
        console.log("upload image", res);
        setFile(res.data.result.length ? res.data.result : "");
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setUploadPercentage(0);

      });
  };

  return (
    <div>
      <nav className="page-breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link 
             to={constants.ROUTE.SIDEBAR.SILDER_IMAGES}>
              Slider Images
              </Link>
          </li>
          <li className="breadcrumb-item active" 
              aria-current="page">
               Add Images
            </li>
        </ol>
      </nav>
      <div className="row">
        <div className="col-md-12 stretch-card">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title">
                Add New Images
                </h6>
              <form className="cmxform" 
              id="signupForm" 
              method="get" 
              noValidate="novalidate">
                <fieldset>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <div className="form-group">
                          <label>Image Upload</label>
                          <input
                            type="file"
                            name="img[]"
                            className="file-upload-default"
                            accept=".jpg, .jpeg, .png"
                            ref={hiddenFileInput}
                            onChange={handleChangeImage}
                            style={{ display: 'none' }} />
                          <div className="input-group col-xs-12">
                            <input
                              type="text"
                              className="form-control file-upload-info"
                              // disabled
                              value={image1}
                              placeholder="Upload Image"
                            />
                            <span className="input-group-append">
                              <button
                                onClick={handleClickFile}
                                className="file-upload-browse btn btn-primary"
                                type="button">
                                  Upload
                                  </button>
                            </span>
                          </div>
                          <div className="errormsg">
                            {isFileError ? isFileError : null}
                            </div>
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
                    {/* <div className="col-sm-12"> */}
                    {/* <fieldset className="form-group">
                        <input 
                        className="btn btn-primary mt-4" 
                        type="button" 
                        defaultValue="Upload Multiple Images"
                        onClick={handleClick} />
                        <input
                          type="file"
                          id="files"
                          name="files"
                          style={{ display: 'none' }}
                          ref={hiddenFileInput}
                          onChange={handleChange}
                          className="form-control" 
                          multiple="mutliple"
                          />
                      </fieldset> */}
                    {/* <div className="upload-img">
                        <img className="img-sm" src={file}></img>
                     
                      </div>
                    </div>
                    <div className="errormsg">{isFileError ? isFileError : null}</div> */}

                  </div>
                  <input
                    className="btn btn-primary mt-4"
                    type="submit"
                    defaultValue="Submit"
                    onClick={handleSubmit}
                    disabled={uploadPercentage !== 0}  />
                </fieldset>
              </form>
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
      callAddSliderImageApiAction: callAddSliderImageApi,
      callUploadImageAction: callUploadImage

    },
    dispatch,
  );

export default connect(null, mapDispatchToProps)(AddSliderImages);












































































