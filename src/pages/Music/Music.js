import React, { useState, useEffect } from "react";
import constants from "../../utils/constants";
import { useHistory, Link } from "react-router-dom";
import CardListTable from "../../components/CardListTable/CardListTable";
import MusicList from "../../components/DummyTable/DummyTable";
import { Trash } from "react-feather";
import Modal from "../../components/Modal/Modal";
import { Edit3 } from "react-feather";
import { callMusicListAPI, callDeleteSongApi } from "../../actions/MusicAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import TableHeader from "../../components/TableHeader/TableHeader";
import { CustomeNotification } from "../../components/CustomeNotification/CustomeNotification";

const Music = (props) => {
  const history = useHistory();
  const [count, setCount] = useState(2);
  const [limit, setlimit] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [usersData, setUserData] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isUserSearch, setUserSearch] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setloading] = useState(false);

  const openModal = (e) => {
    setShowModal(true);
  };

  useEffect(() => {
    getMusicList(pageNumber, limit, search);
  }, []);

  const getMusicList = (page = 1, limit = 10, search = "") => {
    setloading(true);
    props
      .callMusicListAPIAction(page, limit, search)
      .then((response) => {
        setCount(response.data.result.count);
        console.log("Music List", response);
        setUserData(response.data.result.finalres);
        setloading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handelSerach = (e) => {
    setSearch(e.target.value);
    setPageNumber(1);
    getMusicList(1, limit, e.target.value);
  };

  const handlePageChange = (perPage, page) => {
    setPageNumber(perPage);
    getMusicList(perPage, limit, search);
  };
  const handleDropdownChange = (e) => {
    setlimit(e.target.value);
    setPageNumber(1);
    getMusicList(1, e.target.value, search);
  };

  const DeleteSong = (id) => {
    props.callDeleteSongApiAction(id).then((response) => {
      console.log("Delete song", response);
      if (response.data.status) {
        CustomeNotification("error", "Music Deleted ", "Error", 2000);
      }
      getMusicList(pageNumber, limit, search);
    });
  };

  const Musiccolumns = [
    {
      name: "No.",
      selector: "song_id",
      grow: "1",
    },
    {
      name: "SONG NAME",
      selector: "song_name",
      grow: "3",
    },
    {
      name: "SINGER NAME",
      selector: "author_name",
      grow: "3",
    },
    {
      name: "SONG",
      selector: "song_url",
      right: false,
      grow: "5",
      cell: (row) => {
        return (
          <audio
            className="audio"
            preload="none"
            controls
            controlsList="nodownload"
          >
            <source
              type="audio/mpeg"
              codecs="mp3"
              src={row.song_url}></source>
          </audio>
        );
      },
    },

    {
      name: "IS PRIME",
      selector: "is_premium",
      right: false,
      grow: "1",
      cell: (row) => {
        return <>{row.is_premium == "0" ? "No" : "Yes"}</>;
      },
    },
    {
      name: "ACTION",
      selector: "",
      right: false,
      grow: "1",
      cell: (row) => {
        return (
          <>
            <Link class="trash-custom-icon">
              <Trash onClick={(key) => DeleteSong(row.song_id)} />
            </Link>
            <Link
              class="edit-custom-icon"
              onClick={() => {
                history.push(
                  `${constants.ROUTE.MUSIC.EDIT_MUSIC}${row.song_id}`
                );
              }}
            >
              <Edit3 />
            </Link>
          </>
        );
      },
    },
  ];
  return (
    <div>
      <div className="row"></div>
      <div className="col-md-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="card-title mb-0">Music List</h6>
              <button
                className="btn btn-primary btn-icon-text mb-2 mb-md-0"
                onClick={() => {
                  history.push(constants.ROUTE.MUSIC.ADD_MUSIC);
                }}
              >
                Add Music
              </button>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <div className="form-group d-flex align-items-center  col-sm-4 ">
                <label>Show</label>
                <select
                  name="name"
                  value={limit}
                  className="form-control mr-3 ml-3 "
                  // onChange={(e) => { setlimit(e.target.value) }}
                  onChange={handleDropdownChange}
                >
                  <option value="10" selected>
                    10
                  </option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value={count}>All</option>
                </select>
                <span className="form-group d-flex align-items-center">
                  entries
                </span>
              </div>
              <div className="form-group">
                <TableHeader
                  search={search}
                  placeholder="Search By Song Name"
                  handelSearch={handelSerach}
                />
              </div>
            </div>
            <div className="table-responsive">
              <CardListTable
                columns={Musiccolumns}
                data={usersData}
                pending={loading}
                pagination={false}
                custompagination
                paginationServer={false}
                noDataString={"No data found"}
                totalListCount={count}
                pageNumber={pageNumber}
                // paginationTotalRows={count}
                paginationPerPage={limit}
                onPageChangedCalled={handlePageChange}
                inputClassName="mt-3"
                // sortFunction={customSort}
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
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      callMusicListAPIAction: callMusicListAPI,
      callDeleteSongApiAction: callDeleteSongApi,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Music);

// import React, { useState, useEffect } from "react";

// const useAudio = url => {
//   const [audio] = useState(new Audio(url));
//   const [playing, setPlaying] = useState(false);

//   const toggle = () => setPlaying(!playing);

//   useEffect(() => {
//       playing ? audio.play() : audio.pause();
//     },
//     [playing]
//   );

//   useEffect(() => {
//     audio.addEventListener('ended', () => setPlaying(false));
//     return () => {
//       audio.removeEventListener('ended', () => setPlaying(false));
//     };
//   }, []);

//   return [playing, toggle];
// };
// const Player = ({ url }) => {
//   const [playing, toggle] = useAudio(url);

//   return (
//     <div>
//       <button onClick={toggle}>{playing ? "Pause" : "Play"}</button>
//     </div>
//   );
// };

// export default Player;
