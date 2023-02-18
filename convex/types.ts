export interface Payment {
    from: string;
    to: string;
    amount: number;
    purpose?: string;
}
