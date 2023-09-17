import type { ColumnsType } from "antd/es/table";
import { alphabetically } from "../../../lib/sorters";

export const loanFieldListColumns: ColumnsType<LoanField> = [
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
    title: "Tipo",
    dataIndex: "type",
    key: "type",
    sorter: (a, b) =>
      a.type && b.type ? alphabetically(a.type, b.type) : 0,
    showSorterTooltip: false,
  }
];
