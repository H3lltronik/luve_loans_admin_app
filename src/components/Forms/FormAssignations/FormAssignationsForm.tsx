import { Form, Input } from "antd";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { ClientAPI, LoanFormAPI } from "../../../api";
import { GenericSelect } from "../Common/GenericSelect";

const onFinish = (values: unknown) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: unknown) => {
  console.log("Failed:", errorInfo);
};

type FieldType = {
  clientname?: string;
  password?: string;
  remember?: string;
};

interface GetFormData {
  draftMode: boolean;
}

export type FormAssignationFormHandle = {
  getFormData: (params?: GetFormData) => Promise<FormAssignation>;
};

type FormAssignationFormProps = {
  entity?: FormAssignation | null;
};

const FormAssignationsForm = forwardRef<
  FormAssignationFormHandle,
  FormAssignationFormProps
>((props, ref) => {
  const [form] = Form.useForm();
  const [isDraft, setIsDraft] = useState<boolean>(false);

  useImperativeHandle(
    ref,
    (): FormAssignationFormHandle => ({
      getFormData: async (params) => {
        setIsDraft(!!params?.draftMode);

        const valid = await form.validateFields();
        console.log("valid", valid);
        return {
          ...form.getFieldsValue(),
          isDraft: !!params?.draftMode,
          isPublished: !params?.draftMode,
        };
      },
    })
  );

  useEffect(() => {
    if (props.entity) form.setFieldsValue(props.entity);
  }, [form, props.entity]);

  return (
    <Form
      form={form}
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off">
      <Form.Item<FieldType> label="Id" name="id" hidden={true}>
        <Input />
      </Form.Item>

      <GenericSelect
        fetcher={() => ClientAPI.getClients()}
        label="Cliente"
        placeholder="Selecciona un cliente"
        optionLabel="name"
        name="clientId"
        optionKey={"id"}
        rules={[
          { required: true && !isDraft, message: "Este campo es requerido" },
        ]}
        queryKey={["clients"]}
      />

      <GenericSelect
        fetcher={() => LoanFormAPI.getLoanForms()}
        label="Formulario"
        placeholder="Selecciona un formulario"
        optionLabel="name"
        name="loanFormId"
        optionKey={"id"}
        rules={[
          { required: true && !isDraft, message: "Este campo es requerido" },
        ]}
        queryKey={["forms"]}
      />
    </Form>
  );
});

export default FormAssignationsForm;
