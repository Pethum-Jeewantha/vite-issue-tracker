import React, {createContext, useContext, useEffect, useState} from 'react';
import {envVariables} from "../lib/http.lib.ts";

interface Message {
    message: {
        isMessageSent: boolean;
        user: string;
    }
}

interface IWebSocketContext {
    sendMessage: (message: Message) => void;
    message: Message | undefined;
}

const WebSocketContext = createContext<IWebSocketContext | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export function useWebSocket() {
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error('useWebSocket must be used within a WebSocketProvider');
    }
    return context;
}

interface WebSocketProviderProps {
    children: React.ReactNode;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
    const [webSocket, setWebSocket] = useState<WebSocket>();
    const [message, setMessage] = useState<Message | undefined>(undefined);

    useEffect(() => {
        if (!webSocket) {
            const ws = new WebSocket(envVariables.webSocketEndPoint);
            ws.onopen = () => console.log('WebSocket Connected');

            ws.onmessage = (event) => {
                const data: Message = JSON.parse(event.data);
                setMessage(data);
            };

            ws.onclose = () => console.log('WebSocket Disconnected');

            setWebSocket(ws);

            return () => {
                ws.close();
            };
        }
    }, []);

    const sendMessage = (message: Message) => {
        if (webSocket && webSocket.readyState === WebSocket.OPEN) {
            webSocket.send(JSON.stringify(message));
        } else {
            console.error('WebSocket not connected');
        }
    };

    return (
        <WebSocketContext.Provider value={{ sendMessage, message }}>
            {children}
        </WebSocketContext.Provider>
    );
};
