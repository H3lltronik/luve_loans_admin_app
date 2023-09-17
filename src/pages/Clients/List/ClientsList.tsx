import { Button, Layout } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ClientAPI } from "../../../api";
import { AdminDataTable } from "../../../components/Common/AdminDataTable";
import { AppLoader } from "../../../components/Common/AppLoader";
import { ClientListBreadcrumb } from "../Common/Breadcrums";
import ClientsFilters from "./ClientsFilters";
import { clientListColumns } from "./clientsTableColumn";
import { routesList } from "../../../router/routes";

const { Content } = Layout;

export const ClientsList: React.FC = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pageLoading, setPageLoading] = React.useState<boolean>(false);

  const fetchData = (params: object) => ClientAPI.getClients(params);

  const doDelete = async (id: string | number) => {
    return ClientAPI.deleteClient(id as string);
  };

  const doEdit = async (id: string | number) => {
    navigate(`${routesList.clientsManage.path}/${id}`);
  };

  return (
    <>
      <Content style={{ margin: "0 16px" }}>
        <div className="flex justify-between items-center">
          <ClientListBreadcrumb />

          <Button
            onClick={() => navigate(routesList.clientsManage.path)}
            className="bg-red-600 text-white hover:bg-green-50"
            type="default">
            Nuevo cliente
          </Button>
        </div>
        <div className="p-[24px] bg-white">
          <ClientsFilters />

          <section className="mx-auto">
            <AdminDataTable
              queryKey="clients"
              fetchData={fetchData}
              columns={clientListColumns}
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
