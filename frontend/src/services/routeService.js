import api from '../api';
import { API_ENDPOINTS } from '../config/apiEndpoints';

export const createRoutesRequest = (userData) =>
  api.post(API_ENDPOINTS.ROUTES.CREATE, userData);

export const getRoutesByIdRequest = (id) =>
  api.get(API_ENDPOINTS.ROUTES.GET(id));

export const updateRoutesRequest = (id, data) =>
  api.put(API_ENDPOINTS.ROUTES.UPDATE(id), data);

export const deleteRoutesRequest = (id) =>
  api.delete(API_ENDPOINTS.ROUTES.DELETE(id));

export const getAllRoutessRequest = () =>
  api.get(API_ENDPOINTS.ROUTES.LIST);
