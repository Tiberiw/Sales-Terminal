import { OrderItem } from "./orderItem";

export interface Order {
    id: number;
    salesPersonId: number;
    customerEmail: string;
    products: OrderItem[];
}