import { getBaseUrl } from "@/lib/utils";
import { StockMovement } from "@/models/warehouse";
import { warehouseService } from "./warehouse-actions";

interface StockMovementAllResponse {
    code: number;
    data: StockMovement[];
    message: string;
}

export async function getAllStockMovementsAction(accessToken: string): Promise<StockMovement[]> {
    const warehouseServiceBaseUrl = getBaseUrl(warehouseService)
    const response = await fetch(`${warehouseServiceBaseUrl}/v1/stock-movements`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const stockMovements: StockMovementAllResponse = await response.json();
    if (stockMovements && stockMovements.data) {
        return structuredClone(stockMovements.data);
    }
    return [];
}

export async function createStockMovementInAcion(accessToken: string, stockMovement: StockMovement): Promise<void> {
    const warehouseServiceBaseUrl = getBaseUrl(warehouseService)
    const response = await fetch(`${warehouseServiceBaseUrl}/v1/stock-movements`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(stockMovement),
    });
    
    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `stock movement failed with status: ${response.status}`);
    }
}