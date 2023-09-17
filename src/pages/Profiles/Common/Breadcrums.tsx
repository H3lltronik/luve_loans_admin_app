import { Breadcrumb } from "antd";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { useNavigate } from "react-router-dom";
import { routesList } from "../../../router/routes";

export const ProfileManageBreadcrumb = () => {
  const navigate = useNavigate();

  const breadcrumb: ItemType[] = [
    {
      title: "Seguridad",
    },
    {
      title: "Perfiles",
      className:
        "cursor-pointer hover:text-blue-500 transition-all duration-300",
      onClick: () => {
        navigate(routesList.profiles.path);
      },
      href: routesList.profiles.path,
    },
    {
      title: "Crear - Editar perfil",
    },
  ];

  return <Breadcrumb style={{ margin: "16px 0" }} items={breadcrumb} />;
};

export const ProfileListBreadcrumb = () => {
  const breadcrumb: ItemType[] = [
    {
      title: "Seguridad",
    },
    {
      title: "Perfiles",
    },
  ];

  return <Breadcrumb style={{ margin: "16px 0" }} items={breadcrumb} />;
};
