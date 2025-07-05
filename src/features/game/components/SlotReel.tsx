import cherryImage from "@/assets/images/1.png";
import ringImage from "@/assets/images/2.png";
import jokerImage from "@/assets/images/3.png";
import sevenImage from "@/assets/images/4.png";
import orangeImage from "@/assets/images/5.png";
import watermelonImage from "@/assets/images/6.png";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

const reel1 = [
  cherryImage,
  ringImage,
  jokerImage,
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
];
const reel3 = [
  orangeImage,
  cherryImage,
  watermelonImage,
  jokerImage,
  ringImage,
  sevenImage,
];

const eachImageHeight = 80;
const gapBetweenImages = 8;
const visibleHeightOfReel = 3 * eachImageHeight + 2 * gapBetweenImages;
const LOOP_COUNT = 10;

const reelStyles =
  "min-h-[80px] max-h-[80px] min-w-[80px] max-w-[80px] rounded-lg border border-white object-cover";

export default function ReelDisplay() {
  const reel1Ref = useRef<HTMLDivElement>(null);
  const reel2Ref = useRef<HTMLDivElement>(null);
  const reel3Ref = useRef<HTMLDivElement>(null);

  const spinReel = (
    ref: React.RefObject<HTMLDivElement | null>,
    finalIndex: number,
    duration: number
  ) => {
    const start = performance.now();
    const totalSteps = reel1.length * (LOOP_COUNT - 1) + finalIndex;
    const finalOffset = totalSteps * (eachImageHeight + gapBetweenImages);

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

  const handleSpin = () => {
    const finalIndex1 = Math.floor(Math.random() * reel1.length);
    const finalIndex2 = Math.floor(Math.random() * reel2.length);
    const finalIndex3 = Math.floor(Math.random() * reel3.length);

    spinReel(reel1Ref, finalIndex1, 2500);
    spinReel(reel2Ref, finalIndex2, 3000);
    spinReel(reel3Ref, finalIndex3, 3500);
  };

  return (
    <>
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

      <div className="text-center mt-6">
        <Button onClick={handleSpin}>Spin Now</Button>
      </div>
    </>
  );
}
