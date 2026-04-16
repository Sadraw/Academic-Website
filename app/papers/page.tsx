import fs from "fs";
import path from "path"; 
import matter from "gray-matter";



export default function PapersPage() { 
    const dir = path.join(process.cwd(), "app/content/papers");
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
            maxWidth: "750px",
            margin: "0 auto",
            padding: "4rem 1.5rem",
            fontFamily: "serif",
            

        }}
        >
            <h1 style={{ fontSize: "3rem"}}>Papers</h1>

            <div style={{ marginTop: "2rem"}}>
                {papers.map((paper) => (

                    <div key={paper.slug} style={{ 
                    marginBottom: "1.2rem", 
                    fontSize: "1.5rem",
                    alignContent: "center",
                    alignItems: "center", }}>

                        <a href="`/papers/$(paper.slug)`">
                        {paper.title}
                        </a>
                    </div>
                ))}
            </div>
        </main>
    )
}