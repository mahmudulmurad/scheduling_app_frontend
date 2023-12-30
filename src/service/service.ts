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
export const makeApiRequest = async <T>(
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
