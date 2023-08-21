export interface PaymentType {
    id?: string | number;
    invoice_number: string;
    legal_person: string;
    payment_purpose: string;
    amount: string;
    is_paid: boolean;
    payment_date: string;
    billing_date:string;
    create_date: string;
    close_date: string;
    comment: string;
    deleted: boolean;
    deleted_comment: string;
    project: number;
}