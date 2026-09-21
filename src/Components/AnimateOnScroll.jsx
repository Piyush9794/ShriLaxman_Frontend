import React from "react";
import { motion } from "framer-motion";

const variants = {
  "fade-up": {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-down": {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-left": {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
  "fade-right": {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  "fade-up-right": {
    hidden: { opacity: 0, y: 40, x: -40 },
    visible: { opacity: 1, y: 0, x: 0 },
  },
  "fade-up-left": {
    hidden: { opacity: 0, y: 40, x: 40 },
    visible: { opacity: 1, y: 0, x: 0 },
  },
  "zoom-in": {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1 },
  },
  "zoom-in-up": {
    hidden: { opacity: 0, scale: 0.85, y: 40 },
    visible: { opacity: 1, scale: 1, y: 0 },
  },
  "flip-up": {
    hidden: { opacity: 0, rotateX: 35, y: 30 },
    visible: { opacity: 1, rotateX: 0, y: 0 },
  },
};

export default function AnimateOnScroll({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 0.6,
  once = false, // Set to false so it animates on both scroll down and scroll up
  threshold = 0.1,
  className = "",
  style = {},
  ...props
}) {
  const selectedVariant = variants[animation] || variants["fade-up"];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      variants={selectedVariant}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
}
