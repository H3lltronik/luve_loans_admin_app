import { Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { UserAPI } from "../../../api";
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

export type LoanFormFormHandle = {
  getFormData: (params?: GetFormData) => Promise<LoanForm>;
};

type LoanFormFormProps = {
  entity?: LoanForm | null;
};

const LoanFormForm = forwardRef<LoanFormFormHandle, LoanFormFormProps>(
  (props, ref) => {
    const [form] = Form.useForm();
    const [isDraft, setIsDraft] = useState<boolean>(false);

    useImperativeHandle(
      ref,
      (): LoanFormFormHandle => ({
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
        {/* "lastName": "Last test",
      "phone": "3317354536",
      "notes": "Notes",
      "email": "email@gmail.com",
      "address": "Address",
      "accessId": "56be1537-5c5e-4d48-bf29-671629b5b7aa" */}

        <Form.Item<FieldType>
          label="Nombre"
          name="name"
          rules={[
            { required: true && !isDraft, message: "Este campo es requerido" },
          ]}>
          <Input type="text" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Apellido"
          name="lastName"
          rules={[
            { required: true && !isDraft, message: "Este campo es requerido" },
          ]}>
          <Input type="text" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Telefono"
          name="phone"
          rules={[
            { required: true && !isDraft, message: "Este campo es requerido" },
          ]}>
          <Input type="phone" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[
            { required: true && !isDraft, message: "Este campo es requerido" },
          ]}>
          <Input type="email" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Dirección"
          name="address"
          rules={[
            { required: true && !isDraft, message: "Este campo es requerido" },
          ]}>
          <Input type="text" />
        </Form.Item>

        <GenericSelect
          fetcher={() => UserAPI.getUsers()}
          label="Acceso"
          placeholder="Selecciona un acceso"
          optionLabel="username"
          name="accessId"
          optionKey={"id"}
          rules={[
            { required: true && !isDraft, message: "Este campo es requerido" },
          ]}
          queryKey={["users"]}
        />

        <Form.Item<FieldType> label="Notas" name="notes">
          <TextArea />
        </Form.Item>
      </Form>
    );
  }
);

export default LoanFormForm;
