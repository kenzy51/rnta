export interface ExpenseType {
    id?: string | number;
    stock_market: string;
    month_request: string;
    budget_request: string;
    spent: string;
    commission: string;
    amount: string;
    project_comment: string;
    expense_comment: string;
    paid_date: string;
    deleted: boolean;
    deleted_comment: string;
    project: number;
    project_name?:string;
}