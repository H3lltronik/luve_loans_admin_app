import { statusParser } from "../../lib/entity.utils";
import BaseAPI from "../common/ApiBase";
import { handleAPIError } from "../errorHandler";

class BaseClientAPI extends BaseAPI {
  async createClient<CreateClientRequest>(
    data: CreateClientRequest
  ): Promise<ClientCreatedResponse | APIError> {
    try {
      const response = await this.post<ClientCreatedResponse, CreateClientRequest>(
        "",
        data
      );
      return response;
    } catch (error) {
      return handleAPIError(error);
    }
  }

  async getClients(
    params?: QueryParams
  ): Promise<GetClientsResponseWithStatus | APIError> {
    try {
      const clients = await this.get<GetClientsResponse>("", params);
      const clientsWithStatus = clients.data.map((product) =>
        Object.assign({}, product, {
          status: statusParser(product),
        })
      );

      return {
        data: clientsWithStatus,
        pagination: clients.pagination,
      };
    } catch (error) {
      return handleAPIError(error);
    }
  }

  async getClient(
    clientId: string,
    params?: QueryParams
  ): Promise<GetClientResponse | APIError> {
    try {
      return await this.get<GetClientResponse>(`/${clientId}`, params);
    } catch (error) {
      return handleAPIError(error);
    }
  }

  async updateClient(
    clientId: string,
    data: CreateClientRequest,
    params?: QueryParams
  ): Promise<UpdatedClientResponse | APIError> {
    try {
      return await this.put<UpdatedClientResponse, CreateClientRequest>(
        `/${clientId}`,
        data,
        params
      );
    } catch (error) {
      console.log("error update");
      return handleAPIError(error);
    }
  }

  async deleteClient(
    clientId: string,
    params?: QueryParams
  ): Promise<DeleteClientResponse | APIError> {
    try {
      return await this.delete<DeleteClientResponse>(`/${clientId}`, params);
    } catch (error) {
      return handleAPIError(error);
    }
  }

  async findClients<P = object>(
    params?: QueryParams<P>
  ): Promise<PaginatedResponse<unknown> | APIError> {
    try {
      return await this.find<unknown, P>("", params);
    } catch (error) {
      return handleAPIError(error);
    }
  }
}

export default BaseClientAPI;
