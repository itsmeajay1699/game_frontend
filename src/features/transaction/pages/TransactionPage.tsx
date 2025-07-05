// src/pages/TransactionsPage.tsx

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils"; // if using clsx/cn for dynamic class names
import axiosClient from "@/lib/axios";
import MaxContainer from "@/components/shared/maxContainer";

interface Transaction {
  _id: string;
  wagerAmount: number;
  winAmount: number;
  result: "win" | "partial" | "lose";
  createdAt: string;
}

export default function TransactionsPage() {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["transactions", page],
    queryFn: async () => {
      //   const res = await fetch(`/api/transactions?page=${page}&limit=10`);
      const res = await axiosClient.get(
        `/slots/transactions?page=${page}&limit=10`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!res.data) {
        throw new Error("Failed to fetch transactions");
      }
      console.log("Transactions data:", res.data);
      return res.data;
    },
  });

  return (
    <MaxContainer>
      <div className="bg-[#121212] min-h-screen text-white p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">
          🧾 Transaction History
        </h1>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <table className="w-full table-auto border-collapse border border-gray-600">
              <thead className="bg-[#1f1f1f]">
                <tr>
                  <th className="p-3 border border-gray-600">#</th>
                  <th className="p-3 border border-gray-600">Date</th>
                  <th className="p-3 border border-gray-600">Wager</th>
                  <th className="p-3 border border-gray-600">Win</th>
                  <th className="p-3 border border-gray-600">Result</th>
                </tr>
              </thead>
              <tbody>
                {data.transactions.map((tx: Transaction, i: number) => (
                  <tr key={tx._id} className="text-center">
                    <td className="p-3 border border-gray-600">
                      {(page - 1) * 10 + i + 1}
                    </td>
                    <td className="p-3 border border-gray-600">
                      {format(new Date(tx.createdAt), "MMM d, hh:mm a")}
                    </td>
                    <td className="p-3 border border-gray-600">
                      ₹{tx.wagerAmount}
                    </td>
                    <td className="p-3 border border-gray-600">
                      ₹{tx.winAmount}
                    </td>
                    <td
                      className={cn(
                        "p-3 border border-gray-600 font-bold",
                        tx.result === "win"
                          ? "text-green-400"
                          : tx.result === "partial"
                          ? "text-yellow-400"
                          : "text-red-400"
                      )}
                    >
                      {tx.result.toUpperCase()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-4 py-2 bg-white text-black rounded disabled:opacity-30"
                disabled={page === 1}
              >
                Previous
              </button>
              <span className="px-4 py-2">
                {page} / {data.totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
                className="px-4 py-2 bg-white text-black rounded disabled:opacity-30"
                disabled={page === data.totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </MaxContainer>
  );
}
