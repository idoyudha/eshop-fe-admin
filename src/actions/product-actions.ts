import { getBaseUrl } from "@/lib/utils";
import { Product } from "@/models/product";

const productService = 'PRODUCT_SERVICE';

interface ProductAllResponse {
    code: number;
    data: Product[];
    message: string;
}

export async function getAllProductsAction(): Promise<Product[]> {
    try {
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
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}