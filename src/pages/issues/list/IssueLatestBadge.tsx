import {useEffect, useState} from 'react';
import {Badge} from "@radix-ui/themes";
import {useWebSocket} from "../../../context/WebSocketContext.tsx";

const IssueLatestBadge = () => {
    const {message} = useWebSocket();
    // const { data: session } = useSession();

    const [isVisible, setIsVisible] = useState<boolean>(true);

    useEffect(() => {
        setIsVisible(true);
    }, [message]);

    const handleBadgeClick = () => {
        window.location.reload();
    };

    return (
        <>
            {message?.message.isMessageSent && isVisible ? <Badge color='yellow' onClick={handleBadgeClick} className="mt-1"><span className="cursor-pointer">Issues Updated</span></Badge> : null}
        </>
    );
};

export default IssueLatestBadge;
