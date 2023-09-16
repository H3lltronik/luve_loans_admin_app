import { Layout } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/logo_luve.svg";
import { routesList } from "../router/routes";
import { DefaultHeader } from "./DefaultHeader";
import { DefaultLayoutContent } from "./DefaultLayoutContent";
import { AdminMenu } from "./Menu";

const { Footer, Sider } = Layout;

interface HeaderProps {
  navContent?: React.ReactNode;
  children?: React.ReactNode;
  headerTitle?: string;
}

export const DefaultLayout: React.FC<HeaderProps> = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const { navContent, headerTitle } = props;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        width={256}
        className="shadow-lg"
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}>
        <div className="py-1 bg-white">
          <Link to={routesList.admin.path}>
            <div
              className="demo-logo-vertical"
              style={{ backgroundImage: `url(${logo})` }}
            />
          </Link>
        </div>
        <AdminMenu />
      </Sider>
      <Layout>
        <DefaultHeader
          navContent={navContent}
          title={headerTitle ?? "Luve CI"}
        />
        {/* <Outlet /> */}
        <ToastContainer />

        <DefaultLayoutContent children={props.children} />

        <Footer style={{ textAlign: "center" }} />
      </Layout>
    </Layout>
  );
};
