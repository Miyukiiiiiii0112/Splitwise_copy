"use client";

import { createClient } from "@/utils/supabase/client";
import { Button } from "./button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SettledButton({ isSettled, expenses }: { isSettled: boolean, expenses: any[] }) {
    const supabase = createClient();
    const router = useRouter();
    const totalPrice = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const miyukiShouldPay = expenses
        .reduce((sum, expense) => {
            const ratio = expense.paid_by === "shogo" ? 1 - expense.ratio : expense.ratio;
            return sum + expense.amount * ratio;
        }, 0);
    const miyukiActuallyPays = expenses.filter(expense => expense.paid_by === "miyuki")
        .reduce((sum, expense) => sum + expense.amount, 0);
    let message = "";
    if (miyukiShouldPay > miyukiActuallyPays) {
        message = `Miyuki needs to pay Shogo ${miyukiShouldPay - miyukiActuallyPays} yen.`;
    }
    else if (miyukiShouldPay < miyukiActuallyPays) {
        message = `Shogo needs to pay Miyuki ${miyukiActuallyPays - miyukiShouldPay} yen.`;
    }
    else {
        message = "All settled up!";
    }
    const handleSettle = async () => {
        if (expenses.length === 0) {
            toast("No unsettled expenses to settle.");
            return;
        }
        const { error } = await supabase.from("expense").update({ is_settled: true }).eq("is_settled", false);
        if (error) {
            toast.error("Failed to settle expenses:" + error.message);
        } else {
            toast.success("Expenses settled successfully.");
            router.refresh();
        }
    };

    return (
        !isSettled ? (
            <div className="flex items-center space-x-4">
                <span className="hidden md:block">Total: {totalPrice}</span>
                <span className="hidden md:block">Miyuki Should Pay: {miyukiShouldPay}</span>
                <span className="hidden md:block">Miyuki Actually Pays: {miyukiActuallyPays}</span>
                <AlertDialog>
                    <AlertDialogTrigger asChild><Button>Settle</Button></AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                {message}
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleSettle}>Settle up</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        ) : (
            null
        )
    );
}
