import Link from "next/link";

export default function Header() {

    return (
        <div className="flex justify-between items-center p-4 bg-white shadow-sm">
            <h1 className="text-xl font-bold">Expense Calculator</h1>
            <nav className="space-x-4">
                <Link href="/new" className="hover:text-gray-600">Input Page</Link>
                <Link href="/" className="hover:text-gray-600">Expense List</Link>
            </nav>
        </div>
    )
}