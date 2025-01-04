"use client"

import { ActionPaymentDropdown } from "@/components/action-payment-dropdown"
import { Payment } from "@/models/payment"
import { ColumnDef } from "@tanstack/react-table"

export function usePaymentColumns() {
    const columns: ColumnDef<Payment>[] = [
        {
            accessorKey: "id",
            header: "ID",
        },
        {
            accessorKey: "orderId",
            header: "Order ID",
        },
        {
            accessorKey: "status",
            header: "Payment Status",
        },
        {
            accessorKey: "note",
            header: "Note",
        },
        {
            accessorKey: "createdAt",
            header: "Created At",
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const payment = row.original
                return <ActionPaymentDropdown {...payment} />
            },
        }
    ]
    
    return columns
}