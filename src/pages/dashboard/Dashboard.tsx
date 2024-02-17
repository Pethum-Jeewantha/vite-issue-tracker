import React, {useEffect} from "react";
import {Flex, Grid} from "@radix-ui/themes";
import IssueChart from "./IssueChart.tsx";
import IssueSummary from "./IssueSummary.tsx";
import LatestIssues from "./LatestIssues.tsx";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {fetchSummary} from "../../store/features/issue/issue.service.ts";
import API_CONFIG from "../../config/api.config.ts";

const endPoint = API_CONFIG.issues;

const Dashboard: React.FC = () => {
    const {summary} = useAppSelector((state) => state.issue);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const payload = {
            url: endPoint + "/summary",
            data: {},
        };

        dispatch(fetchSummary(payload));
    }, []);

    return (
        <Grid columns={{ initial: "1", md: "2" }} gap="5">
            <Flex direction="column" gap="5">
                <IssueSummary open={summary?.open ?? 0} inProgress={summary?.inProgress ?? 0} closed={summary?.closed ?? 0} />
                <IssueChart open={summary?.open ?? 0} inProgress={summary?.inProgress ?? 0} closed={summary?.closed ?? 0} />
            </Flex>
            <LatestIssues />
        </Grid>
    )
}

export default Dashboard;
