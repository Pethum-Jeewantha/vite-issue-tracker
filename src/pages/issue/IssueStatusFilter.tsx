import {Select} from "@radix-ui/themes";
import {useSearchParams} from "react-router-dom";
import {Status} from "../../interfaces/issue.interface.ts";

const statuses: { label: string; value: Status | "ALL" }[] = [
  { label: "All", value: "ALL" },
  { label: "Open", value: Status.OPEN },
  { label: "In Progress", value: Status.IN_PROGRESS },
  { label: "Closed", value: Status.DONE },
];

const IssueStatusFilter = () => {
    const [searchParams, setSearchParams] = useSearchParams();

  return (
    <Select.Root defaultValue={searchParams.get('status') || 'ALL'} onValueChange={(status => {
      const params = new URLSearchParams();
      if(status) params.append('status', status == 'ALL' ? '' : status);
      if(searchParams.get('orderBy')) params.append('orderBy', searchParams.get('orderBy')!);

      const query = params.size ? '?' + params.toString() : '';
      setSearchParams(query);
    })}>
      <Select.Trigger placeholder="Filter by status" />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.value} value={status.value}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
