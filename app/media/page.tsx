import Link from "next/link";
import Image from "next/image";


export default function MediaPage(){

    return (

        <main 
        className="
        min-h-screen
        px-8
        py-16
        bg-[#98A869]
        dark:bg-zinc-900
        font-serif
        text-center
        "
        >

            <div 
            className="
            pt-12
            flex
            flex-col
            items-center
            ">

                <h1 className="text-[2.3rem] mb-3">
                    <Link 
                    href="/"
                    className="
                    text-[#1F2520] 
                    dark:text-zinc-100 
                    hover:opacity-70 
                    transition
                    ">
                        &larr; Media
                        
                    </Link>
                </h1>
                    <p 
                    className="
                    text-[#383737] 
                    dark:text-zinc-100 
                    text-[1.2rem] 
                    mb-10 
                    tracking-wide
                    ">
                        Visual Media · Sound · Digital Projects
                    </p>

                        <div 
                        className=" max-w-3xl w-full">
                            <Image
                                src="/images/the-man-in-the-sun.jpg"
                                alt="Street in Graz"
                                width={1200}
                                height={800}
                                className="
                                rounded-xl 
                                shadow-lg 
                                object-cover 
                                w-full 
                                h-auto"
                            />

                        </div>
            </div>

        </main>
    )
}