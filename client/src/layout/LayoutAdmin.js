import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Layout } from "antd";
import useAuth from "../hooks/useAuth";
import MenuTop from "../components/Admin/MenuTop/MenuTop";
import MenuSidebar from "../components/Admin/MenuSidebar/MenuSidebar";
import AdminSignIn from "../pages/admin/SignIn/SignIn";

import "./LayoutAdmin.scss";

export default function LayoutAdmin(props) {
  const { routes } = props;
  const [menuCollapsed, setMenuCollapsed] = useState(false);
  const { Header, Content, Footer } = Layout;
  const { user, isLoading } = useAuth(); //isLoading el usuario no esta logueado
  
  if (!user && !isLoading) {
    return (
      <>
        <Route path="/admin/login" component={AdminSignIn} />;
        <Redirect to="/admin/login" />;
      </>
    );
  }
  if (user && !isLoading) {
    return (
      <Layout>
        <MenuSidebar menuCollapsed={menuCollapsed} />
        <Layout
          className="Layout-admin"
          style={{ marginLeft: menuCollapsed ? "80px" : "200px" }}
        >
          <Header className="Layout-admin__header">
            <MenuTop
              menuCollapsed={menuCollapsed}
              setMenuCollapsed={setMenuCollapsed}
            />
          </Header>
          <Content className="Layout-admin__content">
            <LoadRoutes routes={routes} />
          </Content>
          <Footer className="Layout-admin__footer">
            Miguel Angel Quintero Giraldo - Lastra
          </Footer>
        </Layout>
      </Layout>
    );
  }
  return null;
}

function LoadRoutes({ routes }) {
  return (
    <Switch>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
    </Switch>
  );
}
