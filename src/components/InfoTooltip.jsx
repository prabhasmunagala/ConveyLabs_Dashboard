import { useState, useEffect } from "react";

export default function InfoTooltip({ info }) {
  const [visible, setVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice(navigator.maxTouchPoints > 0);
  }, []);

  const handleToggle = () => {
    if (isTouchDevice) {
      setVisible((prev) => !prev);
    }
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => !isTouchDevice && setVisible(true)}
      onMouseLeave={() => !isTouchDevice && setVisible(false)}
    >
      <button
        type="button"
        aria-label="More info"
        onClick={handleToggle}
        className="ml-1 text-gray-400 hover:text-blue-500 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <circle cx="12" cy="12" r="10" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 16v-4m0-4h.01"
          />
        </svg>
      </button>

      {visible && (
        <div
          role="tooltip"
          className="absolute z-10 w-48 p-2 text-xs text-white bg-blue-500 rounded shadow-lg left-full ml-2 top-1/2 -translate-y-1/2"
        >
          {info}
        </div>
      )}
    </div>
  );
}
