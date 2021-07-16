const API_URL = process.env.REACT_APP_API_URL;
export default {
  API: {
    BASEURL: {
      URL: API_URL,
    },
    LOGIN: {
      SIGNUP: '/admin/auth/login',
      LOGOUT: '/admin/auth/logout',
      REFRESH_TOKEN: '/admin/auth/token',
      FORGOTPASSWORD_EMAIL: '/admin/auth/forgetpass/sentotp',
      CHANGE_PASSWORD: '/admin/auth/forgetpass',
    },
    DASHBOARD: {
      GET: '/admin/common/dashboard',
    },
    USER: {
      GET: '/admin/user',
      STATUS_CHANGE: '/admin/user/changestatus/'
    },
    MUSIC: {
      GET: '/admin/song',
      POST: '/admin/song/add',
      DELETE: '/admin/song/delete/',
      EDIT:'/admin/song/edit/',
      DETAILS:'/admin/song/details/'
    },
    UPLOAD: {
      UPLOAD_SONG: '/admin/common/upload/song',
      UPLOAD_IMAGE: '/admin/common/upload'
    },
    GENERIC_LIST: {
      GET: '/admin/genric',
      POST: '/admin/genric/add',
      EDIT: '/admin/genric/edit/',
      DELETE: '/admin/genric/delete/',
      DETAILS: '/admin/genric/details/'

    },
    INQUIRY_LIST: {
      GET: '/admin/common/contact',
    },
    EVENT_LIST: {
      GET: '/admin/event/',
      POST:'/admin/event/add',
      EDIT: '/admin/event/edit/',
      DELETE:'/admin/event/delete/',
      DETAILS:'/admin/event/details'
    },
    NOTIFICATION:{
      GET:"/admin/notification/",
      POST:"/admin/notification/add",
      DELETE:"/admin/notification/delete/"
    },
    ALBUM:{
      GET:"/admin/album/",
      POST:"/admin/album/add",
      DELETE:"/admin/album/delete/",
      EDIT:"/admin/album/edit/",
      DETAILS:"/admin/album/details"
    },
    DJ:{
      GET:"/admin/genric/list"
      },
      SLIDER_IMAGES:{
      POST:"/admin/splashscreen/add",
      GET:"/admin/splashscreen/",
      DELETE:"/admin/splashscreen/delete/"
      },
      RADIO:{
        GET:"/admin/radio",
        UPDATE:"/admin/radio/update/",
      }
    


  },

  STORAGE: {
    AUTH: {
      TOKEN: "auth-token",
      REF_TOKEN: "refresh-token",
      ADMIN_DATA: "admin-data",
    },
  },
  ROUTE: {
    LOGIN: {
      LOGIN: "/",
      FORGOT_PASSWORD: "/forgotPassword",
      CHANGE_PASSWORD: "/changePassword",

    },
    SIDEBAR: {
      DASHBOARD: "/dashboard",
      USER: "/user",
      EVENTS: "/events",
      MUSIC: "/music",
      GENERIC_LIST: '/generic-list',
      INQUIRY: "/inquiry",
      SILDER_IMAGES:"/slider-images",
      NOTIFICATION:"/notification",
      RADIO:"/radio",
      ALBUM:"/album"
    },
    GENERIC_LIST: {
      ADD_MUSIC: "/generic-list/add-generic-music",
      EDIT_MUSIC: "/generic-list/edit-generic-music/",
      EDIT_MUSIC_BY_ID: "/generic-list/edit-generic-music/:id",
      VIEW: "/generic-list/generic-details/",
      VIEW_BY_ID:"/generic-list/generic-details/:id"
    },
    EVENTS: {
      ADD_EVENTS: "/events/add-events",
      EDIT_EVENTS: "/events/edit-events/",
      EDIT_EVENTS_BY_ID:"/events/edit-events/:id",
      VIEW:"/events/event-details/",
      VIEW_BY_ID:"/events/event-details/:id"
    },
    MUSIC: {
      ADD_MUSIC: "/music/add-music",
      EDIT_MUSIC: "/music/edit-music/",
      EDIT_MUSIC_BY_ID:"/music/edit-music/:id"
    },
    NOTIFICATION:{
      ADD_NOTIFICATION:"/notification/add-notification"
    },
    ALBUM:{
      ADD_ALBUM:"/album/add-album",
      EDIT_ALBUM: "/album/edit-album/",
      EDIT_ALBUM_BY_ID:"/album/edit-album/:id",
      DETAILS:"/album/album-details/",
      DETAILS_BY_ID:"/album/album-details/:id"

    },
    SLIDER_IMAGES:{
      ADD_SILDER_IMAGES:'/slider-images/add-slider-images'
    },


  },
};


