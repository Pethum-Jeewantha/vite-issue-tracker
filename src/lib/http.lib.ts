import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import LocalStorageUtil from "./localStorage.lib.ts";

export const currentEnvironment: Environment = "local";

type Environment = "local" | "stage" | "prod";

interface Variable {
    baseEndPoint: string;
    webSocketEndPoint: string;
}

const environmentVariableMapping: Record<Environment, Variable> = {
    prod: {
        "baseEndPoint": "",
        "webSocketEndPoint": ""
    },
    stage: {
        "baseEndPoint": "",
        "webSocketEndPoint": ""
    },
    local: {
        "baseEndPoint": "http://localhost:3900/api",
        "webSocketEndPoint": "ws://localhost:3200/ws"
    }
}

export const envVariables: Variable = {
    "baseEndPoint": environmentVariableMapping[currentEnvironment].baseEndPoint,
    "webSocketEndPoint": environmentVariableMapping[currentEnvironment].webSocketEndPoint
}

export const axiosInstance: AxiosInstance = axios.create({
    baseURL: envVariables.baseEndPoint
});

export const axiosPrivate: AxiosInstance = axios.create({
    baseURL: envVariables.baseEndPoint,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

let isLoading = false;

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        isLoading = false;
        return response.data;
    },
    (error: AxiosError) => {
        isLoading = false;
        throw error;
    }
);

axiosInstance.interceptors.request.use((config) => {
    isLoading = true;
    const token = LocalStorageUtil.getItem("@token");
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

export const HttpService = {
    get: async (url: string, options = {}): Promise<any> => {
        return await axiosInstance.get(url, { ...options });
    },
    post: async (url: string, data: any): Promise<any> => {
        return await axiosInstance.post(url, data);
    },
    put: async (url: string, data: any): Promise<any> => {
        return await axiosInstance.put(url, data);
    },
    patch: async (url: string, data: any): Promise<any> => {
        return await axiosInstance.patch(url, data);
    },
    delete: async (url: string): Promise<any> => {
        return await axiosInstance.delete(url);
    },
    isLoading: () => isLoading,
};
