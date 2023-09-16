import type { ColumnsType } from "antd/es/table";
import { alphabetically } from "../../../lib/sorters";

export const profileListColumns: ColumnsType<Profile> = [
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
    title: "Roles",
    dataIndex: "roles",
    key: "roles",
  },
  {
    title: "Estatus",
    dataIndex: "status",
    key: "status",
  },
];
