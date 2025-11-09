import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import SettledButton from "@/components/ui/settledbutton";


export default async function Home({
  searchParams,
}: {
  searchParams: { isSettled?: string };
}) {
  const isSettled = searchParams.isSettled === 'true';
  const supabase = await createClient();
  const { data: expenses } = await supabase
    .from("expense")
    .select("*")
    .eq("is_settled", isSettled);
  if (!expenses) {
    return <div className="p-4">No expenses found.</div>;
  }


  return (
    <div className="p-4">
      <div className="flex mb-4 space-x-4">
        <Link
          href="/?isSettled=false"
          className={`px-4 py-2 rounded-md ${searchParams.isSettled !== 'true' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Unsettled
        </Link>
        <Link
          href="/?isSettled=true"
          className={`px-4 py-2 rounded-md ${searchParams.isSettled === 'true' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
        >
          Settled
        </Link>
        <SettledButton isSettled={isSettled} expenses={expenses} />

      </div>

      <Table>
        <TableCaption>List of {isSettled ? 'Settled' : 'Unsettled'} Expenses</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Ratio</TableHead>
            <TableHead>Paid By</TableHead>
            <TableHead className="hidden md:block">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses?.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell>{expense.title}</TableCell>
              <TableCell>{expense.amount}</TableCell>
              <TableCell>{expense.ratio}</TableCell>
              <TableCell>{expense.paid_by}</TableCell>
              <TableCell className="hidden md:block">
                <span className={`px-2 py-1 rounded-full text-sm ${expense.is_settled ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                  {expense.is_settled ? "Settled" : "Unsettled"}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
