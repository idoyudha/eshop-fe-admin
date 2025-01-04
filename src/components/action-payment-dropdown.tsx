import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button"
import { MoreHorizontal } from "lucide-react"
import { Payment } from "@/models/payment"
import { ViewPaymentImageDialog } from "./view-payment-image-dialog"

export const ActionPaymentDropdown = (payment : Payment) => {
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
                <ViewPaymentImageDialog url={payment.imageUrl} payment_id={payment.id} />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}