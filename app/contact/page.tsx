// contact page 
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { ThemeToggle } from "../components/ThemeToggle";

export default function ContactPage() { 
    
    const dir = path.join(process.cwd(), "content/contact");
    const files = fs.readdirSync(dir);
    
    const papers = files.map((file) => {
    const slug = file.replace(".md", "");
    const fileContent = fs.readFileSync(path.join(dir, file), "utf8");
    const { data } = matter(fileContent);
    
    
    
    
    
    <main>

        
    </main>
}