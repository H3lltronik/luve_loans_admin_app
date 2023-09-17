import { Button, Layout } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { LoanFormAPI } from "../../../api";
import { AdminDataTable } from "../../../components/Common/AdminDataTable";
import { AppLoader } from "../../../components/Common/AppLoader";
import { routesList } from "../../../router/routes";
import { LoanFormListBreadcrumb } from "../Common/Breadcrums";
import LoanFormsFilters from "./LoanFormsFilters";
import { loanFormListColumns } from "./loanFormsTableColumn";

const { Content } = Layout;

export const LoanFormsList: React.FC = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pageLoading, setPageLoading] = React.useState<boolean>(false);

  const fetchData = (params: object) => LoanFormAPI.getLoanForms(params);

  const doDelete = async (id: string | number) => {
    return LoanFormAPI.deleteLoanForm(id as string);
  };

  const doEdit = async (id: string | number) => {
    navigate(`${routesList.loanFormsManage.path}/${id}`);
  };

  return (
    <>
      <Content style={{ margin: "0 16px" }}>
        <div className="flex justify-between items-center">
          <LoanFormListBreadcrumb />

          <Button
            onClick={() => navigate(routesList.loanFormsManage.path)}
            className="bg-red-600 text-white hover:bg-green-50"
            type="default">
            Nuevo Formulario
          </Button>
        </div>
        <div className="p-[24px] bg-white">
          <LoanFormsFilters />

          <section className="mx-auto">
            <AdminDataTable
              queryKey="loanForms"
              fetchData={fetchData}
              columns={loanFormListColumns}
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
