const userType = (type) => {
  switch (type) {
    case 0: {
      return "游客";
    }
    case 1: {
      return "普通用户";
    }
    case 2: {
      return "开发者";
    }
    case 3: {
      return "管理员";
    }
    default: {
      return "未知";
    }
  }
};
export { userType };
