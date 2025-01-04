"use client"

import { createWarehouseAction, createWarehouseRequest } from "@/actions/warehouse-actions";
import { useAuth } from "@/context/auth-context";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Loader2 } from "lucide-react";
import { createStockMoveInRequest, createStockMovementInAcion } from "@/actions/stock-movement";

export function AddStockMoveInDialog() {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [movein, setMoveIn] = useState<createStockMoveInRequest>({
        product_id: "",
        product_name: "",
        quantity: 0,
        from_warehouse_id: "",
        to_warehouse_id: ""
    })

    const { isAuthenticated, getAccessToken } = useAuth();
    const { toast } = useToast();
    const router = useRouter()

    const handleAddMoveIn = async () => {
        if (!isAuthenticated) {
            router.push('/auth/login');
            return;
        }

        try {
            const accessToken = await getAccessToken();
            if (!accessToken) {
				return;
			}

            const moveInData = {
                product_id: movein.product_id,
                product_name: movein.product_name,
                quantity: movein.quantity,
                from_warehouse_id: movein.from_warehouse_id,
                to_warehouse_id: movein.to_warehouse_id
            }

            await createStockMovementInAcion(accessToken, moveInData);
            toast({
                title: "Success",
                description: "Movement In created successfully",
            })
            setOpen(false)
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Add Movement In</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleAddMoveIn}>
                    <DialogHeader>
                        <DialogTitle>Add Stock Move In</DialogTitle>
                        <DialogDescription>
                            Add your stock movement in (between warehouse) here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="product_id" className="text-right">
                                Product ID
                            </Label>
                            <Input
                                id="product_id"
                                name="product_id"
                                className="col-span-3"
                                required
                                value={movein.product_id}
                                onChange={(e) => setMoveIn({ ...movein, product_id: e.target.value })}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="product_name" className="text-right">
                                Product Name
                            </Label>
                            <Input
                                id="product_name"
                                name="product_name"
                                className="col-span-3"
                                required
                                value={movein.product_name}
                                onChange={(e) => setMoveIn({ ...movein, product_name: e.target.value })}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="quantity" className="text-right">
                                Quantity
                            </Label>
                            <Input
                                id="quantity"
                                name="quantity"
                                type="number"
                                className="col-span-3"
                                required
                                value={movein.quantity}
                                onChange={(e) => setMoveIn({ ...movein, quantity: parseInt(e.target.value) || 0 })}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="from_warehouse_id" className="text-right">
                                From Warehouse ID
                            </Label>
                            <Input
                                id="from_warehouse_id"
                                name="from_warehouse_id"
                                className="col-span-3"
                                required
                                value={movein.from_warehouse_id}
                                onChange={(e) => setMoveIn({ ...movein, from_warehouse_id: e.target.value })}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="to_warehouse_id" className="text-right">
                                To Warehouse ID
                            </Label>
                            <Input
                                id="to_warehouse_id"
                                name="to_warehouse_id"
                                className="col-span-3"
                                required
                                value={movein.to_warehouse_id}
                                onChange={(e) => setMoveIn({ ...movein, to_warehouse_id: e.target.value })}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button 
                            type="submit" 
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                </>
                            ) : (
                                "Move It"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}