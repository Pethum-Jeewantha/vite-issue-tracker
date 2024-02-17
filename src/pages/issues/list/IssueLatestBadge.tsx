import {useEffect, useState} from 'react';
import {Badge} from "@radix-ui/themes";
import {useWebSocket} from "../../../context/WebSocketContext.tsx";
import LocalStorageUtil from "../../../lib/localStorage.lib.ts";
import {BasicUserInfo} from "@asgardeo/auth-react";

const IssueLatestBadge = () => {
    const {message} = useWebSocket();
    const [isVisible, setIsVisible] = useState<boolean>(true);

    useEffect(() => {
        setIsVisible(true);
    }, [message]);

    const handleBadgeClick = () => {
        window.location.reload();
    };

    return (
        <>
            {message?.message.isMessageSent && LocalStorageUtil.getItem<BasicUserInfo>("user")!.username !== message.message.user && isVisible ? <Badge color='yellow' onClick={handleBadgeClick} className="mt-1"><span className="cursor-pointer">Issues Updated</span></Badge> : null}
        </>
    );
};

export default IssueLatestBadge;
