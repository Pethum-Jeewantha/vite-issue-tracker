export interface IssueInterface {
    id: number;
    title: string;
    description: string;
    status: Status;
    created_at: string;
    updated_at: string;
    assignedToUserId?: string;
}

export enum Status {
    OPEN = "OPEN",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE",
}
