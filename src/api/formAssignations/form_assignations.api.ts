import { statusParser } from "../../lib/entity.utils";
import BaseAPI from "../common/ApiBase";
import { handleAPIError } from "../errorHandler";

class BaseFormAssignationAPI extends BaseAPI {
  async createFormAssignation<CreateFormAssignationRequest>(
    data: CreateFormAssignationRequest
  ): Promise<FormAssignationCreatedResponse | APIError> {
    try {
      const response = await this.post<
        FormAssignationCreatedResponse,
        CreateFormAssignationRequest
      >("", data);
      return response;
    } catch (error) {
      return handleAPIError(error);
    }
  }

  async getFormAssignations(
    params?: QueryParams
  ): Promise<GetFormAssignationsResponseWithStatus | APIError> {
    try {
      const clients = await this.get<GetFormAssignationsResponse>("", params);
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

  async getFormAssignation(
    clientId: string,
    params?: QueryParams
  ): Promise<GetFormAssignationResponse | APIError> {
    try {
      return await this.get<GetFormAssignationResponse>(`/${clientId}`, params);
    } catch (error) {
      return handleAPIError(error);
    }
  }

  async updateFormAssignation(
    clientId: string,
    data: CreateFormAssignationRequest,
    params?: QueryParams
  ): Promise<UpdatedFormAssignationResponse | APIError> {
    try {
      return await this.put<
        UpdatedFormAssignationResponse,
        CreateFormAssignationRequest
      >(`/${clientId}`, data, params);
    } catch (error) {
      console.log("error update");
      return handleAPIError(error);
    }
  }

  async deleteFormAssignation(
    clientId: string,
    params?: QueryParams
  ): Promise<DeleteFormAssignationResponse | APIError> {
    try {
      return await this.delete<DeleteFormAssignationResponse>(
        `/${clientId}`,
        params
      );
    } catch (error) {
      return handleAPIError(error);
    }
  }

  async findFormAssignations<P = object>(
    params?: QueryParams<P>
  ): Promise<PaginatedResponse<unknown> | APIError> {
    try {
      return await this.find<unknown, P>("", params);
    } catch (error) {
      return handleAPIError(error);
    }
  }
}

export default BaseFormAssignationAPI;
