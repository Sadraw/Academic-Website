// contact page 
import Link from "next/link";
import { ThemeToggle } from "../components/ThemeToggle";

export default function ContactPage() {
    
 return (
    <main 
    className=
    "min-h-screen  justify-center items-center w-full mx-auto px-8 py-16 font-serif bg-[#98A869] dark:bg-zinc-900 text-center transition-colors duration-300"
    >

        {/* Navbar  */}
        <nav className="absolute top-0 left-0 right-0 flex justify-end items-center px-8 py-4">
            <ThemeToggle/>
        </nav>

        <h1 className="text-[2.9rem] mb-8 mr-[3.2rem] ">

            <Link
                href="/"
                className="text-[#1F2520] dark:text-zinc-100 no-underline">

            
                    &larr; Contact
            </Link>

        </h1>

        <p 
        className=
        "mb-8 text-[1.3rem] text-[#383737] dark:text-zinc-100"
        >
            Open to Research Collaborations · Digital Projects · and Meaningful Opportunities 
        </p>

        <a href=""></a>









    </main>
 )   
    
    
}