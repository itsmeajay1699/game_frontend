import cherryImage from "@/assets/images/1.png";
import ringImage from "@/assets/images/2.png";
import jokerImage from "@/assets/images/3.png";
import sevenImage from "@/assets/images/4.png";
import orangeImage from "@/assets/images/5.png";
import watermelonImage from "@/assets/images/6.png";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/AppContext";
import axiosClient from "@/lib/axios";
import { toastError, toastSuccess } from "@/lib/toast";
import { useRef, useState } from "react";
import WinningModal from "./WinningModal";

const reel1 = [
  cherryImage,
  ringImage,
  jokerImage,
  sevenImage,
  orangeImage,
  watermelonImage,
  sevenImage,
  orangeImage,
  watermelonImage,
];
const reel2 = [
  jokerImage,
  watermelonImage,
  cherryImage,
  ringImage,
  sevenImage,
  orangeImage,
  sevenImage,
  orangeImage,
  watermelonImage,
];
const reel3 = [
  orangeImage,
  cherryImage,
  watermelonImage,
  jokerImage,
  ringImage,
  sevenImage,
  sevenImage,
  orangeImage,
  watermelonImage,
];

const eachImageHeight = 100;
const gapBetweenImages = 8;
const visibleHeightOfReel = 3 * eachImageHeight + 2 * gapBetweenImages;
const LOOP_COUNT = 10;

const BID_AMOUNTS = [10, 30, 50, 100];

const reelStyles =
  "min-h-[100px] max-h-[100px] min-w-[100px] max-w-[100px] rounded-lg border border-white object-cover";

export default function ReelDisplay() {
  const reel1Ref = useRef<HTMLDivElement>(null);
  const reel2Ref = useRef<HTMLDivElement>(null);
  const reel3Ref = useRef<HTMLDivElement>(null);
  const [selectedBid, setSelectedBid] = useState<number | null>(null);
  const { balance, isLoading, setBalance } = useAppContext();
  const [isWin, setIsWin] = useState(false);
  const [winAmount, setWinAmount] = useState<number | null>(null);

  const spinReel = async (
    ref: React.RefObject<HTMLDivElement | null>,
    finalIndex: number,
    duration: number
  ) => {
    const start = performance.now();
    const totalSteps = reel1.length * (LOOP_COUNT - 1) + finalIndex;

    const finalOffset = totalSteps * (eachImageHeight + gapBetweenImages) - 100;

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);

      if (ref.current) {
        ref.current.scrollTop = easeOut * finalOffset;
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  const handleSpin = ({
    index,
    isWin,
    updatedBalance = 0,
  }: {
    index: number[];
    isWin: boolean;
    updatedBalance?: number;
  }) => {
    try {
      console.log("Spinning reels with indices:", index);
      if (selectedBid === null) {
        throw new Error("Please select a bid amount before spinning.");
      }

      if (isLoading) {
        throw new Error("Loading, please wait.");
      }

      if (balance < selectedBid) {
        throw new Error("Insufficient balance to place this bid.");
      }

      // just for the user ui backend will update accordingly
      setBalance(balance - selectedBid);

      const finalIndex1 = index[0] ?? Math.floor(Math.random() * reel1.length);
      const finalIndex2 = index[1] ?? Math.floor(Math.random() * reel2.length);
      const finalIndex3 = index[2] ?? Math.floor(Math.random() * reel3.length);

      spinReel(reel1Ref, finalIndex1, 2500);
      spinReel(reel2Ref, finalIndex2, 3000);

      spinReel(reel3Ref, finalIndex3, 3500);
      setTimeout(() => {
        if (isWin) {
          setIsWin(true);
          setSelectedBid(null); // reset selected bid after win
          setBalance(updatedBalance); // final balance update from the backend
          setWinAmount(updatedBalance - balance); // calculate win amount
          toastSuccess("Congratulations! You won!", {
            description: `You won ₹${
              updatedBalance - balance
            } and your new balance is ₹${updatedBalance}.`,
            duration: 3000,
            position: "top-right",
          });
        }
      }, 3500);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      toastError(errorMessage, {
        description: "Please try again later.",
        duration: 3000,
        position: "top-right",
      });
    }
  };

  return (
    <>
      {isWin && (
        <WinningModal
          winAmount={winAmount ?? 0}
          onClose={() => {
            setIsWin(false);
          }}
        />
      )}

      <div
        className="flex justify-center items-center gap-6"
        style={{ height: `${visibleHeightOfReel}px`, overflow: "hidden" }}
      >
        {/* Reel 1 */}
        <div
          ref={reel1Ref}
          className="flex flex-col gap-2 overflow-hidden"
          style={{ height: `${visibleHeightOfReel}px` }}
        >
          {[...Array(LOOP_COUNT)]
            .flatMap(() => reel1)
            .map((img, index) => (
              <img key={index} src={img} alt="symbol" className={reelStyles} />
            ))}
        </div>

        {/* Reel 2 */}
        <div
          ref={reel2Ref}
          className="flex flex-col gap-2 overflow-hidden"
          style={{ height: `${visibleHeightOfReel}px` }}
        >
          {[...Array(LOOP_COUNT)]
            .flatMap(() => reel2)
            .map((img, index) => (
              <img key={index} src={img} alt="symbol" className={reelStyles} />
            ))}
        </div>

        {/* Reel 3 */}
        <div
          ref={reel3Ref}
          className="flex flex-col gap-2 overflow-hidden"
          style={{ height: `${visibleHeightOfReel}px` }}
        >
          {[...Array(LOOP_COUNT)]
            .flatMap(() => reel3)
            .map((img, index) => (
              <img key={index} src={img} alt="symbol" className={reelStyles} />
            ))}
        </div>
      </div>

      <div className="flex gap-6 justify-center mt-4">
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
        className="mt-6 bg-[#4FF55F] text-[#121212] font-bold px-10 py-4 text-lg mx-auto flex"
        disabled={selectedBid === null}
        onClick={async () => {
          const res = await axiosClient.post(
            "/slots/spin",
            { wagerAmount: selectedBid },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          const { reels, result, updatedBalance } = res.data;
          const finalIndices = reels.map((reel: any) => reel.index);
          handleSpin({
            index: finalIndices,
            isWin: result === "win",
            updatedBalance: updatedBalance,
          });
        }}
      >
        Spin Now
      </Button>
    </>
  );
}
