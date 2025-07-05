import { useEffect } from "react";

interface WinningModalProps {
  winAmount: number;
  onClose: () => void;
}

export default function WinningModal({
  winAmount,
  onClose,
}: WinningModalProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 px-8 flex items-center justify-center z-50">
      <div className="bg-[#121212] text-white rounded-2xl shadow-xl px-8 py-6 max-w-sm w-full text-center animate-fadeIn scale-in">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-[#4FF55F] mb-2">You Won!</h2>
        <p className="text-lg mb-4">
          ₹{winAmount} has been added to your balance.
        </p>
        <button
          onClick={onClose}
          className="bg-[#4FF55F] text-black font-semibold px-6 py-2 rounded-full hover:opacity-90"
        >
          Awesome!
        </button>
      </div>
    </div>
  );
}
