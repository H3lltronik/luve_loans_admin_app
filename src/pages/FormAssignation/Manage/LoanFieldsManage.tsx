import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Layout, Modal } from "antd";
import React, { useMemo, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoanFieldAPI } from "../../../api";
import { AppLoader } from "../../../components/Common/AppLoader";
import LoanFieldsForm, {
  LoanFieldFormHandle,
} from "../../../components/Forms/LoanFields/LoanFieldsForm";
import { showToast } from "../../../lib/notify";
import { routesList } from "../../../router/routes";
import { LoanFieldManageBreadcrumb } from "../Common/Breadcrums";

const { confirm } = Modal;
const { Content } = Layout;

export const LoanFieldsManage: React.FC = () => {
  const loanFieldFormRef = useRef<LoanFieldFormHandle | null>(null);
  const [pageLoading, setPageLoading] = React.useState<boolean>(false);
  const { mutateAsync } = useMutation((data: CreateLoanFieldRequest) =>
    LoanFieldAPI.createLoanField(data)
  );

  const navigate = useNavigate();
  const { id } = useParams();

  const entity = useQuery<GetLoanFieldResponse | APIError>(
    ["loanFields", { id }],
    () => LoanFieldAPI.getLoanField(id as string),
    { enabled: !!id }
  );

  const submitForm = async (isDraft = false) => {
    const loanFieldFormData = (await loanFieldFormRef.current?.getFormData({
      draftMode: isDraft,
    })) as CreateLoanFieldRequest;

    setPageLoading(true);
    try {
      let result = null;
      let message = "";

      if (entity?.data) {
        if ("id" in entity.data) {
          result = await LoanFieldAPI.updateLoanField(
            entity.data.id,
            loanFieldFormData
          );
          message = "LoanFielde actualizado correctamente";
        } else {
          alert("No se puede actualizar el loanFielde");
          console.error("Not valid entity", entity.data);
        }
      } else {
        result = await mutateAsync(loanFieldFormData);
        message = "LoanFielde creado correctamente";
      }

      if (result) {
        if ("id" in result) {
          showToast(message, "success");
          navigate(routesList.loanFields.path);
        }
      }
    } catch (error) {
      console.log("error", error);
    }

    setPageLoading(false);
  };

  const doCancel = () => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: (
        <p className="mt-5">
          ¿Desea salir? Si tiene algun cambio sin guardar, no se podra
          recuperar.
        </p>
      ),
      onOk: () => navigate(routesList.loanFields.path),
      okButtonProps: {
        className: "bg-red-500 border-none hover:bg-red-600",
      },
    });
  };

  const entityData = useMemo(() => {
    if (entity.isLoading || !entity.data) return null;
    if ("id" in entity.data) return entity.data;

    return null;
  }, [entity]);

  return (
    <>
      <Content style={{ margin: "0 16px" }}>
        <LoanFieldManageBreadcrumb />
        <div className="p-[24px] bg-white">
          <section className="max-w-[1500px]">
            <LoanFieldsForm ref={loanFieldFormRef} entity={entityData} />

            <button
              type="button"
              onClick={() => submitForm(false)}
              className="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline">
              Procesar
            </button>
            {!entityData?.isPublished && (
              <button
                type="button"
                onClick={() => submitForm(true)}
                className="border border-gray-200 bg-gray-200 text-gray-700 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline">
                Borrador
              </button>
            )}
            <button
              type="button"
              onClick={doCancel}
              className="border border-red-500 bg-red-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline">
              Cancelar
            </button>
          </section>
        </div>

        <AppLoader isLoading={pageLoading} />
      </Content>
    </>
  );
};
