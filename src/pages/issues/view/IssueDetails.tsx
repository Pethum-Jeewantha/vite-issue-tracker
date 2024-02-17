import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import ReactMarkdown from 'react-markdown'
import { IssueStatusBadge } from '../../../components/common'
import {IssueInterface} from "../../../interfaces/issue.interface.ts";

const IssueDetails = ({ issue }: { issue: IssueInterface }) => {
    return (
        <>
            <Heading>{issue.title}</Heading>
            <Flex gap='3' my='2'>
                <IssueStatusBadge status={issue.status} />
                <Text>{new Date(issue.createdAt).toDateString()}</Text>
            </Flex>
            <Card className='prose max-w-full' mt='4'><ReactMarkdown>{issue.description}</ReactMarkdown></Card>
        </>
    )
}

export default IssueDetails
