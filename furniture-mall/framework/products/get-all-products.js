import http from "../utils/http";
import { API_ENDPOINTS } from "../utils/api-endpoints";
import { useQuery } from "react-query";

export const fetchProducts = async () => {
  const { data } = await http.get(
    API_ENDPOINTS.PRODUCTS
  );
  return data;
};
export const useProductsQuery = () => {
  return useQuery(
    'products',
    fetchProducts
  );
};