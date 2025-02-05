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

export function AddWarehouseDialog() {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [warehouse, setWarehouse] = useState<createWarehouseRequest>({
        name: "",
        street: "",
        city: "",
        state: "",
        zip_code: ""
    })

    const { isAuthenticated, getAccessToken } = useAuth();
    const { toast } = useToast();
    const router = useRouter()

    const handleAddWarehouse = async () => {
        if (!isAuthenticated) {
            router.push('/auth/login');
            return;
        }

        setLoading(true)

        try {
            const accessToken = await getAccessToken();
            if (!accessToken) {
				return;
			}

            const warehouseData = {
                name: warehouse.name,
                street: warehouse.street,
                city: warehouse.city,
                state: warehouse.state,
                zip_code: warehouse.zip_code
            }

            await createWarehouseAction(accessToken, warehouseData);
            toast({
                title: "Success",
                description: "Warehouse created successfully",
            })
            setLoading(false)
            setOpen(false)
        } catch (error) {
            setLoading(false)
            toast({
                title: "Error",
                description: "Something went wrong",
                variant: "destructive",
            })
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Add Warehouse</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleAddWarehouse}>
                    <DialogHeader>
                        <DialogTitle>Add Warehouse</DialogTitle>
                        <DialogDescription>
                            Add your warehouse here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                className="col-span-3"
                                required
                                value={warehouse.name}
                                onChange={(e) => setWarehouse({ ...warehouse, name: e.target.value })}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="street" className="text-right">
                                Street
                            </Label>
                            <Textarea
                                id="street"
                                name="street"
                                className="col-span-3"
                                required
                                value={warehouse.street}
                                onChange={(e) => setWarehouse({ ...warehouse, street: e.target.value })}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="city" className="text-right">
                                City
                            </Label>
                            <Input
                                id="city"
                                name="city"
                                className="col-span-3"
                                required
                                value={warehouse.city}
                                onChange={(e) => setWarehouse({ ...warehouse, city: e.target.value })}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="state" className="text-right">
                                State
                            </Label>
                            <Input
                                id="state"
                                name="state"
                                className="col-span-3"
                                required
                                value={warehouse.state}
                                onChange={(e) => setWarehouse({ ...warehouse, state: e.target.value })}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="zip_code" className="text-right">
                                Zipcode
                            </Label>
                            <Input
                                id="zip_code"
                                name="zip_code"
                                className="col-span-3"
                                required
                                value={warehouse.zip_code}
                                onChange={(e) => setWarehouse({ ...warehouse, zip_code: e.target.value })}
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
                                "Add Warehouse"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}