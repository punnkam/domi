export interface Payment {
    from: string;
    to: string;
    amount: number;
    purpose?: string;
}

export interface Property {
    name: string;
    type: string;
    address: string;
    owner: string;
    rent: number;
    tenants: string[];
    imageURI: string;
}

export interface User {
    type: string;
    name: string;
    email: string;
    password: string;
    phone: string;
}
