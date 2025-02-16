import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getBaseUrl(serviceName: string) {
	if (typeof window === 'undefined') {
        // server-side
        switch(serviceName) {
            case 'PRODUCT_SERVICE':
                return process.env.PRODUCT_SERVICE || '';
            case 'CART_SERVICE':
                return process.env.CART_SERVICE || '';
            case 'ORDER_SERVICE':
                return process.env.ORDER_SERVICE || '';
            case 'PAYMENT_SERVICE':
                return process.env.PAYMENT_SERVICE || '';
            case 'WAREHOUSE_SERVICE':
                return process.env.WAREHOUSE_SERVICE || '';
            default:
                return '';
        }
    }
    
    // client-side
    switch(serviceName) {
        case 'PRODUCT_SERVICE':
            return process.env.NEXT_PUBLIC_PRODUCT_SERVICE || '';
        case 'CART_SERVICE':
            return process.env.NEXT_PUBLIC_CART_SERVICE || '';
        case 'ORDER_SERVICE':
            return process.env.NEXT_PUBLIC_ORDER_SERVICE || '';
        case 'PAYMENT_SERVICE':
            return process.env.NEXT_PUBLIC_PAYMENT_SERVICE || '';
        case 'WAREHOUSE_SERVICE':
            return process.env.NEXT_PUBLIC_WAREHOUSE_SERVICE || '';
        case 'SALES_SERVICE':
            return process.env.NEXT_PUBLIC_SALES_SERVICE || '';
        default:
            return '';
    }
}

type Money = { price: number; currency: string };

export const formatMoney = ({ price, currency }: Money & { locale?: string }) => {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency
	}).format(price);
};