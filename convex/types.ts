export interface Payment {
    from: string;
    to: string;
    amount: number;
    purpose?: string;
}

export interface Property {
    name: string;
    address: string;
    owner: string;
    rent: number;
    securityDeposit: number;
    tenants: Tenant[];
}

export interface User {
    type: string;
    name: string;
    email: string;
    password: string;
    phone: string;
}

export interface Tenant {
    propertyId: string;
    userId: string;
}
