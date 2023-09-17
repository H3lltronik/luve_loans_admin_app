import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Layout, Modal } from "antd";
import React, { useMemo, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClientAPI } from "../../../api";
import { AppLoader } from "../../../components/Common/AppLoader";
import ClientsForm, {
  ClientFormHandle,
} from "../../../components/Forms/Clients/ClientsForm";
import { showToast } from "../../../lib/notify";
import { ClientManageBreadcrumb } from "../Common/Breadcrums";
import { routesList } from "../../../router/routes";

const { confirm } = Modal;
const { Content } = Layout;

export const ClientsManage: React.FC = () => {
  const clientFormRef = useRef<ClientFormHandle | null>(null);
  const [pageLoading, setPageLoading] = React.useState<boolean>(false);
  const { mutateAsync } = useMutation((data: CreateClientRequest) =>
    ClientAPI.createClient(data)
  );

  const navigate = useNavigate();
  const { id } = useParams();

  const entity = useQuery<GetClientResponse | APIError>(
    ["clients", { id }],
    () => ClientAPI.getClient(id as string),
    { enabled: !!id }
  );

  const submitForm = async (isDraft = false) => {
    const clientFormData = (await clientFormRef.current?.getFormData({
      draftMode: isDraft,
    })) as CreateClientRequest;

    setPageLoading(true);
    try {
      let result = null;
      let message = "";

      if (entity?.data) {
        if ("id" in entity.data) {
          result = await ClientAPI.updateClient(entity.data.id, clientFormData);
          message = "Cliente actualizado correctamente";
        } else {
          alert("No se puede actualizar el cliente");
          console.error("Not valid entity", entity.data);
        }
      } else {
        result = await mutateAsync(clientFormData);
        message = "Cliente creado correctamente";
      }

      if (result) {
        if ("id" in result) {
          showToast(message, "success");
          navigate(routesList.clients.path);
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
      onOk: () => navigate(routesList.clients.path),
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
        <ClientManageBreadcrumb />
        <div className="p-[24px] bg-white">
          <section className="max-w-[1500px]">
            <ClientsForm ref={clientFormRef} entity={entityData} />

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
