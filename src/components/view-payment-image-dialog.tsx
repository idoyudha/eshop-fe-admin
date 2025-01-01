import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from "./ui/dialog";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { DialogTitle } from "@radix-ui/react-dialog";
import Image from "next/image";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export const ViewPaymentImageDialog = ({ url, payment_id }: { url: string, payment_id: string }) => {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => {
                    e.preventDefault()
                    setOpen(true)
                }}>
                    View Payment Image
                </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Payment Image</DialogTitle>
                    <DialogDescription>
                        View this payment image and decide next action, between APPROVED or REJECTED
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Image 
                            src={url} 
                            alt="Payment Image" 
                            width={100} height={100} 
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        {/* TODO: form for approved or rejected */}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}