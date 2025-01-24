"use client"

import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { ActionPaymentDropdown } from "@/components/action-payment-dropdown"
import { Payment } from "@/models/payment"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns";

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
            accessorKey: "created_at",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Created At
                        <ArrowUpDown />
                    </Button>
                )
            },
            cell: ({ row }) => {
                const createdAt = row.original.createdAt;
                return format(new Date(createdAt), "dd MMM yyyy, hh:mm:ss a");
            },
            enableSorting: true,
            sortingFn: (rowA, rowB, columnId) => {
                const dateA = new Date(rowA.original.createdAt);
                const dateB = new Date(rowB.original.createdAt);
                return dateA.getTime() - dateB.getTime();
            },
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