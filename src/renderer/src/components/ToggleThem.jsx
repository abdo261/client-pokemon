import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaRegMoon } from "react-icons/fa";
import { MdOutlineLightMode } from "react-icons/md";
import { Button } from "@nextui-org/react";

const ToggleThem = ({ size = "sm" }) => {
  const [dark, setDark] = useState(
    JSON.parse(localStorage.getItem("dark")) || false
  );
  const toggleDark = () => setDark(!dark);
  useEffect(() => {
    localStorage.setItem("dark", dark);
    if (dark) {
      document.body.className = "dark";
    } else {
      document.body.className = "";
    }
  }, [dark]);
  return (
    <motion.span
      whileTap={{ rotate: "360deg", scale: 0.6 }}
      transition={{ duration: 0.3 }}
      className="cursor-none"
    >
      {" "}
      <Button
        isIconOnly
        className="text-lg cursor-pointer"
        radius="full"
        variant="bordered"
        onClick={toggleDark}
        size={size}
      >
        {dark ? <FaRegMoon /> : <MdOutlineLightMode />}
      </Button>{" "}
    </motion.span>
  );
};

export default ToggleThem;
