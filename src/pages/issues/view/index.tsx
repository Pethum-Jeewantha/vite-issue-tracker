import { Box, Flex, Grid } from '@radix-ui/themes'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'
import DeleteIssueButton from './DeleteIssueButton'
import AssigneeSelect from './AssigneeSelect'
import {useAppDispatch, useAppSelector} from "../../../store/hooks.ts";
import {useEffect} from "react";
import {fetchById} from "../../../store/features/issue/issue.service.ts";
import API_CONFIG from "../../../config/api.config.ts";
import {useParams} from "react-router-dom";
import LoadingIssueDetailPage from "./loading.tsx";

const endPoint = API_CONFIG.issues;

const IssueDetailPage = () => {
    const {id} = useParams();
    const {issue, loading} = useAppSelector((state) => state.issue);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const payload = {
            url: endPoint + `/${id}`,
            data: {}
        }
        dispatch(fetchById(payload))
    }, []);

    if (loading) return <LoadingIssueDetailPage />;
    if (!issue) return null;

    return (
        <Grid columns={{ initial: '1', sm: '5' }} gap='5'>
            <Box className='md:col-span-4'>
                <IssueDetails issue={issue} />
            </Box>
            <Box>
                <Flex direction='column' gap='4'>
                    <AssigneeSelect issue={issue} />
                    <EditIssueButton issueId={issue.id} />
                    <DeleteIssueButton issueId={issue.id} />
                </Flex>
            </Box>
        </Grid>
    )
}

export default IssueDetailPage
