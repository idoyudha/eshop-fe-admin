import { getBaseUrl } from "@/lib/utils";
import { ParentCategory } from "@/models/category";
import { Product } from "@/models/product";

const productService = 'PRODUCT_SERVICE';

interface CategoryAllResponse {
    code: number;
    data: ParentCategory[];
    message: string;
}

export async function getAllCategoriesAction(): Promise<ParentCategory[]> {
    const productServiceBaseUrl = getBaseUrl(productService)
    const response = await fetch(`${productServiceBaseUrl}/v1/categories/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const categories: CategoryAllResponse = await response.json();
    if (categories && categories.data) {
        return structuredClone(categories.data);
    }
    return [];
}

interface ProductAllResponse {
    code: number;
    data: Product[];
    message: string;
}

export async function getAllProductsAction(): Promise<Product[]> {
    const productServiceBaseUrl = getBaseUrl(productService)
    const response = await fetch(`${productServiceBaseUrl}/v1/products/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const products: ProductAllResponse = await response.json();
    if (products && products.data) {
        return structuredClone(products.data);
    }
    return [];
}

export interface createProductRequest {
    name: string;
    image: File;
    description: string;
    price: number;
    quantity: number;
    category_id: string;
}

export async function createProductAction(data: createProductRequest, accessToken: string): Promise<void> {
    const productServiceBaseUrl = getBaseUrl(productService)
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('image', data.image);
    formData.append('description', data.description);
    formData.append('price', data.price.toString());
    formData.append('quantity', data.quantity.toString());
    formData.append('category_id', data.category_id);

    const response = await fetch(`${productServiceBaseUrl}/v1/products`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
        body: formData,
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `product failed with status: ${response.status}`);
    }
}

export async function updateProductAction(id: string, data: createProductRequest, accessToken: string): Promise<void> {
    const productServiceBaseUrl = getBaseUrl(productService)
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('image', data.image);
    formData.append('description', data.description);
    formData.append('price', data.price.toString());
    formData.append('quantity', data.quantity.toString());
    formData.append('category_id', data.category_id);

    const response = await fetch(`${productServiceBaseUrl}/v1/products/${id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
        body: formData,
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `product failed with status: ${response.status}`);
    }
}