import LogoHeader from "../components/LogoHeader";
import { useState } from "react";
import Leaderboard from "../components/Leaderboard";
import { Button } from "@/components/ui/button";
import MaxContainer from "@/components/shared/maxContainer";
import ReelDisplay from "../components/SlotReel";
import bgImage from "@/assets/images/bg.png";

const BID_AMOUNTS = [10, 30, 50];

export default function HomePage() {
  const [selectedBid, setSelectedBid] = useState<number | null>(null);

  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="min-h-screen text-white"
    >
      <LogoHeader />

      <MaxContainer>
        <div className="flex flex-col lg:flex-row justify-between items-start pt-28 gap-10">
          <div className="flex flex-col items-center gap-6 w-full lg:w-2/3">
            <div
              className="backdrop-blur-md p-6 bg-white/10 border border-white/20 shadow-2xl rounded-2xl ring-1 ring-yellow-400/30
                        after:content-[''] after:absolute after:inset-0 after:rounded-2xl after:pointer-events-none
                        after:ring-8 after:ring-yellow-400/10"
            >
              <ReelDisplay />
            </div>

            <div className="flex gap-4">
              {BID_AMOUNTS.map((amount) => (
                <Button
                  key={amount}
                  onClick={() => setSelectedBid(amount)}
                  className={`${
                    selectedBid === amount
                      ? "bg-[#4FF55F] text-black"
                      : "bg-white text-black"
                  }`}
                >
                  ₹{amount}
                </Button>
              ))}
            </div>

            <Button
              className="mt-2 bg-[#4FF55F] text-[#121212] font-bold px-10 py-4 text-lg"
              disabled={!selectedBid}
              onClick={() => {
                alert(`Spinning with ₹${selectedBid}`);
              }}
            >
              Spin Now
            </Button>
          </div>

          <div
            className="backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl rounded-2xl ring-1 ring-yellow-400/30
                        after:content-[''] after:absolute after:inset-0 after:rounded-2xl after:pointer-events-none
                        after:ring-8 after:ring-yellow-400/10"
          >
            <Leaderboard />
          </div>
        </div>
      </MaxContainer>
    </div>
  );
}
