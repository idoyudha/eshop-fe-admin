import { getBaseUrl } from "@/lib/utils"
import { Payment } from "@/models/payment"

const paymentService = 'PAYMENT_SERVICE'

interface PaymentAllResponse {
    code: number
    data: Payment[]
    message: string
}

export async function getAllPaymentsAction(accessToken: string): Promise<Payment[]> {
    const paymentServiceBaseUrl = getBaseUrl(paymentService)
    const response = await fetch(`${paymentServiceBaseUrl}/v1/payments`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
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

export interface createPaymentRequest {
    paymentId: string
    status: string
}

export async function updatePaymentStatusAction(data: createPaymentRequest, accessToken: string): Promise<Payment> {
    const paymentServiceBaseUrl = getBaseUrl(paymentService)
    const response = await fetch(`${paymentServiceBaseUrl}/v1/payments`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const payment: Payment = await response.json();
    return structuredClone(payment);
} 