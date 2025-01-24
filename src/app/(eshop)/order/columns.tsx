"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { formatMoney } from "@/lib/utils";
import { OrderView } from "@/models/order"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns";

export function useOrderColumns() {
    const columns: ColumnDef<OrderView>[] = [
        {
            accessorKey: "id",
            header: "ID",
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.original.status;
                switch (status) {
                    case "PENDING":
                    case "ON_DELIVERY":
                        return <Badge variant="secondary">{status}</Badge>;
                    case "PAYMENT_ACCEPTED":
                    case "DELIVERED":
                        return <Badge variant="outline">{status}</Badge>;
                    default:
                        return <Badge variant="destructive">{status}</Badge>;
                }
            }
        },
        {
            accessorKey: "total_price",
            header: "Total Price",
            cell: ({ row }) => {
                const totalPrice = row.original.total_price;
                return formatMoney({ price: totalPrice, currency: "USD" });
            }
        },
        {
            accessorKey: "payment_status",
            header: "Payment Status",
            cell: ({ row }) => {
                const paymentStatus = row.original.payment_status;
                switch (paymentStatus) {
                    case "PENDING":
                        return <Badge variant="secondary">{paymentStatus}</Badge>;
                    case "APPROVED":
                        return <Badge>{paymentStatus}</Badge>;
                    case "REJECTED":
                        return <Badge variant="destructive">{paymentStatus}</Badge>;
                    default:
                        return <p>-</p>
                }
            },
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
                const createdAt = row.original.created_at;
                return format(new Date(createdAt), "dd MMM yyyy, hh:mm:ss a");
            },
            enableSorting: true,
            sortingFn: (rowA, rowB, columnId) => {
                const dateA = new Date(rowA.original.created_at);
                const dateB = new Date(rowB.original.created_at);
                return dateA.getTime() - dateB.getTime();
            },
        }
    ]

    return columns
}