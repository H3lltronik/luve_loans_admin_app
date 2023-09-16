interface Client {
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  isDraft: boolean;
  isPublished: boolean;
  id: string;
  seqId: number;
  name: string;
  lastName: string;
  phone: string;
  notes: string;
  email: string;
  address: string;
  accessId: string;
  access: User;
}

type MeResponse = Client;

type GetClientsResponse = {
  data: Client[];
  pagination: Pagination;
};

type GetClientResponse = Client;
type UpdatedClientResponse = Client;
type DeleteClientResponse = Client;

type ClientCreatedResponse = Client;

type CreateClientRequest = Omit<Client, "id">;

// parsed
type ClientWithStatus = Client & { status: string };
type ClientsWithStatus = ClientWithStatus[];
type GetClientsResponseWithStatus = {
  data: ClientsWithStatus;
  pagination: Pagination;
};
