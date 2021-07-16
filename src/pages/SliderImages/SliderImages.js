import React,{useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import constants from "../../utils/constants";
import { useHistory } from 'react-router-dom';
import CardListTable from "../../components/CardListTable/CardListTable";
import MusicList from "../../components/DummyTable/DummyTable";
import { callSliderImagesListAPI, callDeleteSliderImageApi} from '../../actions/SliderImagesAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TableHeader from "../../components/TableHeader/TableHeader";
import { CustomeNotification } from "../../components/CustomeNotification/CustomeNotification";

const SliderImages = props => {
  const [count, setCount] = useState(2);
  const [limit, setlimit] = useState(10);
  const history = useHistory();
  const [usersData, setUserData] = useState([]);
  const [loading, setloading] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isUserSearch, setUserSearch] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    getSliderImages();
  }, []);

  const getSliderImages = () => {
    setloading(true);
    props.callSliderImagesListAPIAction()
      .then((response) => {
        console.log("slider list",response);
        setUserData(response.data.result)
        setloading(false);

      })
      .catch((error) => {
        console.log(error);
      });
  }
  // id: 1
  // splash_image: "https://djbionicomix.com/api/v1/images/demo.jpeg"
  const handelSerach = (e) => {
    setSearch(e.target.value);
    setPageNumber(1);
    // getSong(1, limit, e.target.value);
  };

  const handlePageChange = (perPage, page) => {
    setPageNumber(perPage);
    // getSong(perPage, limit, search);
  };
  const handleDropdownChange = (e) => {
    setlimit(e.target.value)
    // getSong(pageNumber, e.target.value, search);
  };
  const DeleteSliderImage = (id) => {
    props.callDeleteSliderImageApiAction(id)
      .then((response) => {
        console.log('Delete image', response);
        if (response.data.status) {
          CustomeNotification("error", "Image Deleted ", "Error", 2000);
          }
          getSliderImages();
      }).catch((err) => {
        console.log(err);
      });
  };

  const Musiccolumns = [
    {
      name: "No.",
      selector: "id",
      // sortable: true,
      grow: "1",
      cell: (row) => {
        return <div className="custome-row-style">{row.id}</div>;
      },
    },
  
    
    {
      name: "IMAGE",
      selector: "",
      // sortable: true,
      right: false,
      grow: "4",
      cell: (row) => {
        return (
          // console.log('rrr',row),
          <>
            <img className="img-thumbnail"
            src={row.splash_image}
            // src={`http://34.202.173.112/dj-flako-php-laravel/storage/uploads/${row.splash_image}`}
            alt="banner"  />
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
            <a href="#" className="trash-custom-icon">
              <i class="fas fa-trash"
              onClick={(key) =>  DeleteSliderImage(row.id)}
              ></i>
            </a>
            {/* <a  className="edit-custom-icon">
              <i class="far fa-edit"
                onClick={() => {
                  history.push(`${constants.ROUTE.MUSIC.EDIT_MUSIC}${row.song_id}`);
                }}></i>
            </a> */}
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
              <h6 className="card-title mb-0">Slider Images</h6>
              <button className="btn btn-primary btn-icon-text mb-2 mb-md-0"
                onClick={() => {
                  history.push(constants.ROUTE.SLIDER_IMAGES.ADD_SILDER_IMAGES)
                }} >Add Images</button>
            </div>
            {/* <div className="d-flex justify-content-between align-items-center">
              <div className="form-group d-flex align-items-center  col-sm-4 ">
                <label>Show</label>
                <select
                  name="name"
                  value={limit}
                  className="form-control mr-3 ml-3 "
                  onChange={handleDropdownChange}>
                  <option value="10" selected>10</option>
                  <option value="30">20</option>
                  <option value="50">50</option>
                  <option value={count}>All</option>
                </select>
                <span className="form-group d-flex align-items-center">entries</span>
              </div>
              <div className="form-group">
              <TableHeader
                  search={search}
                  handelSearch={handelSerach}
                />
              </div>
            </div> */}
            <div className="table-responsive">
              <CardListTable
                columns={Musiccolumns}
                data={usersData}
                pending={loading}
                // pagination={false}
                // custompagination
                // paginationServer={false}
                // noDataString={"No data found"}
                // totalListCount={count}
                // paginationTotalRows={count}
                // paginationPerPage={limit}
                // onPageChangedCalled={handlePageChange}
                // inputClassName="mt-3"
              // sortFunction={customSort}
              />
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
      callSliderImagesListAPIAction: callSliderImagesListAPI,
      callDeleteSliderImageApiAction: callDeleteSliderImageApi
    },
    dispatch,
  );

export default connect(null, mapDispatchToProps)(SliderImages);











































































// import React, { useEffect, useState } from 'react';
// import Slider from "react-slick";
// import { callSliderImagesAPI } from '../../actions/SliderImagesAction';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import constants from "../../utils/constants";
// import { useHistory, Link } from 'react-router-dom';
// const SliderImages = (props) => {
//   const history = useHistory();
//   const [images, setImages] = useState([]);


//   useEffect(() => {
//     sliderImages();
//   }, []);

//   const sliderImages = () => {
//     props.callSliderImagesAPIAction()
//       .then((response) => {
//         console.log("slider images LIST", response);
//         setImages(response.data.data)

//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     fade: true,
//     arrows: true,
//     className: 'slider',
   

//   };
//   return (
//     <div >
//         <div className="row">
//   <div className="col-md-12 grid-margin stretch-card">
//     <div className="card">
//       <div className="card-body">
//         <div className="d-flex justify-content-between align-items-center mb-3">
//           <h6 className="card-title mb-0">Slider Images</h6>
//           <button 
//           className="btn btn-primary btn-icon-text mb-2 mb-md-0" 
//           onClick={() => {
//             history.push(constants.ROUTE.SLIDER_IMAGES.ADD_SILDER_IMAGES)
//           }}
//          >Add Images</button>
//         </div>
//         </div>
//       <Slider {...settings}>
//         <div>
//               {images &&
//               images.map((item) => (
//                 <>
//                   <img className="slider-images"
//                   src={`http://34.202.173.112/dj-flako-php-laravel/api/admin/slider-images${item.image}`}
//                   //  src={item.image}
//                   // (`/api/v1/admin/song/details/${id}`)
//                   //  src=`${constants.API.BASEURL.URL}/slider-images${item.image}`}
//                     />
//                 </>
//               ))
//             } 
//         </div>
//         {/* `${constants.BASE_URL.API}/images/${row.profile_pic}` */}
//         {/* <div>
//           <img className="slider-images"
//             src="http://34.202.173.112/dj-flako-php-laravel/storage/uploads/photo14860919927884419163b0b28_1603178702.jpeg" />
//         </div>
//         <div>
//           <img className="slider-images"
//             src="http://34.202.173.112/dj-flako-php-laravel/storage/uploads/photo14860919927884419163b0b28_1603178702.jpeg" />
//         </div>
//         <div>
//           <img className="slider-images"
//             src="http://34.202.173.112/dj-flako-php-laravel/storage/uploads/photo14860919927884419163b0b28_1603178702.jpeg" />
//         </div> */}
//       </Slider>

//         </div>
        
//         </div>
//         </div>

//     </div>

//   );
// };

// const mapDispatchToProps = dispatch =>
//   bindActionCreators(
//     {
//       callSliderImagesAPIAction: callSliderImagesAPI,
//     },
//     dispatch,
//   );

// export default connect(null, mapDispatchToProps)(SliderImages);