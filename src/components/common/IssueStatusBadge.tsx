import { Badge } from '@radix-ui/themes'

enum Status {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
}

const statusMap: Record<Status, {label: string, color: 'red' | 'violet' | 'green'}> = {
    OPEN: {label: 'Open', color: 'red'},
    IN_PROGRESS: {label: 'In Progress', color: 'violet'},
    DONE: {label: 'Closed', color: 'green'},
}

const IssueStatusBadge = ({status}: {status: Status}) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  )
}

export default IssueStatusBadge
