import type { ColumnsType } from "antd/es/table";

export const usersListColumns: ColumnsType<User> = [
  {
    title: "ID",
    dataIndex: "seqId",
    key: "seqId",
    width: 150,
  },
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Nombre",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Perfil",
    dataIndex: "profile",
    key: "profileName",
    render: (profile: Profile) => profile && profile.name,
  },
  {
    title: "Estatus",
    dataIndex: "status",
    key: "status",
  },
];
