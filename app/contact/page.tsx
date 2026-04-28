// contact page 
import Link from "next/link";
import { ThemeToggle } from "../components/ThemeToggle";

export default function ContactPage() {
    
 return (
    <main 
    className=
    " flex flex-col items-center min-h-screen w-full px-8 py-16 font-serif bg-[#98A869] dark:bg-zinc-900 transition-colors duration-300"
    >

        {/* Navbar  */}
        <nav className="absolute top-0 left-0 right-0 flex justify-end items-center px-8 py-4">
            <ThemeToggle/>
        </nav>

        {/* Content Container  */}

        <div className="flex flex-col items-center gap-2 pt-12">

        {/* Title  */}

        <h1 className="text-[2.3rem] mb-2 mr-[3.2rem] tracking-[1px] ">

            <Link
                href="/"
                className="text-[#1F2520] dark:text-zinc-100 no-underline hover:opacity-65 transition">

            
                    &larr; Contact
            </Link>

        </h1>

        {/* Description  */}

        <p 
        className=
        " text-[1rem] font-serif leading-relaxed tracking-wide text-[#383737] dark:text-zinc-100"
        >
            Open to Research Collaborations · Digital Projects · Interdisciplinary Work 
        </p>

        <p>

        </p>
        {/* Email  */}



        <p 
        className=
        "mt-5 mb-5 max-auto text-[0.8rem] text-[#1F2520] font-serif dark:text-zinc-100 no-underline"
        >
            <a
            href=
            "https://www.google.com/search?q=graz&oq=graz&gs_lcrp=EgZjaHJvbWUqBggAEEUYOzIGCAAQRRg7MgYIARBFGDsyBggCECMYJzIGCAMQRRhBMgYIBBBFGDwyBggFEEUYPDIGCAYQRRg9MgYIBxBFGEHSAQc1OTdqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8"
            target="_blank"  rel="noopener noreferrer"
            className="mb-[0.8rem] mr-5.5 tracking-[1px] leading-relaxed text-[#1F2520] dark:text-zinc-100 no-underline ">
            
                📍Graz · Austria

            </a>
            
        </p>


</div>

    </main>
 )   
    
    
}