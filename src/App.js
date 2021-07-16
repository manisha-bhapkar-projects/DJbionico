import React, { useState } from "react";
import "./assets/scss/style.css";
import "./assets/vendors/core/core.css";
import "./assets/vendors/bootstrap-datepicker/bootstrap-datepicker.min.css";
import "./assets/css/font-awesome.min.css";
import "./assets/css/iconfont.css";
import "react-notifications/lib/notifications.css";
import './App.css'
import { NotificationContainer } from "react-notifications";
import {
  BrowserRouter as Router,
  Switch, Redirect
} from "react-router-dom";

import PublicRoute from "./utils/routes/PublicRoute/PublicRoute";
import PrivateRoute from "./utils/routes/PrivateRoute/PrivateRoute";
import Layout from "./components/Layout/Layout";
import Login from "./pages/Login/Login";
import { sideBarRoutes } from "./utils/routes/index";
import ForgotPassword from "./pages/Login/ForgotPassword";
import AddMusic from "./pages/Music/AddMusic";
import AddEvents from "./pages/Events/AddEvents";
import AddGenericMusic from "./pages/GenericList/AddGenericMusic";
import ChangePassword from "./pages/Login/ChangePassword";
import EditGenericMusic from "./pages/GenericList/EditGenericMusic";
import GenericDetails from "./pages/GenericList/GenericDetails";
import EditEvents from "./pages/Events/EditEvents";
import EditMusic from "./pages/Music/EditMusic";
import EventDetails from "./pages/Events/EventDetails";
import AddNotification from "./pages/Notification/AddNotification";
import AddAlbum from "./pages/Album/AddAlbum";
import EditAlbum from "./pages/Album/EditAlbum";
import AlbumDetails from "./pages/Album/AlbumDetails";
import AddSliderImages from "./pages/SliderImages/AddSliderImages";
import constants from './utils/constants';
function App() {
  const [isSidebar, setIsSidebar] = useState(false);

  const handleCollapse = (status) => {
    setIsSidebar(!status);
  };
  return (
    <div className="main-wrapper">
      <NotificationContainer />
      <Router basename="/admin">
        <Switch>
          <PublicRoute 
          exact 
          path={constants.ROUTE.LOGIN.LOGIN}
          component={Login} />
          <PublicRoute
            exact
            path={constants.ROUTE.LOGIN.FORGOT_PASSWORD}
            component={ForgotPassword}
          />
          <PublicRoute
            exact
            path={constants.ROUTE.LOGIN.CHANGE_PASSWORD}
            component={ChangePassword}
          />

          <Switch>
            <Layout parentCallback={handleCollapse}>
              <Switch>
                {sideBarRoutes.map((item, index) => {
                  return (
                    <PrivateRoute
                      path={item.path}
                      exact
                      component={item.component}
                      key={index}
                    />
                  );
                })}
                <PrivateRoute
                  exact
                  path={constants.ROUTE.GENERIC_LIST.ADD_MUSIC}
                  component={AddGenericMusic}
                />
                <PrivateRoute
                  exact
                  path={constants.ROUTE.EVENTS.ADD_EVENTS}
                  component={AddEvents}
                />
                <PrivateRoute
                  exact
                  path={constants.ROUTE.MUSIC.ADD_MUSIC}
                  component={AddMusic}
                />
                <PrivateRoute
                  exact
                  path={constants.ROUTE.GENERIC_LIST.EDIT_MUSIC_BY_ID}
                  component={EditGenericMusic}
                />
                <PrivateRoute
                  exact
                  path={constants.ROUTE.GENERIC_LIST.VIEW_BY_ID}
                  component={GenericDetails}
                />
                <PrivateRoute
                  exact
                  path={constants.ROUTE.EVENTS.EDIT_EVENTS_BY_ID}
                  component={EditEvents}
                />
                <PrivateRoute
                  exact
                  path={constants.ROUTE.MUSIC.EDIT_MUSIC_BY_ID}
                  component={EditMusic}
                />
                <PrivateRoute
                  exact
                  path={constants.ROUTE.EVENTS.VIEW_BY_ID}
                  component={EventDetails}
                />
                <PrivateRoute
                  exact
                  path={constants.ROUTE.NOTIFICATION.ADD_NOTIFICATION}
                  component={AddNotification}
                />
                <PrivateRoute
                  exact
                  path={constants.ROUTE.ALBUM.ADD_ALBUM}
                  component={AddAlbum}
                />
                <PrivateRoute
                  exact
                  path={constants.ROUTE.ALBUM.EDIT_ALBUM_BY_ID}
                  component={EditAlbum}
                />
                <PrivateRoute
                  exact
                  path={constants.ROUTE.ALBUM.DETAILS_BY_ID}
                  component={AlbumDetails}
                />
                <PrivateRoute
                  exact
                  path={constants.ROUTE.SLIDER_IMAGES.ADD_SILDER_IMAGES}
                  component={AddSliderImages} />

                <Redirect to={constants.ROUTE.LOGIN.LOGIN} />

              </Switch>

            </Layout>
            <Redirect to={constants.ROUTE.LOGIN.LOGIN} />
          </Switch>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
