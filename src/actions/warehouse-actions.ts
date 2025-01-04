import { getBaseUrl } from "@/lib/utils";
import { Warehouse } from "@/models/warehouse";

export const warehouseService = 'WAREHOUSE_SERVICE';

interface WarehouseAllResponse {
    code: number;
    data: Warehouse[];
    message: string;
}

export async function getAllWarehousesAction(accessToken: string): Promise<Warehouse[]> {
    const warehouseServiceBaseUrl = getBaseUrl(warehouseService)
    const response = await fetch(`${warehouseServiceBaseUrl}/v1/warehouse`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const warehouses: WarehouseAllResponse = await response.json();
    if (warehouses && warehouses.data) {
        return structuredClone(warehouses.data);
    }
    return [];
}

interface WarehouseResponse {
    code: number;
    data: Warehouse;
    message: string;
}

export interface createWarehouseRequest {
    name: string;
    street: string;
    city: string;
    state: string;
    zip_code: string;
}   

export async function createWarehouseAction(accessToken: string, request: createWarehouseRequest): Promise<void> {
    const warehouseServiceBaseUrl = getBaseUrl(warehouseService)
    const response = await fetch(`${warehouseServiceBaseUrl}/v1/warehouse`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(request),
    });
    
    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `warehouse failed with status: ${response.status}`);
    }
}