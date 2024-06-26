/* eslint-disable @typescript-eslint/no-explicit-any */

import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import LocalStorageUtil from "./localStorage.lib.ts";

export const currentEnvironment: Environment = "prod";

type Environment = "local" | "stage" | "prod";

interface Variable {
    baseEndPoint: string;
    url: string;
    asgardeoClientId: string;
    webSocketEndPoint: string;
}

const environmentVariableMapping: Record<Environment, Variable> = {
    prod: {
        "baseEndPoint": "https://e16e8c9b-7404-4e21-a207-533f66f99c44-prod.e1-us-east-azure.choreoapis.dev/yiiu/api/issue-tracker-api-efc/v1.0/api",
        "url": "https://2101ab7b-9fe9-47ff-8411-047eaca7c2f5.e1-us-east-azure.choreoapps.dev",
        "asgardeoClientId": "bXqczeibqNQUcHndWZG2GupfHlIa",
        "webSocketEndPoint": "ws://localhost:3200/ws"
    },
    stage: {
        "baseEndPoint": "https://e16e8c9b-7404-4e21-a207-533f66f99c44-dev.e1-us-east-azure.choreoapis.dev/yiiu/api/issue-tracker-api-efc/v1.0/api",
        "url": "https://6166c516-dcf1-4b12-93b6-07fe52b06599.e1-us-east-azure.choreoapps.dev",
        "asgardeoClientId": "JPftyZTFMdtvelgYuSSjUt3wuBUa",
        "webSocketEndPoint": "ws://localhost:3200/ws"
    },
    local: {
        "baseEndPoint": "http://localhost:3900/api",
        "url": "http://localhost:5173",
        "asgardeoClientId": "JPftyZTFMdtvelgYuSSjUt3wuBUa",
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
