import Link from "next/link";

// home landing page 

export default function Home() {
  return (
    <main
    style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center", 
      alignItems: "center",
      textAlign: "center",
      fontFamily: "sherif",
      background: "#98A869",
    }}
    >
      <h1 style={{
        fontSize: "2.3rem",
        letterSpacing: "1px",
        marginBottom: "0.8rem", 
        color: "#2d2e2d"
      }}>
        Sadra Daneshmand
      </h1>

      <p style={{ 
        marginBottom: "2rem",
        fontSize: "1.3rem", 
        color: " #383737",
      }}>
        MA English Studies · Discourse · Media · Language
      </p>

      <div style={{
        fontSize: "1.4rem",
        marginTop: "0.2rem",
        display: "flex", 
        gap: "1.5rem",
        color: "#2F5D50",
        }}>
          
        <Link href="/papers">Papers</Link> 
        <Link href="/videos">Media</Link> 
        <Link href="/cv">CV</Link> 
        <a href="https://github.com/Sadraw" target="_blank" rel="noopener noreferrer">Github</a>


      </div>
    </main>
  );
}