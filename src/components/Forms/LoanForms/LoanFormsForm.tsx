import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Popconfirm, Spin } from "antd";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { LoanFieldAPI, LoanFormFieldAPI } from "../../../api";
import { flattenLoanFormFields } from "../../../pages/LoanForms/Manage/utils";
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
  entity?: LoanFormWithFields | null;
};

type FieldFormItem = {
  id: string;
  local: boolean;
};

const LoanFormForm = forwardRef<LoanFormFormHandle, LoanFormFormProps>(
  (props, ref) => {
    const [form] = Form.useForm();
    const [isDraft, setIsDraft] = useState<boolean>(false);
    const [fields, setFields] = useState<FieldFormItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

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

    const addFieldCount = (id = uuidv4(), local = true) => {
      console.log("addFieldCount", id, local, fields);
      setFields([...fields, { id, local }]);
    };

    const removeFieldCount = async (id: string) => {
      const found = fields.find((field) => field.id === id);

      if (!found?.local) {
        setLoading(true);
        await LoanFormFieldAPI.deleteLoanFormField(id);
        setLoading(false);
      }

      const newFields = fields.filter((field) => field.id !== id);
      setFields(newFields);
    };

    useEffect(() => {
      if (!props.entity) return;
      const flattened = flattenLoanFormFields(props.entity);

      for (const field of props.entity.loanFormFields)
        addFieldCount(field.id, false);

      if (props.entity) form.setFieldsValue(flattened);
    }, [form, props.entity]);

    return (
      <Form
        form={form}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="relative">
        {loading && (
          <div className="absolute top-0 left-0 w-full h-full bg-white opacity-50 z-50 flex items-center justify-center">
            <div className="flex items-center justify-center">
              <Spin />
            </div>
          </div>
        )}

        <Form.Item<FieldType> label="Id" name="id" hidden={true}>
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Nombre"
          name="name"
          rules={[
            { required: true && !isDraft, message: "Este campo es requerido" },
          ]}>
          <Input type="text" />
        </Form.Item>

        <div className="mb-5">
          <Button
            className="bg-red-600 text-white hover:bg-red-100 flex items-center"
            onClick={() => addFieldCount()}>
            <span>Añadir campo</span>
            <PlusOutlined />
          </Button>
        </div>

        {fields.map((field, i) => (
          <>
            <div className="flex items-start gap-10" key={`field-${field.id}`}>
              <GenericSelect
                fetcher={() => LoanFieldAPI.getLoanFields()}
                label={`Campo #${i + 1}`}
                placeholder={`Selecciona el campo ${i + 1}`}
                optionLabel="name"
                name={`loanFieldId_${field.id}`}
                optionKey={"id"}
                rules={[
                  {
                    required: true && !isDraft,
                    message: "Este campo es requerido",
                  },
                ]}
                queryKey={["users"]}
              />

              <Form.Item<FieldType>
                label="Tamaño de columna"
                name={`columnWidth_${field.id}`}
                rules={[
                  {
                    required: true && !isDraft,
                    message: "Este campo es requerido",
                  },
                ]}>
                <Input defaultValue={0} type="number" />
              </Form.Item>

              <Form.Item<FieldType>
                label="Prioridad"
                name={`priority_${field.id}`}
                rules={[
                  {
                    required: true && !isDraft,
                    message: "Este campo es requerido",
                  },
                ]}>
                <Input defaultValue={0} type="number" />
              </Form.Item>

              <Popconfirm
                title="Remover el campo"
                description="¿Estas seguro de remover el campo?"
                onConfirm={() => removeFieldCount(field.id)}
                okText="Si"
                okType="danger"
                cancelText="No">
                <Button className="bg-red-600 text-white hover:bg-red-100 flex items-center">
                  <DeleteOutlined />
                </Button>
              </Popconfirm>
            </div>
            {i + 1 < fields.length && (
              <div className="w-full mb-5">
                <hr />
              </div>
            )}
          </>
        ))}
      </Form>
    );
  }
);

export default LoanFormForm;
