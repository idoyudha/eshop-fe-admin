import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getBaseUrl(serviceName: string) {
	if (typeof window === 'undefined') {
		// server-side
    	return process.env[serviceName] || '';
	}
	// client-side
	const nextPublicName = `NEXT_PUBLIC_${serviceName}`;
 	return process.env[nextPublicName] || '';
}