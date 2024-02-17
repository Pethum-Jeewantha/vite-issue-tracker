import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import {IssueInterface, Status} from "../../interfaces/issue.interface.ts";
import {Link as ReactLink} from "react-router-dom";
import {IssueStatusBadge, Link} from "../../components/common";
import {useAppSelector} from "../../store/hooks.ts";
import {formatDate} from "../../lib/helpers.lib.ts";

export interface IssueQuery {
  status: Status;
  orderBy: keyof IssueInterface;
  page: string;
}

interface Props {
  searchParams?: IssueQuery
}

const IssueTable = ({ searchParams }: Props) => {
    const {issues} = useAppSelector((state) => state.issue);

    // const queryString = searchParams.toString();

  return (
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
                <Table.ColumnHeaderCell
                    key={column.value}
                    className={column.className}
                >
                    {column.label}
                </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
              <Table.Row key={issue.id}>
                <Table.Cell>
                  <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                  <div className="block md:hidden">
                    <IssueStatusBadge status={issue.status} />
                  </div>
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  <IssueStatusBadge status={issue.status} />
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  {formatDate(issue.createdAt, "dd-MM-yyyy")}
                </Table.Cell>
              </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
  );
};

const columns: {
  label: string;
  value: keyof IssueInterface;
  className?: string;
}[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];

export const columnNames = columns.map((column) => column.value);

export default IssueTable;
