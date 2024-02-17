import IssueTable from "./IssueTable.tsx";
import {Pagination} from "../../components/common";
import {Flex} from "@radix-ui/themes";
import {useSearchParams} from "react-router-dom";
import IssueActions from "./IssueActions.tsx";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {useEffect} from "react";
import {fetchAll} from "../../store/features/issue/issue.service.ts";
import API_CONFIG from "../../config/api.config.ts";

const pageSize = 10;
const endPoint = API_CONFIG.issues;

const Issue = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const {issues} = useAppSelector((state) => state.issue);


    const page = parseInt(searchParams.get("page")!) || 1;

    useEffect(() => {
        const offset = (page - 1) * pageSize;

        const payload = {
            url: `${endPoint}?pagelimit=${pageSize}&offset=${offset}`,
            data: {},
        };

        dispatch(fetchAll(payload))
    }, [page]);


    return (
        <Flex direction='column' gap='3'>
            <IssueActions/>
            <IssueTable />
            <Pagination
                pageSize={pageSize}
                currentPage={page}
                itemCount={issues.total}
            />
        </Flex>
    )
}

export default Issue;
