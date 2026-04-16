import {getAllPapers} from "@/lib/papers";
import { styleText } from "util";

export default function PapersPage() {
    const papers = getAllPapers();

    return (
        <main
        style={{
            maxWidth: "750px",
            margin: "0 auto", 
            padding: "4rem 1.5rem", 
            fontFamily: "serif",
        }}
        >
            <h1 style={{ fontSize: "2rem"}}>Papers</h1>
            <div style={{ marginTop: "2rem"}}>
                {papers.map((paper: any) => (
                    <div key={paper.slug} style={{ marginBottom: "1.5rem"}}>
                        <a href={`/papers/${paper.slug}`} style={{fontSize: "1.5rem"}}>
                        {paper.title}
                        </a>
                        
                    </div>
                ))}
            </div>
        </main>
    )
}