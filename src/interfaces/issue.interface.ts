export interface IssueInterface {
    id: number;
    title: string;
    description: string;
    status: Status;
    createdAt: Date;
    updatedAt?: Date;
    assignedToUserId?: string;
}

export enum Status {
    OPEN = "OPEN",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE",
}
