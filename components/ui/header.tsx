import { List, Pen } from "lucide-react";
import Link from "next/link";

export default function Header() {

    return (
        <div className="flex justify-between items-center p-4 bg-white shadow-sm">
            <h1 className="text-xl font-bold">Expense Calculator</h1>
            <nav className="space-x-4">
                <Link href="/new" className="px-4 py-2 items-center text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors duration-200 inline-flex items-center">
                    <Pen className="w-4 h-4 mr-2" />
                    Input
                </Link>
                <Link href="/" className="px-4 py-2 text-gray-700 items-center hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors duration-200 inline-flex items-center">
                    <List className="w-4 h-4 mr-2" />
                    Expense List
                </Link>
            </nav>
        </div>
    )
}