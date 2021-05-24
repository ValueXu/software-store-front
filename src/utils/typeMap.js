const userType = (type) => {
  switch (type) {
    case 1: {
      return "游客";
    }
    case 2: {
      return "管理员";
    }
    case 3: {
      return "普通用户";
    }
    case 4: {
      return "开发者";
    }
    default: {
      return "未知";
    }
  }
};
export { userType };
