import { MapPin } from "lucide-react";

export function CurrentLocationButton({ onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`absolute bottom-4 right-4 z-10 bg-eon-light rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow border border-gray-200 ${className}`}
      title="현재 위치로 이동"
    >
      <MapPin className="w-6 h-6 text-white" />
    </button>
  );
}