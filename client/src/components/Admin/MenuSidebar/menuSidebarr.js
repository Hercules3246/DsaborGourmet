import React from "react";
import { Link } from "react-router-dom";
import { Layout, Icon, Menu } from "antd";

import "./MenuSidebar.scss";
import MenuItem from "antd/lib/menu/MenuItem";

export default function MenuSidebar(props) {
  const { menuCollapsed } = props;
  console.log(props);
  return <Sider className="admin-siderbar" collapsed={menuCollapsed}></Sider>;
}
