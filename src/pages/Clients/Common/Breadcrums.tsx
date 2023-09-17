import { Breadcrumb } from "antd";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { useNavigate } from "react-router-dom";
import { routesList } from "../../../router/routes";

export const ClientManageBreadcrumb = () => {
  const navigate = useNavigate();

  const breadcrumb: ItemType[] = [
    {
      title: "Tramites",
    },
    {
      title: "Clientes",
      className:
        "cursor-pointer hover:text-blue-500 transition-all duration-300",
      onClick: () => {
        navigate(routesList.clients.path);
      },
      href: routesList.clients.path,
    },
    {
      title: "Crear - Editar cliente",
    },
  ];

  return <Breadcrumb style={{ margin: "16px 0" }} items={breadcrumb} />;
};

export const ClientListBreadcrumb = () => {
  const breadcrumb: ItemType[] = [
    {
      title: "Tramites",
    },
    {
      title: "Clientes",
    },
  ];

  return <Breadcrumb style={{ margin: "16px 0" }} items={breadcrumb} />;
};
