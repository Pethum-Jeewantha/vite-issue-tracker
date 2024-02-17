import {Table} from "@radix-ui/themes";
import {IssueInterface, Status} from "../../../interfaces/issue.interface.ts";
import {IssueStatusBadge, Link} from "../../../components/common";
import {useAppSelector} from "../../../store/hooks.ts";
import LoadingIssuesTable from "./loading.tsx";

export interface IssueQuery {
    status: Status;
    orderBy: keyof IssueInterface;
    page: string;
}

const IssueTable = () => {
    const {issues, loading} = useAppSelector((state) => state.issue);

    if (loading) return <LoadingIssuesTable />;

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
                {issues.list.map((issue) => (
                    <Table.Row key={issue.id}>
                        <Table.Cell>
                            <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                            <div className="block md:hidden">
                                <IssueStatusBadge status={issue.status}/>
                            </div>
                        </Table.Cell>
                        <Table.Cell className="hidden md:table-cell">
                            <IssueStatusBadge status={issue.status}/>
                        </Table.Cell>
                        <Table.Cell className="hidden md:table-cell">
                            {new Date(issue.createdAt).toDateString()}
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
    {label: "Issue", value: "title"},
    {label: "Status", value: "status", className: "hidden md:table-cell"},
    {label: "Created", value: "createdAt", className: "hidden md:table-cell"},
];

export const columnNames = columns.map((column) => column.value);

export default IssueTable;
