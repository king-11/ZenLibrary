import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer className="flex md:flex-row flex-col justify-around items-center bg-blue-400 h-20 md:h-12 text-white dark:bg-white dark:text-black" initial={{opacity:0,scaleY:0,transformOrigin:"top left"}} animate={{opacity:1,scaleY:1}}>
      <div>
        &copy; { new Date().getFullYear() } — <a href="https://github.com/king-11"><strong>king-11</strong></a>
      </div>
      <div style={{fontFamily:'Crimson Text'}} className="text-lg">
        ZenLibrary is made with <span role="img" aria-label="quality content">🎂</span>, <span role="img" aria-label="quality content">🍕</span>, <span role="img" aria-label="quality content">🐛</span> and <span role="img" aria-label="quality content">🖥️</span>
      </div>
    </motion.footer>
  )
}
