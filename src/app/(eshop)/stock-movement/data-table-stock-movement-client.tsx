"use client"

import { DataTable } from "@/components/data-table"
import { StockMovement, Warehouse, WarehouseProduct } from "@/models/warehouse"
import { useStockMovementColumns } from "./column"

export function ClientDataTable({ stockMovements, loading }: { stockMovements: StockMovement[], loading: boolean }) {
    const columns = useStockMovementColumns()
    return (
        <DataTable 
            columns={columns} 
            data={stockMovements}
            isLoading={loading}
        />
    )
}