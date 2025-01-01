import { getBaseUrl } from "@/lib/utils"
import { Payment } from "@/models/payment"

const paymentService = 'PAYMENT_SERVICE'

interface PaymentAllResponse {
    code: number
    data: Payment[]
    message: string
}

export async function getAllPaymentsAction(token: string): Promise<Payment[]> {
    const paymentServiceBaseUrl = getBaseUrl(paymentService)
    const response = await fetch(`${paymentServiceBaseUrl}/v1/payments`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const payments: PaymentAllResponse = await response.json();
    if (payments && payments.data) {
        return structuredClone(payments.data);
    }
    return [];
}