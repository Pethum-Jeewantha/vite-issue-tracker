import { Button, Flex } from '@radix-ui/themes'
import IssueStatusFilter from './IssueStatusFilter.tsx'
import { Link } from 'react-router-dom'

function IssueActions() {
    return (
        <Flex justify='between'>
            <IssueStatusFilter />
            <Button><Link to='/issues/new'>New Issue</Link></Button>
        </Flex>
    )
}

export default IssueActions
