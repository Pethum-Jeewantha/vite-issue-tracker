import IssueForm from "../components/IssueForm.tsx";
import {useAppDispatch, useAppSelector} from "../../../store/hooks.ts";
import IssueFormSkeleton from "./loading.tsx";
import {useEffect} from "react";
import {fetchById} from "../../../store/features/issue/issue.service.ts";
import {useParams} from "react-router-dom";
import API_CONFIG from "../../../config/api.config.ts";

const endPoint = API_CONFIG.issues;

const EditIssuePage = () => {
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

    if (loading) return <IssueFormSkeleton />;
    if (!issue) return null;

    return (
        <IssueForm issue={issue}/>
    )
}

export default EditIssuePage
