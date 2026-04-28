"use client";
import {motion} from "framer-motion";
import Link from "next/link";

// home landing page 

export default function Home() {
  return (
    
    <motion.main
    initial = {{ opacity: 0, y: 10}}
    animate = {{opacity: 1, y: 0}}
    transition= {{ duration: 0.25, ease: "easeOut", delay: 0.05}}
    className=
    "h-screen  flex flex-col justify-center items-center text-center font-serif bg-[#98A869] dark:bg-zinc-900 transition-colors duration-300"
    >

    {/* navbar */} 

    <h1 className="text-[2.3rem] tracking-[1px] mb-[0.8rem] text-[#2d2e2d] dark:text-zinc-100">
      Sadra Daneshmand
    </h1>

    <p className="mb-8 text-[1.3rem]   text-[#383737] dark:text-zinc-100">
      MA English Studies · Discourse · Media · Language 
      
    </p>

    <div className="text-[1.4rem] mt-[0.2rem] flex gap-6 text-[#2F5D50] dark:text-zinc-400">
          
        <Link href="/papers">Publications</Link> 
        <Link href="/videos">Media</Link> 
        <Link href="/cv">CV</Link> 
        <Link href="/archive">Archive</Link> 
        <Link href="/contact">Contact</Link> 
        <a href="https://github.com/Sadraw" target="_blank" rel="noopener noreferrer">Github</a>


      </div>
    </motion.main>
  );
}