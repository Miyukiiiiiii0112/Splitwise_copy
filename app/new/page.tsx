"use client";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
const NewExpensePage = () => {
    const [amount, setAmount] = useState<number | "">("");
    const [title, setTitle] = useState<string>("");
    const [ratio, setRatio] = useState<number>(0);
    const [paidBy, setPaidBy] = useState<"shogo" | "miyuki">("shogo");

    const handleRatioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        if (isNaN(value)) {
            setRatio(0);
            return;
        }
        if (value < 0) {
            setRatio(0);
        }
        else if (value > 100) {
            setRatio(100);
        }
        else {
            setRatio(value);
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="bg-white p-8 rounded-lg shadow-md w-96 space-y-4">
                <Label htmlFor="title">Title</Label>
                <Input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                <Label htmlFor="amount">Amount</Label>
                <Input id="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value ? parseFloat(e.target.value) : "")} />
                <Label htmlFor="ratio">Ratio</Label>
                <Input id="ratio" type="number" value={ratio} onChange={(e) => handleRatioChange(e)} />
                <Label htmlFor="paidBy">Paid By</Label>
                <Select value={paidBy} onValueChange={(value: "shogo" | "miyuki") => setPaidBy(value)}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Paid By" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="shogo">Shogo</SelectItem>
                        <SelectItem value="miyuki">Miyuki</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

export default NewExpensePage;

