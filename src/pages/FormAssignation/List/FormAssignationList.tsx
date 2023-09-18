import { Button, Layout } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { FormAssignationAPI } from "../../../api";
import { AdminDataTable } from "../../../components/Common/AdminDataTable";
import { AppLoader } from "../../../components/Common/AppLoader";
import { routesList } from "../../../router/routes";
import { FormAssignationListBreadcrumb } from "../Common/Breadcrums";
import FormAssignationsFilters from "./FormAssignationFilters";
import { formAssignationListColumns } from "./formAssignationTableColumn";

const { Content } = Layout;

export const FormAssignationsList: React.FC = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pageLoading, setPageLoading] = React.useState<boolean>(false);

  const fetchData = (params: object) =>
    FormAssignationAPI.getFormAssignations(params);

  const doDelete = async (id: string | number) => {
    return FormAssignationAPI.deleteFormAssignation(id as string);
  };

  const doEdit = async (id: string | number) => {
    navigate(`${routesList.formAssignationsManage.path}/${id}`);
  };

  return (
    <>
      <Content style={{ margin: "0 16px" }}>
        <div className="flex justify-between items-center">
          <FormAssignationListBreadcrumb />

          <Button
            onClick={() => navigate(routesList.formAssignationsManage.path)}
            className="bg-red-600 text-white hover:bg-green-50"
            type="default">
            Nuevo Proceso
          </Button>
        </div>
        <div className="p-[24px] bg-white">
          <FormAssignationsFilters />

          <section className="mx-auto">
            <AdminDataTable
              queryKey="formAssignations"
              fetchData={fetchData}
              columns={formAssignationListColumns}
              deleteAction={doDelete}
              editAction={doEdit}
            />
          </section>
        </div>

        <AppLoader isLoading={pageLoading} />
      </Content>
    </>
  );
};
