import {Card, Flex, Text} from "@radix-ui/themes";
import {Status} from "../../interfaces/issue.interface.ts";
import {Link} from "react-router-dom";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const containers: { label: string; value: number; status: Status }[] = [
    { label: "Open Issues", value: open, status: Status.OPEN },
    { label: "In Progress Issues", value: inProgress, status: Status.IN_PROGRESS },
    { label: "Closed Issues", value: closed, status: Status.DONE },
  ];

  return (
    <Flex gap='4'>
      {containers.map((container) => (
        <Card key={container.label}>
          <Flex direction="column" gap='1'>
            <Link className="text-sm font-medium" to={`/issues/list?status=${container.status}`}>
              {container.label}
            </Link>
            <Text size='5' className="font-bold">{container.value}</Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
