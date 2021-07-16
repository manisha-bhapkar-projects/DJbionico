import constants from "../constants";
import Dashboard from "../../pages/Dashboard/Dashboard";
import User from "../../pages/User/User";
import Events from "../../pages/Events/Events";
import Music from "../../pages/Music/Music";
import Inquiry from "../../pages/Inquiry/Inquiry";
import GenericList from "../../pages/GenericList/GenericList";
import AddMusic from "../../pages/Music/AddMusic";
import Album from "../../pages/Album/Album";
import Notification from "../../pages/Notification/Notification";
import SliderImages from "../../pages/SliderImages/SliderImages";
import Radio from "../../pages/Radio/Radio";





export const sideBarRoutes = [
    {
        path: constants.ROUTE.SIDEBAR.DASHBOARD,
        component: Dashboard,
        sidebar: true,
        
    },
  
    {
        path: constants.ROUTE.SIDEBAR.USER,
        component:User,
        sidebar: true,
        
    },
    {
        path: constants.ROUTE.SIDEBAR.EVENTS,
        component: Events,
        sidebar: true,
        
    },
    {
        path: constants.ROUTE.SIDEBAR.MUSIC,
        component: Music,
        sidebar: true,
        
    },
    {
        path: constants.ROUTE.SIDEBAR.GENERIC_LIST,
        component: GenericList,
        sidebar: true,
        
    },
    {
        path: constants.ROUTE.SIDEBAR.INQUIRY,
        component: Inquiry,
        sidebar: true,
        
    },
    {
        path: constants.ROUTE.SIDEBAR.SILDER_IMAGES,
        component: SliderImages,
        sidebar: true,
        
    },
    {
        path: constants.ROUTE.SIDEBAR.NOTIFICATION,
        component: Notification,
        sidebar: true,
        
    },
    {
        path: constants.ROUTE.SIDEBAR.RADIO,
        component: Radio,
        sidebar: true,
        
    },
    {
        path: constants.ROUTE.SIDEBAR.ALBUM,
        component: Album,
        sidebar: true,
        
    },
  
   ]





   export const sidebar = [

    {
        title: 'Dashboard',
        path: constants.ROUTE.SIDEBAR.DASHBOARD,
        icon: "fas fa-tachometer-alt",
        cName: 'nav-item',
        sidebar: true,
        childrens: []
    },
    {
        title: 'User',
        path:constants.ROUTE.SIDEBAR.USER,
        icon: "fas fa-user",
        cName: 'nav-item',
        sidebar: true,
        childrens: []
    },
    {
        title: 'Events',
        path: constants.ROUTE.SIDEBAR.EVENTS,
        icon: "far fa-calendar-alt" ,
        cName: 'nav-item',
        sidebar: true,
        childrens: []
    },
    {
        title: 'Music',
        path: constants.ROUTE.SIDEBAR.MUSIC,
        icon: "fas fa-music",
        cName: 'nav-item',
        sidebar: true,
        childrens: []
    },
    {
        title: 'Generic List',
        path: constants.ROUTE.SIDEBAR.GENERIC_LIST,
        icon: "fas fa-headphones-alt",
        cName: 'nav-item',
        sidebar: true,
        childrens: []
    },

    {
        title: 'Inquiry',
        path: constants.ROUTE.SIDEBAR.INQUIRY,
        icon: "fas fa-clipboard-list",
        cName: 'nav-item',
        sidebar: true,
        childrens: []
    },
    {
        title: 'Slider Images',
        path: constants.ROUTE.SIDEBAR.SILDER_IMAGES,
        icon: "far fa-images",
        cName: 'nav-item',
        sidebar: true,
        childrens: []
    },
    {
        title: 'Notification',
        path: constants.ROUTE.SIDEBAR.NOTIFICATION,
        icon: "fas fa-bell",
        cName: 'nav-item',
        sidebar: true,
        childrens: []
    },
    {
        title: 'Radio',
        path: constants.ROUTE.SIDEBAR.RADIO,
        icon: "fas fa-broadcast-tower",
        cName: 'nav-item',
        sidebar: true,
        childrens: []
    },
    {
        title: 'New Music',
        path: constants.ROUTE.SIDEBAR.ALBUM,
        icon: "fas fa-music",
        cName: 'nav-item',
        sidebar: true,
        childrens: []
    },
];