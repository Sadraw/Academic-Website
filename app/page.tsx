import Link from "next/link";
import { ThemeToggle } from "./components/ThemeToggle";

// home landing page 

export default function Home() {
  return (
    
    <main className="h-screen flex flex-col justify-center items-center text-center font-serif bg-[#98A869] dark:bg-zinc-900 transition-colors duration-300">

    {/* navbar */}
    <nav className="absolute top-0 left-0 right-0 flex justify-end items-center px-8 py-4 ">
      <ThemeToggle/>
    </nav>


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
    </main>
  );
}