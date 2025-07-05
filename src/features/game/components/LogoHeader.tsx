import MaxContainer from "@/components/shared/maxContainer";
import { useAppContext } from "@/context/AppContext";

export default function LogoHeader() {
  const { balance, isLoading } = useAppContext();

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
