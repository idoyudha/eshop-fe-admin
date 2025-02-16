"use client"

import { useWarehouseProductColumns } from "./columns"
import { DataTable } from "@/components/data-table"
import { Warehouse, WarehouseProduct } from "@/models/warehouse"

export function ClientDataTable({ warehouseProducts, loading }: { warehouseProducts: WarehouseProduct[], loading: boolean }) {
    const columns = useWarehouseProductColumns()
    return (
        <DataTable 
            columns={columns} 
            data={warehouseProducts} 
            isLoading={loading}
        />
    )
}