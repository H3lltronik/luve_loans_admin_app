import { statusParser } from "../../lib/entity.utils";
import BaseAPI from "../common/ApiBase";
import { handleAPIError } from "../errorHandler";

class BaseLoanFieldAPI extends BaseAPI {
  async createLoanField<CreateLoanFieldRequest>(
    data: CreateLoanFieldRequest
  ): Promise<LoanFieldCreatedResponse | APIError> {
    try {
      const response = await this.post<LoanFieldCreatedResponse, CreateLoanFieldRequest>(
        "",
        data
      );
      return response;
    } catch (error) {
      return handleAPIError(error);
    }
  }

  async getLoanFields(
    params?: QueryParams
  ): Promise<GetLoanFieldsResponseWithStatus | APIError> {
    try {
      const clients = await this.get<GetLoanFieldsResponse>("", params);
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

  async getLoanField(
    clientId: string,
    params?: QueryParams
  ): Promise<GetLoanFieldResponse | APIError> {
    try {
      return await this.get<GetLoanFieldResponse>(`/${clientId}`, params);
    } catch (error) {
      return handleAPIError(error);
    }
  }

  async updateLoanField(
    clientId: string,
    data: CreateLoanFieldRequest,
    params?: QueryParams
  ): Promise<UpdatedLoanFieldResponse | APIError> {
    try {
      return await this.put<UpdatedLoanFieldResponse, CreateLoanFieldRequest>(
        `/${clientId}`,
        data,
        params
      );
    } catch (error) {
      console.log("error update");
      return handleAPIError(error);
    }
  }

  async deleteLoanField(
    clientId: string,
    params?: QueryParams
  ): Promise<DeleteLoanFieldResponse | APIError> {
    try {
      return await this.delete<DeleteLoanFieldResponse>(`/${clientId}`, params);
    } catch (error) {
      return handleAPIError(error);
    }
  }

  async findLoanFields<P = object>(
    params?: QueryParams<P>
  ): Promise<PaginatedResponse<unknown> | APIError> {
    try {
      return await this.find<unknown, P>("", params);
    } catch (error) {
      return handleAPIError(error);
    }
  }
}

export default BaseLoanFieldAPI;
