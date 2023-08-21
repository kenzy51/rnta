export interface ProjectLaborType {
    project_name: string;
    // time_spent: string | any;
    hours: number;
    minutes: number;
    amount: string;
    comment: string;
    project: number;
    employee: number;
    id?: number | string;
}