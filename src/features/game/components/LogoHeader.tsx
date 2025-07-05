import MaxContainer from "@/components/shared/maxContainer";
import { useAppContext } from "@/context/AppContext";
import { Link } from "react-router-dom";

export default function LogoHeader() {
  const { balance, isLoading } = useAppContext();

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
