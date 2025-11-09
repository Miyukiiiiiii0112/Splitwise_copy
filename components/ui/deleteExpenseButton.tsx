"use client"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
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
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
export function DeleteExpenseButton({ expenseId }: { expenseId: number }) {
    const supabase = createClient();
    const router = useRouter();
    const handleDelete = async () => {
        const { error } = await supabase.from("expense").delete().eq("id", expenseId);
        if (error) {
            console.error("Error deleting expense:", error);
        } else {
            toast.success("Expense deleted successfully");
            router.refresh();
        }
    }


    return (
        <AlertDialog>
            <AlertDialogTrigger asChild><Button variant="destructive"><Trash2 /></Button></AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the expense.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => { handleDelete() }}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}