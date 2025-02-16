"use client"

import { useWarehouseColumns } from "./columns"
import { DataTable } from "@/components/data-table"
import { Warehouse } from "@/models/warehouse"

export function ClientDataTable({ warehouses, loading }: { warehouses: Warehouse[], loading: boolean }) {
    const columns = useWarehouseColumns()
    return (
        <DataTable 
            columns={columns} 
            data={warehouses}
            isLoading={loading}
        />
    )
}