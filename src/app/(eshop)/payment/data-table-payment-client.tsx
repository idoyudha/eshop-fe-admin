"use client"

import { usePaymentColumns } from "./columns"
import { DataTable } from "@/components/data-table"
import { Payment } from "@/models/payment"

export function ClientDataTable({ payments }: { payments: Payment[] }) {
    const columns = usePaymentColumns()
    return <DataTable columns={columns} data={payments} />
}