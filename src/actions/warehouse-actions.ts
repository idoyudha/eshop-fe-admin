import { getBaseUrl } from "@/lib/utils";
import { StockMovement, Warehouse, WarehouseProduct } from "@/models/warehouse";

const warehouseService = 'WAREHOUSE_SERVICE';

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