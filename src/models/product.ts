import { ChildCategory } from "./category";

export interface Product {
    id: string;
    sku: string;
    name: string;
    category: ChildCategory;
    image_url: string;
    description: string;
    price: number;
    quantity: number;
    category_id: string;
}
