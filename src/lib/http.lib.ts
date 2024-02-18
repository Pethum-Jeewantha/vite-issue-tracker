import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import LocalStorageUtil from "./localStorage.lib.ts";

export const currentEnvironment: Environment = "stage";

type Environment = "local" | "stage" | "prod";

interface Variable {
    baseEndPoint: string;
    url: string;
    asgardeoClientId: string;
    webSocketEndPoint: string;
}

const environmentVariableMapping: Record<Environment, Variable> = {
    prod: {
        "baseEndPoint": "",
        "url": "",
        "asgardeoClientId": "",
        "webSocketEndPoint": "ws://localhost:3200/ws"
    },
    stage: {
        "baseEndPoint": "https://e16e8c9b-7404-4e21-a207-533f66f99c44-dev.e1-us-east-azure.choreoapis.dev/yiiu/api/issue-tracker-api-efc/v1.0/api",
        "url": "https://399f54c4-1326-49cf-b555-612ec896e7e6.e1-us-east-azure.choreoapps.dev",
        "asgardeoClientId": "rGoSAN08XkfZ18AZNwhjAo94T8Ma",
        "webSocketEndPoint": "ws://localhost:3200/ws"
    },
    local: {
        "baseEndPoint": "http://localhost:3900/api",
        "url": "http://localhost:5173",
        "asgardeoClientId": "3Pk_2oQLDK6OmS11tXD3OlNxKpka",
        "webSocketEndPoint": "ws://localhost:3200/ws"
    }
}

export const envVariables: Variable = {
    "baseEndPoint": environmentVariableMapping[currentEnvironment].baseEndPoint,
    "url": environmentVariableMapping[currentEnvironment].url,
    "asgardeoClientId": environmentVariableMapping[currentEnvironment].asgardeoClientId,
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
