import { EditOutlined, OrderedListOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import React, { useEffect, useState } from "react"; // Import useEffect
import { useLocation, useNavigate } from "react-router-dom";
import { routesList } from "../../../router/routes";

export const ProfilesHeader: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [current, setCurrent] = useState(location.pathname);

  useEffect(() => {
    // Update the current state whenever the pathname changes
    setCurrent(location.pathname);
  }, [location.pathname]); // Dependency array to listen for changes in pathname

  const items: MenuProps["items"] = [
    {
      label: "Listado de perfiles",
      key: routesList.profiles.path,
      icon: <OrderedListOutlined />,
      onClick: () => {
        navigate(routesList.profiles.path);
      },
    },
    {
      label: "Crear perfil",
      key: routesList.profilesManage.path,
      icon: <EditOutlined />,
      onClick: () => {
        navigate(routesList.profilesManage.path);
      },
    },
  ];

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};
