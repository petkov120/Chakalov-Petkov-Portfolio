import { motion } from "motion/react";
import React from "react";
import { useSound } from "../../hooks/useSound";
import constructionWorkerImg from "../../assets/CSt woeker.webp";

interface UnderConstructionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UnderConstructionModal({
  isOpen,
  onClose,
}: UnderConstructionModalProps) {
  const { playHoverSound } = useSound();

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onClose}
    >
      <motion.div
        className="relative bg-white rounded-lg shadow-lg max-w-md w-full overflow-hidden border border-gray-200"
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <motion.button
          className="absolute top-3 right-3 z-10 bg-transparent hover:bg-gray-100 text-gray-500 hover:text-gray-700 w-8 h-8 rounded-md flex items-center justify-center transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          onMouseEnter={() => playHoverSound(600, 50, 0.05)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </motion.button>

        {/* Content - Text at top, Image at bottom */}
        <div className="flex flex-col">
          {/* Text Section at Top */}
          <div className="px-6 pt-20 pb-4 mt-4 text-center">
            <motion.h3
              className="font-['Lora:Medium',_sans-serif] text-xl md:text-2xl text-[#150c0c] mb-2 tracking-[-0.02em]"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Under Maintenance
            </motion.h3>
            {/* Image Section at Bottom */}
            <motion.div
              className="flex items-end justify-center pt-2 pb-6 px-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <img
                src={constructionWorkerImg}
                alt="Under construction"
                className="w-full max-w-[180px] h-[180px] object-contain my-2"

              />
            </motion.div>

            <motion.p
              className="font-['IBM_Plex_Sans_Condensed:Regular',_sans-serif] text-sm md:text-base text-[#7c736a] leading-relaxed tracking-[-0.01em]"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              This case study or project is under maintenance. Check back soon
              for updates!
            </motion.p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
