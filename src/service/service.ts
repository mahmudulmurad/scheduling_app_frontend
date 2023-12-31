import axios, { AxiosRequestConfig } from "axios";
import { toast } from "react-toastify";

// Define an interface for the API response
interface ApiResponse<T> {
  payload: T;
  status: number;
  msg: string;
  token?: string;
}

// Define a function for making API requests
const makeApiRequest = async <T>(
  method: string,
  url: string,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Access token not found.");
    }

    const response = await axios({
      method,
      url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      ...config,
    });

    if (response.data.status) {
      toast.success(response.data.msg);
    } else {
      toast.error(response.data.msg);
    }

    return {
      payload: response.data.payload as T,
      status: response.status,
      msg: response.data.msg,
      token: response.data?.token,
    };
  } catch (error) {
    throw error;
  }
};

// Define functions for different HTTP methods

export const postRequest = async <T>(
  url: string,
  data: any,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  return await makeApiRequest<T>("post", url, { data, ...config });
};

export const patchRequest = async <T>(
  url: string,
  data: any,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  return await makeApiRequest<T>("patch", url, { data, ...config });
};

export const getRequest = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  return await makeApiRequest<T>("get", url, config);
};

export const deleteRequest = async <T>(
  url: string,
  params?: any,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  return await makeApiRequest<T>("delete", url, { params, ...config });
};

export const dataFormatter = (data: Record<string, any>[]) =>
  data?.map((item, index) => ({
    ...item,
    key: index.toString(),
  }));
