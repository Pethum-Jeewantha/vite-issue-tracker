import {Card, Flex, Heading, Table } from "@radix-ui/themes";
import {useAppSelector} from "../../store/hooks.ts";
import {IssueInterface} from "../../interfaces/issue.interface.ts";
import {Link} from "react-router-dom";
import {IssueStatusBadge} from "../../components/common";

const LatestIssues = () => {
    const {summary} = useAppSelector((state) => state.issue);

    if (!summary) return null;

    return (
    <Card>
      <Heading size='4' mb='5'>Latest Issues</Heading>
      <Table.Root>
        <Table.Body>
          {summary.latestIssues.map((issue: IssueInterface) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex justify="between">
                  <Flex direction="column" align="start" gap="2">
                    <Link to={`/issues/${issue.id}`}>{issue.title}</Link>
                    <IssueStatusBadge status={issue.status} />
                  </Flex>
                  {/*{issue && (
                    <Avatar
                      src='/vite.svg'
                      fallback="?"
                      size="2"
                      radius="full"
                    />
                  )}*/}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
