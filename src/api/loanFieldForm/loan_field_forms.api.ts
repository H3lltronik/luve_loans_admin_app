import { statusParser } from "../../lib/entity.utils";
import BaseAPI from "../common/ApiBase";
import { handleAPIError } from "../errorHandler";

class BaseLoanFormFieldAPI extends BaseAPI {
  async createLoanFormField<CreateLoanFormFieldRequest>(
    data: CreateLoanFormFieldRequest
  ): Promise<LoanFormFieldCreatedResponse | APIError> {
    try {
      const response = await this.post<LoanFormFieldCreatedResponse, CreateLoanFormFieldRequest>(
        "",
        data
      );
      return response;
    } catch (error) {
      return handleAPIError(error);
    }
  }

  async getLoanFormFields(
    params?: QueryParams
  ): Promise<GetLoanFormFieldsResponseWithStatus | APIError> {
    try {
      const clients = await this.get<GetLoanFormFieldsResponse>("", params);
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

  async getLoanFormField(
    clientId: string,
    params?: QueryParams
  ): Promise<GetLoanFormFieldResponse | APIError> {
    try {
      return await this.get<GetLoanFormFieldResponse>(`/${clientId}`, params);
    } catch (error) {
      return handleAPIError(error);
    }
  }

  async updateLoanFormField(
    clientId: string,
    data: CreateLoanFormFieldRequest,
    params?: QueryParams
  ): Promise<UpdatedLoanFormFieldResponse | APIError> {
    try {
      return await this.put<UpdatedLoanFormFieldResponse, CreateLoanFormFieldRequest>(
        `/${clientId}`,
        data,
        params
      );
    } catch (error) {
      console.log("error update");
      return handleAPIError(error);
    }
  }

  async deleteLoanFormField(
    clientId: string,
    params?: QueryParams
  ): Promise<DeleteLoanFormFieldResponse | APIError> {
    try {
      return await this.delete<DeleteLoanFormFieldResponse>(`/${clientId}`, params);
    } catch (error) {
      return handleAPIError(error);
    }
  }

  async findLoanFormFields<P = object>(
    params?: QueryParams<P>
  ): Promise<PaginatedResponse<unknown> | APIError> {
    try {
      return await this.find<unknown, P>("", params);
    } catch (error) {
      return handleAPIError(error);
    }
  }
}

export default BaseLoanFormFieldAPI;
