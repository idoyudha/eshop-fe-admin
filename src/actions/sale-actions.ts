import { getBaseUrl } from "@/lib/utils"
import { Sale } from "@/models/sales"

const salesService = 'SALES_SERVICE'

interface SalesResponse {
    code: number
    data: Sale[]
    message: string
}

export async function getSalesAction(accessToken: string): Promise<Sale[]> {
    const salesServiceBaseUrl = getBaseUrl(salesService)
    const response = await fetch(`${salesServiceBaseUrl}/v1/sales`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const sales: SalesResponse = await response.json();
    if (sales && sales.data) {
        return structuredClone(sales.data);
    }
    return [];
}