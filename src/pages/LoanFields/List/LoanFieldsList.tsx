import { Button, Layout } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { LoanFieldAPI } from "../../../api";
import { AdminDataTable } from "../../../components/Common/AdminDataTable";
import { AppLoader } from "../../../components/Common/AppLoader";
import { routesList } from "../../../router/routes";
import { LoanFieldListBreadcrumb } from "../Common/Breadcrums";
import LoanFieldsFilters from "./LoanFieldsFilters";
import { loanFieldListColumns } from "./loanFieldsTableColumn";

const { Content } = Layout;

export const LoanFieldsList: React.FC = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pageLoading, setPageLoading] = React.useState<boolean>(false);

  const fetchData = (params: object) => LoanFieldAPI.getLoanFields(params);

  const doDelete = async (id: string | number) => {
    return LoanFieldAPI.deleteLoanField(id as string);
  };

  const doEdit = async (id: string | number) => {
    navigate(`${routesList.loanFieldsManage.path}/${id}`);
  };

  return (
    <>
      <Content style={{ margin: "0 16px" }}>
        <div className="flex justify-between items-center">
          <LoanFieldListBreadcrumb />

          <Button
            onClick={() => navigate(routesList.loanFieldsManage.path)}
            className="bg-red-600 text-white hover:bg-green-50"
            type="default">
            Nuevo Campo
          </Button>
        </div>
        <div className="p-[24px] bg-white">
          <LoanFieldsFilters />

          <section className="mx-auto">
            <AdminDataTable
              queryKey="loanFields"
              fetchData={fetchData}
              columns={loanFieldListColumns}
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
