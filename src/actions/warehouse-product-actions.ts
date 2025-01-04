import { getBaseUrl } from "@/lib/utils";
import { WarehouseProduct } from "@/models/warehouse";
import { warehouseService } from "./warehouse-actions";

interface WarehouseProductAllResponse {
    code: number;
    data: WarehouseProduct[];
    message: string;
}

export async function getAllWarehouseProductsAction(accessToken: string): Promise<WarehouseProduct[]> {
    const warehouseServiceBaseUrl = getBaseUrl(warehouseService)
    const response = await fetch(`${warehouseServiceBaseUrl}/v1/warehouse-products`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const warehouseProducts: WarehouseProductAllResponse = await response.json();
    if (warehouseProducts && warehouseProducts.data) {
        return structuredClone(warehouseProducts.data);
    }
    return [];
}