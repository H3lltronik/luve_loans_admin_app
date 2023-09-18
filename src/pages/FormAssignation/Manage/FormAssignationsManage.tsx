import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Layout, Modal } from "antd";
import React, { useMemo, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormAssignationAPI } from "../../../api";
import { AppLoader } from "../../../components/Common/AppLoader";
import FormAssignationsForm, {
  FormAssignationFormHandle,
} from "../../../components/Forms/FormAssignations/FormAssignationsForm";
import { showToast } from "../../../lib/notify";
import { routesList } from "../../../router/routes";
import { FormAssignationManageBreadcrumb } from "../Common/Breadcrums";

const { confirm } = Modal;
const { Content } = Layout;

export const FormAssignationsManage: React.FC = () => {
  const formAssignationFormRef = useRef<FormAssignationFormHandle | null>(null);
  const [pageLoading, setPageLoading] = React.useState<boolean>(false);
  const { mutateAsync } = useMutation((data: CreateFormAssignationRequest) =>
    FormAssignationAPI.createFormAssignation(data)
  );

  const navigate = useNavigate();
  const { id } = useParams();

  const entity = useQuery<GetFormAssignationResponse | APIError>(
    ["formAssignations", { id }],
    () => FormAssignationAPI.getFormAssignation(id as string),
    { enabled: !!id }
  );

  const submitForm = async (isDraft = false) => {
    const formAssignationFormData =
      (await formAssignationFormRef.current?.getFormData({
        draftMode: isDraft,
      })) as CreateFormAssignationRequest;

    setPageLoading(true);
    try {
      let result = null;
      let message = "";

      if (entity?.data) {
        if ("id" in entity.data) {
          result = await FormAssignationAPI.updateFormAssignation(
            entity.data.id,
            formAssignationFormData
          );
          message = "FormAssignatione actualizado correctamente";
        } else {
          alert("No se puede actualizar el formAssignatione");
          console.error("Not valid entity", entity.data);
        }
      } else {
        result = await mutateAsync(formAssignationFormData);
        message = "FormAssignatione creado correctamente";
      }

      if (result) {
        if ("id" in result) {
          showToast(message, "success");
          navigate(routesList.formAssignations.path);
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
      onOk: () => navigate(routesList.formAssignations.path),
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
        <FormAssignationManageBreadcrumb />
        <div className="p-[24px] bg-white">
          <section className="max-w-[1500px]">
            <FormAssignationsForm
              ref={formAssignationFormRef}
              entity={entityData}
            />

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
