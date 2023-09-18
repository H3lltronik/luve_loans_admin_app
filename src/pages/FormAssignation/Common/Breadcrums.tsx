import { Breadcrumb } from "antd";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { useNavigate } from "react-router-dom";
import { routesList } from "../../../router/routes";

export const FormAssignationManageBreadcrumb = () => {
  const navigate = useNavigate();

  const breadcrumb: ItemType[] = [
    {
      title: "Tramites",
    },
    {
      title: "Campos de formularios",
      className:
        "cursor-pointer hover:text-blue-500 transition-all duration-300",
      onClick: () => {
        navigate(routesList.formAssignations.path);
      },
      href: routesList.formAssignations.path,
    },
    {
      title: "Crear - Editar formAssignatione",
    },
  ];

  return <Breadcrumb style={{ margin: "16px 0" }} items={breadcrumb} />;
};

export const FormAssignationListBreadcrumb = () => {
  const breadcrumb: ItemType[] = [
    {
      title: "Tramites",
    },
    {
      title: "Campos de formularios",
    },
  ];

  return <Breadcrumb style={{ margin: "16px 0" }} items={breadcrumb} />;
};
