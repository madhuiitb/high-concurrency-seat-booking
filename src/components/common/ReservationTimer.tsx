'use client'

import { formatTimer } from "@/utils/formatTimer"
import { motion, AnimatePresence } from "framer-motion"


export default function ReservationTimer({ remainingSeconds }: { remainingSeconds: number }) {
    const urgencyColor = remainingSeconds < 30 ? "text-red-500" : remainingSeconds < 120 ? "text-orange-400" : "text-yellow-400";
    return (
      <div className="border p-2 rounded-lg text-lg font-semibold text-white">
        Seats reserved for {"  "}
        <AnimatePresence mode="wait">
                <motion.span key={remainingSeconds}
                    animate={{ scale: remainingSeconds < 20 ? 1.05 :1}}
                    transition={{
                        repeat: remainingSeconds < 30 ? Infinity : 0,
                        repeatType: "reverse",
                        duration:0.6
                    }}
                    className={`font-semibold ${urgencyColor}`}
                >
            {formatTimer(remainingSeconds)}
          </motion.span>
        </AnimatePresence>
      </div>
    );
}