import { Pencil2Icon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import {Link} from "react-router-dom";

const EditIssueButton = ({ issueId }: { issueId: number }) => {
    return (
        <Button>
            <Pencil2Icon />
            <Link to={`/issues/edit/${issueId}`}>Edit Issue</Link>
        </Button>
    )
}

export default EditIssueButton
