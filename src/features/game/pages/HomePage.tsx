import LogoHeader from "../components/LogoHeader";
import Leaderboard from "../components/Leaderboard";
import MaxContainer from "@/components/shared/maxContainer";
import ReelDisplay from "../components/SlotReel";
import bgImage from "@/assets/images/bg.png";

export default function HomePage() {
  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="min-h-screen text-white pb-10 relative"
    >
      <LogoHeader />

      <MaxContainer>
        <div className="flex flex-col lg:flex-row justify-between items-start pt-28 gap-10 px-4">
          <div className="flex flex-col items-center gap-6 w-full lg:w-2/3">
            <div
              className="backdrop-blur-md p-6 bg-white/10 border border-white/20 shadow-2xl rounded-2xl ring-1 ring-yellow-400/30
                        after:content-[''] after:absolute after:inset-0 after:rounded-2xl after:pointer-events-none
                        after:ring-8 after:ring-yellow-400/10"
            >
              <ReelDisplay />
            </div>
          </div>

          <div
            className="backdrop-blur-md mx-auto bg-white/10 border border-white/20 shadow-2xl rounded-2xl ring-1 ring-yellow-400/30
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
