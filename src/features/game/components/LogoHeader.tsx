import { useQuery } from "@tanstack/react-query";
import axiosClient from "@/lib/axios";
import { useEffect, useState } from "react";
import MaxContainer from "@/components/shared/maxContainer";

export default function LogoHeader() {
  const [balance, setBalance] = useState<number>(0);

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
    <header className="fixed w-full text-white py-4 shadow-md">
      <MaxContainer>
        <div className="flex items-center justify-between">
          <img
            src="https://bigbaazi.imgix.net/bigboost-logo-header.svg"
            alt="Logo"
            className="h-6 md:h-8 lg:h-10"
          />

          <div className="text-lg font-semibold">
            Balance: ₹{isLoading ? "..." : balance}
          </div>
        </div>
      </MaxContainer>
    </header>
  );
}
