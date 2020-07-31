import React from "react";
import { Layout, Tabs } from "antd";
import { Redirect } from "react-router-dom";
import Logo from "../../../assets/img/png/logo.png";
import RegisterForm from "../../../components/Admin/RegisterForm";
import LoginForm from "../../../components/Admin/LoginForm";
import { getAccesTokenApi } from "../../../api/auth";

import "./SingIn.scss";

export default function SignIn() {
  const { Content } = Layout;
  const { TabPane } = Tabs;
  if (getAccesTokenApi()) {
    return <Redirect to="/admin" />;
  }
  return (
    <Layout className="sign-in">
      <Content className="sign-in__content">
        <h1 className="sign-in__content-logo">
          <img src={Logo} alt="Representaciones Lastra" />
        </h1>
        <div className="sign-in__content-tabs">
          <Tabs type="card">
            <TabPane className="tabPane" tab={<span>Entrar</span>} key="1">
              <LoginForm />
            </TabPane>
            <TabPane tab={<span>Nuevo Usuario</span>} key="2">
              <RegisterForm />
            </TabPane>
          </Tabs>
        </div>
      </Content>

      <span className="_info">Desarrollado por Miguel Angel Quintero </span>
      <span className="_info">
        Contacto: 3154794493 Correo: mquinter90@gmail.com
      </span>
    </Layout>
  );
}
