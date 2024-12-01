import React from "react";
import { motion } from "framer-motion";

function ProgressBar({ progress }) {
  return (
    <div style={{ border: "1px solid #ccc", width: "100%", marginTop: "10px" }}>
      <motion.div
        style={{
          width: `${progress}%`,
          backgroundColor: "green",
          height: "10px",
        }}
        initial={{ width: "0%" }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
      ></motion.div>
    </div>
  );
}

export default ProgressBar;
