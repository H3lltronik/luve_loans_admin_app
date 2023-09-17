import type { ColumnsType } from "antd/es/table";
import { alphabetically } from "../../../lib/sorters";

export const clientListColumns: ColumnsType<Client> = [
  {
    title: "ID",
    dataIndex: "seqId",
    key: "seqId",
    width: 150,
    sorter: (a, b) => a.seqId - b.seqId,
    showSorterTooltip: false,
  },
  {
    title: "Nombre",
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => (a.name && b.name ? alphabetically(a.name, b.name) : 0),
    showSorterTooltip: false,
  },
  {
    title: "Apellidos",
    dataIndex: "lastName",
    key: "lastName",
    sorter: (a, b) =>
      a.lastName && b.lastName ? alphabetically(a.lastName, b.lastName) : 0,
    showSorterTooltip: false,
  },
  {
    title: "Correo",
    dataIndex: "email",
    key: "email",
    sorter: (a, b) =>
      a.email && b.email ? alphabetically(a.email, b.email) : 0,
    showSorterTooltip: false,
  },
  {
    title: "Direccion",
    dataIndex: "address",
    key: "address",
    sorter: (a, b) =>
      a.address && b.address ? alphabetically(a.address, b.address) : 0,
    showSorterTooltip: false,
  },
];
