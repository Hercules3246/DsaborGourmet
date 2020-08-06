import React from "react";
import { Link } from "react-router-dom";
import { Layout, Icon, Menu } from "antd";
import {
  BookOutlined,
  GoldOutlined,
  RedditOutlined,
  BarChartOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import "./MenuSidebar.scss";
import MenuItem from "antd/lib/menu/MenuItem";

export default function MenuSidebar(props) {
  const { menuCollapsed } = props;
  const { Sider } = Layout;
  return (
    <Sider className="admin-siderbar" collapsed={menuCollapsed}>
      <Menu mode="inline" defaultSelectedKeys={["1"]}>
        <MenuItem className="customclass" key="/admin">
          <Link
            style={{ color: "inherit", textDecoration: "inherit" }}
            to={"/admin"}
          >
            <Icon type="home" />
            <span className="customWord">Home</span>
          </Link>
        </MenuItem>
        <MenuItem className="customclass" key="/admin/users">
          <Link
            style={{ color: "inherit", textDecoration: "inherit" }}
            to={"/admin/users"}
          >
            <Icon type="user" />
            <span className="nac-text">Usuarios</span>
          </Link>
        </MenuItem>
        <MenuItem className="customclass" key="/admin/product">
          <Link
            style={{ color: "inherit", textDecoration: "inherit" }}
            to={"/admin/product"}
          >
            <BookOutlined />
            <span className="nac-text">Producto</span>
          </Link>
        </MenuItem>
        <MenuItem className="customclass" key="/admin/routes">
          <Link
            style={{ color: "inherit", textDecoration: "inherit" }}
            to={"/admin/routes"}
          >
            <GoldOutlined />
            <span className="nac-text">Rutas</span>
          </Link>
        </MenuItem>

        <MenuItem className="customclass" /*key="/admin/product"*/>
          <Link
            style={{ color: "inherit", textDecoration: "inherit" }}
            // to={"/admin/product"}
          >
            <RedditOutlined />
            <span className="nac-text">Cliente</span>
          </Link>
        </MenuItem>

        <MenuItem className="customclass" /*key="/admin/product"*/>
          <Link
            style={{ color: "inherit", textDecoration: "inherit" }}
            // to={"/admin/product"}
          >
            <BarChartOutlined />
            <span className="nac-text">Cargue</span>
          </Link>
        </MenuItem>
        <MenuItem className="customclass" /*key="/admin/product"*/>
          <Link
            style={{ color: "inherit", textDecoration: "inherit" }}
            // to={"/admin/product"}
          >
            <LineChartOutlined />
            <span className="nac-text">Ventas</span>
          </Link>
        </MenuItem>
      </Menu>
    </Sider>
  );
}
