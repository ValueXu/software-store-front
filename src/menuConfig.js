import {
  FcComments,
  FcDownload,
  FcHome,
  FcList,
  FcManager,
  FcPodiumWithAudience,
  FcSettings,
  // FcSteam,
  FcTemplate,
} from "react-icons/fc";

import { IoGameController } from 'react-icons/io5'

import { AppstoreFilled, UserOutlined } from "@ant-design/icons";

const MenuConfig = [
  {
    title: "首页",
    content: "欢迎来到本系统的主页",
    path: "/homepage",
    icon: <FcHome />,
    child: [],
    userType: [0, 1, 2],
  },
  {
    title: "软件中心",
    content: "",
    path: "/softwares",
    // icon: <FcOrgUnit style={{ marginRight: "0.68rem" }} />,
    icon: <AppstoreFilled />,
    child: [
      {
        title: "游戏",
        content: "MOBA、角色扮演、动作、冒险、策略，应有尽有",
        path: "/softwares/games",
        icon: <IoGameController />,
        userType: [0, 1, 2],
      },
      {
        title: "软件",
        content: "寻找你心爱的工具或者办公应用吧",
        path: "/softwares/software",
        icon: <FcTemplate />,
        userType: [0, 1, 2],
      },
      {
        title: "其他",
        content: "其他类型的软件",
        path: "/softwares/others",
        icon: <FcList />,
        userType: [0, 1, 2],
      },
    ],
    userType: [0, 1, 2],
  },
  {
    title: "下载记录",
    content: "这里是你的时光机",
    path: "/downloadRecords",
    child: [],
    icon: <FcDownload />,
    userType: [0, 1, 2],
  },
  {
    title: "软件管理",
    content: "管理您的软件",
    path: "/softwareAdmin",
    child: [],
    icon: <FcSettings />,
    userType: [0, 1, 2],
  },
  {
    title: "用户管理",
    content: "管理用户的界面",
    path: "/userAdmin",
    icon: <FcPodiumWithAudience />,
    child: [],
    userType: [0, 1, 2],
  },
  {
    title: "个人中心",
    content: "",
    path: "/userCenter",
    icon: <UserOutlined />,
    child: [
      {
        title: "个人资料",
        content: "查看与修改您的帅照",
        path: "/userCenter/message",
        icon: <FcManager />,
        userType: [0, 1, 2],
      },
      {
        title: "已打评分",
        content: "5星好评，分批付款",
        path: "/userCenter/scored",
        icon: <FcComments />,
        userType: [0, 1, 2],
      },
    ],
    userType: [0, 1, 2],
  },
];
export default MenuConfig;
