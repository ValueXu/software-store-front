import {
  FcDownload,
  FcHome,
  FcList,
  FcOrgUnit,
  FcPodiumWithAudience,
  FcPortraitMode,
  FcSettings,
  FcSteam,
  FcTemplate,
} from "react-icons/fc";

const MenuConfig = [
  {
    title: "首页",
    content: "",
    path: "/homepage",
    icon: <FcHome />,
    child: [],
  },
  {
    title: "软件中心",
    content: "",
    path: "/softwares",
    icon: <FcOrgUnit style={{ marginRight: "0.68rem" }} />,
    child: [
      {
        title: "游戏",
        content: "MOBA、角色扮演、动作、冒险、策略，应有尽有",
        path: "/softwares/games",
        icon: <FcSteam />,
      },
      {
        title: "软件",
        content: "寻找你心爱的工具或者办公应用吧",
        path: "/softwares/software",
        icon: <FcTemplate />,
      },
      {
        title: "其他",
        content: "其他类型的软件",
        path: "/softwares/others",
        icon: <FcList />,
      },
    ],
  },
  {
    title: "下载记录",
    content: "",
    path: "/downloadRecords",
    child: [],
    icon: <FcDownload />,
  },
  {
    title: "软件管理",
    content: "",
    path: "/softwareAdmin",
    child: [],
    icon: <FcSettings />,
  },
  {
    title: "用户管理",
    content: "",
    path: "/userAdmin",
    child: [],
    icon: <FcPodiumWithAudience />,
  },
  {
    title: "个人中心",
    content: "",
    path: "/userCenter",
    child: [],
    icon: <FcPortraitMode />,
  },
];
export default MenuConfig;
