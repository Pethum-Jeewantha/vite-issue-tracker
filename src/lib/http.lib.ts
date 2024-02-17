import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

export const currentEnvironment: Environment = "local";

type Environment = "local" | "stage" | "prod";

interface Variable {
    baseEndPoint: string;
}

const environmentVariableMapping: Record<Environment, Variable> = {
    prod: {
        "baseEndPoint": "",
    },
    stage: {
        "baseEndPoint": "",
    },
    local: {
        "baseEndPoint": "http://localhost:32000/api",
    }
}

export const envVariables: Variable = {
    "baseEndPoint": environmentVariableMapping[currentEnvironment].baseEndPoint,
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
    const token = localStorage.getItem("@token");
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
