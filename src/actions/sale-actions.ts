import { getBaseUrl } from "@/lib/utils"
import { Sale } from "@/models/sales"

const salesService = 'SALES_SERVICE'

interface SalesResponse {
    code: number
    data: Sale[]
    count: number
    message: string
}

export async function getSalesAction(accessToken: string, skip: number, limit: number): Promise<{ data: Sale[], count: number }>  {
    const salesServiceBaseUrl = getBaseUrl(salesService)
    const response = await fetch(`${salesServiceBaseUrl}/v1/sales?skip=${skip}&limit=${limit}`, {
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
        return { data: structuredClone(sales.data), count: sales.count };
    }
    return { data: [], count: 0 };
}