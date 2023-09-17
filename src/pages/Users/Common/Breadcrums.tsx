import { Breadcrumb } from "antd";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { useNavigate } from "react-router-dom";
import { routesList } from "../../../router/routes";

export const UsersManageBreadcrumb = () => {
  const navigate = useNavigate();

  const usersManageBreadcrumb: ItemType[] = [
    {
      title: "Seguridad",
    },
    {
      title: "Usuarios",
      className:
        "cursor-pointer hover:text-blue-500 transition-all duration-300",
      onClick: () => {
        navigate(routesList.users.path);
      },
      href: routesList.users.path,
    },
    {
      title: "Crear - Editar usuario",
    },
  ];
  return (
    <Breadcrumb style={{ margin: "16px 0" }} items={usersManageBreadcrumb} />
  );
};

export const UsersListBreadcrumb = () => {
  const usersListBreadcrumb: ItemType[] = [
    {
      title: "Seguridad",
    },
    {
      title: "Usuarios",
    },
  ];
  return (
    <Breadcrumb style={{ margin: "16px 0" }} items={usersListBreadcrumb} />
  );
};
