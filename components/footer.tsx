import { motion } from "framer-motion";

export default function Footer({ classes }: { classes?: string }) {
  return (
    <motion.footer
      className={`text-sm md:text-base flex md:flex-row flex-col justify-around items-center bg-blue-400 h-14 md:h-12 text-white dark:bg-white dark:text-black ${
        classes !== undefined ? classes : ""
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div>
        &copy; {new Date().getFullYear()} —{" "}
        <a href="https://github.com/king-11">
          <strong>king-11</strong>
        </a>
      </div>
      <div
        style={{ fontFamily: "Crimson Text" }}
        className="text-base md:text-lg"
      >
        ZenLibrary is made with{" "}
        <span role="img" aria-label="quality content">
          🎂
        </span>
        ,{" "}
        <span role="img" aria-label="quality content">
          🍕
        </span>
        ,{" "}
        <span role="img" aria-label="quality content">
          🐛
        </span>{" "}
        and{" "}
        <span role="img" aria-label="quality content">
          🖥️
        </span>
      </div>
    </motion.footer>
  );
}
