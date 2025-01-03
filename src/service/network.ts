// network service where we can handle all network related operations like fetch, post, put, delete etc.

import apiClient from "./apiClient";

class NetWorkService {
  endPoint: string;

  constructor(endPoint: string) {
    this.endPoint = endPoint;
  }

  async getAll<T>(subEndPoint:T) {
    const response = await apiClient.post(`${this.endPoint}${subEndPoint}`);
    return response.data;
  }

  async get<T>(id: T) {
    // T is a generic type
    const response = await apiClient.get(`${this.endPoint}/${id}`);
    return response.data;
  }

  async post<T>(data: T) {
    const response = await apiClient.post(this.endPoint, data);
    return response.data;
  }

  async put<T>(id: T, data: T) {
    const response = await apiClient.put(`${this.endPoint}/${id}`, data);
    return response.data;
  }

  async delete<T>(id: T) {
    const response = await apiClient.delete(`${this.endPoint}/${id}`);
    return response.data;
  }

  async patch<T>(id: T, data: T) {
    const response = await apiClient.patch(`${this.endPoint}/${id}`, data);
    return response.data;
  }
}

const create = (endpoint: string) => new NetWorkService(endpoint);

export default create;
