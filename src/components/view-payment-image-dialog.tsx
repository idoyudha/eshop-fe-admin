import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from "./ui/dialog";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { DialogTitle } from "@radix-ui/react-dialog";
import Image from "next/image";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { useAuth } from "@/context/auth-context";
import { useToast } from "@/hooks/use-toast";
import { updatePaymentStatusAction } from "@/actions/payment-actions";
import { Loader2 } from "lucide-react";

export const ViewPaymentImageDialog = ({ url, payment_id }: { url: string, payment_id: string }) => {
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const { getAccessToken } = useAuth()
    const { toast } = useToast()

    const handleSubmit = async () => {
        if (!status) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Please select a status"
            })
            return
        }

        const accessToken = await getAccessToken()
        if (!accessToken) {
            return
        }

        setIsLoading(true)
        try {
            await updatePaymentStatusAction({ paymentId: payment_id, status }, accessToken)
            toast({
                title: "Success",
                description: "Payment status updated successfully"
            })
            setOpen(false)
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to update payment status"
            })
        } finally {
            setIsLoading(false)
        }
    }

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
                            width={200} 
                            height={200} 
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Select onValueChange={setStatus} value={status} >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Select Status</SelectLabel>
                                    <SelectItem value="APPROVED">APPROVED</SelectItem>
                                    <SelectItem value="REJECTED">REJECTED</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button
                        onClick={handleSubmit}
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Submit"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}