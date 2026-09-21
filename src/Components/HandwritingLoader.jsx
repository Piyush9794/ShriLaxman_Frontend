import { useEffect } from "react";
import { motion } from "framer-motion";

export default function HelloLoader({ onComplete }) {
    useEffect(() => {
        // SVG animation complete hone ke liye fallback
        const timer = setTimeout(() => {
            onComplete?.();
        }, 5000);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div
            className="
        fixed
        inset-0
        z-[99999]
        flex
        items-center
        justify-center
        bg-black
        overflow-hidden
      "
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{
                opacity: 0,
                transition: {
                    duration: 0.9,
                    ease: "easeInOut",
                },
            }}
        >
            {/* <motion.img
        src="/Hello%20(apple).svg"
        alt="Hello"
        className="
          w-[280px]
          sm:w-[320px]
          md:w-[360px]
          lg:w-[400px]
          xl:w-[430px]
          max-w-[80vw]
          h-auto
          object-contain
        "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.3,
        }}
      /> */}

            <motion.img
                src="/Hello%20(apple).svg"
                alt="Hello"
                className="
    w-[280px]
    sm:w-[320px]
    md:w-[360px]
    lg:w-[400px]
    xl:w-[430px]
    max-w-[80vw]
    h-auto
    object-contain
    brightness-0
    invert
  "
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    duration: 0.3,
                }}
            />
        </motion.div>
    );
}