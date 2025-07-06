import MaxContainer from "@/components/shared/maxContainer";
import { useAppContext } from "@/context/AppContext";
import axiosClient from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function LogoHeader() {
  const { balance, setBalance } = useAppContext();

  const { data, isLoading } = useQuery({
    queryKey: ["balance"],
    queryFn: async () => {
      const res = await axiosClient.get("/balance", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return res.data;
    },
  });

  useEffect(() => {
    if (data?.balance !== undefined) {
      setBalance(data.balance);
    }
  }, [data]);

  return (
    <header className="fixed w-full text-white py-4 shadow-md z-50">
      <MaxContainer>
        <div className="flex md:items-center items-start justify-between">
          <img
            src="https://bigbaazi.imgix.net/bigboost-logo-header.svg"
            alt="Logo"
            className="h-6 md:h-8 lg:h-10 relative top-[5px]"
          />

          <div className="flex items-center justify-end flex-wrap gap-4">
            <div className="text-lg font-semibold">
              Balance: ₹{isLoading ? "..." : balance}
            </div>

            <Link
              to="/transactions"
              className="text-lg font-semibold hover:underline"
            >
              🧾 Transactions
            </Link>
          </div>
        </div>
      </MaxContainer>
    </header>
  );
}
