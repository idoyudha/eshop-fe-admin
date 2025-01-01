"use client"

import { useOrderColumns } from "./columns"
import { DataTable } from "@/components/data-table"
import { OrderView } from "@/models/order"

export function ClientDataTable({ orders }: { orders: OrderView[] }) {
    const columns = useOrderColumns()
    return <DataTable columns={columns} data={orders} />
}