import fs from "fs";
import path from "path"; 
import matter from "gray-matter";
import Link from "next/link";


export default function PapersPage() { 
    const dir = path.join(process.cwd(), "content/papers");
    const files = fs.readdirSync(dir);

    const papers = files.map((file) => {
        const slug = file.replace(".md", "");
        const fileContent = fs.readFileSync(path.join(dir, file), "utf8");
        const {data} = matter(fileContent);
        
        return {
            slug, 
            title: data.title,

        };

    });

    return (
        <main
        style={{
            minHeight: "100vh",
            width: "100%",
            margin: "0 auto",
            padding: "4rem 2rem",
            fontFamily: "serif",
            background: "#98A869",
            textAlign: "center",
            

        }}
        >
            

                <h1
                    style={{
                        fontSize: "2.9rem",
                        marginBottom: "2rem",
                        marginRight: "3.2rem"
                    }}>
                    
                    <Link
                        href="/"
                        style={{
                        color: "#1F2520",
                        textDecoration: "none",
                        }}
                    >
                        ← Papers
                    </Link>
                </h1>



            <div style={{ marginTop: "2rem"}}>
                {papers.map((paper) => (

                    <div
                    key={paper.slug} 
                    style={{ 
                    marginBottom: "1.4rem", 
                    fontSize: "1.5rem",
                    alignContent: "center",
                    alignItems: "center", 
                    paddingBottom: "0.2rem",
                    }}>

                        <a href={`/papers/${paper.slug}`}
                        style={{
                            color: "#1F2520",
                            textDecoration: "none",
                            fontSize: "1.45rem",
                            fontWeight: "500",
                            lineHeight: "1.5",
                            letterSpacing: "0.2px",
                            display: "inline-block",
                            maxWidth: "650px",
                        }}>
                            {paper.title}
                        </a>
                    </div>
                ))}
            </div>
        </main>
    )
}