const papers = [
    {
        title: "When the Network Goes Down",
        slug: "network-goes-down",

    },
];


export default function Papers() {
    return (
        <main style={{padding: "2rem", fontFamily: "serif", fontSize: 35}}>
            <h1>Papers</h1>
            <ul>
                {papers.map((paper) => (
                    <li key={paper.slug}>
                        <a href={`/papers/$(paper.slug)`}>
                        {paper.title}
                        </a>
                    </li>
                ))}
            </ul>


        </main>
    )
}