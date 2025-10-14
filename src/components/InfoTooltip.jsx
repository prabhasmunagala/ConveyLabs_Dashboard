import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function InfoTooltip({ info }) {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const iconRef = useRef(null);
  const tooltipRef = useRef(null);
  const hideTimeout = useRef(null);

  // Detect touch device
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  useEffect(() => {
    setIsTouchDevice(navigator.maxTouchPoints > 0);
  }, []);

  const computePosition = () => {
    const rect = iconRef.current.getBoundingClientRect();
    setPosition({
      top: rect.top + window.scrollY + rect.height / 2,
      left: rect.right + window.scrollX + 8,
    });
  };

  const showTooltip = () => {
    computePosition();
    clearTimeout(hideTimeout.current);
    setVisible(true);
  };

  const hideTooltip = () => {
    hideTimeout.current = setTimeout(() => setVisible(false), 150);
  };

  const cancelHide = () => {
    clearTimeout(hideTimeout.current);
  };

  // Hide on outside click or Escape
  useEffect(() => {
    if (!visible) return;

    const handleClickOutside = (e) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(e.target) &&
        !iconRef.current.contains(e.target)
      ) {
        setVisible(false);
      }
    };

    const handleEscape = (e) => {
      if (e.key === "Escape") setVisible(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [visible]);

  return (
    <>
      <span
        ref={iconRef}
        onMouseEnter={() => !isTouchDevice && showTooltip()}
        onMouseLeave={() => !isTouchDevice && hideTooltip()}
        onClick={(e) => {
          if (isTouchDevice) {
            e.stopPropagation();
            visible ? setVisible(false) : showTooltip();
          }
        }}
        className="inline-block ml-1 text-gray-400 hover:text-blue-500 cursor-pointer"
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
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4m0-4h.01" />
        </svg>
      </span>

      {visible &&
        createPortal(
          <div
            ref={tooltipRef}
            className="fixed z-50 w-80 max-w-[90vw] p-3 text-sm text-white bg-blue-600 rounded shadow-lg select-text whitespace-pre-wrap break-words"
            style={{
              top: position.top,
              left: position.left,
              transform: "translateY(-50%)",
            }}
            onMouseEnter={cancelHide}
            onMouseLeave={hideTooltip}
          >
            {info}
          </div>,
          document.body
        )}
    </>
  );
}
