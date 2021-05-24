import DownloadRecords from "../pages/download_records/DownloadRecords";
import Scored from "../pages/user/scored/Scored";
import UserMessage from "../pages/user/message/UserMessage";
import SoftwareAdmin from "../pages/software-admin/SoftwareAdmin";
import UserAdmin from "../pages/userAdmin/UserAdmin";
import Recommend from "../pages/recommend/Recommend";

const routesConfig = [
  {
    type: 1,
    paths: [
      {
        path: "/userCenter/message",
        component: UserMessage,
      },
    ],
  },
  {
    type: 2,
    paths: [
      {
        path: "/downloadRecords",
        component: DownloadRecords,
      },
      {
        path: "/softwareAdmin",
        component: SoftwareAdmin,
      },
      {
        path: "/userAdmin",
        component: UserAdmin,
      },
      {
        path: "/userCenter/message",
        component: UserMessage,
      },
      {
        path: "/userCenter/scored",
        component: Scored,
      },
      {
        path: "/recommend/:id",
        component: Recommend,
      },
    ],
  },
  {
    type: 3,
    paths: [
      {
        path: "/downloadRecords",
        component: DownloadRecords,
      },
      {
        path: "/userCenter/message",
        component: UserMessage,
      },
      {
        path: "/userCenter/scored",
        component: Scored,
      },
      {
        path: "/recommend/:id",
        component: Recommend,
      },
    ],
  },
  {
    type: 4,
    paths: [
      {
        path: "/downloadRecords",
        component: DownloadRecords,
      },
      {
        path: "/softwareAdmin",
        component: SoftwareAdmin,
      },
      {
        path: "/userCenter/message",
        component: UserMessage,
      },
      {
        path: "/userCenter/scored",
        component: Scored,
      },
      {
        path: "/recommend/:id",
        component: Recommend,
      },
    ],
  },
];
export { routesConfig };
