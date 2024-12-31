import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button"
import { MoreHorizontal } from "lucide-react"
import { Product } from "@/models/product"
import { EditProductDialog } from "./edit-product-dialog"

export const ActionProductDropdown = (product : Product) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <EditProductDialog {...product} />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}