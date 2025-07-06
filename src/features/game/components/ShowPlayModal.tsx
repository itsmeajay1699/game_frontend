import PartialWinningModal from "./PartialWinningModal";
import WinningModal from "./WinningModal";

interface GamePlayModalProps {
  status: string;
  winAmount?: number;
  onClose: () => void;
}

const ShowPlayModal = ({ status, winAmount, onClose }: GamePlayModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 px-8 flex items-center justify-center z-50">
      <div className="bg-[#1C1C1C] text-white rounded-2xl shadow-xl px-8 py-6 max-w-sm w-full text-center animate-fadeIn scale-in">
        {status === "win" ? (
          <WinningModal winAmount={winAmount ?? 0} onClose={onClose} />
        ) : status === "partial" ? (
          <PartialWinningModal
            partialAmount={winAmount ?? 0}
            onClose={onClose}
          />
        ) : null}
      </div>
    </div>
  );
};
export default ShowPlayModal;
