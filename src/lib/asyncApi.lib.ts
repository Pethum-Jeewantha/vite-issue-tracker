import {createAsyncThunk} from "@reduxjs/toolkit";
import {HttpService} from "./http.lib.ts";
import { AxiosError } from "axios";

// Define a type for the response data
type ApiResponse = any;

// Define the type for HttpService
interface HttpServiceType {
  get: (url: string) => Promise<ApiResponse>;
  post: (url: string, data: any) => Promise<ApiResponse>;
  put: (url: string, data: any) => Promise<ApiResponse>;
  patch: (url: string, data: any) => Promise<ApiResponse>;
  delete: (url: string) => Promise<void>;
  isLoading: () => boolean;
}

type HttpMethod = keyof HttpServiceType;

const makeApiReq = async <T>(url: string, method: HttpMethod, data: any): Promise<T> => {
  try{
    return await (HttpService as HttpServiceType)[method](url, data);
  }
  catch(error)
  {
    const errorMessage = (error as AxiosError).response?.data as string;
    throw new Error(errorMessage);
  }
};

export default function createAsyncApiAction (resourceName: string, type: string, method: HttpMethod) {
  return createAsyncThunk<ApiResponse, { url: string, data?: any }>(
    `${resourceName}/${type}`,
    async ({ url, data }) => makeApiReq<ApiResponse>(url, method, data)
  );
};
