import { getBaseUrl } from "@/lib/utils"
import { OrderView } from "@/models/order"

const orderService = 'ORDER_SERVICE'

interface OrdersResponse {
    code: number
    data: OrderView[]
    message: string
}

export async function getOrdersAction(accessToken: string): Promise<OrderView[]> {
    const orderServiceBaseUrl = getBaseUrl(orderService)
    const response = await fetch(`${orderServiceBaseUrl}/v1/orders`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const orders: OrdersResponse = await response.json();
    if (orders && orders.data) {
        return structuredClone(orders.data);
    }
    return [];
}