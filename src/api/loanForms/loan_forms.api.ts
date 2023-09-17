import { statusParser } from "../../lib/entity.utils";
import BaseAPI from "../common/ApiBase";
import { handleAPIError } from "../errorHandler";

class BaseLoanFormAPI extends BaseAPI {
  async createLoanForm<CreateLoanFormRequest>(
    data: CreateLoanFormRequest
  ): Promise<LoanFormCreatedResponse | APIError> {
    try {
      const response = await this.post<LoanFormCreatedResponse, CreateLoanFormRequest>(
        "",
        data
      );
      return response;
    } catch (error) {
      return handleAPIError(error);
    }
  }

  async getLoanForms(
    params?: QueryParams
  ): Promise<GetLoanFormsResponseWithStatus | APIError> {
    try {
      const clients = await this.get<GetLoanFormsResponse>("", params);
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

  async getLoanForm(
    clientId: string,
    params?: QueryParams
  ): Promise<GetLoanFormResponse | APIError> {
    try {
      return await this.get<GetLoanFormResponse>(`/${clientId}`, params);
    } catch (error) {
      return handleAPIError(error);
    }
  }

  async updateLoanForm(
    clientId: string,
    data: CreateLoanFormRequest,
    params?: QueryParams
  ): Promise<UpdatedLoanFormResponse | APIError> {
    try {
      return await this.put<UpdatedLoanFormResponse, CreateLoanFormRequest>(
        `/${clientId}`,
        data,
        params
      );
    } catch (error) {
      console.log("error update");
      return handleAPIError(error);
    }
  }

  async deleteLoanForm(
    clientId: string,
    params?: QueryParams
  ): Promise<DeleteLoanFormResponse | APIError> {
    try {
      return await this.delete<DeleteLoanFormResponse>(`/${clientId}`, params);
    } catch (error) {
      return handleAPIError(error);
    }
  }

  async findLoanForms<P = object>(
    params?: QueryParams<P>
  ): Promise<PaginatedResponse<unknown> | APIError> {
    try {
      return await this.find<unknown, P>("", params);
    } catch (error) {
      return handleAPIError(error);
    }
  }
}

export default BaseLoanFormAPI;
