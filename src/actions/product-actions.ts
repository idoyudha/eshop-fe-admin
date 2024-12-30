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
    try {
        // TODO: change to use the actual base url
        const productServiceBaseUrl = getBaseUrl(productService) || 'http://localhost:2001'
        const response = await fetch(`${productServiceBaseUrl}/v1/categories/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log('response', response)

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const categories: CategoryAllResponse = await response.json();
        if (categories && categories.data) {
            return structuredClone(categories.data);
        }

        return [];
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

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