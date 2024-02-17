import IssueFormSkeleton from './loading';
import IssueForm from "../components/IssueForm.tsx";
import {useAppSelector} from "../../../store/hooks.ts";

const NewIssuePage = () => {
  const {loading} = useAppSelector((state) => state.issue);

  return loading ? <IssueFormSkeleton /> : <IssueForm />
}

export default NewIssuePage
