import type { ColumnsType } from "antd/es/table";
import { alphabetically } from "../../../lib/sorters";

export const formAssignationListColumns: ColumnsType<FormAssignation> = [
  {
    title: "ID",
    dataIndex: "seqId",
    key: "seqId",
    width: 150,
    sorter: (a, b) => a.seqId - b.seqId,
    showSorterTooltip: false,
  },
  {
    title: "Cliente",
    dataIndex: "client",
    key: "client",
    render: (client: Client) => client.name,
    showSorterTooltip: false,
    sorter: (a, b) =>
      a.client && b.client ? alphabetically(a.client.name, b.client.name) : 0,
  },
  {
    title: "Formulario",
    dataIndex: "loanForm",
    key: "loanForm",
    render: (loanForm: LoanForm) => loanForm.name,
    showSorterTooltip: false,
  },
  {
    title: "Creado en",
    dataIndex: "createdAt",
    key: "createdAt",
    width: 150,
    sorter: (a, b) => a.createdAt.localeCompare(b.createdAt),
    showSorterTooltip: false,
    render: (createdAt: string) => new Date(createdAt).toLocaleString(),
  },
  //updated at
  {
    title: "Actualizado en",
    dataIndex: "updatedAt",
    key: "updatedAt",
    width: 150,
    sorter: (a, b) => a.updatedAt.localeCompare(b.updatedAt),
    showSorterTooltip: false,
    render: (updatedAt: string) => new Date(updatedAt).toLocaleString(),
  },
];
