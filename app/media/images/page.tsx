import Image from "next/image";
import Link from "next/link";


export default function PhotosPage() {

    <main 
    className="
    min-h-screen
    px-8
    py-16
    bg-[#98A869]
    dark:bg-zinc-900
    font-serif
    ">
        <h1 
        className="
        text-3xl
        mb-8
        ">
            <Link href="/media" className="hover:opacity-60 transition">

                ← Media / Photos

            </Link>
        </h1>

        {/* Gallery */}
        <div 
        className="
        grid
        grid-cols-2
        md:grid-cols-3
        gap-4
        ">

            <div className=" col-span-2">

                <Image
                src="/images/the-man-in-the-sun.jpg"
                alt=""
                width={1200}
                height={800}
                className="rounded-lg object-cover w-full h-auto"
                />
                
            </div>
            
                <div>
                    <Image
                    alt=""
                    src="/images/the-man-in-the-sun.jpg"
                    width={800}
                    height={800}
                    className="rounded-lg object-cover w-full h-full"
                    />
                </div>
        </div>
    </main>

}