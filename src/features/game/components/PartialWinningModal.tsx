import { useEffect } from "react";

interface PartialWinningModalProps {
  partialAmount: number;
  onClose: () => void;
}

export default function PartialWinningModal({
  partialAmount,
  onClose,
}: PartialWinningModalProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 px-8 flex items-center justify-center z-50">
      <div className="bg-[#1C1C1C] text-white rounded-2xl shadow-xl px-8 py-6 max-w-sm w-full text-center animate-fadeIn scale-in">
        <div className="text-5xl mb-4">✨</div>
        <h2 className="text-2xl font-bold text-yellow-400 mb-2">Nice Try!</h2>
        <p className="text-lg mb-4">
          You didn’t hit the jackpot, but you still won ₹{partialAmount}!
        </p>
        <button
          onClick={onClose}
          className="bg-yellow-400 text-black font-semibold px-6 py-2 rounded-full hover:opacity-90"
        >
          Got it!
        </button>
      </div>
    </div>
  );
}
