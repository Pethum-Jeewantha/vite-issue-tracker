import {Card, Flex, Text} from "@radix-ui/themes";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {fetchAll} from "../../store/features/application/application.service.ts";
import API_CONFIG from "../../config/api.config.ts";
import {useEffect} from "react";

const endPoint = API_CONFIG.application;

const ApplicationData = () => {
    const {data} = useAppSelector((state) => state.application);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const payload = {
            url: endPoint,
            data: {},
        };

        dispatch(fetchAll(payload));
    }, []);

    if (!data || !data.length) return undefined;

    return (
        <Card>
            <Flex direction="column" gap='1'>
                <Text size='5' className="font-bold">Daily Analysis</Text>
                <Text size='1'>Last Date: {data.find(d => d.name === "app.last_analyze_date")?.value}</Text>
                <Text size='3'>{data.find(d => d.name === "app.analyze")?.value}</Text>
            </Flex>
        </Card>
    )
}

export default ApplicationData;
