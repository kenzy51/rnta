export interface ServiceDetails {
    id: number;
}

export interface ProjectType {
    name: string;
    budget_type: string;
    budget_amount: string;
    expenses_amount: string;
    agent_commission_type: string;
    agent_commission: string;
    revenue: string;
    profit: string;
    total_labor: string;
    start_date: string;
    end_date: string;
    delete_date: string;
    client: number;
    service: number;
    agent: number;
    service_details: ServiceDetails[];
    id?: number | string;
}