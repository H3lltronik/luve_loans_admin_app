import { Form, Input } from "antd";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { ProfileAPI } from "../../../api";
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

export type ClientFormHandle = {
  getFormData: (params?: GetFormData) => Promise<Client>;
};

type ClientFormProps = {
  entity?: Client | null;
};

const ClientForm = forwardRef<ClientFormHandle, ClientFormProps>((props, ref) => {
  const [form] = Form.useForm();
  const [isDraft, setIsDraft] = useState<boolean>(false);

  useImperativeHandle(
    ref,
    (): ClientFormHandle => ({
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

      <Form.Item<FieldType>
        label="Clientname"
        name="clientname"
        rules={[
          { required: true && !isDraft, message: "Este campo es requerido" },
        ]}>
        <Input type="email" />
      </Form.Item>
    </Form>
  );
});

export default ClientForm;
